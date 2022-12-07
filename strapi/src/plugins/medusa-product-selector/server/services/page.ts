import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.page', query)
  },
});
