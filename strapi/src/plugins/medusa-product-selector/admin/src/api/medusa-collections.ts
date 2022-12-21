import {request} from '@strapi/helper-plugin'

export const medusaCollectionsRequests = {
  getAllMedusaCollections: async () => {
    return await request('/medusa-product-selector/products/all', {
      method: 'GET'
    })
  },
  getAllMedusaCollectionsWithStatus: async () => {
    return await request('/medusa-product-selector/collections/status', {
      method: 'GET'
    })
  }
}

export default medusaCollectionsRequests
