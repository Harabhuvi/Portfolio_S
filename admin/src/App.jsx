import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import Admin from './pages/Admin';
import Adminproject from './pages/Adminproject';
import Adminblog from './pages/Adminblog';
import AdminLogin from './pages/AdminLogin';
import AdminProfile from './pages/AdminProfile';
import AdminContact from './pages/AdminContact';

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Login */}
          <Route path="/login" element={<AdminLogin />} />

          {/* Protected Dashboard Routes */}
          <Route path="/" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/blogs" element={<ProtectedRoute><Adminblog /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Adminproject /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />
          <Route path="/messages" element={<ProtectedRoute><AdminContact /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
