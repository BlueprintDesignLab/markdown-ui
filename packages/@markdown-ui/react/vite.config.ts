import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'MarkdownUIReact',
      fileName: 'index',
      formats: ['es']
    },
    rollupOptions: {
      external: (id) => {
        return ['react', 'react-dom', 'react/jsx-runtime'].includes(id) || 
               id.startsWith('react/') || 
               id.startsWith('react-dom/')
      }
    }
  }
});