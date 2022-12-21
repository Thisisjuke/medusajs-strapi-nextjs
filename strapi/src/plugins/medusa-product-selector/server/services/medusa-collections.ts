import { Strapi } from '@strapi/strapi';
import {useMedusaClient} from "../utils/useMedusaClient";

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll() {
    const medusa = await useMedusaClient()

    const productsList = await medusa.collections.list()
    const { response, ...data } = productsList;

    return data
  },
  async findAllWithStatus() {
    const medusa = await useMedusaClient()
    const productsList = await medusa.collections.list()
    const { response, ...data } = productsList;

    const collections = []

    for (const collection of data?.collections) {
      let obj = collection as any
      const data = await strapi.db.query('plugin::medusa-product-selector.page').findOne({
        where: {
          $and: [
            {
              collectionIds: {
                $contains: collection?.id,
              },
            },
            {
              publishedAt: { $notNull: true },
            },
          ],
        },
      })
      if (data !== null) {
        obj = {...collection, isAlreadyUsed: data.id}
      }
      collections.push(obj)
    }

    data.collections = collections

    return data
  }
});
