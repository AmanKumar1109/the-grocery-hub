import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from '../components/dashboard/Sidebar';
import BottomNav from '../components/dashboard/BottomNav';

export default function DashboardLayout() {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-slate-50/50 pb-20 md:pb-8 pt-4 md:pt-8 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto relative overflow-x-hidden selection:bg-emerald-500 selection:text-white">
      {/* Premium background decorative elements */}
      <div className="fixed top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-100/50 rounded-full blur-3xl animate-float-slow pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-orange-100/50 rounded-full blur-3xl animate-float-medium pointer-events-none z-0"></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-start">
        <Sidebar />
        <main className="flex-1 w-full max-w-full md:max-w-[calc(100%-18rem)]">
          <Outlet />
        </main>
      </div>
      <BottomNav />
    </div>
  );
}
