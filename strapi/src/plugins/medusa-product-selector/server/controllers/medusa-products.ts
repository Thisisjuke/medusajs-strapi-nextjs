const findAll = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('medusaProducts').find(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

const findAllWithStatus = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('medusaProducts').findAllWithStatus(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}


export default {
  findAll,
  findAllWithStatus
}
