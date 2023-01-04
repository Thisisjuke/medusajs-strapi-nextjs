export const revalidateFrontendPages = async (entry) => {
  /*
  - Check the type of resource
   - if editorial page
   - if product page
   - if collection page
   - if template
      - get all collections pages / all product pages / all editorial pages, using this template
   */
  //console.log(entry)

  const resourceType = entry?.model?.uid
  if(resourceType.includes('editorial-page')){

  }
  if(resourceType.includes('product-page')){

  }
  if(resourceType.includes('collection-page')){

  }
  if(resourceType.includes('template')){

  }
}
