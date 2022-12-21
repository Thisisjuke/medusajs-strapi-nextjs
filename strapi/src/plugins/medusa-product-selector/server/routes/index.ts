import collectionsRoutes from './collections'
import pagesRoutes from './pages'
import productsRoutes from './products'
import settingsRoutes from './settings'
import templatesRoutes from './templates'

export default [
  ...collectionsRoutes,
  ...pagesRoutes,
  ...productsRoutes,
  ...settingsRoutes,
  ...templatesRoutes,
];
