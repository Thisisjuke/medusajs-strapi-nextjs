import { Strapi } from '@strapi/strapi';
import {matchProductFromBlocks} from "../utils/match-product-from-blocks";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findProductInBlocks(query) {
    const blocksWithProducts = {}
    // @ts-ignore
    Object.fromEntries(Object.entries(strapi.components).map( async ([blockName, blockValue]) => {
      // @ts-ignore
      if(JSON.stringify(blockValue.attributes).includes("plugin::medusa-product-selector.products")){
        blocksWithProducts[blockName] = await strapi.db.query(blockName).findMany({
          where: {
            products: { $contains: query?.id }
          }
        })
      }
    }))

    const filter = { populate: ['deep'],}

    const blocks = {
      collectionPage: [],
      editorialPage: [],
      productPage: [],
      template: [],
    };

    const collectionPages = (await strapi.db.query('plugin::medusa-product-selector.collection-page').findMany(filter)).map(page => matchProductFromBlocks(page, blocksWithProducts))
    blocks.collectionPage.push(...collectionPages.filter(p => p));

    const editorialPages = (await strapi.db.query('plugin::medusa-product-selector.editorial-page').findMany(filter)).map(page => matchProductFromBlocks(page, blocksWithProducts))
    blocks.editorialPage.push(...editorialPages.filter(p => p));

    const productPages = (await strapi.db.query('plugin::medusa-product-selector.product-page').findMany(filter)).map(page => matchProductFromBlocks(page, blocksWithProducts))
    blocks.productPage.push(...productPages.filter(p => p));

    const template = (await strapi.db.query('plugin::medusa-product-selector.template').findMany(filter)).map(page => matchProductFromBlocks(page, blocksWithProducts))
    blocks.productPage.push(...template.filter(p => p));

    return blocks
  },
});
