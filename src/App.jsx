import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import HomePage from './pages/HomePage';
import ExplorePage from './pages/ExplorePage';
import MenuPage from './pages/MenuPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CompleteProfilePage from './pages/CompleteProfilePage';
import CheckoutPage from './pages/CheckoutPage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './pages/dashboard/DashboardHome';
import MyOrders from './pages/dashboard/MyOrders';
import TrackOrder from './pages/dashboard/TrackOrder';
import Wishlist from './pages/dashboard/Wishlist';
import SavedAddresses from './pages/dashboard/SavedAddresses';
import Profile from './pages/dashboard/Profile';
import Settings from './pages/dashboard/Settings';

export default function App() {
  return (
    <AuthProvider>
      <MenuProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/complete-profile" element={<CompleteProfilePage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          
          <Route path="/dashboard" element={<DashboardLayout />}>
            <Route index element={<DashboardHome />} />
            <Route path="orders" element={<MyOrders />} />
            <Route path="track-order/:id" element={<TrackOrder />} />
            <Route path="wishlist" element={<Wishlist />} />
            <Route path="addresses" element={<SavedAddresses />} />
            <Route path="profile" element={<Profile />} />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          <Route path="*" element={<HomePage />} />
        </Routes>
      </MenuProvider>
    </AuthProvider>
  );
}
