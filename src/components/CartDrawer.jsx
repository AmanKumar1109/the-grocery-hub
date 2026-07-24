import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { 
  selectCartItems, 
  selectCartSubtotal, 
  selectDiscountPercent, 
  selectPromoMessage, 
  removeFromCart, 
  updateQuantity, 
  applyPromo, 
  clearCart 
} from '../redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function CartDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const { currentUser, userProfile } = useAuth();
  const dispatch = useDispatch();
  const cartItems = useSelector(selectCartItems);
  const subtotal = useSelector(selectCartSubtotal);
  const discountPercent = useSelector(selectDiscountPercent);
  const promoMessage = useSelector(selectPromoMessage);

  const [inputPromoCode, setInputPromoCode] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleApplyPromo = (e) => {
    e.preventDefault();
    dispatch(applyPromo(inputPromoCode));
  };

  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 49;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleCheckout = () => {
    if (!currentUser) {
      onClose();
      navigate('/login', { state: { from: window.location.pathname } });
      return;
    }

    const hasAddress = userProfile?.address?.street && userProfile?.address?.city;
    if (!hasAddress) {
      onClose();
      navigate('/complete-profile', { state: { from: window.location.pathname } });
      return;
    }

    onClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Overlay */}
      <div 
        onClick={onClose}
        className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm transition-opacity animate-fadeIn"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between relative z-10 border-l border-slate-200">
          
          {/* Header */}
          <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-slate-900 text-white">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#10b981] flex items-center justify-center text-white">
                <ShoppingBag className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div>
                <h2 className="font-extrabold text-lg text-white">Your Shopping Cart</h2>
                <p className="text-xs text-slate-400">
                  {cartItems.reduce((acc, i) => acc + i.quantity, 0)} items in cart
                </p>
              </div>
            </div>
            <button 
              onClick={onClose}
              aria-label="Close cart"
              className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            >
              <X className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-5 space-y-4">
            {isOrderPlaced ? (
              <div className="py-16 text-center space-y-4">
                <CheckCircle2 className="w-16 h-16 text-emerald-500 mx-auto animate-bounce" />
                <h3 className="text-2xl font-extrabold text-slate-900">Order Placed Successfully!</h3>
                <p className="text-slate-500 text-sm max-w-xs mx-auto">
                  Your order has been sent to our kitchen. Delivery partner will deliver it shortly!
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-bold text-base">Your cart is currently empty</p>
                <button 
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs cursor-pointer"
                >
                  Explore Food Items
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div 
                  key={item.id}
                  className="bg-slate-50 rounded-2xl p-3.5 border border-slate-200/80 flex items-center gap-3 justify-between"
                >
                  {/* Image */}
                  <div className="w-16 h-16 bg-white rounded-xl p-1.5 border border-slate-200 flex items-center justify-center flex-shrink-0">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=400&auto=format&fit=crop&q=80';
                      }}
                      className="w-full h-full object-contain" 
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate" title={item.name}>
                      {item.name}
                    </h4>
                    <span className="text-xs font-extrabold text-emerald-600 block mt-0.5">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-xs">
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, delta: -1 }))}
                          className="text-slate-400 hover:text-slate-900 cursor-pointer"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-slate-900 w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => dispatch(updateQuantity({ id: item.id, delta: 1 }))}
                          className="text-slate-400 hover:text-slate-900 cursor-pointer"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => dispatch(removeFromCart(item.id))}
                    aria-label="Remove item"
                    className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg transition-colors cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Cart Summary Footer */}
          {!isOrderPlaced && cartItems.length > 0 && (
            <div className="p-5 border-t border-slate-200 bg-slate-50 space-y-4">
              
              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={inputPromoCode}
                    onChange={(e) => setInputPromoCode(e.target.value)}
                    placeholder="Coupon code (e.g. GROCERY20)"
                    className="w-full pl-8 pr-3 py-1.5 text-xs rounded-full border border-slate-300 bg-white text-slate-900 focus:outline-none focus:border-emerald-500 font-semibold"
                  />
                </div>
                <button 
                  type="submit"
                  className="px-3.5 py-1.5 rounded-full bg-slate-900 text-white font-bold text-xs hover:bg-slate-800 cursor-pointer"
                >
                  Apply
                </button>
              </form>
              {promoMessage && (
                <p className={`text-[11px] font-bold ${discountPercent > 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {promoMessage}
                </p>
              )}

              {/* Price Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount ({discountPercent}%)</span>
                    <span className="font-bold">-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE (Orders &gt; ₹500)</span> : `₹${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-emerald-600">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button 
                onClick={handleCheckout}
                className="w-full py-3 rounded-full bg-[#10b981] hover:bg-[#059669] text-white font-bold text-sm shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 transform active:scale-95 cursor-pointer"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
