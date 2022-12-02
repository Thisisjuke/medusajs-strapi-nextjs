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
    path: '/products',
    handler: 'medusaProducts.findAll',
    config: {
      policies: [],
    },
  },
];
