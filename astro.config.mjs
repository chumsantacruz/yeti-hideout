import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import expressiveCode from "astro-expressive-code";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), expressiveCode(), mdx()],
  prefetch: true,
  output: "server",
  adapter: vercel(),
});
