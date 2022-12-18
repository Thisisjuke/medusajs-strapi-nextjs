import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.template', {
      populate: ['deep']
    })
  },
  async findTemplateForCollection(query) {
    return await strapi.db.query('plugin::medusa-product-selector.template').findMany({
      where: {
        collectionIds: {
          $contains: query?.id,
        },
      },
      populate: ['deep']
    })
  },
  async findTemplateForProduct(query) {
    const filters = query?.id && ({
      where: {
        productIds: {
          $null: true,
        },
      },
    })
    return await strapi.db.query('plugin::medusa-product-selector.template').findMany({
      ...filters,
      populate: ['deep']
    })
  },
});
