import React from 'react';
import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, Heart, Send } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#111317] text-white pt-16 pb-8 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-2xl font-extrabold tracking-tight text-white">
                the <span className="text-[#10b981] font-black">Grocery</span> hub
              </span>
              <span className="w-2.5 h-2.5 bg-[#ea580c] rounded-full" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
              Delivering hot, fresh, gourmet meals and organic groceries right to your doorstep in 10 to 18 minutes.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <div className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#10b981] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Phone className="w-4 h-4" />
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#10b981] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <Mail className="w-4 h-4" />
              </div>
              <div className="w-9 h-9 rounded-full bg-slate-800/80 hover:bg-[#10b981] text-slate-300 hover:text-white flex items-center justify-center transition-all cursor-pointer">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li>
                <a href="#home" className="hover:text-[#10b981] transition-colors">Home</a>
              </li>
              <li>
                <a href="#menu" className="hover:text-[#10b981] transition-colors">Food Menu</a>
              </li>
              <li>
                <a href="#service" className="hover:text-[#10b981] transition-colors">Our Services</a>
              </li>
              <li>
                <Link to="/explore" className="hover:text-[#10b981] transition-colors">800+ Catalog</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Categories */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">Popular Categories</h4>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link to="/explore" className="hover:text-[#10b981] transition-colors">Healthy Salad Bowls</Link></li>
              <li><Link to="/explore" className="hover:text-[#10b981] transition-colors">Veg Gourmet Burgers</Link></li>
              <li><Link to="/explore" className="hover:text-[#10b981] transition-colors">Fresh Pastas & Pizza</Link></li>
              <li><Link to="/explore" className="hover:text-[#10b981] transition-colors">Sweet Desserts & Cakes</Link></li>
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div className="space-y-3">
            <h4 className="text-base font-bold text-white tracking-wide">Join Our Newsletter</h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Subscribe to get 20% off your first order & exclusive promo codes!
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center gap-2 pt-1">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="w-full px-3.5 py-2 rounded-full bg-slate-800 border border-slate-700 text-white text-xs focus:outline-none focus:border-[#10b981]"
              />
              <button 
                type="submit"
                aria-label="Subscribe"
                className="w-8 h-8 rounded-full bg-[#10b981] hover:bg-[#059669] text-white flex items-center justify-center flex-shrink-0 transition-colors shadow-md cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} The Grocery Hub Inc. All rights reserved.</p>
          <div className="flex items-center gap-1">
            <span>Crafted with</span>
            <Heart className="w-3.5 h-3.5 text-emerald-500 fill-emerald-500" />
            <span>for food lovers.</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
