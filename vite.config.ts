import { defineConfig } from 'vite'
import { resolve } from 'path'
import vue from '@vitejs/plugin-vue'
import vueI18n from '@intlify/vite-plugin-vue-i18n'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag =>
            tag.startsWith('n-') ||
            tag.startsWith('md-') ||
            tag.startsWith('a-') ||
            tag.startsWith('ion-') ||
            tag.startsWith('fa-') ||
            tag.startsWith('ta-') ||
            tag.startsWith('fl-'),
        },
      },
    }),
    vueI18n({
      include: resolve(__dirname, 'src/locales/**'),
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  base: '/',
  server: {
    port: 4000,
    open: false,
  },
})
