const find = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('productReference').find(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  find
}
