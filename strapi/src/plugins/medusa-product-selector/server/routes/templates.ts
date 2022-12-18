export default [
  {
    method: 'GET',
    path: '/templates/all',
    handler: 'templates.findAll',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/templates/collection',
    handler: 'templates.findTemplateForCollection',
    config: {
      policies: [],
      auth: false
    },
  },
  {
    method: 'GET',
    path: '/templates/product',
    handler: 'templates.findTemplateForProduct',
    config: {
      policies: [],
      auth: false
    },
  }
]
