import { Strapi } from '@strapi/strapi';
import Medusa from "@medusajs/medusa-js";

const getPluginStore = () => {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'medusa-product-selector',
  });
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async findAll(query) {
    return await strapi.entityService.findMany('plugin::medusa-product-selector.page', query)
  },
  async findWithId(query) {
    /*
    - available blocks in strapi ?
      - yes
        - linked to a template ?
          - yes
            - has blocks ?
              - yes : return blocks
              - no : return template
          - no
            - return blocks or empty
      - no
        - is this product_id in a collection
          - yes
          - linked to a template ?
            - yes
              - has blocks ?
                - yes : return blocks
                - no : return template
            - no
              - return blocks or empty
          - no : return empty
     */
    const productId = query?.id

    if(!productId) return([])

    const filters = productId && ({
      where: {productIds: {
        $contains: query?.id,
    }}})

    const relativePage = await strapi.db.query('plugin::medusa-product-selector.page').findOne({
      ...filters,
      populate: ['deep']
    })

    if(relativePage && relativePage?.blocks?.length > 0){
      console.log('has relative page and blocks',relativePage)
    }

    const pluginStore = getPluginStore();
    const config = await pluginStore.get({ key: 'settings' });

    const medusa = new Medusa({ baseUrl: config.medusaServerBaseUrl, maxRetries: 3 })

    const { product: {collection_id} } = await medusa.products.retrieve(productId) as any

    const template = await strapi.plugin('medusa-product-selector').service('templates').findTemplateForCollection({id: collection_id})
    console.log('template', template)

    if(template && template?.blocks?.length > 0){
      console.log('has collection template and this template has blocks',relativePage)
    }

    console.log(collection_id)

    return []
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
