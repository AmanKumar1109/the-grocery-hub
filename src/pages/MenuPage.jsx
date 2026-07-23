import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Star, Clock, ShoppingBag, Check, Loader2 } from 'lucide-react';
import { useMenu } from '../context/MenuContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

export default function MenuPage() {
  const dispatch = useDispatch();
  const { items, categories, loading } = useMenu();
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  const filteredItems = items.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (item.description && item.description.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (item) => {
    dispatch(addToCart(item));
    setToastMessage(`Added ${item.name} to your cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#18181b] flex flex-col justify-between">

      {/* Top Banner Header */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-12">
        <Navbar />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 animate-bounce">
            <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center pt-6 space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            Explore Menu ({items.length} Items)
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Gourmet Food Menu
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Explore fresh dishes, healthy bowls, juicy burgers, and artisan desserts fetched live from our kitchen catalog database.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food items (e.g. Paneer, Burger, Cake)..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
              />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${activeCategory === cat
                    ? 'bg-slate-900 text-white shadow-lg scale-105'
                    : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Menu Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 flex-1 w-full">
        {loading ? (
          <div className="py-24 text-center flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-emerald-600 animate-spin" />
            <p className="text-sm font-bold text-slate-500">Fetching live menu from database...</p>
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="text-center py-16 space-y-3 bg-white rounded-3xl border border-slate-200 p-8">
            <p className="text-slate-500 text-lg font-medium">No food items found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Prep Time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold truncate max-w-[120px]">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Food Image Container */}
                  <div className={`relative w-full h-48 ${item.bgClass || 'bg-slate-50'} rounded-2xl flex items-center justify-center p-4 mb-4 overflow-hidden`}>
                    <img
                      src={item.image}
                      alt={item.name}
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
                      }}
                      className="w-40 h-40 object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  {/* Title & Ratings */}
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors mb-1 truncate" title={item.name}>
                    {item.name}
                  </h3>

                  {item.description && (
                    <p className="text-xs text-slate-400 line-clamp-2 mb-2">
                      {item.description}
                    </p>
                  )}

                  <div className="flex items-center gap-3 text-xs text-slate-500 mb-4">
                    <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span className="font-extrabold text-amber-900">{item.rating}</span>
                      <span className="text-slate-400">({item.reviews})</span>
                    </div>
                    <span>•</span>
                    <span>{item.calories}</span>
                  </div>
                </div>

                {/* Price & Add to Cart Button */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-100">
                  <div>
                    <span className="text-xs text-slate-400 block font-medium">Price</span>
                    <span className="text-xl font-extrabold text-slate-900">
                      ₹{typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                    </span>
                  </div>

                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.inStock}
                    className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-xs sm:text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
                      item.inStock 
                        ? 'bg-[#10b981] hover:bg-[#059669] text-white' 
                        : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                    }`}
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    <span>{item.inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                  </button>
                </div>

              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
