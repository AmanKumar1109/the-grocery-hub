import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Star, Clock, ShoppingBag, Check, Filter, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';
import miniCakeImg from '../assets/mini_cake.png';
import miniSaladImg from '../assets/mini_salad.png';

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [toastMessage, setToastMessage] = useState('');
  const [visibleCount, setVisibleCount] = useState(12);

  // Generate 800+ Catalog items (Zero Beef, 100% Indian friendly gourmet dishes)
  const baseItems = [
    { name: 'Gourmet Paneer Tikka Bowl', category: 'Healthy Bowls', price: 12.15, rating: 4.9, prepTime: '10-15 mins', calories: '340 kcal', image: mainSaladBowlImg, bg: 'bg-emerald-50' },
    { name: 'Crispy Veg Supreme Burger', category: 'Burgers', price: 7.99, rating: 4.8, prepTime: '10-15 mins', calories: '490 kcal', image: miniBurgerImg, bg: 'bg-amber-50' },
    { name: 'Pink Berry Frosted Donut Cake', category: 'Desserts', price: 5.50, rating: 4.9, prepTime: '5-10 mins', calories: '280 kcal', image: miniCakeImg, bg: 'bg-pink-50' },
    { name: 'Fresh Avocado Green Salad', category: 'Healthy Bowls', price: 10.50, rating: 4.7, prepTime: '8-12 mins', calories: '310 kcal', image: miniSaladImg, bg: 'bg-emerald-50' },
    { name: 'Smokey Tandoori Paneer Burger', category: 'Burgers', price: 8.75, rating: 4.9, prepTime: '12-16 mins', calories: '520 kcal', image: miniBurgerImg, bg: 'bg-[#ffedd5]' },
    { name: 'Triple Chocolate Fudge Cake', category: 'Desserts', price: 6.25, rating: 5.0, prepTime: '5-8 mins', calories: '410 kcal', image: miniCakeImg, bg: 'bg-[#fce7f3]' },
    { name: 'Classic Margherita Pizza', category: 'Pizzas', price: 11.99, rating: 4.8, prepTime: '15-20 mins', calories: '580 kcal', image: miniBurgerImg, bg: 'bg-red-50' },
    { name: 'Tandoori Mushroom Tikka Bowl', category: 'Healthy Bowls', price: 11.50, rating: 4.8, prepTime: '12-15 mins', calories: '320 kcal', image: mainSaladBowlImg, bg: 'bg-emerald-50' },
    { name: 'Spicy Veg Zinger Burger', category: 'Burgers', price: 8.25, rating: 4.7, prepTime: '10-14 mins', calories: '470 kcal', image: miniBurgerImg, bg: 'bg-amber-50' },
    { name: 'Mango Passion Fruit Mousse', category: 'Desserts', price: 6.00, rating: 4.9, prepTime: '5-8 mins', calories: '260 kcal', image: miniCakeImg, bg: 'bg-amber-50' },
    { name: 'Farmhouse Special Veggie Pizza', category: 'Pizzas', price: 13.50, rating: 4.9, prepTime: '15-22 mins', calories: '620 kcal', image: miniBurgerImg, bg: 'bg-rose-50' },
    { name: 'Quinoa & Roast Chickpea Salad', category: 'Healthy Bowls', price: 10.99, rating: 4.8, prepTime: '10-14 mins', calories: '290 kcal', image: miniSaladImg, bg: 'bg-emerald-50' }
  ];

  // Repeat catalog array up to 800+ items
  const catalog = Array.from({ length: 800 }, (_, i) => {
    const base = baseItems[i % baseItems.length];
    return {
      id: i + 1,
      name: i < baseItems.length ? base.name : `${base.name} Vol. ${Math.floor(i / baseItems.length) + 1}`,
      category: base.category,
      price: +(base.price + (i % 5) * 0.5).toFixed(2),
      rating: +(4.6 + (i % 5) * 0.1).toFixed(1),
      reviews: 50 + (i * 7) % 400,
      prepTime: base.prepTime,
      calories: base.calories,
      image: base.image,
      badge: i % 3 === 0 ? 'Chef Special' : i % 2 === 0 ? 'Popular' : 'Fresh',
      bgClass: base.bg
    };
  });

  const categories = ['All', 'Healthy Bowls', 'Burgers', 'Desserts', 'Pizzas'];

  const filteredCatalog = catalog.filter(item => {
    const matchesCat = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const displayedItems = filteredCatalog.slice(0, visibleCount);

  const handleAddToCart = (itemName) => {
    setCartCount(prev => prev + 1);
    setToastMessage(`Added ${itemName} to your cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#18181b] flex flex-col justify-between">

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 animate-bounce">
          <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
          <span className="text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      {/* Top Header Banner */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-10">
        <Navbar cartCount={cartCount} />

        <div className="max-w-5xl mx-auto pt-6 space-y-4">
          <div className="flex items-center gap-3">
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-slate-500 hover:text-slate-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
                Complete 800+ Dishes Catalog
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mt-2">
                Explore All Gourmet Food Items
              </h1>
              <p className="text-slate-500 text-sm sm:text-base max-w-xl mt-1">
                Browse our full kitchen menu of 800+ fresh vegetarian bowls, burgers, pizzas, and artisan desserts.
              </p>
            </div>

            <div className="text-slate-500 text-xs sm:text-sm font-bold bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
              Showing <span className="text-emerald-600 font-extrabold">{displayedItems.length}</span> of <span className="text-slate-900 font-extrabold">{filteredCatalog.length}</span> items
            </div>
          </div>

          {/* Search & Filter Bar */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4">
            <div className="md:col-span-8 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => { setSearchQuery(e.target.value); setVisibleCount(12); }}
                placeholder="Search all 800+ items (e.g. Paneer, Pizza, Mousse, Salad)..."
                className="w-full pl-12 pr-4 py-3 rounded-full bg-slate-100 border border-slate-200 text-slate-900 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:bg-white transition-all shadow-inner"
              />
            </div>

            <div className="md:col-span-4 flex items-center gap-2 overflow-x-auto no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => { setActiveCategory(cat); setVisibleCount(12); }}
                  className={`px-4 py-2.5 rounded-full text-xs font-bold transition-all duration-200 flex-shrink-0 cursor-pointer ${activeCategory === cat
                      ? 'bg-slate-900 text-white shadow-md'
                      : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Grid View of Items */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12 flex-1 w-full">
        {filteredCatalog.length === 0 ? (
          <div className="text-center py-16 space-y-3">
            <p className="text-slate-400 text-lg font-medium">No food items found matching "{searchQuery}"</p>
            <button
              onClick={() => { setSearchQuery(''); setActiveCategory('All'); }}
              className="px-5 py-2 rounded-full bg-emerald-600 text-white font-bold text-sm"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {displayedItems.map((item) => (
                <div
                  key={item.id}
                  className="bg-white rounded-3xl p-4 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2.5">
                      <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold">
                        {item.badge}
                      </span>
                      <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                        <Clock className="w-3 h-3 text-amber-500" />
                        <span>{item.prepTime}</span>
                      </div>
                    </div>

                    <div className={`relative w-full h-36 ${item.bgClass} rounded-2xl flex items-center justify-center p-3 mb-3 overflow-hidden`}>
                      <img
                        src={item.image}
                        alt={item.name}
                        loading="lazy"
                        className="w-28 h-28 object-contain drop-shadow-md transform group-hover:scale-110 transition-transform duration-500 hardware-accel"
                      />
                    </div>

                    <h3 className="font-bold text-base text-slate-900 group-hover:text-emerald-600 transition-colors mb-1 line-clamp-1">
                      {item.name}
                    </h3>

                    <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                      <div className="flex items-center gap-1 bg-amber-50 px-2 py-0.5 rounded-full border border-amber-200">
                        <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                        <span className="font-extrabold text-amber-900 text-[11px]">{item.rating}</span>
                        <span className="text-slate-400 text-[10px]">({item.reviews})</span>
                      </div>
                      <span>•</span>
                      <span className="text-[11px]">{item.calories}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2.5 border-t border-slate-100">
                    <div>
                      <span className="text-[10px] text-slate-400 block font-medium">Price</span>
                      <span className="text-lg font-extrabold text-slate-900">${item.price.toFixed(2)}</span>
                    </div>

                    <button
                      onClick={() => handleAddToCart(item.name)}
                      className="flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>

                </div>
              ))}
            </div>

            {/* Load More Button for 800+ items pagination */}
            {visibleCount < filteredCatalog.length && (
              <div className="text-center pt-12">
                <button
                  onClick={() => setVisibleCount(prev => Math.min(prev + 16, filteredCatalog.length))}
                  className="px-8 py-3.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-sm shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
                >
                  Load More Items ({filteredCatalog.length - visibleCount} remaining)
                </button>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
