import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { Truck, ShieldCheck, Award, Smartphone, Clock, Star, Users, ArrowRight } from 'lucide-react';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';

export default function ServicesPage() {
  const [cartCount] = useState(2);

  const services = [
    {
      id: 'delivery',
      icon: Truck,
      title: 'Ultra-Fast 10-18 Min Delivery',
      description: 'Our fleet of dedicated food delivery partners use thermal insulated containers to deliver your meals piping hot and fresh.',
      color: 'bg-emerald-500',
      tint: 'bg-emerald-50 text-emerald-900'
    },
    {
      icon: ShieldCheck,
      title: '100% Organic & Farm Fresh',
      description: 'We source crisp greens, ripe tomatoes, and natural organic produce directly from sustainable local farms every single morning.',
      color: 'bg-amber-500',
      tint: 'bg-amber-50 text-amber-900'
    },
    {
      icon: Award,
      title: 'Master Culinary Chefs',
      description: 'Our Michelin-trained chefs carefully craft each salad bowl, burger patty, and dessert to perfection using signature gourmet recipes.',
      color: 'bg-purple-500',
      tint: 'bg-purple-50 text-purple-900'
    },
    {
      icon: Smartphone,
      title: 'Live GPS Order Tracking',
      description: 'Track your food order in real-time from the moment our chefs fire up the kitchen until the driver rings your doorbell.',
      color: 'bg-blue-500',
      tint: 'bg-blue-50 text-blue-900'
    }
  ];

  const stats = [
    { label: 'Happy Foodies Served', value: '50,000+', icon: Users },
    { label: 'Average Rating', value: '4.9 ★', icon: Star },
    { label: 'Avg Delivery Speed', value: '14 Mins', icon: Clock },
    { label: 'Fresh Guarantee', value: '100%', icon: ShieldCheck }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-[#18181b] flex flex-col justify-between">
      
      {/* Top Banner Header */}
      <div className="bg-white border-b border-slate-200/80 px-4 sm:px-8 md:px-12 lg:px-16 pt-4 pb-12">
        <Navbar cartCount={cartCount} />

        <div className="max-w-4xl mx-auto text-center pt-6 space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            Why Choose foco
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Premium Food Services
          </h1>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            We redefine food delivery by combining ultra-fast 10-18 minute delivery speeds with gourmet restaurant-quality cooking.
          </p>
        </div>
      </div>

      {/* Services Grid */}
      <main className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16 flex-1 w-full space-y-20">
        
        {/* 4 Pillars Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="bg-white rounded-3xl p-6 shadow-md border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
              >
                <div>
                  <div className={`w-14 h-14 rounded-2xl ${item.tint} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                    <Icon className="w-7 h-7 stroke-[2.2]" />
                  </div>
                  <h3 className="font-bold text-xl text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Highlight Feature Showcase Banner */}
        <div className="bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Speed & Quality
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Piping Hot & Fresh Meal Delivery in 10-18 Minutes
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                No more waiting an hour for cold takeout! Our high-precision cloud kitchens are strategically located to cook and dispatch your order in record time.
              </p>
              <div className="pt-2">
                <Link 
                  to="/menu"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm shadow-xl transition-all transform hover:scale-105"
                >
                  <span>Explore Menu & Order</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-64 sm:w-80">
                <img 
                  src={mainSaladBowlImg} 
                  alt="Fresh Healthy Bowl" 
                  className="w-full h-auto object-contain drop-shadow-[0_20px_30px_rgba(0,0,0,0.6)] animate-float-slow"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Stats Counter Row */}
        <div className="bg-white rounded-3xl p-8 shadow-md border border-slate-100">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.label} className="p-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {st.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-400">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
