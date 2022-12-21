import {revalidateFrontendPages} from "../../utils/webhooks";

export default {
  afterCreate: async (entry) => {
    await revalidateFrontendPages(entry)
  },

  afterUpdate: async (entry) => {
    await revalidateFrontendPages(entry)
  },

  afterDelete: async (entry) => {
    await revalidateFrontendPages(entry)
  }
}
