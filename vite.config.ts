import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { join, resolve } from 'path';
import UnoCSS from 'unocss/vite';

export default defineConfig({
  resolve: {
    alias: {
      '@/*': resolve(join(process.cwd(), 'src'))
    }
  },
  plugins: [react(), UnoCSS()]
});
