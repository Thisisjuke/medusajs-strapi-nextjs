import { Strapi } from '@strapi/strapi';
import {useMedusaClient} from "../utils/useMedusaClient";

export default ({ strapi }: { strapi: Strapi }) => ({
  async find() {
    const medusa = await useMedusaClient()
    const productsList = await medusa.products.list()
    const { response, ...data } = productsList;

    return data
  },
  async findAllWithStatus() {
    const medusa = await useMedusaClient()
    const productsList = await medusa.products.list()
    const { response, ...data } = productsList;

    const products = []

    for (const product of data?.products) {
      let obj = product as any
      const data = await strapi.db.query('plugin::medusa-product-selector.page').findOne({
        where: {
          productIds: {
            $contains: product?.id,
          },
        },
      })
      if (data !== null) {
        obj = {...product, isAlreadyUsed: data.id}
      }
      products.push(obj)
    }

    data.products = products

    return data
  },
  async findAllWithRelationDetails() {
    const medusa = await useMedusaClient()
    const productsList = await medusa.products.list()
    const { response, ...data } = productsList;

    const {collections} = await strapi.plugin('medusa-product-selector').service('medusaCollections').findAllWithStatus()

    const products = []

    for (const product of data?.products) {
      let obj = product as any
      const data = await strapi.db.query('plugin::medusa-product-selector.page').findMany({
        where: {
          productIds: {
            $contains: product?.id,
          },
        },
      })
      if (data !== null) {
        obj = {...product, relatedPages: data}
      }
      for (const collection of collections) {
        if(collection.id === product.collection_id){
          const c = await strapi.db.query('plugin::medusa-product-selector.page').findMany({
            where: {
              collectionIds: {
                $contains: collection?.id,
              },
            },
          })
          if (c !== null) {
            obj['relatedCollections'] = c
          }
        }
      }
      products.push(obj)
    }

    data.products = products

    return data
  }
});
