import React from 'react';
import { Star, Clock } from 'lucide-react';

export default function DishBadgeCard({ categoryName, rating, prepTime }) {
  return (
    <div className="gsap-badge-card absolute -bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 sm:translate-x-0 sm:left-0 lg:-left-14 xl:-left-24 z-30 w-[200px] sm:w-[230px] bg-gradient-to-br from-[#ea580c] to-[#d97706] rounded-2xl p-3.5 sm:p-4 shadow-2xl border border-amber-400/30 transform transition-transform duration-300 hover:scale-105">
      {/* Category Title & Star Rating */}
      <div className="flex items-center justify-between text-white font-bold mb-2.5 px-1">
        <span className="text-base sm:text-lg tracking-wide">
          {categoryName}
        </span>
        <div className="flex items-center gap-1 text-xs sm:text-sm bg-black/20 px-2.5 py-0.5 rounded-full backdrop-blur-sm">
          <Star className="w-3.5 h-3.5 fill-amber-300 text-amber-300" />
          <span>{rating}</span>
        </div>
      </div>

      {/* Delivery Time Black Pill */}
      <div className="bg-black/90 text-white text-xs font-semibold px-3 py-2 rounded-full flex items-center justify-center gap-2 shadow-inner">
        <Clock className="w-3.5 h-3.5 text-amber-400" />
        <span>{prepTime}</span>
      </div>
    </div>
  );
}
