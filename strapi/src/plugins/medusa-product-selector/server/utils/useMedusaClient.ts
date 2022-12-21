import Medusa from "@medusajs/medusa-js";

const getPluginStore = () => {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'medusa-product-selector',
  });
}

export const useMedusaClient = async () => {
  const pluginStore = getPluginStore();
  const config = await pluginStore.get({ key: 'settings' });

  const medusa = new Medusa({ baseUrl: config.medusaServerBaseUrl, maxRetries: 3 })
  return medusa
}


