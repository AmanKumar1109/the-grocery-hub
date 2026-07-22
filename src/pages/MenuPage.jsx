import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Search, Star, Clock, Plus, Minus, ShoppingBag, Check } from 'lucide-react';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';
import miniCakeImg from '../assets/mini_cake.png';
import miniSaladImg from '../assets/mini_salad.png';

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartCount, setCartCount] = useState(2);
  const [toastMessage, setToastMessage] = useState('');

  const menuItems = [
    {
      id: 1,
      name: 'Gourmet Buddha Salad Bowl',
      category: 'Healthy Bowls',
      price: 12.15,
      rating: 4.9,
      reviews: 142,
      prepTime: '10-15 mins',
      calories: '340 kcal',
      image: mainSaladBowlImg,
      badge: 'Popular',
      bgClass: 'bg-emerald-50'
    },
    {
      id: 2,
      name: 'Double Deluxe Cheeseburger',
      category: 'Burgers',
      price: 8.99,
      rating: 4.8,
      reviews: 210,
      prepTime: '12-18 mins',
      calories: '650 kcal',
      image: miniBurgerImg,
      badge: 'Bestseller',
      bgClass: 'bg-amber-50'
    },
    {
      id: 3,
      name: 'Pink Berry Frosted Donut Cake',
      category: 'Desserts',
      price: 5.50,
      rating: 4.9,
      reviews: 98,
      prepTime: '5-10 mins',
      calories: '280 kcal',
      image: miniCakeImg,
      badge: 'Sweet Hit',
      bgClass: 'bg-pink-50'
    },
    {
      id: 4,
      name: 'Fresh Avocado Green Bowl',
      category: 'Healthy Bowls',
      price: 10.50,
      rating: 4.7,
      reviews: 86,
      prepTime: '8-12 mins',
      calories: '310 kcal',
      image: miniSaladImg,
      badge: 'Fresh',
      bgClass: 'bg-emerald-50'
    },
    {
      id: 5,
      name: 'Smokey BBQ Beef Burger',
      category: 'Burgers',
      price: 9.75,
      rating: 4.8,
      reviews: 175,
      prepTime: '12-16 mins',
      calories: '680 kcal',
      image: miniBurgerImg,
      badge: 'Chef Special',
      bgClass: 'bg-[#ffedd5]'
    },
    {
      id: 6,
      name: 'Triple Chocolate Fudge Cake',
      category: 'Desserts',
      price: 6.25,
      rating: 5.0,
      reviews: 320,
      prepTime: '5-8 mins',
      calories: '410 kcal',
      image: miniCakeImg,
      badge: 'Top Rated',
      bgClass: 'bg-[#fce7f3]'
    }
  ];

  const categories = ['All', 'Healthy Bowls', 'Burgers', 'Desserts'];

  const filteredItems = menuItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddToCart = (itemName) => {
    setCartCount(prev => prev + 1);
    setToastMessage(`Added ${itemName} to your cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-[#18181b] flex flex-col justify-between">
      
      {/* Top Banner Header */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-12">
        <Navbar cartCount={cartCount} />

        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-emerald-500 animate-bounce">
            <Check className="w-5 h-5 text-emerald-400 stroke-[3]" />
            <span className="text-sm font-bold">{toastMessage}</span>
          </div>
        )}

        <div className="max-w-4xl mx-auto text-center pt-6 space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            Explore Flavors
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Gourmet Food Menu
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Choose from a wide variety of fresh healthy bowls, juicy gourmet burgers, and artisan desserts prepared live by our master chefs.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto pt-3">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
              <input 
                type="text" 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search food items (e.g. Salad, Burger, Cake)..."
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
                className={`px-5 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  activeCategory === cat
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
        {filteredItems.length === 0 ? (
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div 
                key={item.id}
                className="bg-white rounded-3xl p-5 shadow-lg border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  {/* Top Badge & Prep Time */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-[11px] font-extrabold">
                      {item.badge}
                    </span>
                    <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                      <Clock className="w-3.5 h-3.5 text-amber-500" />
                      <span>{item.prepTime}</span>
                    </div>
                  </div>

                  {/* Food Image Container */}
                  <div className={`relative w-full h-48 ${item.bgClass} rounded-2xl flex items-center justify-center p-4 mb-4 overflow-hidden`}>
                    <img 
                      src={item.image} 
                      alt={item.name}
                      className="w-40 h-40 object-contain drop-shadow-xl transform group-hover:scale-110 transition-transform duration-500" 
                    />
                  </div>

                  {/* Title & Ratings */}
                  <h3 className="font-bold text-lg text-slate-900 group-hover:text-emerald-600 transition-colors mb-1">
                    {item.name}
                  </h3>
                  
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
                    <span className="text-xl font-extrabold text-slate-900">${item.price.toFixed(2)}</span>
                  </div>

                  <button 
                    onClick={() => handleAddToCart(item.name)}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all transform hover:scale-105 active:scale-95 cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
                    <span>Add to Cart</span>
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
