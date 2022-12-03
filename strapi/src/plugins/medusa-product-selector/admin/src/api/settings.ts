import {request} from '@strapi/helper-plugin'

export const settingsRequests = {
  getSettings: async () => {
    return await request('/medusa-product-selector/settings', {
      method: 'GET'
    })
  },
  setSettings: async (settings) => {
    console.log(settings)
    return await request('/medusa-product-selector/settings', {
      method: 'POST',
      body: settings
    })
  }
}

export default settingsRequests
