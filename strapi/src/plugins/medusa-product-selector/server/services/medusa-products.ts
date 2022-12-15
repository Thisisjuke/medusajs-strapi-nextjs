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
    const productsList = await medusa.products.list()
    const { response, ...data } = productsList;

    return data
  },
  async findAllWithStatus() {
    const pluginStore = getPluginStore();
    const config = await pluginStore.get({ key: 'settings' });

    const medusa = new Medusa({ baseUrl: config.medusaServerBaseUrl, maxRetries: 3 })
    const productsList = await medusa.products.list()
    const { response, ...data } = productsList;

    const products = []

    for (const product of data?.products) {
      let obj = product as any
      const data = await strapi.db.query('plugin::medusa-product-selector.page').findOne({
        where: {
          productIds: {
            $contains: product?.id,
          },
        },
      })
      if (data !== null) {
        obj = {...product, isAlreadyUsed: data.id}
      }
      products.push(obj)
    }

    data.products = products

    return data
  }
});
