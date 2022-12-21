import * as React from 'react';
// @ts-ignore
import pluginPkg from '../../package.json'
import { prefixPluginTranslations } from '@strapi/helper-plugin';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';
import Initializer from './components/Initializer';
import PluginIcon from './components/PluginIcon';
import ProductIcon from "./components/Popup/ProductIcon";

const name = pluginPkg.strapi.name;

export default {
  register(app) {
    app.customFields.register({
      name: "collections",
      pluginId: pluginId,
      type: "string",
      intlLabel: {
        id: getTrad('plugin.aaaa'),
        defaultMessage: 'Medusa Collections Selector',
      },
      intlDescription: {
        id: getTrad('plugin.bbbb'),
        defaultMessage: 'Link collections coming from MedusaJS',
      },
      icon: ProductIcon,
      components: {
        Input: async () => import("./custom-inputs/CollectionSelectorInput"),
      },
    }),
    app.customFields.register({
      name: "products",
      pluginId: pluginId,
      type: "string",
      intlLabel: {
        id: getTrad('plugin.name'),
        defaultMessage: 'Medusa Products Selector',
      },
      intlDescription: {
        id: getTrad('plugin.description'),
        defaultMessage: 'Link products coming from MedusaJS',
      },
      icon: ProductIcon,
      components: {
        Input: async () => import("./custom-inputs/ProductSelectorInput"),
      },
    }),
    app.createSettingSection(
      {
        id: pluginId,
        intlLabel: {
          id: getTrad(`navigation.title`),
          defaultMessage: 'Medusa Products',
        },
      },
      [
        {
          intlLabel: {
            id: getTrad(`settings-page.navigation`),
            defaultMessage: 'API Settings',
          },
          id: 'settings',
          to: `/settings/${pluginId}`,
          Component: async () => {
            return import('./pages/SettingsPage');
          },
        },
      ]
    );
    app.addMenuLink({
      to: `/plugins/${pluginId}`,
      icon: PluginIcon,
      intlLabel: {
        id: getTrad(`navigation.title`),
        defaultMessage: 'Medusa Products',
      },
      Component: async () => {
        const component = await import(/* webpackChunkName: "[request]" */ './pages/App');

        return component;
      },
      permissions: [
        // Uncomment to set the permissions of the plugin here
        // {
        //   action: '', // the action name should be plugin::plugin-name.actionType
        //   subject: null,
        // },
      ],
    });
    const plugin = {
      id: pluginId,
      initializer: Initializer,
      isReady: false,
      name,
    };

    app.registerPlugin(plugin);
  },

  bootstrap(app) {},
  async registerTrads(app) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      locales.map(locale => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
