// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import svelte from '@astrojs/svelte';
import vue from '@astrojs/vue';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  integrations: [react(), svelte(), vue()],
  output: 'static',
  vite: {
    ssr: {
      noExternal: ['@markdown-ui/react', '@markdown-ui/svelte', '@markdown-ui/vue', '@markdown-ui/marked-ext', 'marked']
    },
    optimizeDeps: {
      exclude: ['@markdown-ui/react', '@markdown-ui/svelte', '@markdown-ui/vue', '@markdown-ui/marked-ext', '@markdown-ui/mdui-lang']
    },
    plugins: [tailwindcss()]
  }
});