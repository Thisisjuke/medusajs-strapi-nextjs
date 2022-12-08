import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.page', query)
  },
  async findWithId(query) {
    const filters = query?.id && ({
      where: {
        productIds: {
          $contains: query?.id,
        },
      },
    })

    return await strapi.db.query('plugin::medusa-product-selector.page').findMany({
      ...filters,
      populate: ['deep']
    })
  },
  async findWithNoProducts(query) {
    const filters = query?.id && ({
      where: {
        productIds: {
          $null: true,
        },
      },
    })
    return await strapi.db.query('plugin::medusa-product-selector.page').findMany({
      ...filters,
      populate: ['deep']
    })
  },
});
