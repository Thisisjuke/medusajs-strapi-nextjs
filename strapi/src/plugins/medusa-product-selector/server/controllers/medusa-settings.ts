const SERVICE_NAME = 'medusaSettings'

const getSettings = async (ctx) => {
  try {
    ctx.body = await strapi.plugin('medusa-product-selector').service(SERVICE_NAME).getSettings(ctx);
  } catch (err) {
    ctx.throw(500, err);
  }
}

const setSettings = async (ctx) => {
  const { body } = ctx.request;
  try {
    await strapi.plugin('medusa-product-selector').service(SERVICE_NAME).setSettings(body)
    ctx.body = await strapi.plugin('medusa-product-selector').service(SERVICE_NAME).getSettings(ctx);
  } catch (err) {
    ctx.throw(500, err);
  }
}

export default {
  getSettings,
  setSettings,
}
