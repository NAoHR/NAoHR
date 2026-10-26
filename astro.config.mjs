// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://naohr.site",
  integrations: [mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // defaultColor: false emits both themes as CSS variables only;
      // prose.css picks one with light-dark(), so highlighting follows the
      // site theme without shipping any JS.
      themes: { light: "github-light", dark: "github-dark" },
      defaultColor: false,
      wrap: true,
    },
  },
});
