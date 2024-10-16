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
