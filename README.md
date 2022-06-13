# docusaurus-plugin-segment

Send Docusaurus page view events to [Segment](https://segment.com). This opens up your analytics possibilities to the over [300 different integrations](https://segment.com/catalog/) that Segment provides.

## Installation

```bash
npm install --save @twilio-labs/docusaurus-plugin-segment
```

**Or, if you prefer Yarn:**

```bash
yarn add @twilio-labs/docusaurus-plugin-segment
```

## Configuration

Accepted fields:

| Name               | Type      | Default      | Description                                                              |
| ------------------ | --------- | ------------ | ------------------------------------------------------------------------ |
| `writeKey`         | `string`  | **Required** | The Write Key for your Segment JavaScript source.                        |
| `trackLocalSearch` | `boolean` | `false`      | Whether to track searches made with docusaurus-search-local              |
| `allowedInDev`     | `boolean` | `false`      | Whether to allow tracking in development mode in addition to production. |

To find your write key:

1. [Login to Segment](https://app.segment.com/login/)
2. Click on **Connections**
3. Open your **JavaScript** source. (If you don't have one, click **Add Source** to add one.)
4. Choose the **Settings** tab
5. Click **API Keys**
6. You will find the **Write Key** on this page.

### Example configuration

#### docusaurus.config.js

```js
  plugins: [
    [
      "@twilio-labs/docusaurus-plugin-segment",
      {
        writeKey: "3EBOWfRPv8qwertyZXCvbnMAsD2f1g0H",
        allowedInDev: false,
      },
    ],
  ],
```

## Other features

Beyond sending page views to Segment, this plugin also supports sending search queries made using the [docusaurus-search-local](https://github.com/cmfcmf/docusaurus-search-local) plugin.

It also supports identifying users on your system, should you have identity, by inspecting a cookie named `client_id` and expecting it to have the format of `<unique id>|<email>` (a unique identifier and email address, separated by the pipe character).

## About Segment

This plugin is leveraging Segment's [Analytics.js 2.0](https://segment.com/docs/connections/sources/catalog/libraries/website/javascript/) JavaScript client (called a "source").
