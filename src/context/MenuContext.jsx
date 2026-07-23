import React, { createContext, useContext, useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

// Fallback images
import mainSaladBowlImg from '../assets/main_salad_bowl.png';
import miniBurgerImg from '../assets/mini_burger.png';
import miniCakeImg from '../assets/mini_cake.png';
import miniSaladImg from '../assets/mini_salad.png';

// Fallback initial menu items (if DB has no items yet)
const fallbackMenuItems = [
  {
    id: 'ITEM-101',
    name: 'Paneer Tikka Bowl',
    category: 'Healthy Bowls',
    price: 240,
    rating: 4.9,
    reviews: 242,
    prepTime: '10-15m',
    calories: '340 kcal',
    image: mainSaladBowlImg,
    badge: 'Bestseller',
    bgClass: 'bg-emerald-50',
    inStock: true,
    isVisible: true
  },
  {
    id: 'ITEM-102',
    name: 'Crispy Veg Supreme Burger',
    category: 'Burgers',
    price: 180,
    rating: 4.8,
    reviews: 310,
    prepTime: '10-15m',
    calories: '490 kcal',
    image: miniBurgerImg,
    badge: 'Popular',
    bgClass: 'bg-amber-50',
    inStock: true,
    isVisible: true
  },
  {
    id: 'ITEM-103',
    name: 'Pink Donut Cake',
    category: 'Desserts',
    price: 150,
    rating: 4.9,
    reviews: 198,
    prepTime: '5-10m',
    calories: '280 kcal',
    image: miniCakeImg,
    badge: 'Sweet Hit',
    bgClass: 'bg-pink-50',
    inStock: true,
    isVisible: true
  },
  {
    id: 'ITEM-104',
    name: 'Avocado Green Salad',
    category: 'Healthy Bowls',
    price: 220,
    rating: 4.7,
    reviews: 146,
    prepTime: '8-12m',
    calories: '310 kcal',
    image: miniSaladImg,
    badge: 'Fresh',
    bgClass: 'bg-emerald-50',
    inStock: true,
    isVisible: true
  },
  {
    id: 'ITEM-105',
    name: 'Tandoori Paneer Burger',
    category: 'Burgers',
    price: 199,
    rating: 4.9,
    reviews: 275,
    prepTime: '12-16m',
    calories: '520 kcal',
    image: miniBurgerImg,
    badge: 'Chef Special',
    bgClass: 'bg-[#ffedd5]',
    inStock: true,
    isVisible: true
  },
  {
    id: 'ITEM-106',
    name: 'Triple Fudge Cake',
    category: 'Desserts',
    price: 165,
    rating: 5.0,
    reviews: 420,
    prepTime: '5-8m',
    calories: '410 kcal',
    image: miniCakeImg,
    badge: 'Top Rated',
    bgClass: 'bg-[#fce7f3]',
    inStock: true,
    isVisible: true
  }
];

const MenuContext = createContext(null);

export function useMenu() {
  return useContext(MenuContext);
}

export function MenuProvider({ children }) {
  const [items, setItems] = useState([]);
  const [categories, setCategories] = useState(['All']);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen real-time to Firestore 'items' collection
    const unsubItems = onSnapshot(collection(db, 'items'), (snapshot) => {
      const dbItems = snapshot.docs
        .map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Unnamed Item',
            category: data.category || 'General',
            price: typeof data.price === 'number' ? data.price : parseFloat(data.price) || 0,
            description: data.description || '',
            image: data.image || mainSaladBowlImg,
            rating: data.rating || 4.8,
            reviews: data.reviews || Math.floor(Math.random() * 200 + 50),
            prepTime: data.prepTime || '10-15m',
            calories: data.calories || '350 kcal',
            badge: data.badge || (data.price > 200 ? 'Bestseller' : 'Popular'),
            bgClass: data.category?.toLowerCase().includes('dessert') 
              ? 'bg-pink-50' 
              : data.category?.toLowerCase().includes('burger') 
              ? 'bg-amber-50' 
              : 'bg-emerald-50',
            inStock: data.inStock !== false,
            isVisible: data.isVisible !== false,
            createdAt: data.createdAt || ''
          };
        })
        .filter(item => item.isVisible); // Only show visible items

      if (dbItems.length > 0) {
        setItems(dbItems);
      } else {
        setItems(fallbackMenuItems);
      }
      setLoading(false);
    }, (err) => {
      console.error("Firestore menu items fetch error:", err);
      setItems(fallbackMenuItems);
      setLoading(false);
    });

    // Listen real-time to Firestore 'categories' collection
    const unsubCategories = onSnapshot(collection(db, 'categories'), (snapshot) => {
      const dbCats = snapshot.docs.map(doc => doc.data().name || doc.id).filter(Boolean);
      const combined = Array.from(new Set(['All', ...dbCats]));
      setCategories(combined);
    }, (err) => {
      console.warn("Categories fetch notice:", err);
    });

    return () => {
      unsubItems();
      unsubCategories();
    };
  }, []);

  // Compute derived categories list if categories collection is empty
  const computedCategories = Array.from(new Set([
    'All',
    ...categories.filter(c => c !== 'All'),
    ...items.map(i => i.category).filter(Boolean)
  ]));

  const value = {
    items,
    categories: computedCategories,
    loading
  };

  return (
    <MenuContext.Provider value={value}>
      {children}
    </MenuContext.Provider>
  );
}
