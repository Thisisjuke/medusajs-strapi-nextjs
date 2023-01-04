import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll() {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.template', {
      populate: ['deep']
    })
  },
  async findTemplateForCollection(query) {
    const collectionId = query?.id
    const resourceType = query?.resourceType

    return await strapi.db.query('plugin::medusa-product-selector.template').findOne({
      where: {
        $and: [
          {
            [resourceType]: {
              collectionIds: {
                $contains: collectionId,
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
