import { PLUGIN_ID } from './pluginId';
import { Initializer } from './components/Initializer';
import CalendarIcon from './components/CalendarIcon';

export default {
  register(app: any) {
    // Register the custom field with string icon
    app.customFields.register({
      name: 'multiDatePicker',
      icon: CalendarIcon,
      pluginId: PLUGIN_ID,
      type: 'json',
      intlLabel: {
        id: `${PLUGIN_ID}.multiDatePicker.label`,
        defaultMessage: 'Multi Date Picker',
      },
      intlDescription: {
        id: `${PLUGIN_ID}.multiDatePicker.description`,
        defaultMessage: 'Select multiple individual dates',
      },
      components: {
        Input: async () => import('./components/MultiDate'),
      },
      options: {
        base: []
      }
    });

    // Register plugin
    app.registerPlugin({
      id: PLUGIN_ID,
      initializer: Initializer,
      isReady: false,
      name: PLUGIN_ID,
    });
  },

  bootstrap() {},

  async registerTrads({ locales }: { locales: string[] }) {
    return Promise.all(
      locales.map(async (locale) => {
        try {
          const { default: data } = await import(`./translations/${locale}.json`);

          return { data, locale };
        } catch {
          return { data: {}, locale };
        }
      })
    );
  },
};
