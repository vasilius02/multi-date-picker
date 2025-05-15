# Multi Date Picker

> A Strapi custom field plugin that allows selection of multiple individual dates.

[![NPM Version](https://img.shields.io/npm/v/multi-date-picker.svg)](https://www.npmjs.com/package/multi-date-picker)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## 📋 Overview

The Multi Date Picker plugin adds a new custom field type to your Strapi application, allowing content editors to select and manage multiple individual dates. This is particularly useful for scenarios like:

- Event calendars with multiple dates
- Booking systems with available dates
- Publication schedules
- Any content type that requires multiple date selections

## 🔧 Requirements

- Strapi v5.0.0 or higher
- Node.js 18.x, 20.x, or 22.x
- npm 6.0.0 or higher

## ⚡ Installation
```bash
# Using npm
npm install @vasild/multi-date-picker

# Using yarn
yarn add @vasild/multi-date-picker

# Using pnpm
pnpm add @vasild/multi-date-picker
```

## 🚀 Usage

1. **Create or edit a content type** in your Strapi application
2. **Add a new custom field** and select "Multi Date Picker" from the list
3. **Configure the field** as needed (required, private, etc.)
4. **Save your content type**

Now when creating or editing entries, content editors will be able to select multiple dates using the date picker interface.

## ✨ Features

- User-friendly date picker interface
- Add and remove dates easily
- Dates stored as a JSON array for easy querying and manipulation
- Full compatibility with Strapi's validation and permissions system
- Responsive design for all screen sizes

## 💻 API Reference

### Data Structure

The field stores dates as a JSON array of strings in ISO format (YYYY-MM-DD):

```json
["2025-05-01", "2025-05-15", "2025-05-30"]
```

### Component Props

The `MultiDate` component accepts the following props:

| Prop | Type | Description |
|------|------|-------------|
| `name` | string | Field name |
| `onChange` | function | Callback when value changes |
| `value` | string\|string[] | Current value(s) |
| `hint` | string | Helper text shown below the input |
| `required` | boolean | Whether the field is required |
| `labelAction` | React.ReactNode | Custom action displayed next to the label |
| `label` | string | Field label |
| `disabled` | boolean | Whether the field is disabled |
| `error` | string | Error message |
| `placeholder` | string | Placeholder shown in date picker |

## 🎨 Styling

The plugin uses Strapi's Design System components to maintain a consistent look and feel with the rest of your admin panel.

### Query example with Strapi API

```javascript
// Get entries with a specific date
const entries = await strapi.entityService.findMany('api::event.event', {
  filters: {
    dates: {
      $containsi: '2025-05-01'
    }
  }
});
```

## 🤝 Contributing

Contributions, issues, and feature requests are welcome! Feel free to check the [issues page](https://github.com/vasilius02/multi-date-picker/issues).

### Development

To contribute to this plugin:

1. Clone the repository
2. Install dependencies with `npm install`
3. Run development server with `npm run watch`
4. Build with `npm run build`

## 📝 License

This project is [MIT](https://opensource.org/licenses/MIT) licensed.

## ✨ Author

- Vasil Derilov ([@vasilius02](https://github.com/vasilius02))

---

Built with ❤️ for the Strapi community.