import { Strapi } from '@strapi/strapi';
import Medusa from "@medusajs/medusa-js"

const getPluginStore = () => {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'medusa-product-selector',
  });
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll() {
    const pluginStore = getPluginStore();
    const config = await pluginStore.get({ key: 'settings' });

    const medusa = new Medusa({ baseUrl: config.medusaServerBaseUrl, maxRetries: 3 })
    const productsList = await medusa.collections.list()
    const { response, ...data } = productsList;

    return data
  },
});
