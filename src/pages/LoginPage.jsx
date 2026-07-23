import React, { useState } from 'react';
import { ArrowLeft, Mail, Lock, LogIn, Phone, AlertCircle } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function LoginPage() {
  const [authMethod, setAuthMethod] = useState('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter both email and password.');
      return;
    }

    try {
      setLoading(true);
      await login(email.trim(), password);
      // Auth state listener handles fetching profile, navigate user
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/invalid-credential' || err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password') {
        setError('Invalid email or password. Please check your credentials.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('Too many failed attempts. Please try again later.');
      } else {
        setError(err.message || 'Failed to log in. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

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
              Log in to continue to The Grocery Hub
            </p>
          </div>

          {error && (
            <div className="mb-5 p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold flex items-center gap-2">
              <AlertCircle className="w-5 h-5 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {authMethod === 'email' ? (
            <form className="space-y-5" onSubmit={handleLogin}>
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
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex justify-between items-center pl-1">
                  <label className="text-sm font-bold text-slate-700">Password</label>
                  <a href="#" onClick={(e) => e.preventDefault()} className="text-xs font-bold text-emerald-600 hover:text-emerald-700">
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
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full pl-11 pr-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button 
                type="submit"
                disabled={loading}
                className="w-full flex justify-center items-center gap-2 py-3.5 mt-2 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
              >
                <LogIn className="w-5 h-5 stroke-[2.5]" />
                <span>{loading ? 'Logging in...' : 'Login to Account'}</span>
              </button>
            </form>
          ) : (
            <div className="text-center py-6 text-slate-500 font-medium">
              <Phone className="w-10 h-10 text-slate-300 mx-auto mb-2" />
              <p>Phone OTP Authentication will be supported soon.</p>
              <button 
                type="button" 
                onClick={() => setAuthMethod('email')} 
                className="mt-3 text-emerald-600 font-bold hover:underline"
              >
                Use Email Login
              </button>
            </div>
          )}

          {/* OR Divider */}
          <div className="flex items-center gap-4 my-6">
            <div className="h-px bg-slate-200 flex-1"></div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">or continue with</span>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          {/* Alternative Auth Methods */}
          <div className="space-y-3">
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
