import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function CategoryCarousel({ 
  foodCategories, 
  selectedIndex, 
  onSelectCategory, 
  onPrev, 
  onNext 
}) {
  return (
    <div className="pt-3 sm:pt-6 flex items-center gap-2 sm:gap-3 w-full">
      {/* Left Arrow Button */}
      <button 
        onClick={onPrev}
        aria-label="Previous Category"
        className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 shadow-sm flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95"
      >
        <ChevronLeft className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2]" />
      </button>

      {/* Touch-optimized Momentum Category Cards */}
      <div className="flex items-center gap-2.5 sm:gap-4 overflow-x-auto py-2 px-0.5 no-scrollbar snap-x touch-pan-x w-full">
        {foodCategories.map((item, index) => {
          const isSelected = selectedIndex === index;
          return (
            <div
              key={item.id}
              onClick={() => onSelectCategory(index)}
              className={`snap-center cursor-pointer min-w-[95px] sm:min-w-[115px] p-2.5 sm:p-3 rounded-2xl sm:rounded-full flex flex-col items-center justify-center transition-all duration-300 transform select-none ${
                item.bgTint
              } ${
                isSelected 
                  ? `${item.activeColor} scale-105 shadow-md` 
                  : 'opacity-70 hover:opacity-100 hover:scale-100'
              }`}
            >
              {/* Food Thumbnail */}
              <div className="relative w-10 sm:w-12 h-10 sm:h-12 mb-1.5 sm:mb-2 flex items-center justify-center">
                <img 
                  src={item.image} 
                  alt={item.name}
                  loading="eager"
                  className="w-full h-full object-contain drop-shadow-md transform transition-transform duration-300 hover:rotate-6 hardware-accel"
                />
              </div>

              {/* Label & Price */}
              <span className="font-bold text-xs sm:text-sm text-slate-800 tracking-tight">
                {item.name}
              </span>
              <span className={`text-[10px] sm:text-[11px] font-extrabold mt-0.5 ${item.tagColor}`}>
                ₹ {item.unitPrice.toFixed(2)}
              </span>
            </div>
          );
        })}
      </div>

      {/* Right Arrow Button */}
      <button 
        onClick={onNext}
        aria-label="Next Category"
        className="w-8 sm:w-9 h-8 sm:h-9 rounded-full bg-white border border-slate-200 text-slate-600 hover:text-slate-900 hover:border-slate-400 shadow-sm flex items-center justify-center transition-all duration-200 flex-shrink-0 cursor-pointer active:scale-95"
      >
        <ChevronRight className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2]" />
      </button>
    </div>
  );
}
