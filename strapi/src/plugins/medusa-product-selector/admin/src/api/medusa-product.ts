import {request} from '@strapi/helper-plugin'

export const medusaProductsRequests = {
  getAllMedusaProducts: async () => {
    return await request('/medusa-product-selector/products/all', {
      method: 'GET'
    })
  },
  getAllMedusaProductsWithStatus: async () => {
    return await request('/medusa-product-selector/products/status', {
      method: 'GET'
    })
  }
}

export default medusaProductsRequests
