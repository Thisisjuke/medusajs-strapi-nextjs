import {request} from '@strapi/helper-plugin'

export const medusaProductsRequests = {
  getAllMedusaProducts: async () => {
    return await request('/medusa-product-selector/products', {
      method: 'GET'
    })
  }
}

export default medusaProductsRequests
