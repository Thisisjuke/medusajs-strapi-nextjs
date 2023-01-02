export const generatePageAttributes = ({
  collectionName,
  info = {},
  attributes = {},
  withProducts = true,
  withCollections = true
}) => {

  return ({
    kind: "collectionType",
    collectionName,
    info,
    options: {
      draftAndPublish: true,
      comment: ""
    },
    pluginOptions: {
      "content-manager": {
        visible: true
      },
      "content-type-builder": {
        visible: true
      }
    },
    attributes: {
      ...attributes,
      name: {
        type: "string",
        unique: true,
        required: true
      },
      template: {
        type: "relation",
        relation: "oneToMany",
        target: "plugin::medusa-product-selector.template",
        mappedBy: "page"
      },
      ...(withCollections && {
        collectionIds: {
          type: "customField",
          customField: "plugin::medusa-product-selector.collections"
        }
      }),
      ...(withProducts && {
        productIds: {
          type: "customField",
          customField: "plugin::medusa-product-selector.products"
        },
      }),
      blocks: {
        type: "dynamiczone",
        components: [
          "block.headings-block",
          "block.cta-image-block",
          "block.products-row-block"
        ],
        min: 1
      }
    }
  });
}
