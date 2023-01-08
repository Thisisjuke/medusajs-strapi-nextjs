import templateSchema from './template'
import {generatePageAttributes} from "./common/page-attributes";
import lifecycles from "./common/lifecycles";

export default {
  'editorial-page': {
    lifecycles,
    schema: generatePageAttributes({
      collectionName: "editorial-page",
      withCollections: false,
      withProducts: false,
      info: {
        "singularName": "editorial-page",
        "pluralName": "editorial-pages",
        "displayName": "Editorial Page"
      },
      attributes:{
        "slug": {
          "type": "string",
          "unique": true,
          "required": true
        },
        "template": {
          "type": "relation",
          "relation": "manyToOne",
          "target": "plugin::medusa-product-selector.template",
          "inversedBy": "editorial_pages"
        }
      }
    })
  },
  'collection-page': {
    lifecycles,
    schema: generatePageAttributes({
      collectionName: "collection-page",
      withProducts: false,
      info: {
        "singularName": "collection-page",
        "pluralName": "collection-pages",
        "displayName": "Collection Page"
      },
      attributes: {
        "template": {
          "type": "relation",
          "relation": "manyToOne",
          "target": "plugin::medusa-product-selector.template",
          "inversedBy": "collection_pages"
        }
      }
    })
  },
  'product-page': {
    lifecycles,
    schema: generatePageAttributes({
      collectionName: "product-page",
      info: {
        "singularName": "product-page",
        "pluralName": "product-pages",
        "displayName": "Product Page"
      },
      attributes: {
        "template": {
          "type": "relation",
          "relation": "manyToOne",
          "target": "plugin::medusa-product-selector.template",
          "inversedBy": "product_pages"
        }
      }
    })
  },
  'template': templateSchema
};
