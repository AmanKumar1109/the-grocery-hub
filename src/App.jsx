import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { MenuProvider } from './context/MenuContext';
import HomePage from './Pages/HomePage';
import ExplorePage from './Pages/ExplorePage';
import MenuPage from './Pages/MenuPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import CompleteProfilePage from './Pages/CompleteProfilePage';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardHome from './Pages/dashboard/DashboardHome';
import MyOrders from './Pages/dashboard/MyOrders';
import TrackOrder from './Pages/dashboard/TrackOrder';
import Wishlist from './Pages/dashboard/Wishlist';
import SavedAddresses from './Pages/dashboard/SavedAddresses';
import Profile from './Pages/dashboard/Profile';
import Settings from './Pages/dashboard/Settings';

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
