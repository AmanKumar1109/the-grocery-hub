import React, { useRef } from 'react';
import { Camera, User, Mail, Phone, Calendar, ShieldCheck, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function Profile() {
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.form-group', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, { scope: containerRef });

  return (
    <div ref={containerRef} className="pb-24 md:pb-8 max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8 px-2 sm:px-0 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 font-medium mt-1">Update your personal information</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* Profile Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-10 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-slate-100 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
              <span className="text-4xl sm:text-5xl font-black text-emerald-600">A</span>
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-slate-900">Aman Kumar</h2>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-emerald-600 font-bold mt-1">
              <ShieldCheck className="w-4 h-4" /> Verified User
            </div>
          </div>
        </div>

        {/* Profile Form */}
        <form className="space-y-6 relative z-10" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group space-y-1.5">
              <label className="text-sm font-bold text-slate-700 pl-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input type="text" defaultValue="Aman Kumar" className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900" />
              </div>
            </div>

            <div className="form-group space-y-1.5">
              <label className="text-sm font-bold text-slate-700 pl-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input type="tel" defaultValue="+91 9876543210" className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900" />
              </div>
            </div>

            <div className="form-group space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input type="email" defaultValue="aman.kumar@example.com" className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900" />
              </div>
            </div>
            
            <div className="form-group space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Date of Birth</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-5 h-5" />
                </div>
                <input type="date" defaultValue="1995-10-11" className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900" />
              </div>
            </div>
          </div>

          <div className="form-group pt-6 flex items-center justify-end">
            <button className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0">
              <Check className="w-5 h-5 stroke-[3]" /> Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
