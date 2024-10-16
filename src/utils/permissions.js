const ROLES = {
    SUPER_ADMIN: 'SUPER ADMIN',
    ADMIN: 'ADMIN',
    MANAGER: 'MANAGER',
    USER: 'USER',
};

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

// export const permissions = {
//     'SUPER ADMIN': {
//       canViewUsers: true,
//       canEditUsers: true,
//       canViewProducts: true,
//       canEditProducts: true,
//     },
//     'ADMIN': {
//       canViewUsers: true,
//       canEditUsers: false,
//       canViewProducts: true,
//       canEditProducts: true,
//     },
//     'USER': {
//       canViewUsers: false,
//       canEditUsers: false,
//       canViewProducts: true,
//       canEditProducts: false,
//     },
//   };
  