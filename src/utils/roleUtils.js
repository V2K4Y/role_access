import { permissions } from './permissions';

// Get the user role from local storage
export const getUserRole = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData?.user?.role || null;
};

// Check if the user has the required permission
export const hasPermission = (permission) => {
  const role = getUserRole();
  return role && permissions[role]?.[permission];
};
