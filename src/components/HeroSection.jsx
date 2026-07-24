import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';

import Navbar from './Navbar';
import CategoryCarousel from './CategoryCarousel';
import FloatingGarnishes from './FloatingGarnishes';
import DishBadgeCard from './DishBadgeCard';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';
import miniCakeImg from '../assets/mini_cake.png';
import miniSaladImg from '../assets/mini_salad.png';
import darkSlateTextureImg from '../assets/dark_slate_texture.png';

export default function HeroSection() {
  const containerRef = useRef(null);

  const foodCategories = [
    {
      id: 'burger',
      name: 'Burger',
      unitPrice: 3.25,
      image: miniBurgerImg,
      bgTint: 'bg-[#dcfce7]',
      borderColor: 'border-emerald-300',
      activeColor: 'ring-2 ring-emerald-500 shadow-lg shadow-emerald-100',
      tagColor: 'text-emerald-700',
      prepTime: '8-15 mins',
      rating: 4.8
    },
    {
      id: 'cake',
      name: 'Cake',
      unitPrice: 2.25,
      image: miniCakeImg,
      bgTint: 'bg-[#fce7f3]',
      borderColor: 'border-pink-300',
      activeColor: 'ring-2 ring-pink-500 shadow-lg shadow-pink-100',
      tagColor: 'text-pink-700',
      prepTime: '5-10 mins',
      rating: 4.9
    },
    {
      id: 'salad',
      name: 'Salad',
      unitPrice: 5.25,
      image: miniSaladImg,
      bgTint: 'bg-[#ffedd5]',
      borderColor: 'border-amber-300',
      activeColor: 'ring-2 ring-amber-500 shadow-lg shadow-amber-100',
      tagColor: 'text-amber-700',
      prepTime: '10-18 mins',
      rating: 4.7
    }
  ];

  const [selectedCategoryIndex, setSelectedCategoryIndex] = useState(2);
  const [quantity, setQuantity] = useState(2);
  const [cartCount, setCartCount] = useState(2);

  const activeCategory = foodCategories[selectedCategoryIndex];
  const totalOrderPrice = (12.15 * quantity).toFixed(2);

  const handlePrevCategory = () => {
    setSelectedCategoryIndex((prev) => (prev === 0 ? foodCategories.length - 1 : prev - 1));
  };

  const handleNextCategory = () => {
    setSelectedCategoryIndex((prev) => (prev === foodCategories.length - 1 ? 0 : prev + 1));
  };

  const handleIncrement = () => setQuantity((q) => q + 1);
  const handleDecrement = () => setQuantity((q) => (q > 1 ? q - 1 : 1));

  const handleAddToCart = () => {
    setCartCount((c) => c + quantity);
  };

  // GSAP Staggered Entrance Animations for Mobile and Desktop
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();

      // 1. Staggered Navbar Items
      tl.fromTo(
        '.gsap-nav-item',
        { opacity: 0, y: -20 },
        { opacity: 1, y: 0, duration: 0.5, stagger: 0.06, ease: 'power2.out', clearProps: 'all' }
      );

      // 2. Left Hero Text & Controls
      tl.fromTo(
        '.gsap-hero-left',
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.6, stagger: 0.08, ease: 'power2.out', clearProps: 'all' },
        "-=0.2"
      );

      // 3. Center Main Dish Bowl
      tl.fromTo(
        '.gsap-main-dish',
        { opacity: 0, scale: 0.75, rotate: -8 },
        { opacity: 1, scale: 1, rotate: 0, duration: 0.8, ease: 'back.out(1.4)', clearProps: 'opacity,scale,rotate' },
        "-=0.3"
      );

      // 4. Floating Food Garnishes
      tl.fromTo(
        '.gsap-garnish',
        { opacity: 0, scale: 0 },
        { opacity: 1, scale: 1, duration: 0.5, stagger: 0.08, ease: 'back.out(1.6)', clearProps: 'opacity,scale' },
        "-=0.4"
      );

      // 5. Dish Rating Badge Card
      tl.fromTo(
        '.gsap-badge-card',
        { opacity: 0, y: 20, scale: 0.9 },
        { opacity: 1, y: 0, scale: 1, duration: 0.5, ease: 'back.out(1.3)', clearProps: 'opacity,y,scale' },
        "-=0.2"
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-screen bg-white flex flex-col justify-between overflow-x-hidden">
      
      {/* Curved Right Dark Texture Split Background (Hidden on mobile < lg, visible on desktop) */}
      <div className="hidden lg:block absolute top-0 right-0 bottom-0 w-full lg:w-[48%] h-full pointer-events-none z-0">
        <svg className="w-full h-full preserve-3d" viewBox="0 0 500 700" preserveAspectRatio="none">
          <defs>
            <pattern id="darkTextureHero" patternUnits="userSpaceOnUse" width="500" height="700">
              <image href={darkSlateTextureImg} x="0" y="0" width="500" height="700" preserveAspectRatio="xMidYMid slice" />
              <rect width="500" height="700" fill="black" opacity="0.2" />
            </pattern>
          </defs>
          <path 
            d="M 110,0 C 20,200 60,450 160,700 L 500,700 L 500,0 Z" 
            fill="url(#darkTextureHero)" 
          />
        </svg>
      </div>

      {/* Main Content Area */}
      <div className="relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 py-4 sm:py-6 flex-1 flex flex-col justify-between">
        
        {/* Navigation Bar Header */}
        <Navbar cartCount={cartCount} />

        {/* Hero Section Main Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center my-auto py-2 lg:py-0">
          
          {/* Hero Left Column (Info, Price, CTAs, Categories) */}
          <div className="lg:col-span-7 flex flex-col justify-center space-y-4 sm:space-y-6 pr-0 lg:pr-6">
            
            {/* Title */}
            <div className="gsap-hero-left space-y-1">
              <h1 className="text-3xl sm:text-5xl lg:text-[58px] leading-[1.15] lg:leading-[1.12] tracking-tight text-[#18181b]">
                <span className="font-extrabold block">Order your</span>
                <span className="font-normal text-[#27272a] block">favourite Foods</span>
              </h1>
            </div>

            {/* Description Subtitle */}
            <p className="gsap-hero-left text-slate-400 text-xs sm:text-base leading-relaxed max-w-md font-normal">
              Fresh and tasty seafood curry sit amet, consectetur Curabitur accumsan auctor pulvinar proin <span className="font-bold text-slate-700">sit amet</span>,
            </p>

            {/* Total Price Display */}
            <div className="gsap-hero-left flex items-baseline gap-2 pt-0.5">
              <span className="text-xl sm:text-3xl font-light text-slate-400">
                Total order :
              </span>
              <span className="text-xl sm:text-3xl font-extrabold text-[#18181b] tracking-tight">
                ₹{totalOrderPrice}
              </span>
            </div>

            {/* Quantity Selector & Green Primary CTA Button */}
            <div className="gsap-hero-left flex flex-wrap items-center gap-3 sm:gap-6 pt-1">
              {/* Quantity Counter Pill */}
              <div className="flex items-center gap-3 px-3.5 sm:px-4 py-2 sm:py-2.5 rounded-full border border-rose-100 bg-rose-50/30 text-slate-800 shadow-sm">
                <button 
                  onClick={handleDecrement}
                  aria-label="Decrease quantity"
                  className="text-slate-400 hover:text-slate-900 transition-colors p-0.5"
                >
                  <ChevronDown className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                </button>
                <span className="w-px h-4 bg-slate-200" />
                <span className="font-bold text-sm sm:text-base w-4 text-center select-none text-slate-900">
                  {quantity}
                </span>
                <span className="w-px h-4 bg-slate-200" />
                <button 
                  onClick={handleIncrement}
                  aria-label="Increase quantity"
                  className="text-slate-400 hover:text-slate-900 transition-colors p-0.5"
                >
                  <ChevronUp className="w-3.5 sm:w-4 h-3.5 sm:h-4 stroke-[3]" />
                </button>
              </div>

              {/* Primary Buy Now Button */}
              <button 
                onClick={handleAddToCart}
                className="group flex items-center gap-3 sm:gap-4 pl-2.5 pr-6 sm:pr-8 py-2 sm:py-2.5 rounded-full bg-[#09090b] hover:bg-[#10b981] text-white shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <span className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-[#facc15] group-hover:bg-white text-slate-950 group-hover:text-[#10b981] flex items-center justify-center shadow-md transition-colors duration-300">
                  <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2]" />
                </span>
                <span className="font-bold text-sm sm:text-base tracking-wide">
                  Buy Now
                </span>
              </button>
            </div>

            {/* Food Categories Carousel */}
            <div className="gsap-hero-left">
              <CategoryCarousel 
                foodCategories={foodCategories}
                selectedIndex={selectedCategoryIndex}
                onSelectCategory={setSelectedCategoryIndex}
                onPrev={handlePrevCategory}
                onNext={handleNextCategory}
              />
            </div>

          </div>

          {/* Hero Right Column (Main Bowl & Garnishes) */}
          <div className="lg:col-span-5 relative z-10 min-h-[280px] sm:min-h-[440px] lg:min-h-[520px] flex items-center justify-center mt-4 lg:mt-0 pb-6 lg:pb-0">
            
            {/* Floating Garnishes */}
            <FloatingGarnishes />

            {/* Main Transparent Salad Bowl Centerpiece Image */}
            <div className="gsap-main-dish relative z-10 w-[260px] sm:w-[460px] md:w-[560px] lg:w-[700px] xl:w-[760px] mx-auto lg:mx-0 translate-x-0 lg:-translate-x-28 xl:-translate-x-32 translate-y-0 lg:-translate-y-6 transform transition-transform duration-700 hover:scale-[1.03]">
              <img 
                src={mainSaladBowlImg} 
                alt="Gourmet Healthy Food Bowl" 
                loading="eager"
                className="w-full h-auto object-contain drop-shadow-[0_24px_38px_rgba(0,0,0,0.5)] select-none hardware-accel"
              />
            </div>

            {/* Floating Rating & Prep Time Card Badge */}
            <DishBadgeCard 
              categoryName={activeCategory.name}
              rating={activeCategory.rating}
              prepTime={activeCategory.prepTime}
            />

          </div>

        </div>

        {/* Bottom spacing */}
        <div className="h-2" />

      </div>

    </section>
  );
}
