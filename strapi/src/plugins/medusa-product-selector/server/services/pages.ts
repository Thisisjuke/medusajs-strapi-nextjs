import { Strapi } from '@strapi/strapi';
import {useMedusaClient} from "../utils/useMedusaClient";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAllEditorial(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.editorial-page', query)
  },
  async findAllProductPagesUsingProductId(query) {
    const productId = query?.id

    if(!productId) return([])

    const filters = productId && ({
      where: {
        $and: [
          {
            productIds: {
              $contains: query?.id,
            }
          },
          {
            publishedAt: { $notNull: true },
          },
        ],
      }
    })

    const relativePage = await strapi.db.query('plugin::medusa-product-selector.product-page').findOne({
      ...filters,
      populate: ['deep']
    })

    if(relativePage && relativePage?.blocks?.length > 0){
      return(relativePage?.blocks)
    }

    const medusa = await useMedusaClient()
    const { product: {collection_id} } = await medusa.products.retrieve(productId)

    const relativeTemplate = await strapi.plugin('medusa-product-selector').service('templates').findTemplateForCollection({
      id: collection_id,
      resourceType: 'product-page',
    })

    if(relativeTemplate && relativeTemplate?.page?.block?.length > 0){
      return relativeTemplate?.page?.block
    }

    if(relativeTemplate && relativeTemplate?.blocks?.length > 0){
      return relativeTemplate?.blocks
    }

    return []
  },
  async findAllCollectionPagesUsingCollectionId(query) {
    const collectionId = query?.id

    if(!collectionId) return([])

    const filters = collectionId && ({
      where: {
        $and: [
          {
            collectionIds: {
              $contains: query?.id,
            }
          },
          {
            publishedAt: { $notNull: true },
          },
        ],
      }
    })

    const relativePage = await strapi.db.query('plugin::medusa-product-selector.collection-page').findOne({
      ...filters,
      populate: ['deep']
    })

    if(relativePage && relativePage?.blocks?.length > 0){
      return(relativePage?.blocks)
    }

    const relativeTemplate = await strapi.plugin('medusa-product-selector').service('templates').findTemplateForCollection({
      id: collectionId,
      resourceType: 'collection-page',
    })

    if(relativeTemplate && relativeTemplate?.page?.block?.length > 0){
      return relativeTemplate?.page?.block
    }

    if(relativeTemplate && relativeTemplate?.blocks?.length > 0){
      return relativeTemplate?.blocks
    }

    return []
  },
});
