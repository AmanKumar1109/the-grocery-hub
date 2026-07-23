import React, { useRef, useState, useEffect } from 'react';
import { Camera, User, Mail, Phone, Calendar, ShieldCheck, Check, MapPin, Home, Briefcase, Tag, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext';

export default function Profile() {
  const containerRef = useRef(null);
  const { currentUser, userProfile, completeProfile } = useAuth();

  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [street, setStreet] = useState('');
  const [locality, setLocality] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [pincode, setPincode] = useState('');
  const [addressType, setAddressType] = useState('Home');

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userProfile || currentUser) {
      setFullName(userProfile?.fullName || currentUser?.displayName || '');
      setPhone(userProfile?.phone || '');
      setStreet(userProfile?.address?.street || '');
      setLocality(userProfile?.address?.locality || '');
      setCity(userProfile?.address?.city || '');
      setState(userProfile?.address?.state || '');
      setPincode(userProfile?.address?.pincode || '');
      setAddressType(userProfile?.addressType || 'Home');
    }
  }, [userProfile, currentUser]);

  useGSAP(() => {
    gsap.from('.form-group', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.08,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, { scope: containerRef });

  const handleSave = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      setSaving(true);
      await completeProfile({
        phone: phone.trim(),
        street: street.trim(),
        locality: locality.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        addressType
      });
      setMessage('Profile updated successfully!');
    } catch (err) {
      console.error(err);
      setError('Failed to update profile. ' + (err.message || ''));
    } finally {
      setSaving(false);
    }
  };

  const userInitial = (fullName?.[0] || currentUser?.email?.[0] || 'U').toUpperCase();

  return (
    <div ref={containerRef} className="pb-24 md:pb-8 max-w-4xl mx-auto">
      <div className="mb-6 sm:mb-8 px-2 sm:px-0 text-center sm:text-left">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Profile</h1>
        <p className="text-slate-500 font-medium mt-1">Manage your account information & primary address</p>
      </div>

      <div className="bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl p-6 sm:p-10 shadow-sm relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

        {/* Profile Avatar */}
        <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 mb-10 relative z-10">
          <div className="relative">
            <div className="w-24 h-24 sm:w-32 sm:h-32 rounded-full bg-emerald-500 border-4 border-white shadow-xl flex items-center justify-center overflow-hidden">
              <span className="text-4xl sm:text-5xl font-black text-white">{userInitial}</span>
            </div>
            <button className="absolute bottom-0 right-0 w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform active:scale-95">
              <Camera className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-2xl font-extrabold text-slate-900">{fullName || 'User Profile'}</h2>
            <p className="text-sm font-medium text-slate-500">{currentUser?.email}</p>
            <div className="flex items-center justify-center sm:justify-start gap-1 text-emerald-600 font-bold mt-1.5 text-sm">
              <ShieldCheck className="w-4 h-4" /> 
              <span>{userProfile?.profileCompleted ? 'Verified & Complete Profile' : 'Profile Incomplete'}</span>
            </div>
          </div>
        </div>

        {message && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700 font-bold text-sm flex items-center gap-2">
            <Check className="w-5 h-5" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600 font-bold text-sm flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{error}</span>
          </div>
        )}

        {/* Profile Form */}
        <form className="space-y-6 relative z-10" onSubmit={handleSave}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="form-group space-y-1.5">
              <label className="text-sm font-bold text-slate-700 pl-1">Full Name</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <User className="w-5 h-5" />
                </div>
                <input 
                  type="text" 
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900" 
                />
              </div>
            </div>

            <div className="form-group space-y-1.5">
              <label className="text-sm font-bold text-slate-700 pl-1">Phone Number</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-5 h-5" />
                </div>
                <input 
                  type="tel" 
                  placeholder="+91 98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 outline-none transition-all font-bold text-slate-900" 
                />
              </div>
            </div>

            <div className="form-group space-y-1.5 md:col-span-2">
              <label className="text-sm font-bold text-slate-700 pl-1">Email Address</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-5 h-5" />
                </div>
                <input 
                  type="email" 
                  value={currentUser?.email || ''} 
                  disabled
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-slate-100 border border-slate-200 text-slate-500 font-bold cursor-not-allowed" 
                />
              </div>
            </div>
          </div>

          {/* Address Section */}
          <div className="pt-6 border-t border-slate-100">
            <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5 text-emerald-600" />
              Primary Delivery Address
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-group md:col-span-2 space-y-1">
                <label className="text-xs font-bold text-slate-600 pl-1">Flat / House / Street</label>
                <input 
                  type="text"
                  placeholder="House/Flat No, Building, Street"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="form-group space-y-1">
                <label className="text-xs font-bold text-slate-600 pl-1">Locality / Landmark</label>
                <input 
                  type="text"
                  placeholder="Locality or landmark"
                  value={locality}
                  onChange={(e) => setLocality(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="form-group space-y-1">
                <label className="text-xs font-bold text-slate-600 pl-1">City</label>
                <input 
                  type="text"
                  placeholder="City"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="form-group space-y-1">
                <label className="text-xs font-bold text-slate-600 pl-1">State</label>
                <input 
                  type="text"
                  placeholder="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="form-group space-y-1">
                <label className="text-xs font-bold text-slate-600 pl-1">Pincode</label>
                <input 
                  type="text"
                  placeholder="Pincode"
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-emerald-500 outline-none font-bold text-slate-900 text-sm"
                />
              </div>

              <div className="form-group md:col-span-2 space-y-2 pt-2">
                <label className="text-xs font-bold text-slate-600 pl-1">Address Type</label>
                <div className="grid grid-cols-3 gap-3">
                  <button
                    type="button"
                    onClick={() => setAddressType('Home')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-xs ${
                      addressType === 'Home' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Home className="w-4 h-4" /> Home
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressType('Office')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-xs ${
                      addressType === 'Office' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Briefcase className="w-4 h-4" /> Office
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddressType('Other')}
                    className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 font-bold text-xs ${
                      addressType === 'Other' 
                        ? 'border-emerald-500 bg-emerald-50 text-emerald-700' 
                        : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    <Tag className="w-4 h-4" /> Other
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="form-group pt-6 flex items-center justify-end">
            <button 
              type="submit"
              disabled={saving}
              className="w-full sm:w-auto px-8 py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-extrabold rounded-full shadow-lg shadow-emerald-500/30 flex items-center justify-center gap-2 transition-all hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
            >
              <Check className="w-5 h-5 stroke-[3]" />
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
