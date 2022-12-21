import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.template', {
      populate: ['deep']
    })
  },
  async findTemplateForCollection(query) {
    return await strapi.db.query('plugin::medusa-product-selector.template').findOne({
      where: {
        $and: [
          {
            page: {
              collectionIds: {
                $contains: query?.id,
              },
            }
          },
          {
            publishedAt: { $notNull: true },
          },
        ],
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
