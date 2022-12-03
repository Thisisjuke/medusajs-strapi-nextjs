export default [
  {
    method: 'GET',
    path: '/find',
    handler: 'productReference.find',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/settings',
    handler: 'medusaProducts.getSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'POST',
    path: '/settings',
    handler: 'medusaProducts.setSettings',
    config: {
      policies: [],
      auth: false,
    },
  },
  {
    method: 'GET',
    path: '/products',
    handler: 'medusaProducts.findAll',
    config: {
      policies: [],
    },
  },
];
