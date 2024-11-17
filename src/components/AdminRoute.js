

import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const AdminRoute = ({ children }) => {
  const { token, loading } = useSelector(state => state.auth); 
  const location = useLocation();
  const { role} = useSelector((state) => state.auth.user);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (!token || role !== 'admin') {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return children;
};

export default AdminRoute;
