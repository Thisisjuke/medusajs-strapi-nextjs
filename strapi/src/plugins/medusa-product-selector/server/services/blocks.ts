import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async findProductInBlocks(query) {
    const filter = {
      populate: ['deep'],
      where: {
        blocks: {
          $contains: query?.id,
        },
      },
    }
    const blocks = {}

    blocks['productPage'] = await strapi.entityService.findMany('plugin::medusa-product-selector.product-page', filter)
    blocks['collectionPage'] = await strapi.entityService.findMany('plugin::medusa-product-selector.collection-page', filter)
    blocks['editorialPage'] = await strapi.entityService.findMany('plugin::medusa-product-selector.editorial-page', filter)

    console.log(query.id, blocks)

    return blocks
  },
});
