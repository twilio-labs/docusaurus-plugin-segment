export type PluginOptions = {
  writeKey: string;
  trackLocalSearch?: boolean;
  allowedInDev?: boolean;
};

export type Options = Partial<PluginOptions>;
