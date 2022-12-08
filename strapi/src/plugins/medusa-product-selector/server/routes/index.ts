export default [
  {
    method: 'GET',
    path: '/product-pages',
    handler: 'page.findProductPages',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/editorial-pages',
    handler: 'page.findEditorialPages',
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
