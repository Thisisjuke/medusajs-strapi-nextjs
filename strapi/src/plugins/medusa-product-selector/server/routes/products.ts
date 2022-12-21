export default [
  {
    method: 'GET',
    path: '/products/all',
    handler: 'medusaProducts.findAll',
    config: {
      policies: [],
    },
  },
  {
    method: 'GET',
    path: '/products/status',
    handler: 'medusaProducts.findAllWithStatus',
    config: {
      policies: [],
      auth: false
    },
  },
]
