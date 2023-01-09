import {revalidateFrontendPages} from "../../utils/webhooks";

export default {
  afterCreate: async (entry) => {
    await revalidateFrontendPages(entry)
  },
  afterUpdate: async (entry) => {
    await revalidateFrontendPages(entry)
  },
  beforeUpdate: async (entry) => {
    //console.log(entry)
    //TODO: check integrity of modified element: we have to revalidate elements that has been deleted, not only added
    //await revalidateFrontendPages(entry)
  },
  beforeDelete: async (entry) => {
    await revalidateFrontendPages(entry)
  },
}
