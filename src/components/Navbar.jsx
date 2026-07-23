import React, { useState } from 'react';
import { Search, ShoppingBag, User, LogIn, LogOut, Menu, X, CheckCircle2, ChevronDown } from 'lucide-react';
import CartDrawer from './CartDrawer';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSelector } from 'react-redux';
import { selectTotalCartCount } from '../redux/cartSlice';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  
  const cartCount = useSelector(selectTotalCartCount);
  const navigate = useNavigate();
  const { currentUser, userProfile, logout } = useAuth();

  const scrollToSection = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleLogout = async () => {
    setUserDropdownOpen(false);
    setMobileMenuOpen(false);
    await logout();
    navigate('/');
  };

  const userInitial = userProfile?.fullName?.[0]?.toUpperCase() || currentUser?.email?.[0]?.toUpperCase() || 'U';
  const userName = userProfile?.fullName || currentUser?.displayName || currentUser?.email?.split('@')[0] || 'User';

  return (
    <>
      <header className="relative z-50 pointer-events-auto mb-4 md:mb-8">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          
          {/* Brand Logo: The Grocery Hub */}
          <div 
            onClick={() => {
              navigate('/');
              scrollToSection('home');
            }}
            className="gsap-nav-item flex items-center gap-1.5 cursor-pointer group"
          >
            <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-[#18181b]">
              the <span className="text-[#10b981] font-black">Grocery</span> hub
            </span>
            <span className="w-2 sm:w-2.5 h-2 sm:h-2.5 bg-[#ea580c] rounded-full group-hover:scale-125 transition-transform" />
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-10">
            <button 
              onClick={() => { navigate('/'); scrollToSection('home'); }}
              className="gsap-nav-item text-sm sm:text-base font-bold text-[#18181b] relative cursor-pointer after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-[2.5px] after:bg-[#ea580c] after:rounded-full"
            >
              Home
            </button>
            <button 
              onClick={() => navigate('/menu')}
              className="gsap-nav-item text-sm sm:text-base font-medium text-[#71717a] hover:text-[#18181b] transition-colors cursor-pointer"
            >
              Menu
            </button>
            <button 
              onClick={() => navigate('/explore')}
              className="gsap-nav-item text-sm sm:text-base font-medium text-[#71717a] hover:text-[#18181b] transition-colors cursor-pointer"
            >
              Shop Catalog
            </button>
          </nav>

          {/* Right Header Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search Icon */}
            <button 
              onClick={() => navigate('/menu')}
              aria-label="Search"
              className="gsap-nav-item w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
            >
              <Search className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2]" />
            </button>

            {/* Cart Icon connected to Redux */}
            <button 
              onClick={() => setIsCartOpen(true)}
              aria-label="Cart"
              className="gsap-nav-item relative w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-slate-100/90 hover:bg-slate-200 text-slate-800 flex items-center justify-center transition-all shadow-sm cursor-pointer"
            >
              <ShoppingBag className="w-4 sm:w-5 h-4 sm:h-5 stroke-[2.2]" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#ef4444] text-white text-[11px] font-extrabold rounded-full flex items-center justify-center border-2 border-white shadow-md animate-pulse">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Auth State Handling */}
            {currentUser ? (
              <div className="relative hidden md:block">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-900 font-bold text-sm hover:bg-emerald-100 transition-all cursor-pointer"
                >
                  <div className="w-7 h-7 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center text-xs">
                    {userInitial}
                  </div>
                  <span className="max-w-[100px] truncate">{userName}</span>
                  <ChevronDown className="w-4 h-4 text-emerald-700" />
                </button>

                {/* Dropdown Menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-fadeIn">
                    <div className="px-4 py-2 border-b border-slate-100">
                      <p className="text-xs font-semibold text-slate-400">Signed in as</p>
                      <p className="text-sm font-bold text-slate-800 truncate">{currentUser.email}</p>
                    </div>

                    {!userProfile?.profileCompleted && (
                      <button
                        onClick={() => {
                          setUserDropdownOpen(false);
                          navigate('/complete-profile');
                        }}
                        className="w-full text-left px-4 py-2 text-xs font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 flex items-center gap-2"
                      >
                        <CheckCircle2 className="w-4 h-4 text-amber-600" />
                        <span>Complete Profile</span>
                      </button>
                    )}

                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        navigate('/dashboard');
                      }}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-50 flex items-center gap-2"
                    >
                      <User className="w-4 h-4 text-slate-500" />
                      <span>Dashboard & Profile</span>
                    </button>

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-slate-100"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Logout</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* Desktop Sign Up Button */}
                <button 
                  onClick={() => navigate('/signup')}
                  className="hidden md:flex gsap-nav-item items-center gap-2 px-4 py-2 rounded-full border-2 border-slate-800 text-slate-900 hover:bg-slate-900 hover:text-white font-bold text-sm transition-all duration-200 shadow-sm cursor-pointer bg-white">
                  <User className="w-4 h-4 stroke-[2.5]" />
                  <span>Sign Up</span>
                </button>

                {/* Desktop Login Yellow Button */}
                <button 
                  onClick={() => navigate('/login')}
                  className="hidden md:flex gsap-nav-item items-center gap-2 px-5 py-2 rounded-full bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold text-sm shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 cursor-pointer">
                  <LogIn className="w-4 h-4 stroke-[2.5]" />
                  <span>Login</span>
                </button>
              </>
            )}

            {/* Mobile Menu Hamburger Button */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
              className="md:hidden w-9 h-9 rounded-full bg-slate-200 hover:bg-slate-300 text-slate-900 flex items-center justify-center ml-0.5 cursor-pointer shadow-sm active:scale-95 transition-all"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Navigation Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-3 p-5 bg-white/95 backdrop-blur-md rounded-3xl shadow-2xl border border-slate-100 flex flex-col gap-3 z-50 animate-fadeIn">
            <button 
              onClick={() => { navigate('/'); scrollToSection('home'); }}
              className="text-left text-slate-900 font-bold text-base py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Home
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/menu'); }}
              className="text-left text-slate-600 font-semibold text-base py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Menu
            </button>
            <button 
              onClick={() => { setMobileMenuOpen(false); navigate('/explore'); }}
              className="text-left text-slate-600 font-semibold text-base py-2 px-3 rounded-xl hover:bg-slate-100 transition-colors"
            >
              Shop Catalog
            </button>

            {/* Mobile Auth Actions */}
            <div className="pt-3 border-t border-slate-200/80 flex flex-col gap-2.5">
              {currentUser ? (
                <>
                  <div className="flex items-center gap-3 p-2 bg-emerald-50 rounded-2xl">
                    <div className="w-9 h-9 rounded-full bg-emerald-600 text-white font-extrabold flex items-center justify-center">
                      {userInitial}
                    </div>
                    <div className="flex-1 truncate">
                      <p className="font-bold text-slate-900 text-sm truncate">{userName}</p>
                      <p className="text-xs text-slate-500 truncate">{currentUser.email}</p>
                    </div>
                  </div>

                  {!userProfile?.profileCompleted && (
                    <button 
                      onClick={() => { setMobileMenuOpen(false); navigate('/complete-profile'); }}
                      className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-amber-100 text-amber-900 font-bold text-sm shadow-sm">
                      <CheckCircle2 className="w-4 h-4 text-amber-700" />
                      <span>Complete Profile</span>
                    </button>
                  )}

                  <button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-slate-200 text-slate-800 font-bold text-sm bg-white">
                    <User className="w-4 h-4" />
                    <span>My Dashboard</span>
                  </button>

                  <button 
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-red-50 text-red-600 font-bold text-sm">
                    <LogOut className="w-4 h-4" />
                    <span>Logout</span>
                  </button>
                </>
              ) : (
                <>
                  <button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/signup'); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full border-2 border-slate-800 text-slate-900 font-bold text-sm bg-white active:scale-95 transition-all shadow-sm">
                    <User className="w-4 h-4 stroke-[2.5]" />
                    <span>Sign Up</span>
                  </button>

                  <button 
                    onClick={() => { setMobileMenuOpen(false); navigate('/login'); }}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold text-sm shadow-md active:scale-95 transition-all">
                    <LogIn className="w-4 h-4 stroke-[2.5]" />
                    <span>Login</span>
                  </button>
                </>
              )}
            </div>
          </div>
        )}
      </header>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
