import React from 'react';
import HeroSection from '../components/HeroSection';
import MenuSection from '../components/MenuSection';
import ServicesSection from '../components/ServicesSection';
import Footer from '../components/Footer';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white text-[#18181b] selection:bg-emerald-500 selection:text-white flex flex-col justify-between scroll-smooth">
      
      {/* 1. Hero Section (#home) */}
      <div id="home">
        <HeroSection />
      </div>

      {/* 2. Menu Section (#menu) - Triggers GSAP ScrollTrigger on scroll */}
      <MenuSection />

      {/* 3. Services Section (#service) - Triggers GSAP ScrollTrigger on scroll */}
      <ServicesSection />

      {/* 4. Footer */}
      <Footer />
    </div>
  );
}
