import { createSlice } from '@reduxjs/toolkit';

// Load saved cart items from localStorage if available
const loadSavedCart = () => {
  try {
    const saved = localStorage.getItem('grocery_cart_items');
    return saved ? JSON.parse(saved) : [];
  } catch (e) {
    console.warn("Failed to load saved cart:", e);
    return [];
  }
};

// Save cart items to localStorage helper
const saveCart = (items) => {
  try {
    localStorage.setItem('grocery_cart_items', JSON.stringify(items));
  } catch (e) {
    console.warn("Failed to save cart:", e);
  }
};

const initialState = {
  items: loadSavedCart(),
  promoCode: '',
  discountPercent: 0,
  promoMessage: ''
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existing = state.items.find(i => i.id === item.id);
      if (existing) {
        existing.quantity += (item.quantity || 1);
      } else {
        state.items.push({
          id: item.id,
          name: item.name,
          price: typeof item.price === 'number' ? item.price : parseFloat(item.price) || 0,
          image: item.image,
          badge: item.badge || 'Popular',
          category: item.category || 'General',
          quantity: item.quantity || 1
        });
      }
      saveCart(state.items);
    },
    removeFromCart: (state, action) => {
      const itemId = action.payload;
      state.items = state.items.filter(i => i.id !== itemId);
      saveCart(state.items);
    },
    updateQuantity: (state, action) => {
      const { id, delta } = action.payload;
      const target = state.items.find(i => i.id === id);
      if (target) {
        target.quantity += delta;
        if (target.quantity <= 0) {
          state.items = state.items.filter(i => i.id !== id);
        }
      }
      saveCart(state.items);
    },
    applyPromo: (state, action) => {
      const code = (action.payload || '').trim().toUpperCase();
      state.promoCode = code;
      if (code === 'GROCERY20') {
        state.discountPercent = 20;
        state.promoMessage = '20% Promo discount applied!';
      } else if (code === 'FIRST50') {
        state.discountPercent = 50;
        state.promoMessage = '50% Welcome discount applied!';
      } else if (code === '') {
        state.discountPercent = 0;
        state.promoMessage = '';
      } else {
        state.discountPercent = 0;
        state.promoMessage = 'Invalid coupon code. Try GROCERY20';
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.promoCode = '';
      state.discountPercent = 0;
      state.promoMessage = '';
      saveCart([]);
    }
  }
});

export const { addToCart, removeFromCart, updateQuantity, applyPromo, clearCart } = cartSlice.actions;

// Selectors
export const selectCartItems = (state) => state.cart.items;

export const selectTotalCartCount = (state) => 
  state.cart.items.reduce((total, item) => total + item.quantity, 0);

export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

export const selectDiscountPercent = (state) => state.cart.discountPercent;
export const selectPromoMessage = (state) => state.cart.promoMessage;
export const selectPromoCode = (state) => state.cart.promoCode;

export const selectCartTotalAmount = (state) => {
  const subtotal = selectCartSubtotal(state);
  const discountPercent = state.cart.discountPercent;
  const discountAmount = (subtotal * discountPercent) / 100;
  const deliveryFee = subtotal > 500 || subtotal === 0 ? 0 : 49; // ₹49 delivery fee below ₹500
  return Math.max(0, subtotal - discountAmount + deliveryFee);
};

export default cartSlice.reducer;
