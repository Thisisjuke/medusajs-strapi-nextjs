import medusaCollectionsService from './medusa-collections';
import medusaProductsService from './medusa-products';
import medusaSettingsService from './medusa-settings';
import pageService from './pages';
import templatesService from './templates';
import blocksService from './blocks';

export default {
  medusaCollections: medusaCollectionsService,
  medusaProducts: medusaProductsService,
  medusaSettings: medusaSettingsService,
  pages: pageService,
  templates: templatesService,
  blocks: blocksService,
};
