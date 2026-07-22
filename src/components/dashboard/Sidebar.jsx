import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, ShoppingBag, Heart, MapPin, User, Settings, LogOut } from 'lucide-react';

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard, exact: true },
  { path: '/dashboard/orders', label: 'My Orders', icon: ShoppingBag },
  { path: '/dashboard/wishlist', label: 'Wishlist', icon: Heart },
  { path: '/dashboard/addresses', label: 'Saved Addresses', icon: MapPin },
  { path: '/dashboard/profile', label: 'Profile', icon: User },
  { path: '/dashboard/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar() {
  return (
    <aside className="hidden md:flex flex-col w-64 min-h-[calc(100vh-80px)] bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6 sticky top-10 mr-8 z-20">
      <div className="flex items-center gap-4 mb-10 px-2">
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-emerald-400 to-emerald-600 p-0.5 shadow-md">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-xl font-bold text-emerald-600">A</span>
          </div>
        </div>
        <div>
          <h3 className="font-extrabold text-[#18181b]">Aman Kumar</h3>
          <p className="text-xs font-semibold text-emerald-600">Premium Member</p>
        </div>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            end={item.exact}
            className={({ isActive }) => 
              `flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all duration-300 ${
                isActive 
                  ? 'bg-emerald-50 text-emerald-600 shadow-[inset_0_2px_10px_rgba(16,185,129,0.05)] border border-emerald-100/50' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50 border border-transparent'
              }`
            }
          >
            <item.icon className="w-5 h-5 stroke-[2.2]" />
            {item.label}
          </NavLink>
        ))}
      </nav>

      <div className="pt-6 mt-6 border-t border-slate-100">
        <button className="flex items-center gap-3.5 px-4 py-3.5 rounded-2xl font-bold text-sm text-red-500 hover:bg-red-50 hover:text-red-600 transition-all duration-300 w-full text-left">
          <LogOut className="w-5 h-5 stroke-[2.2]" />
          Logout
        </button>
      </div>
    </aside>
  );
}
