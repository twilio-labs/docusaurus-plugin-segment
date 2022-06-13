/// <reference types="@docusaurus/module-type-aliases" />

interface Window {
  analytics: {
    page: (detail: {
      path: string;
      search: string;
      url: string;
      referrer: string | undefined;
    }) => void;
    track: (
      event: string,
      detail: {
        category: string;
        label: string;
        properties: {
          query: string;
        };
      }
    ) => void;
  };
}
