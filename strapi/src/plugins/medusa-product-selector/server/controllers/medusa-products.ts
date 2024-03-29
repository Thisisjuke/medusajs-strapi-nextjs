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

const findAllWithRelationDetails = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('medusaProducts').findAllWithRelationDetails(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

const findWithBlockDetails = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('blocks').findProductInBlocks(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

export default {
  findAll,
  findAllWithStatus,
  findAllWithRelationDetails,
  findWithBlockDetails
}
