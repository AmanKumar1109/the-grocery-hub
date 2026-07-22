import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, LogIn, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState('email');

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/40 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-3xl animate-float-medium"></div>
      <div className="absolute top-[20%] right-[10%] w-[20%] h-[20%] bg-yellow-200/40 rounded-full blur-3xl animate-float-reverse"></div>

      <div className="w-full max-w-md relative z-10">
        {/* Back Button */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Card */}
        <div className="bg-white/80 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-8 sm:p-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-extrabold text-[#18181b] tracking-tight mb-2">
              Welcome Back!
            </h1>
            <p className="text-slate-500 font-medium">
              Log in to continue to the Grocery hub
            </p>
          </div>

          {authMethod === 'email' ? (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 pl-1">Email Address</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Mail className="w-5 h-5" />
                  </div>
                  <input 
                    type="email" 
                    placeholder="you@example.com"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
                    Forgot?
                  </a>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Lock className="w-5 h-5" />
                  </div>
                  <input 
                    type="password" 
                    placeholder="••••••••"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full flex justify-center items-center gap-2 py-3.5 mt-2 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                <LogIn className="w-5 h-5 stroke-[2.5]" />
                <span>Login to Account</span>
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              {/* Phone Input */}
              <div className="space-y-1.5">
                <label className="text-sm font-bold text-slate-700 pl-1">Phone Number</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                    <Phone className="w-5 h-5" />
                  </div>
                  <input 
                    type="tel" 
                    placeholder="+91 98765 43210"
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button className="w-full flex justify-center items-center gap-2 py-3.5 mt-2 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0">
                <Phone className="w-5 h-5 stroke-[2.5]" />
                <span>Send OTP</span>
              </button>
            </form>
          )}

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Alternative Auth Methods */}
          <div className="space-y-3">
            <button className="w-full flex justify-center items-center gap-3 py-3 rounded-xl bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]">
              {/* Google SVG Icon */}
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google</span>
            </button>
            
            {authMethod === 'email' ? (
              <button 
                onClick={() => setAuthMethod('phone')}
                className="w-full flex justify-center items-center gap-3 py-3 rounded-xl bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]">
                <Phone className="w-5 h-5 text-slate-700" />
                <span>Phone Number</span>
              </button>
            ) : (
              <button 
                onClick={() => setAuthMethod('email')}
                className="w-full flex justify-center items-center gap-3 py-3 rounded-xl bg-white border-2 border-slate-100 hover:border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-sm shadow-sm transition-all duration-200 active:scale-[0.98]">
                <Mail className="w-5 h-5 text-slate-700" />
                <span>Email Address</span>
              </button>
            )}
          </div>

          {/* Toggle Login/Signup */}
          <div className="mt-8 text-center">
            <p className="text-slate-600 font-medium">
              Don't have an account?{' '}
              <Link 
                to="/signup"
                className="text-emerald-600 font-bold hover:text-emerald-700 underline decoration-2 decoration-emerald-200 hover:decoration-emerald-500 transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
