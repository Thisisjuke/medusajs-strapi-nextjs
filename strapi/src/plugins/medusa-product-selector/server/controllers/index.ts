import medusaCollectionsController from './medusa-collections';
import medusaSettingsController from './medusa-settings';
import medusaProductsController from './medusa-products';
import pageController from './pages';
import templatesController from './templates';

export default {
  medusaCollections: medusaCollectionsController,
  medusaProducts: medusaProductsController,
  medusaSettings: medusaSettingsController,
  page: pageController,
  templates: templatesController,
};
