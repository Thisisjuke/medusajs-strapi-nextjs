import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'products',
    plugin: 'medusa-product-selector',
    type: 'string',
  });
};
