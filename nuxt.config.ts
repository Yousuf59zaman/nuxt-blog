// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    '@nuxtjs/tailwindcss',
    '@primevue/nuxt-module',
    '@nuxt/image'
  ],

  primevue: {
    options: {
      ripple: true,
      inputVariant: 'filled',
      theme: {
        preset: 'Aura'
      }
    }
  },

  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  app: { head: { title: 'Nuxt Blog' } }
})
