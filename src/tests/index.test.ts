import { HtmlTagObject, HtmlTags, LoadContext } from "@docusaurus/types";
import plugin, { PluginOptions } from "../index";

describe("docusaurus-plugin-segment", () => {
  const fakeOptions: PluginOptions = {
    writeKey: "THE WRITE KEY",
  };

  let previousNodeEnv: any;

  beforeEach(() => {
    previousNodeEnv = process.env.NODE_ENV;
  });

  afterEach(() => {
    process.env.NODE_ENV = previousNodeEnv;
  });

  test("getClientModules returns an empty array if not prod", () => {
    process.env.NODE_ENV = "dev";
    const result = plugin({} as unknown as LoadContext, fakeOptions);
    expect(
      result.getClientModules ? result.getClientModules() : undefined
    ).toEqual([]);
  });

  test("getClientModules returns an empty array if writeKey is empty", () => {
    process.env.NODE_ENV = "production";
    const result = plugin({} as unknown as LoadContext, { writeKey: "" });
    expect(
      result.getClientModules ? result.getClientModules() : undefined
    ).toEqual([]);
  });

  test("getClientModules returns the segment client script", () => {
    process.env.NODE_ENV = "production";
    const result = plugin({} as unknown as LoadContext, fakeOptions);
    expect(
      result.getClientModules ? result.getClientModules() : undefined
    ).toEqual(["./segment"]);
  });

  test("injectHtmlTags returns an empty object if not prod", () => {
    process.env.NODE_ENV = "dev";
    const result = plugin({} as unknown as LoadContext, fakeOptions);
    expect(
      result.injectHtmlTags
        ? result.injectHtmlTags({ content: null })
        : undefined
    ).toEqual({});
  });

  test("injectHtmlTags returns an empty object if writeKey is empty", () => {
    process.env.NODE_ENV = "production";
    const result = plugin({} as unknown as LoadContext, { writeKey: "" });
    expect(
      result.injectHtmlTags
        ? result.injectHtmlTags({ content: null })
        : undefined
    ).toEqual({});
  });

  test("injectHtmlTags injects the writeKey correctly", () => {
    process.env.NODE_ENV = "production";
    const result = plugin({} as unknown as LoadContext, fakeOptions);
    const headTags: HtmlTags | undefined = result.injectHtmlTags
      ? result.injectHtmlTags({ content: null })?.headTags
      : undefined;

    expect(
      (headTags as HtmlTagObject[])?.[0]?.innerHTML?.includes(
        `analytics.load("${fakeOptions.writeKey}");`
      )
    ).toBeTruthy();
  });
});
