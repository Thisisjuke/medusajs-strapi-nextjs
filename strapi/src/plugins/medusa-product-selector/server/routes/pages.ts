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
    path: '/collection-pages',
    handler: 'page.findCollectionPages',
    config: {
      policies: [],
      auth: false
    },
  }
]
