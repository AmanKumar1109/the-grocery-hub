import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, ShoppingBag, Check, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';
import miniCakeImg from '../assets/mini_cake.png';
import miniSaladImg from '../assets/mini_salad.png';

gsap.registerPlugin(ScrollTrigger);

export default function MenuSection() {
  const sectionRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [cartCount, setCartCount] = useState(2);
  const [toastMessage, setToastMessage] = useState('');

  // Exactly 8 items (4 rows x 2 columns = 8 items) - 100% Indian friendly (Zero Beef)
  const menuItems = [
    {
      id: 1,
      name: 'Paneer Tikka Bowl',
      category: 'Healthy Bowls',
      price: 12.15,
      rating: 4.9,
      reviews: 242,
      prepTime: '10-15m',
      calories: '340 kcal',
      image: mainSaladBowlImg,
      badge: 'Bestseller',
      bgClass: 'bg-emerald-50'
    },
    {
      id: 2,
      name: 'Crispy Veg Burger',
      category: 'Burgers',
      price: 7.99,
      rating: 4.8,
      reviews: 310,
      prepTime: '10-15m',
      calories: '490 kcal',
      image: miniBurgerImg,
      badge: 'Popular',
      bgClass: 'bg-amber-50'
    },
    {
      id: 3,
      name: 'Pink Donut Cake',
      category: 'Desserts',
      price: 5.50,
      rating: 4.9,
      reviews: 198,
      prepTime: '5-10m',
      calories: '280 kcal',
      image: miniCakeImg,
      badge: 'Sweet Hit',
      bgClass: 'bg-pink-50'
    },
    {
      id: 4,
      name: 'Avocado Green Salad',
      category: 'Healthy Bowls',
      price: 10.50,
      rating: 4.7,
      reviews: 146,
      prepTime: '8-12m',
      calories: '310 kcal',
      image: miniSaladImg,
      badge: 'Fresh',
      bgClass: 'bg-emerald-50'
    },
    {
      id: 5,
      name: 'Tandoori Paneer Burger',
      category: 'Burgers',
      price: 8.75,
      rating: 4.9,
      reviews: 275,
      prepTime: '12-16m',
      calories: '520 kcal',
      image: miniBurgerImg,
      badge: 'Chef Special',
      bgClass: 'bg-[#ffedd5]'
    },
    {
      id: 6,
      name: 'Triple Fudge Cake',
      category: 'Desserts',
      price: 6.25,
      rating: 5.0,
      reviews: 420,
      prepTime: '5-8m',
      calories: '410 kcal',
      image: miniCakeImg,
      badge: 'Top Rated',
      bgClass: 'bg-[#fce7f3]'
    },
    {
      id: 7,
      name: 'Mushroom Tikka Bowl',
      category: 'Healthy Bowls',
      price: 11.50,
      rating: 4.8,
      reviews: 185,
      prepTime: '12-15m',
      calories: '320 kcal',
      image: mainSaladBowlImg,
      badge: 'Healthy',
      bgClass: 'bg-emerald-50'
    },
    {
      id: 8,
      name: 'Spicy Veg Zinger Burger',
      category: 'Burgers',
      price: 8.25,
      rating: 4.7,
      reviews: 190,
      prepTime: '10-14m',
      calories: '470 kcal',
      image: miniBurgerImg,
      badge: 'Hot & Spicy',
      bgClass: 'bg-amber-50'
    }
  ];

  const categories = ['All', 'Healthy Bowls', 'Burgers', 'Desserts'];

  const filteredItems = menuItems.filter(item => {
    return activeCategory === 'All' || item.category === activeCategory;
  });

  const handleAddToCart = (itemName) => {
    setCartCount(prev => prev + 1);
    setToastMessage(`Added ${itemName} to cart!`);
    setTimeout(() => setToastMessage(''), 2500);
  };

  // GSAP ScrollTrigger
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.gsap-menu-header',
        { opacity: 0, y: 30 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );

      gsap.fromTo('.gsap-menu-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.gsap-menu-grid',
            start: 'top 85%',
          },
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.08,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );
    }, sectionRef);

    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 200);

    return () => {
      ctx.revert();
      clearTimeout(timer);
    };
  }, []);

  return (
    <section id="menu" ref={sectionRef} className="py-12 sm:py-20 bg-slate-50 border-t border-slate-200/80">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-2xl shadow-2xl flex items-center gap-2 border border-emerald-500 animate-bounce">
          <Check className="w-4 h-4 text-emerald-400 stroke-[3]" />
          <span className="text-xs sm:text-sm font-bold">{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-3 sm:px-8 lg:px-12">
        
        {/* Section Header with Side "Explore More" Button */}
        <div className="gsap-menu-header flex items-center justify-between gap-4 mb-6 sm:mb-10">
          <div className="space-y-1">
            <span className="px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] sm:text-xs font-extrabold uppercase tracking-wider">
              Featured Menu
            </span>
            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
              Popular Dishes
            </h2>
          </div>

          {/* Side "Explore More" Button */}
          <Link 
            to="/explore"
            className="flex items-center gap-1.5 sm:gap-2 px-3.5 sm:px-6 py-2 sm:py-3 rounded-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer flex-shrink-0"
          >
            <span>Explore More</span>
            <ArrowRight className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[2.5]" />
          </Link>
        </div>

        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-4 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer flex-shrink-0 ${
                activeCategory === cat
                  ? 'bg-slate-900 text-white shadow-md scale-105'
                  : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* 2-Column Grid (Fits 2 items per row, 4 rows total = 8 cards) */}
        <div className="gsap-menu-grid grid grid-cols-2 gap-3 sm:gap-6 lg:gap-8">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="gsap-menu-card bg-white rounded-2xl sm:rounded-3xl p-3 sm:p-5 shadow-sm border border-slate-100 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 flex flex-col justify-between group"
            >
              <div>
                {/* Badge & Prep time */}
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-amber-100 text-amber-900 text-[9px] sm:text-[11px] font-extrabold truncate">
                    {item.badge}
                  </span>
                  <div className="flex items-center gap-1 text-[10px] sm:text-xs text-slate-500 font-medium">
                    <Clock className="w-3 h-3 text-amber-500" />
                    <span>{item.prepTime}</span>
                  </div>
                </div>

                {/* Food Image */}
                <div className={`relative w-full h-28 sm:h-44 ${item.bgClass} rounded-xl sm:rounded-2xl flex items-center justify-center p-2 sm:p-4 mb-2.5 sm:mb-4 overflow-hidden`}>
                  <img 
                    src={item.image} 
                    alt={item.name}
                    loading="lazy"
                    className="w-24 sm:w-36 h-24 sm:h-36 object-contain drop-shadow-lg transform group-hover:scale-110 transition-transform duration-500 hardware-accel" 
                  />
                </div>

                {/* Name */}
                <h3 className="font-bold text-xs sm:text-lg text-slate-900 group-hover:text-emerald-600 transition-colors mb-1 truncate">
                  {item.name}
                </h3>
                
                {/* Rating */}
                <div className="flex items-center gap-1.5 text-[10px] sm:text-xs text-slate-500 mb-3">
                  <div className="flex items-center gap-0.5 bg-amber-50 px-1.5 sm:px-2 py-0.5 rounded-full border border-amber-200">
                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                    <span className="font-extrabold text-amber-900">{item.rating}</span>
                  </div>
                  <span className="hidden sm:inline">•</span>
                  <span className="hidden sm:inline">{item.calories}</span>
                </div>
              </div>

              {/* Price & Add button */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100">
                <div>
                  <span className="text-[9px] sm:text-xs text-slate-400 block font-medium">Price</span>
                  <span className="text-sm sm:text-xl font-extrabold text-slate-900">${item.price.toFixed(2)}</span>
                </div>

                <button 
                  onClick={() => handleAddToCart(item.name)}
                  className="flex items-center gap-1 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-[10px] sm:text-xs shadow-md transition-all active:scale-95 cursor-pointer"
                >
                  <ShoppingBag className="w-3 sm:w-4 h-3 sm:h-4 stroke-[2.2]" />
                  <span className="hidden min-[380px]:inline">Add</span>
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA to Explore All Catalog */}
        <div className="pt-8 text-center">
          <Link 
            to="/explore"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-3.5 rounded-full bg-slate-900 hover:bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Explore All 800+ Food Items</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </Link>
        </div>

      </div>
    </section>
  );
}
