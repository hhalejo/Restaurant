import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// Asegúrate de importar tailwindcss
import tailwindcss from 'tailwindcss';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      plugins: [tailwindcss],
    },
  },
});
