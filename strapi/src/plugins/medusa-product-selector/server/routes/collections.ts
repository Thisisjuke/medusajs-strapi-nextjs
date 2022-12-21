export default [
  {
    method: 'GET',
    path: '/collections/all',
    handler: 'medusaCollections.findAll',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/collections/status',
    handler: 'medusaCollections.findAllWithStatus',
    config: {
      policies: [],
      auth: false
    },
  },
]
