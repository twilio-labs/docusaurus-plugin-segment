import ExecutionEnvironment from "@docusaurus/core/lib/client/exports/ExecutionEnvironment";

if (ExecutionEnvironment.canUseDOM) {
  // The following is for integrating with https://github.com/cmfcmf/docusaurus-search-local
  let searchInput, timeout: NodeJS.Timeout | undefined;

  function processEvent(event: Event): void {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const query = (event?.target as HTMLInputElement)?.value.trim();
      if (query) {
        window.analytics.track("Searched", {
          category: "Search",
          label: window.location.pathname,
          properties: {
            query,
          },
        });
      }
    }, 1000);
  }

  function checkSearchInput() {
    searchInput = document.querySelector("input[type=search]");
    if (searchInput) {
      searchInput.addEventListener("input", processEvent);
      return true;
    }

    return false;
  }

  if (!checkSearchInput()) {
    // We need to wait until it gets added to the DOM
    const observer = new MutationObserver(() => {
      if (checkSearchInput()) {
        observer.disconnect();
      }
    });

    observer.observe(document.body, {
      subtree: false,
      childList: true,
    });
  }
}

export {};
