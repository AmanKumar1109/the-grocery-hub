import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { ArrowLeft, MapPin, Banknote, CheckCircle2, ChevronRight, ShoppingBag } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectDiscountPercent, 
  clearCart 
} from '../redux/cartSlice';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userProfile, currentUser } = useAuth();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discountPercent = useSelector(selectDiscountPercent);

  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handlePlaceOrder = () => {
    setIsOrderPlaced(true);
    setTimeout(() => {
      dispatch(clearCart());
      navigate('/dashboard/orders');
    }, 2500);
  };

  const address = userProfile?.address;
  const fullAddress = address 
    ? [address.street, address.locality, address.city, address.state, address.pincode].filter(Boolean).join(', ')
    : '';

  if (isOrderPlaced) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <CheckCircle2 className="w-24 h-24 text-emerald-500 mb-6 animate-bounce" />
        <h1 className="text-3xl font-extrabold text-slate-900 mb-2">Order Placed!</h1>
        <p className="text-slate-500 font-medium max-w-md">
          Your order is being processed and will be delivered to your address shortly. Redirecting to your orders...
        </p>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-6 text-center">
        <ShoppingBag className="w-24 h-24 text-slate-300 mb-6" />
        <h1 className="text-2xl font-extrabold text-slate-900 mb-2">Your Cart is Empty</h1>
        <p className="text-slate-500 font-medium max-w-md mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <button 
          onClick={() => navigate('/menu')}
          className="px-6 py-3 bg-slate-900 text-white font-bold rounded-full hover:bg-slate-800 transition-colors"
        >
          Explore Menu
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 pb-24">
      {/* Header */}
      <div className="bg-white sticky top-0 z-20 border-b border-slate-200 px-4 py-4 flex items-center gap-4">
        <button 
          onClick={() => navigate(-1)}
          className="p-2 -ml-2 rounded-full hover:bg-slate-100 transition-colors"
        >
          <ArrowLeft className="w-6 h-6 text-slate-700" />
        </button>
        <h1 className="text-xl font-extrabold text-slate-900">Secure Checkout</h1>
      </div>

      <div className="max-w-3xl mx-auto p-4 sm:p-6 space-y-6 mt-2">
        {/* Delivery Address Section */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">Delivery Address</h2>
              <p className="text-xs text-slate-500 font-medium">Where should we deliver?</p>
            </div>
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-bold text-slate-900 mb-1">{userProfile?.fullName || currentUser?.displayName}</p>
                <p className="text-sm text-slate-600 leading-relaxed max-w-md">
                  {fullAddress}
                </p>
                <p className="text-sm font-medium text-slate-500 mt-2">
                  Phone: <span className="text-slate-700">{userProfile?.phone}</span>
                </p>
              </div>
              <button 
                onClick={() => navigate('/dashboard/addresses')}
                className="text-emerald-600 font-bold text-sm hover:underline"
              >
                Change
              </button>
            </div>
          </div>
        </section>

        {/* Payment Method Section */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 rounded-full bg-orange-50 text-orange-600 flex items-center justify-center">
              <Banknote className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-extrabold text-slate-900 text-lg">Payment Method</h2>
              <p className="text-xs text-slate-500 font-medium">How would you like to pay?</p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Cash on Delivery (Selected) */}
            <label className="flex items-center justify-between p-4 rounded-2xl border-2 border-emerald-500 bg-emerald-50/30 cursor-pointer transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-4 border-emerald-500 bg-white"></div>
                <div>
                  <span className="font-bold text-slate-900 block">Cash on Delivery</span>
                  <span className="text-xs text-slate-500 font-medium">Pay when you receive the order</span>
                </div>
              </div>
              <Banknote className="w-5 h-5 text-emerald-600" />
            </label>
            
            {/* Online Payment (Disabled placeholder) */}
            <div className="flex items-center justify-between p-4 rounded-2xl border border-slate-200 bg-slate-50 opacity-60 grayscale cursor-not-allowed">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-slate-300"></div>
                <div>
                  <span className="font-bold text-slate-900 block">UPI / Card</span>
                  <span className="text-xs text-slate-500 font-medium">Coming soon</span>
                </div>
              </div>
              <ChevronRight className="w-5 h-5 text-slate-400" />
            </div>
          </div>
        </section>

        {/* Order Summary */}
        <section className="bg-white rounded-3xl p-5 sm:p-6 border border-slate-200 shadow-sm">
          <h2 className="font-extrabold text-slate-900 text-lg mb-4">Order Summary</h2>
          
          <div className="space-y-4 mb-4 max-h-[40vh] overflow-y-auto pr-2">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-50 rounded-xl p-1 border border-slate-100 flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-slate-900 truncate">{item.name}</p>
                  <p className="text-xs font-medium text-slate-500">Qty: {item.quantity}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-sm text-emerald-600">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 pt-4 space-y-2 text-sm">
            <div className="flex justify-between text-slate-600 font-medium">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            {discountAmount > 0 && (
              <div className="flex justify-between text-emerald-600 font-medium">
                <span>Discount ({discountPercent}%)</span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between text-slate-600 font-medium">
              <span>Delivery Fee</span>
              <span>{deliveryFee === 0 ? <span className="text-emerald-600">Free</span> : `₹${deliveryFee.toFixed(2)}`}</span>
            </div>
            <div className="flex justify-between items-center pt-3 border-t border-slate-100 mt-2">
              <span className="font-extrabold text-slate-900">Total Amount</span>
              <span className="text-xl font-black text-emerald-600">₹{finalTotal.toFixed(2)}</span>
            </div>
          </div>
        </section>

        {/* Action Button */}
        <div className="pt-4">
          <button 
            onClick={handlePlaceOrder}
            className="w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-600 text-white font-black text-lg shadow-xl shadow-emerald-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2"
          >
            Place Order • ₹{finalTotal.toFixed(2)}
            <ChevronRight className="w-5 h-5 stroke-[3]" />
          </button>
          <p className="text-center text-xs font-medium text-slate-500 mt-3">
            By placing your order, you agree to our Terms & Conditions.
          </p>
        </div>
      </div>
    </div>
  );
}
