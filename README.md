# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

# Role - access flow

To implement an **efficient, scalable, and professional** way to manage role-based access control (RBAC) for different components or pages in your React application, here’s a strategy that involves centralizing role logic, managing permissions, and handling role-based rendering with minimal repetition.

### Step-by-Step Guide to Implement Role-Based Access Control (RBAC)

### 1. **Define Roles and Permissions:**

First, you need to define the roles and permissions structure. Since you're already getting the `role` from `localStorage`, you can map specific roles to certain permissions (e.g., viewing, editing, creating).

Example:
```js
const ROLES = {
  SUPER_ADMIN: 'SUPER ADMIN',
  ADMIN: 'ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
};
```

Now, define the permissions for each role in a central configuration file:

#### `permissions.js`:
```js
export const permissions = {
  [ROLES.SUPER_ADMIN]: {
    canViewUsers: true,
    canEditUsers: true,
    canViewProducts: true,
    canEditProducts: true,
    // Add more permissions as required
  },
  [ROLES.ADMIN]: {
    canViewUsers: true,
    canEditUsers: false,
    canViewProducts: true,
    canEditProducts: true,
    // Add more permissions as required
  },
  [ROLES.MANAGER]: {
    canViewUsers: true,
    canEditUsers: false,
    canViewProducts: true,
    canEditProducts: false,
  },
  [ROLES.USER]: {
    canViewUsers: false,
    canEditUsers: false,
    canViewProducts: true,
    canEditProducts: false,
  },
};
```

### 2. **Centralize Role Access Logic:**

You can create a utility function that checks the user's role and permissions and abstracts the logic from components.

#### `roleUtils.js`:
```js
import { permissions } from './permissions';

// Utility to get the current user’s role from local storage
export const getUserRole = () => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  return userData?.user?.role || null;
};

// Utility to check if the user has a specific permission
export const hasPermission = (permission) => {
  const role = getUserRole();
  return role && permissions[role]?.[permission];
};
```

### 3. **Restrict Access in Components Using Permissions:**

You can now easily restrict access to specific components or routes based on the user's permissions.

#### Example of Access Restriction in a Component:
```js
import React from 'react';
import { hasPermission } from '../utils/roleUtils';

const UserList = () => {
  if (!hasPermission('canViewUsers')) {
    return <div>You do not have access to view this page.</div>;
  }

  return (
    <div>
      {/* Your User List Component Code */}
      <h2>User List</h2>
    </div>
  );
};

export default UserList;
```

### 4. **Route Protection Based on Roles:**

For routes, you can use a similar approach to protect pages. Create a **Higher-Order Component (HOC)** or a custom route wrapper.

#### `ProtectedRoute.js`:
```js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { hasPermission } from '../utils/roleUtils';

const ProtectedRoute = ({ permission, element }) => {
  return hasPermission(permission) ? element : <Navigate to="/unauthorized" />;
};

export default ProtectedRoute;
```

#### Usage in `appRoutes.js`:
```js
import ProtectedRoute from './components/ProtectedRoute';

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
  // Add more routes with role-based access
];
```

### 5. **Dynamic Sidebar Rendering Based on Roles:**

In your sidebar, you can dynamically render items based on the user's permissions.

#### Example of a Dynamic Sidebar:
```js
import React from 'react';
import { hasPermission } from '../utils/roleUtils';
import { List, ListItem, ListItemText } from '@mui/material';
import { Link } from 'react-router-dom';

const Sidebar = () => (
  <List>
    {hasPermission('canViewUsers') && (
      <ListItem button component={Link} to="/users">
        <ListItemText primary="Users" />
      </ListItem>
    )}
    {hasPermission('canViewProducts') && (
      <ListItem button component={Link} to="/products">
        <ListItemText primary="Products" />
      </ListItem>
    )}
    {/* Add more menu items conditionally based on permissions */}
  </List>
);

export default Sidebar;
```

### 6. **Access to Specific Actions in UI Components:**

You can also restrict certain UI elements (buttons, forms, etc.) based on permissions.

#### Example of Restricting Button Access:
```js
import React from 'react';
import { hasPermission } from '../utils/roleUtils';

const ProductDetails = () => (
  <div>
    <h1>Product Details</h1>
    
    {hasPermission('canEditProducts') && (
      <button>Edit Product</button>
    )}
  </div>
);

export default ProductDetails;
```

### 7. **Handling Unauthorized Access**:

Create a component for unauthorized access, and use it when users try to access restricted pages.

#### `Unauthorized.js`:
```js
import React from 'react';

const Unauthorized = () => (
  <div>
    <h1>Unauthorized</h1>
    <p>You do not have permission to view this page.</p>
  </div>
);

export default Unauthorized;
```

### Summary:
- **Centralize Role Management**: Use utility functions like `getUserRole` and `hasPermission` to keep access control logic out of components.
- **Protect Routes and Components**: Use a `ProtectedRoute` component and utility functions to protect components and routes.
- **Dynamic Sidebar and UI Elements**: Conditionally render sidebar items and UI elements based on permissions.
- **Scalable Approach**: By managing permissions in a configuration file, you can easily add or modify roles and permissions without changing the core logic of your app.

This approach keeps the code clean, easy to maintain, and scalable as your application grows.