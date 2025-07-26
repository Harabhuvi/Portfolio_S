import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const ProtectedRoute = ({ children }) => {
  const { loggedIn } = useAuth();
  return loggedIn ? children : <Navigate to="/adminLogin" replace />;
};

export default ProtectedRoute;
