import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

export default defineConfig({
  integrations: [tailwind({
    configPath: './tailwind.config.js'
  })],
});
