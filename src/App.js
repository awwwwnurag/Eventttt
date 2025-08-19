import React from 'react';
import { Routes, Route } from 'react-router-dom';
import MyEvents from './components/MyEvents';
import AdminPanel from './components/AdminPanel';

function AppRoutes() {
  return (
    <Routes>
      {/* ...existing routes... */}
      <Route path="/my-events" element={<MyEvents />} />
      <Route path="/admin" element={<AdminPanel />} />
    </Routes>
  );
}

export default AppRoutes;