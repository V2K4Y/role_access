import React from 'react';
import ProtectedRoute from '../components/ProtectedRoute';
import UserList from '../pages/Users/UserList';
import ProductDetails from '../pages/Products/ProductDetails';
import CategoryIcon from '@mui/icons-material/Category';
import LocalActivityIcon from '@mui/icons-material/Diversity3';
// import Diversity3Icon from '@mui/icons-material/Diversity3';

const appRoutes = [
  {
    path: '/users',
    element: <ProtectedRoute permission="canViewUsers" element={<UserList />} />,
    state: 'userList',
    sidebarProps: {
      displayText: 'Users',
      icon: <LocalActivityIcon />,
    },
  },
  {
    path: '/products',
    element: <ProtectedRoute permission="canViewProducts" element={<ProductDetails />} />,
    state: 'products',
    sidebarProps: {
      displayText: 'Products',
      icon: <CategoryIcon />,
    },
  },
  // Add more routes as needed
];

export default appRoutes;