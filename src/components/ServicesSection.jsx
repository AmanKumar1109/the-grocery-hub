import React, { useEffect, useRef } from 'react';
import { Truck, ShieldCheck, Award, Smartphone, Clock, Star, Users, ArrowRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';

gsap.registerPlugin(ScrollTrigger);

export default function ServicesSection() {
  const sectionRef = useRef(null);

  const services = [
    {
      icon: Truck,
      title: 'Ultra-Fast 10-18 Min Delivery',
      description: 'Dedicated food delivery fleet using insulated thermal containers to deliver meals piping hot.',
      tint: 'bg-emerald-50 text-emerald-900'
    },
    {
      icon: ShieldCheck,
      title: '100% Organic & Farm Fresh',
      description: 'Pure, organic, farm-fresh produce sourced daily from sustainable local farmers.',
      tint: 'bg-amber-50 text-amber-900'
    },
    {
      icon: Award,
      title: 'Master Culinary Chefs',
      description: 'Hand-crafted gourmet recipes prepared by top chefs with passion and attention to detail.',
      tint: 'bg-purple-50 text-purple-900'
    },
    {
      icon: Smartphone,
      title: 'Live GPS Order Tracking',
      description: 'Track your order live on the map from kitchen preparation all the way to your doorstep.',
      tint: 'bg-blue-50 text-blue-900'
    }
  ];

  const stats = [
    { label: 'Happy Foodies Served', value: '50,000+', icon: Users },
    { label: 'Average Rating', value: '4.9 ★', icon: Star },
    { label: 'Avg Delivery Speed', value: '14 Mins', icon: Clock },
    { label: 'Fresh Guarantee', value: '100%', icon: ShieldCheck }
  ];

  // GSAP ScrollTrigger Animations with clearProps and refresh
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header Animation
      gsap.fromTo('.gsap-service-header',
        { opacity: 0, y: 35 },
        {
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );

      // Service Cards Stagger
      gsap.fromTo('.gsap-service-card',
        { opacity: 0, y: 40 },
        {
          scrollTrigger: {
            trigger: '.gsap-service-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.1,
          ease: 'power3.out',
          clearProps: 'all'
        }
      );

      // Speed Banner Zoom Entrance
      gsap.fromTo('.gsap-speed-banner',
        { opacity: 0, scale: 0.9 },
        {
          scrollTrigger: {
            trigger: '.gsap-speed-banner',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: 'back.out(1.3)',
          clearProps: 'all'
        }
      );

      // Stats Counter Stagger
      gsap.fromTo('.gsap-stat-item',
        { opacity: 0, y: 25 },
        {
          scrollTrigger: {
            trigger: '.gsap-stat-grid',
            start: 'top 85%',
            toggleActions: 'play none none none'
          },
          opacity: 1,
          y: 0,
          duration: 0.5,
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
    <section id="service" ref={sectionRef} className="py-16 sm:py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 space-y-16">
        
        {/* Header */}
        <div className="gsap-service-header max-w-3xl mx-auto text-center space-y-4">
          <span className="px-4 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-extrabold uppercase tracking-wider">
            Why Choose The Grocery Hub
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-900">
            Our Premium Food Services
          </h2>
          <p className="text-slate-500 text-sm sm:text-base max-w-xl mx-auto">
            Combining lightning-fast 10-18 minute delivery speeds with master chef culinary perfection.
          </p>
        </div>

        {/* 4 Pillars Grid */}
        <div className="gsap-service-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((item) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.title}
                className="gsap-service-card bg-slate-50 rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1.5 flex flex-col justify-between group"
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
        <div className="gsap-speed-banner bg-slate-900 rounded-3xl p-8 sm:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            <div className="lg:col-span-7 space-y-5">
              <span className="px-3.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider border border-emerald-500/30">
                Speed & Quality
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold leading-tight">
                Piping Hot & Fresh Meal Delivery in 10-18 Minutes
              </h3>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-lg">
                No more waiting an hour for cold takeout! Our high-precision cloud kitchens cook and dispatch your order in record time.
              </p>
              <div className="pt-2">
                <a 
                  href="#menu"
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm shadow-xl transition-all transform hover:scale-105"
                >
                  <span>Explore Menu & Order</span>
                  <ArrowRight className="w-4 h-4" />
                </a>
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
        <div className="gsap-stat-grid bg-slate-50 rounded-3xl p-8 shadow-sm border border-slate-200/80">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {stats.map((st) => {
              const Icon = st.icon;
              return (
                <div key={st.label} className="gsap-stat-item p-4 space-y-2">
                  <div className="w-10 h-10 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
                    {st.value}
                  </div>
                  <div className="text-xs sm:text-sm font-semibold text-slate-500">
                    {st.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
