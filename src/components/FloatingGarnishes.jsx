import React from 'react';
import cherryTomatoImg from '../assets/cherry_tomato_slice.png';
import redChiliImg from '../assets/red_chili_pepper.png';
import parsleyLeafImg from '../assets/parsley_leaf.png';

export default function FloatingGarnishes() {
  return (
    <>
      {/* Top Right Floating Cherry Tomato */}
      <img 
        src={cherryTomatoImg} 
        alt="Cherry Tomato Garnish"
        className="gsap-garnish absolute top-6 right-8 sm:right-12 w-10 sm:w-14 h-auto drop-shadow-xl z-20 animate-float-medium pointer-events-none" 
      />

      {/* Mid Right Floating Parsley Leaf */}
      <img 
        src={parsleyLeafImg} 
        alt="Parsley Leaf Garnish"
        className="gsap-garnish absolute top-1/2 right-4 sm:right-8 w-9 sm:w-12 h-auto drop-shadow-lg z-20 animate-float-slow pointer-events-none" 
      />

      {/* Bottom Right Floating Red Chili Pepper */}
      <img 
        src={redChiliImg} 
        alt="Red Chili Pepper Garnish"
        className="gsap-garnish absolute bottom-14 right-8 sm:right-14 w-12 sm:w-18 h-auto drop-shadow-2xl z-20 animate-float-reverse pointer-events-none" 
      />

      {/* Tiny Floating Leaf Left */}
      <div className="gsap-garnish absolute top-1/3 left-6 w-3 h-3 bg-emerald-500/90 rounded-full blur-[0.5px] rotate-45 animate-float-slow pointer-events-none" />
    </>
  );
}
