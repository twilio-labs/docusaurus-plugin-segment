import { Joi } from "@docusaurus/utils-validation";
import type {
  LoadContext,
  Plugin,
  OptionValidationContext,
} from "@docusaurus/types";
import type { PluginOptions, Options } from "./options";

export default function pluginSegment(
  context: LoadContext,
  options: PluginOptions
): Plugin {
  const { writeKey } = options;
  const isProd = process.env.NODE_ENV === "production";

  return {
    name: "docusaurus-plugin-segment",

    getClientModules() {
      return isProd && writeKey ? ["./segment"] : [];
    },

    injectHtmlTags() {
      if (!isProd || !writeKey) {
        return {};
      }
      return {
        headTags: [
          {
            tagName: "script",
            innerHTML: `
                !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on","addSourceMiddleware","addIntegrationMiddleware","setAnonymousId","addDestinationMiddleware"];analytics.factory=function(e){return function(){var t=Array.prototype.slice.call(arguments);t.unshift(e);analytics.push(t);return analytics}};for(var e=0;e<analytics.methods.length;e++){var key=analytics.methods[e];analytics[key]=analytics.factory(key)}analytics.load=function(key,e){var t=document.createElement("script");t.type="text/javascript";t.async=!0;t.src="https://cdn.segment.com/analytics.js/v1/" + key + "/analytics.min.js";var n=document.getElementsByTagName("script")[0];n.parentNode.insertBefore(t,n);analytics._loadOptions=e};analytics._writeKey="${writeKey}";analytics.SNIPPET_VERSION="4.13.2";
                analytics.load("${writeKey}");
                analytics.page();
                var c = document.cookie.split("; ").filter(c => c.startsWith("client_id="));
                if (c.length > 0) {
                  var clientId = decodeURIComponent(c[0].split("=")[1]).split("|");
                  analytics.identify(clientId[0], { email: clientId[1] });
                }
                }}();
             `,
          },
        ],
      };
    },
  };
}

const pluginOptionsSchema = Joi.object<PluginOptions>({
  writeKey: Joi.string().required(),
});

export function validateOptions({
  validate,
  options,
}: OptionValidationContext<Options, PluginOptions>): PluginOptions {
  return validate(pluginOptionsSchema, options);
}

export type { PluginOptions, Options };
