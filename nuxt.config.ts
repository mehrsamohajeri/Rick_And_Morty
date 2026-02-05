export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },
  modules: ['@nuxtjs/tailwindcss'],
  ssr: true,
  app: {
    head: {
      title: 'Rick and Morty - Characters',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Browse Rick and Morty characters' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://rickandmortyapi.com' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      apiBase: 'https://rickandmortyapi.com/api'
    }
  }
})
