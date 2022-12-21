const findAll = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('templates').findAll(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

const findTemplateForCollection = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('templates').findTemplateForCollection(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

const findTemplateForProduct = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('templates').findTemplateForProduct(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  findAll,
  findTemplateForCollection,
  findTemplateForProduct,
}
