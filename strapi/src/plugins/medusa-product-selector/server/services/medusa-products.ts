import { Strapi } from '@strapi/strapi';
import {useMedusaClient} from "../utils/useMedusaClient";

const PRODUCTS_PER_PAGE = 12

const getFilters = (params) => {
  const filters = {
    limit: PRODUCTS_PER_PAGE
  }
  if(params.collectionId){
    filters['collection_id'] = [params.collectionId]
  }
  if(params.searchText && params.searchText != ''){
    filters['q'] = params.searchText
  }
  if(params.page && Number.isInteger(parseInt(params.page))){
    filters['offset'] = (parseInt(params.page) - 1) * PRODUCTS_PER_PAGE
  }

  return filters
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async find() {
    const medusa = await useMedusaClient()
    const productsList = await medusa.products.list()
    const { response, ...data } = productsList;

    return data
  },
  async findAllWithStatus(query) {
    const filters = getFilters(query)

    const medusa = await useMedusaClient()
    const productsList = await medusa.products.list(filters)
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
  async findAllWithRelationDetails(query) {
    const filters = getFilters(query)

    const medusa = await useMedusaClient()
    const productsList = await medusa.products.list(filters)
    const { response, ...data } = productsList;
    const productsData = data.products as any

    const {collections} = await strapi.plugin('medusa-product-selector').service('medusaCollections').findAllWithStatus()

    const products = []

    for (const product of productsData) {
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
