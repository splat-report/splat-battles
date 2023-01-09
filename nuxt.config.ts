export default defineNuxtConfig({
  ssr: false,

  runtimeConfig: {
    public: {
      COMMIT_REF: process.env.COMMIT_REF || 'xxdevxx',
    },
  },

  nitro: {
    devProxy: {
      '/api/': {
        target: 'http://API-MUST-BE-SERVED-BY-NETLIFY-DEV-PORT-8888.test',
      },
    },
  },

  css: [
    "~/assets/default.scss",
  ],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
});
