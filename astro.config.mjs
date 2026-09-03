// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://naohr.vercel.app",
  integrations: [react(), mdx(), sitemap()],
  markdown: {
    shikiConfig: {
      // Both themes are emitted; blog.css swaps them via CSS custom properties,
      // so highlighting follows the site theme without shipping any JS.
      themes: { light: "github-light", dark: "github-dark" },
      wrap: true,
    },
  },
});
