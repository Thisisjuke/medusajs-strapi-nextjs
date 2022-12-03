import { Strapi } from '@strapi/strapi';
import Medusa from "@medusajs/medusa-js"

const getPluginStore = () => {
  return strapi.store({
    environment: '',
    type: 'plugin',
    name: 'medusa-product-selector',
  });
}

const createDefaultConfig = async () => {
  const pluginStore = getPluginStore();
  const value = {
    medusaServerBaseUrl: process.env.MEDUSA_SERVER_BASE_URL || null,
    isLoadedFromConfig: !!process.env.MEDUSA_SERVER_BASE_URL
  };
  await pluginStore.set({ key: 'settings', value });

  return pluginStore.get({ key: 'settings' });
}

export default ({ strapi }: { strapi: Strapi }) => ({
  async find() {
    const pluginStore = getPluginStore();
    const config = await pluginStore.get({ key: 'settings' });

    console.log(config.medusaServerBaseUrl)

    const medusa = new Medusa({ baseUrl: config.medusaServerBaseUrl, maxRetries: 3 })
    const products = await medusa.products.list()
    const { response, ...data } = products;

    return data
  },
  async getSettings() {
    const pluginStore = getPluginStore();
    let config = await pluginStore.get({ key: 'settings' });
    if (!config) {
      config = await createDefaultConfig();
    }

    return config;
  },
  async setSettings(settings) {
    const value = settings;
    const pluginStore = getPluginStore();
    const config = pluginStore.get({ key: 'settings', value })
    if(config.isLoadedFromConfig){
      return config
    }
    await pluginStore.set({ key: 'settings', value });

    return pluginStore.get({ key: 'settings' });
  },
});
