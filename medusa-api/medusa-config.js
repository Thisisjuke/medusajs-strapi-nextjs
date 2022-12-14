const dotenv = require('dotenv')

let ENV_FILE_NAME = '';
switch (process.env.NODE_ENV) {
	case 'production':
		ENV_FILE_NAME = '.env.production';
		break;
	case 'staging':
		ENV_FILE_NAME = '.env.staging';
		break;
	case 'test':
		ENV_FILE_NAME = '.env.test';
		break;
	case 'development':
	default:
		ENV_FILE_NAME = '.env';
		break;
}

try {
	dotenv.config({ path: process.cwd() + '/' + ENV_FILE_NAME });
} catch (e) {
	console.log(`${ENV_FILE_NAME} not found. Check your 'medusa-config.js' file.`)
}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:3000";

// Database URL (here we use a local database called medusa-development)
const DATABASE_URL = process.env.DATABASE_URL

// Medusa uses Redis, so this needs configuration as well
const REDIS_URL = process.env.REDIS_URL

// Stripe keys
const STRIPE_API_KEY = process.env.STRIPE_API_KEY || "";
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET || "";

// This is the place to include plugins. See API documentation for a thorough guide on plugins.
const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
	/*{
		resolve: 'medusa-source-shopify-json',
		options: {
			json:{
				products_path: './schemas/products.json',
				custom_collections_path: './schemas/custom_collections.json',
				smart_collections_path: './schemas/smart_collections.json',
				collects_path: './schemas/collects.json',
			},
		}
	},*/
  // Uncomment to add Stripe support.
  // You can create a Stripe account via: https://stripe.com
  // {
  //   resolve: `medusa-payment-stripe`,
  //   options: {
  //     api_key: STRIPE_API_KEY,
  //     webhook_secret: STRIPE_WEBHOOK_SECRET,
  //   },
  // },
];

module.exports = {
  projectConfig: {
    database_type: "postgres",
    database_url: DATABASE_URL,
    redis_url: REDIS_URL,
    store_cors: STORE_CORS,
    admin_cors: ADMIN_CORS,
    jwt_secret: process.env.JWT_SECRET,
	cookie_secret: process.env.COOKIE_SECRET,
  },
  plugins,
};
