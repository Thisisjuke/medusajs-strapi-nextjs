export const matchProductFromBlocks = (page, blocksWithProducts) => {
  return page.blocks.find(block => {
    return Object.keys(blocksWithProducts).find(blockName => {
      return block?.__component === blockName && blocksWithProducts[blockName].find(b => b?.id === block?.id)
    }) ? block : null
  }) ? page : null
}
