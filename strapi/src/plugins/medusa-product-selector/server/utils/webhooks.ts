const axios = require('axios');

const sendRevalidate = async (urls, payload) => {
  console.log(payload)
  for (const url of urls) {
    try{
      await axios.post(url, payload)
    } catch(e) {
      throw new Error(e)
    }
  }
}

export const revalidateFrontendPages = async (entry) => {
  const {webhooksUrl} = await strapi.plugin('medusa-product-selector').service('medusaSettings').getSettings()

  const resourceType = entry?.model?.uid
  const resource = entry?.result

  const revalidate = {
    slugs: [],
    productIds: [],
    collectionIds: [],
  }

  try {
    if(resourceType.includes('editorial-page')){
      revalidate.slugs.push(resource.slug)
    }
    if(resourceType.includes('product-page')){
      const c = JSON.parse(resource?.collectionIds)
      if(c){
        revalidate.collectionIds.push(...c)
      }
      const p = JSON.parse(resource?.productIds)
      if(p){
        revalidate.productIds.push(...p)
      }
    }
    if(resourceType.includes('collection-page')){
      const c = JSON.parse(resource?.collectionIds)
      if(c){
        revalidate.collectionIds.push(...c)
      }
    }
    if(resourceType.includes('template')){
      const template = await strapi.plugin('medusa-product-selector').service('templates').findById(resource.id)

      if(template['collection_pages']){
        template['collection_pages'].map(page => {
          const c = JSON.parse(page?.collectionIds)
          if(c){
            revalidate.collectionIds.push(...c)
          }
        })
      }
      if(template['editorial_pages']){
        template['editorial_pages'].map(page => {
          revalidate.slugs.push(page.slug)
        })
      }
      if(template['product_pages']){
        template['product_pages'].map(page => {
          const c = JSON.parse(page?.collectionIds)
          if(c){
            revalidate.collectionIds.push(...c)
          }
          const p = JSON.parse(page?.productIds)
          if(p){
            revalidate.productIds.push(...p)
          }
        })
      }
    }

    if(!Object.values(revalidate).every(val => val.length === 0)){
      Object.keys(revalidate).forEach(val => {
        revalidate[val] = [...new Set(revalidate[val])]
      })
      await sendRevalidate(webhooksUrl, revalidate)
    }

  } catch(e){
    throw new Error(e)
  }
}
