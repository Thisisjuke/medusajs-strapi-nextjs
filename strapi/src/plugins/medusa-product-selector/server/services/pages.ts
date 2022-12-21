import { Strapi } from '@strapi/strapi';
import {useMedusaClient} from "../utils/useMedusaClient";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.page', query)
  },
  async findWithId(query) {
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

    const relativePage = await strapi.db.query('plugin::medusa-product-selector.page').findOne({
      ...filters,
      populate: ['deep']
    })

    if(relativePage && relativePage?.blocks?.length > 0){
      return(relativePage?.blocks)
    }

    const medusa = await useMedusaClient()
    const { product: {collection_id} } = await medusa.products.retrieve(productId)

    const relativeTemplate = await strapi.plugin('medusa-product-selector').service('templates').findTemplateForCollection({id: collection_id})

    if(relativeTemplate && relativeTemplate?.page?.block?.length > 0){
      return relativeTemplate?.page?.block?.length
    }

    if(relativeTemplate && relativeTemplate?.blocks?.length > 0){
      return relativeTemplate?.blocks
    }

    return []
  },
  async findWithNoProducts(query) {
    const filters = query?.id && ({
      where: {
        $and: [
          {
            productIds: {
              $null: true,
            },
          },
          {
            publishedAt: { $notNull: true },
          },
        ],
      },
    })
    return await strapi.db.query('plugin::medusa-product-selector.page').findMany({
      ...filters,
      populate: ['deep']
    })
  },
});
