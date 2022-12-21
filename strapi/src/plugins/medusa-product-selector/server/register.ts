import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'products',
    plugin: 'medusa-product-selector',
    type: 'string',
  });
  strapi.customFields.register({
    name: 'collections',
    plugin: 'medusa-product-selector',
    type: 'string',
  });
};
