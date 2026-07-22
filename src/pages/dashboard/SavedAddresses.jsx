import React, { useRef } from 'react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Navigation } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

const mockAddresses = [
  { id: 1, type: 'Home', isDefault: true, name: 'Aman Kumar', phone: '+91 9876543210', address: 'Block C, Sector 12, Noida, Uttar Pradesh, 201301', icon: Home },
  { id: 2, type: 'Office', isDefault: false, name: 'Aman Kumar', phone: '+91 9876543210', address: 'Tech Park, Tower B, Electronic City, Bengaluru, 560100', icon: Briefcase }
];

export default function SavedAddresses() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.address-card', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Saved Addresses</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your delivery locations</p>
        </div>
        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95">
          <Plus className="w-5 h-5 stroke-[3]" /> Add New Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div className="address-card flex items-center justify-center h-full min-h-[220px] bg-emerald-50/50 hover:bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-3xl cursor-pointer transition-colors group">
          <div className="text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Navigation className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="font-extrabold text-emerald-700">Use Current Location</p>
          </div>
        </div>

        {mockAddresses.map((addr) => {
          const Icon = addr.icon;
          return (
            <div key={addr.id} className="address-card bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
              {addr.isDefault && (
                <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-extrabold rounded-bl-xl uppercase tracking-wider">
                  Default
                </div>
              )}
              <div className="flex items-start gap-4 mb-4">
                <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 stroke-[2]" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-extrabold text-slate-900">{addr.type}</h3>
                  <p className="text-sm font-bold text-slate-700 mt-1">{addr.name} • {addr.phone}</p>
                </div>
              </div>
              <p className="text-sm font-medium text-slate-500 leading-relaxed mb-6">{addr.address}</p>
              
              <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl transition-colors">
                  <Edit2 className="w-4 h-4 stroke-[2]" /> Edit
                </button>
                <button className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-red-50 hover:bg-red-100 text-red-500 font-bold text-sm rounded-xl transition-colors">
                  <Trash2 className="w-4 h-4 stroke-[2]" /> Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
