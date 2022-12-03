const findAll = async (ctx) => {
  try{
    return await strapi.plugin('medusa-product-selector').service('medusaProducts').find(ctx.query)
  } catch (e) {
    ctx.throw(500, e)
  }
}

const getSettings = async (ctx) => {
  try {
    ctx.body = await strapi.plugin('medusa-product-selector').service('medusaProducts').getSettings(ctx);
  } catch (err) {
    ctx.throw(500, err);
  }
}

const setSettings = async (ctx) => {
  const { body } = ctx.request;
  try {
    await strapi.plugin('medusa-product-selector').service('medusaProducts').setSettings(body)
    ctx.body = await strapi.plugin('medusa-product-selector').service('medusaProducts').getSettings(ctx);
  } catch (err) {
    ctx.throw(500, err);
  }
}

export default {
  getSettings,
  setSettings,
  findAll
}
