const findAll = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('medusaCollection').find(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  findAll
}
