import { defineConfig } from 'vite'
import RubyPlugin from 'vite-plugin-ruby'
import path from "path"
import react from '@vitejs/plugin-react';
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [
    RubyPlugin(),
    react(),
    vue(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "app/javascript"),
    },
  },
})
