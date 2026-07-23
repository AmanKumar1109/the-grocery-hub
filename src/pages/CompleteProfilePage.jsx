import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Phone, MapPin, Building, Home, Briefcase, Tag, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

export default function CompleteProfilePage() {
  const { currentUser, userProfile, completeProfile } = useAuth();
  const navigate = useNavigate();

  const [phone, setPhone] = useState(userProfile?.phone || '');
  const [street, setStreet] = useState(userProfile?.address?.street || '');
  const [locality, setLocality] = useState(userProfile?.address?.locality || '');
  const [city, setCity] = useState(userProfile?.address?.city || '');
  const [state, setState] = useState(userProfile?.address?.state || '');
  const [pincode, setPincode] = useState(userProfile?.address?.pincode || '');
  const [addressType, setAddressType] = useState(userProfile?.addressType || 'Home');

  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!phone || phone.trim().length < 10) {
      setError('Please enter a valid 10-digit phone number.');
      return;
    }

    if (!street || !city || !pincode) {
      setError('Please fill in required address fields (Street, City, Pincode).');
      return;
    }

    try {
      setIsSubmitting(true);
      await completeProfile({
        phone: phone.trim(),
        street: street.trim(),
        locality: locality.trim(),
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim(),
        addressType
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Failed to update profile. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 py-12 relative overflow-hidden">
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-200/40 rounded-full blur-3xl animate-float-slow"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-orange-200/40 rounded-full blur-3xl animate-float-medium"></div>

      <div className="w-full max-w-xl relative z-10">
        {/* Back Link */}
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 font-semibold mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          Back to Home
        </Link>

        {/* Form Card */}
        <div className="bg-white/85 backdrop-blur-xl border border-white/60 shadow-2xl rounded-3xl p-6 sm:p-10">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-3 shadow-inner">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#18181b] tracking-tight mb-1">
              Complete Your Profile
            </h1>
            <p className="text-slate-500 font-medium text-sm sm:text-base">
              Add your phone number & delivery address for smooth orders
            </p>
          </div>

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-600 text-sm font-semibold">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Phone Number Field */}
            <div className="space-y-1.5">
              <label className="text-sm font-bold text-slate-700 pl-1 flex items-center gap-1.5">
                <Phone className="w-4 h-4 text-emerald-600" />
                Phone Number <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 font-bold text-sm">
                  +91
                </div>
                <input 
                  type="tel"
                  placeholder="98765 43210"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  maxLength={10}
                  className="w-full pl-14 pr-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-semibold text-slate-900 placeholder:text-slate-400"
                  required
                />
              </div>
            </div>

            {/* Address Section Title */}
            <div className="pt-2 border-t border-slate-200/80">
              <h2 className="text-base font-bold text-slate-800 flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-emerald-600" />
                Delivery Address Details
              </h2>

              <div className="space-y-4">
                {/* Street / Building Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 pl-1">
                    Flat / House No / Building / Street <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Flat 402, Sunshine Apartments, Main Road"
                    value={street}
                    onChange={(e) => setStreet(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </div>

                {/* Locality / Area */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 pl-1">
                    Locality / Area / Landmark
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Near Central Park, Sector 15"
                    value={locality}
                    onChange={(e) => setLocality(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                  />
                </div>

                {/* City & State Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 pl-1">
                      City <span className="text-red-500">*</span>
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Mumbai"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 pl-1">
                      State
                    </label>
                    <input 
                      type="text" 
                      placeholder="e.g. Maharashtra"
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    />
                  </div>
                </div>

                {/* Pincode */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-600 pl-1">
                    Pincode / Postal Code <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. 400001"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    maxLength={6}
                    className="w-full px-4 py-3 rounded-xl bg-slate-100 border-transparent focus:bg-white focus:border-emerald-500 focus:ring-2 focus:ring-emerald-200 outline-none transition-all font-medium text-slate-900 placeholder:text-slate-400"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Address Type Selection */}
            <div className="space-y-2 pt-2 border-t border-slate-200/80">
              <label className="text-xs font-bold text-slate-600 pl-1">
                Save Address As:
              </label>
              <div className="grid grid-cols-3 gap-3">
                <button
                  type="button"
                  onClick={() => setAddressType('Home')}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    addressType === 'Home' 
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-700 shadow-sm' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAddressType('Office')}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    addressType === 'Office' 
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-700 shadow-sm' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Briefcase className="w-5 h-5" />
                  <span>Office</span>
                </button>

                <button
                  type="button"
                  onClick={() => setAddressType('Other')}
                  className={`flex flex-col items-center justify-center gap-1.5 py-3 rounded-xl border-2 font-bold text-xs transition-all ${
                    addressType === 'Other' 
                      ? 'border-emerald-500 bg-emerald-50/80 text-emerald-700 shadow-sm' 
                      : 'border-slate-100 bg-slate-50 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Tag className="w-5 h-5" />
                  <span>Other</span>
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="pt-4 flex flex-col gap-3">
              <button 
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center gap-2 py-3.5 rounded-xl bg-[#facc15] hover:bg-[#eab308] text-slate-950 font-extrabold text-base shadow-md hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-50 cursor-pointer"
              >
                <span>{isSubmitting ? 'Saving Profile...' : 'Save & Continue'}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                type="button"
                onClick={() => navigate('/dashboard')}
                className="w-full py-2.5 text-center text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors"
              >
                Skip for now
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
