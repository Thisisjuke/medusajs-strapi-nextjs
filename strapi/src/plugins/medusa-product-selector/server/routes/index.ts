import collectionsRoutes from './collections'
import pagesRoutes from './pages'
import productsRoutes from './products'
import settingsRoutes from './settings'

export default [
  ...collectionsRoutes,
  ...pagesRoutes,
  ...productsRoutes,
  ...settingsRoutes,
];
