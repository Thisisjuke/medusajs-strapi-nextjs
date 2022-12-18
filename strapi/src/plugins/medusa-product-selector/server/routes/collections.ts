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
]
