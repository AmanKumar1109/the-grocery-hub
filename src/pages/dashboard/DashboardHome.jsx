import React, { useRef } from 'react';
import { Package, Heart, Star, ChevronRight, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function DashboardHome() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.stagger-item', {
      y: 30,
      opacity: 0,
      duration: 0.8,
      stagger: 0.1,
      ease: 'power3.out',
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pb-24 md:pb-8">
      {/* Welcome Card */}
      <div className="stagger-item bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-3xl p-6 sm:p-8 text-white shadow-[0_20px_40px_-15px_rgba(16,185,129,0.5)] relative overflow-hidden mb-6 sm:mb-8">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-black mb-1">Hello, Aman! 👋</h2>
            <p className="text-emerald-50 font-medium">Welcome back to The Grocery Hub.</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {/* Wishlist Items */}
        <Link to="/dashboard/wishlist" className="stagger-item bg-white/80 backdrop-blur-xl border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow group block">
          <div className="w-10 h-10 rounded-xl bg-pink-50 text-pink-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
            <Heart className="w-5 h-5 fill-pink-500 stroke-pink-500" />
          </div>
          <p className="text-sm font-bold text-slate-500">Wishlist Items</p>
          <h3 className="text-2xl font-black text-slate-900">12</h3>
        </Link>
        {/* Total Orders */}
        <div className="stagger-item bg-white/80 backdrop-blur-xl border border-slate-100 p-5 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
          <div className="w-10 h-10 rounded-xl bg-orange-50 text-orange-600 flex items-center justify-center mb-4">
            <Package className="w-5 h-5" />
          </div>
          <p className="text-sm font-bold text-slate-500">Total Orders</p>
          <h3 className="text-2xl font-black text-slate-900">42</h3>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="stagger-item">
        <div className="flex items-center justify-between mb-4 px-2">
          <h3 className="text-lg font-extrabold text-slate-900">Active Orders</h3>
          <Link to="/dashboard/orders" className="text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        
        {/* Active Order Card */}
        <div className="bg-white/90 backdrop-blur-xl border border-slate-200/60 p-5 rounded-3xl shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-extrabold rounded-full">Arriving Today</span>
              <span className="text-xs font-bold text-slate-400">#ORD-84321</span>
            </div>
            <span className="text-sm font-black text-slate-900">₹450.00</span>
          </div>
          
          <div className="flex items-center gap-4 mb-5">
            <div className="w-16 h-16 rounded-2xl bg-slate-100 flex items-center justify-center overflow-hidden border border-slate-200/50">
              {/* Placeholder image */}
              <img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=150" alt="Groceries" className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <h4 className="font-bold text-slate-800">Fresh Vegetables & Fruits</h4>
              <p className="text-xs font-medium text-slate-500 mt-0.5">5 items • Paid via UPI</p>
            </div>
          </div>
          
          <Link 
            to="/dashboard/track-order/ORD-84321"
            className="w-full flex items-center justify-center gap-2 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-colors"
          >
            <Clock className="w-4 h-4" />
            Track Order
          </Link>
        </div>
      </div>
    </div>
  );
}
