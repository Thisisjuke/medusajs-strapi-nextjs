import {revalidateFrontendPages} from "../../utils/webhooks";

export default {
  afterCreate: async (entry) => {
    await revalidateFrontendPages(entry?.model?.uid, entry?.result)
  },
  afterUpdate: async (entry) => {
    await revalidateFrontendPages(entry?.model?.uid, entry?.result)
  },
  beforeUpdate: async (entry) => {
    const resource = await strapi.db.query(entry.model.uid).findOne({
      where: entry.params.where,
      populate: ['deep']
    })
    await revalidateFrontendPages(entry?.model?.uid, resource)
  },
  beforeDelete: async (entry) => {
    await revalidateFrontendPages(entry?.model?.uid, entry?.result)
  },
}
