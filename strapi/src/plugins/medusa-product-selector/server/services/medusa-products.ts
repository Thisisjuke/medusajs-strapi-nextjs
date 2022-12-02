import { Strapi } from '@strapi/strapi';
import Medusa from "@medusajs/medusa-js"

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(query) {
    const medusa = new Medusa({ baseUrl: 'http://medusa-api:9000', maxRetries: 3 })
    const products = await medusa.products.list()
    const { response, ...data } = products;

    return data
  },
});
