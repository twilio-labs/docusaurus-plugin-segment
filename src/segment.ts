import type { ClientModule } from "@docusaurus/types";

const clientModule: ClientModule = {
  onRouteDidUpdate({ location, previousLocation }) {
    if (
      previousLocation &&
      (location.pathname !== previousLocation.pathname ||
        location.search !== previousLocation.search ||
        location.hash !== previousLocation.hash)
    ) {
      // Integration with https://github.com/cmfcmf/docusaurus-search-local
      const searchTerms = location?.state?.cmfcmfhighlight?.terms;
      if (!searchTerms) {
        window.analytics.page({
          path: location.pathname,
          search: location.search,
          url:
            document.location.origin +
            location.pathname +
            location.search +
            location.hash,
          referrer: previousLocation
            ? document.location.origin +
              previousLocation.pathname +
              previousLocation.search +
              previousLocation.hash
            : undefined,
        });
      } else {
        // Apparently, this triggers a page view as well
        // Not documented, but have consistently observed it
        window.analytics.track("Search Result Viewed", {
          category: "Search",
          label: window.location.pathname,
          properties: {
            query: searchTerms.join(" "),
          },
        });
      }
    }
  },
};

export default clientModule;
