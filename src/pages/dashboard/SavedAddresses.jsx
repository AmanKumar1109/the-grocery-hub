import React, { useRef } from 'react';
import { MapPin, Plus, Edit2, Trash2, Home, Briefcase, Navigation, Tag } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function SavedAddresses() {
  const containerRef = useRef(null);
  const { userProfile, currentUser } = useAuth();
  const navigate = useNavigate();

  useGSAP(() => {
    gsap.from('.address-card', {
      y: 20,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'power2.out',
      clearProps: 'all'
    });
  }, { scope: containerRef });

  const hasAddress = userProfile?.address?.street && userProfile?.address?.city;
  const addressType = userProfile?.addressType || 'Home';
  
  const getIcon = (type) => {
    if (type === 'Office') return Briefcase;
    if (type === 'Other') return Tag;
    return Home;
  };

  const IconComponent = getIcon(addressType);

  const fullAddressString = hasAddress
    ? [
        userProfile.address.street,
        userProfile.address.locality,
        userProfile.address.city,
        userProfile.address.state,
        userProfile.address.pincode
      ].filter(Boolean).join(', ')
    : '';

  return (
    <div ref={containerRef} className="pb-24 md:pb-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 sm:mb-8 px-2 sm:px-0">
        <div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">Saved Addresses</h1>
          <p className="text-slate-500 font-medium mt-1">Manage your delivery locations</p>
        </div>
        <button 
          onClick={() => navigate('/complete-profile')}
          className="flex items-center justify-center gap-2 px-5 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl transition-all shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
        >
          <Plus className="w-5 h-5 stroke-[3]" /> Add / Update Address
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <div 
          onClick={() => navigate('/complete-profile')}
          className="address-card flex items-center justify-center h-full min-h-[220px] bg-emerald-50/50 hover:bg-emerald-50 border-2 border-dashed border-emerald-200 rounded-3xl cursor-pointer transition-colors group p-6"
        >
          <div className="text-center flex flex-col items-center">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
              <Navigation className="w-6 h-6 stroke-[2]" />
            </div>
            <p className="font-extrabold text-emerald-700">Add New Address</p>
            <p className="text-xs text-slate-500 mt-1">Set up delivery location</p>
          </div>
        </div>

        {hasAddress ? (
          <div className="address-card bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute top-0 right-0 px-4 py-1.5 bg-emerald-500 text-white text-[10px] font-extrabold rounded-bl-xl uppercase tracking-wider">
              Primary Address
            </div>
            <div className="flex items-start gap-4 mb-4">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center flex-shrink-0">
                <IconComponent className="w-6 h-6 stroke-[2]" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-extrabold text-slate-900">{addressType}</h3>
                <p className="text-sm font-bold text-slate-700 mt-1">
                  {userProfile?.fullName || currentUser?.displayName || 'User'} • {userProfile?.phone || 'No phone'}
                </p>
              </div>
            </div>
            <p className="text-sm font-medium text-slate-600 leading-relaxed mb-6">
              {fullAddressString}
            </p>
            
            <div className="flex items-center gap-3 border-t border-slate-100 pt-4">
              <button 
                onClick={() => navigate('/complete-profile')}
                className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-sm rounded-xl transition-colors cursor-pointer"
              >
                <Edit2 className="w-4 h-4 stroke-[2]" /> Edit Address
              </button>
            </div>
          </div>
        ) : (
          <div className="address-card bg-white/80 backdrop-blur-xl border border-slate-200 rounded-3xl p-6 shadow-sm flex flex-col items-center justify-center text-center">
            <MapPin className="w-10 h-10 text-slate-300 mb-2" />
            <p className="font-bold text-slate-700">No Address Saved Yet</p>
            <p className="text-xs text-slate-500 mb-4">Complete your profile to save your address details.</p>
            <button 
              onClick={() => navigate('/complete-profile')}
              className="px-4 py-2 bg-emerald-500 text-white font-bold text-xs rounded-xl shadow cursor-pointer"
            >
              Complete Profile
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
