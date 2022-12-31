const findProductPages = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('pages').findAllProductPagesUsingProductId(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}
const findEditorialPages = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('pages').findAllEditorial(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

const findCollectionPages = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('pages').findAllCollectionPagesUsingCollectionId(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  findCollectionPages,
  findEditorialPages,
  findProductPages,
}
