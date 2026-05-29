import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import node from "@astrojs/node";

export default defineConfig({
  adapter: node({
    mode: 'standalone'
  }),
  integrations: [tailwind({
    configPath: './tailwind.config.js'
  })],
  server: {
    host: '192.168.100.108',
    port: 3000
  }
});
