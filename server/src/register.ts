import type { Core } from '@strapi/strapi';

const register = ({ strapi }: { strapi: Core.Strapi }) => {
    strapi.customFields.register({
        name: 'multiDatePicker',
        plugin: 'multi-date-picker',
        type: 'json'
    });
};

export default register;
