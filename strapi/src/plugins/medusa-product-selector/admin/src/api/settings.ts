import {request} from '@strapi/helper-plugin'

export const settingsRequests = {
  setSettings: async (settings) => {
    return await request('/medusa-product-selector/settings', {
      method: 'POST',
      body: settings
    })
  }
}

export default settingsRequests
