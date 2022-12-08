export default {
  'medusa-product-selector': {
    enabled: true,
    resolve: './src/plugins/medusa-product-selector'
  },
  'strapi-plugin-populate-deep': {
    config: {
      defaultDepth: 5
    }
  },
}
