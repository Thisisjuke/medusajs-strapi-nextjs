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
  async find() {
    const pluginStore = getPluginStore();
    const config = await pluginStore.get({ key: 'settings' });

    const medusa = new Medusa({ baseUrl: config.medusaServerBaseUrl, maxRetries: 3 })
    const products = await medusa.products.list()
    const { response, ...data } = products;

    return data
  },
});
