import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasPermission } from '../utils/roleUtils';

const ProtectedRoute = ({ permission, element }) => {
  return hasPermission(permission) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
