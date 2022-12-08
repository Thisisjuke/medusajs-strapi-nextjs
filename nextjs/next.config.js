const { withStoreConfig } = require("./store-config")
const store = require("./store.config.json")

module.exports = withStoreConfig({
  publicRuntimeConfig: {
    strapiBackendUrl: process.env.STRAPI_BACKEND_URL,
  },
  features: store.features,
  reactStrictMode: true,
  images: {
    domains: ["medusa-public-images.s3.eu-west-1.amazonaws.com", "localhost", "cdn.shopify.com", "172.17.0.1"],
  },
})
