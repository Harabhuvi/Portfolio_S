import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import Blogs from './pages/Blogs';
import Admin from './pages/Admin';
import Adminproject from './pages/Adminproject';
import Adminblog from './pages/Adminblog';
import Error from './pages/Error';
import AdminLogin from './pages/AdminLogin';
import DSizer from './pages/DSizer';
import AdminProfile from './pages/AdminProfile';

import { AuthProvider } from './AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; 

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route index path="/" element={<Home />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/projects/dsizer" element={<DSizer />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/hell" element={<hell />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/adminLogin" element={<AdminLogin />} />

          {/* Protected Admin Routes */}
          <Route path="/admin" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          <Route path="/adminblog" element={<ProtectedRoute><Adminblog /></ProtectedRoute>} />
          <Route path="/adminproject" element={<ProtectedRoute><Adminproject /></ProtectedRoute>} />
          <Route path="/adminprofile" element={<ProtectedRoute><AdminProfile /></ProtectedRoute>} />

          {/* Fallback Route */}
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
