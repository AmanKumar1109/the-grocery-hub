import React, { useRef } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import EmptyState from '../../components/dashboard/EmptyState';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext';

export default function Wishlist() {
  const { userProfile, toggleWishlist } = useAuth();
  const dispatch = useDispatch();
  const wishlist = userProfile?.wishlist || [];
  const containerRef = useRef(null);

  useGSAP(() => {
    gsap.from('.product-card', {
      scale: 0.9,
      opacity: 0,
      duration: 0.5,
      stagger: 0.1,
      ease: 'back.out(1.5)',
      clearProps: 'all'
    });
  }, { scope: containerRef });

  const removeProduct = async (product) => {
    try {
      await toggleWishlist(product);
    } catch (e) {
      console.error(e);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  return (
    <div ref={containerRef} className="pb-24 md:pb-8">
      <div className="mb-6 sm:mb-8 px-2 sm:px-0">
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">My Wishlist</h1>
        <p className="text-slate-500 font-medium mt-1">Products you've saved for later</p>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {wishlist.map(product => (
            <div key={product.id} className="product-card bg-white/80 backdrop-blur-xl border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group">
              <div className="relative h-48 bg-slate-100 overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button 
                  onClick={() => removeProduct(product)}
                  className="absolute top-3 right-3 w-10 h-10 bg-white/90 backdrop-blur-md rounded-full flex items-center justify-center text-red-500 hover:scale-110 active:scale-95 transition-all shadow-sm"
                >
                  <Heart className="w-5 h-5 fill-red-500 stroke-red-500" />
                </button>
                {product.originalPrice > product.price && (
                  <div className="absolute top-3 left-3 px-3 py-1 bg-[#ea580c] text-white text-xs font-extrabold rounded-full shadow-md">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </div>
                )}
              </div>
              <div className="p-5">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                  <span className="text-sm font-bold text-slate-700">{product.rating}</span>
                </div>
                <h3 className="font-extrabold text-slate-900 text-lg mb-1 truncate">{product.name}</h3>
                <div className="flex items-center gap-2 mb-5">
                  <span className="text-xl font-black text-emerald-600">₹{product.price}</span>
                  {product.originalPrice > product.price && (
                    <span className="text-sm font-bold text-slate-400 line-through">₹{product.originalPrice}</span>
                  )}
                </div>
                <button 
                  onClick={() => handleAddToCart(product)}
                  className="w-full py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-colors active:scale-[0.98]"
                >
                  <ShoppingCart className="w-5 h-5" /> Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState 
          icon={Heart}
          title="Your wishlist is empty"
          description="Save items you like in your wishlist and come back later to buy them."
          actionText="Explore Products"
          actionLink="/"
        />
      )}
    </div>
  );
}
