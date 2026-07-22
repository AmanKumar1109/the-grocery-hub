import React, { useState } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight, Tag, CheckCircle2 } from 'lucide-react';

import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';
import miniCakeImg from '../assets/mini_cake.png';

export default function CartDrawer({ isOpen, onClose }) {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: 'Gourmet Paneer Tikka Bowl',
      price: 12.15,
      quantity: 1,
      image: mainSaladBowlImg,
      badge: 'Healthy'
    },
    {
      id: 2,
      name: 'Crispy Veg Supreme Burger',
      price: 7.99,
      quantity: 1,
      image: miniBurgerImg,
      badge: 'Popular'
    },
    {
      id: 3,
      name: 'Pink Berry Frosted Donut Cake',
      price: 5.50,
      quantity: 1,
      image: miniCakeImg,
      badge: 'Sweet'
    }
  ]);

  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);

  const handleQuantity = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const handleRemove = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const applyPromo = (e) => {
    e.preventDefault();
    if (promoCode.toUpperCase() === 'GROCERY20') {
      setDiscountPercent(20);
      setPromoMessage('20% Promo discount applied!');
    } else if (promoCode.trim() !== '') {
      setPromoMessage('Invalid coupon code. Try GROCERY20');
    }
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 25 || subtotal === 0 ? 0 : 1.99;
  const finalTotal = Math.max(0, subtotal - discountAmount + deliveryFee);

  const handleCheckout = () => {
    setIsOrderPlaced(true);
    setTimeout(() => {
      setIsOrderPlaced(false);
      setCartItems([]);
      onClose();
    }, 3000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Dark Backdrop Overlay */}
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
                <p className="text-xs text-slate-400">{cartItems.length} items in cart</p>
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
                  Your fresh meal is being prepared by our master chefs. Estimated delivery in 14 minutes!
                </p>
              </div>
            ) : cartItems.length === 0 ? (
              <div className="py-16 text-center space-y-3">
                <ShoppingBag className="w-12 h-12 text-slate-300 mx-auto" />
                <p className="text-slate-500 font-bold text-base">Your cart is currently empty</p>
                <button 
                  onClick={onClose}
                  className="px-5 py-2 rounded-full bg-slate-900 text-white font-bold text-xs"
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
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs sm:text-sm text-slate-900 truncate">{item.name}</h4>
                    <span className="text-xs font-extrabold text-emerald-600 block mt-0.5">${(item.price * item.quantity).toFixed(2)}</span>
                    
                    {/* Quantity Selector */}
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex items-center gap-2 px-2 py-0.5 rounded-full bg-white border border-slate-200 text-xs">
                        <button 
                          onClick={() => handleQuantity(item.id, -1)}
                          className="text-slate-400 hover:text-slate-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="font-bold text-slate-900 w-3 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => handleQuantity(item.id, 1)}
                          className="text-slate-400 hover:text-slate-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button 
                    onClick={() => handleRemove(item.id)}
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
              <form onSubmit={applyPromo} className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input 
                    type="text" 
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
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
                  <span className="font-bold text-slate-900">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600">
                    <span>Discount (20%)</span>
                    <span className="font-bold">-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery Fee</span>
                  <span className="font-bold text-slate-900">
                    {deliveryFee === 0 ? <span className="text-emerald-600">FREE</span> : `$${deliveryFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-base text-emerald-600">${finalTotal.toFixed(2)}</span>
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
