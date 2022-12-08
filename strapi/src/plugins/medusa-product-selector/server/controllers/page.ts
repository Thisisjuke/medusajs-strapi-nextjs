const findProductPages = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('page').findWithId(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}
const findEditorialPages = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('page').findWithNoProducts(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  findEditorialPages,
  findProductPages,
}
