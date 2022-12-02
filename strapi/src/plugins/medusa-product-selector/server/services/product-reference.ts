import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => ({
  async find(query) {
    console.log('yo !')
    return {}
    //return await strapi.entityService.findMany('plugin:productReference.productReference', query)
  },
});
