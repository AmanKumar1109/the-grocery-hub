import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './Pages/HomePage';
import ExplorePage from './Pages/ExplorePage';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/menu" element={<ExplorePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
}
