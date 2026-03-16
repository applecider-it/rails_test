import { defineConfig } from 'vite';
import RubyPlugin from 'vite-plugin-ruby';
import path from 'path';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [RubyPlugin(), vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'app/javascript'),
    },
  },
});
