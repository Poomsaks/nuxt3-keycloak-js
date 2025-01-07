// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  extends: ['@nuxt/ui-pro'],
  ssr: false,
  devtools: { enabled: true },
  devServer: {
    host: '0.0.0.0',
    port: 3000
  },
  runtimeConfig: {
    // Public runtime config
    public: {
      apiUrl: process.env.API_URL,
      keycloakUrl: process.env.KEYCLOAK_ISSUER,
      keycloakClientId: process.env.KEYCLOAK_ID,
      keycloakRealm: process.env.KEYCLOAK_REALM,
    },
    // Private runtime config (server side only)
    private: {
      apiUrl: process.env.API_URL
    }
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxtjs/fontaine',
    '@nuxtjs/i18n',
    '@nuxtjs/google-fonts',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@nuxtjs/tailwindcss',
    '@nuxt/icon'
  ],
  plugins: [
    '~/plugins/fetch.ts',
    '~/plugins/keycloak.client.ts',
  ],

  ui: {
    // icons: ['heroicons', 'simple-icons'],
    safelistColors: ['primary', 'red', 'orange', 'green']
  },
  components: [{
    path: '~/components'
  }, {
    // path: '~/components/common',
    pathPrefix: false
  }],
  // Fonts
  fontMetrics: {
    fonts: ['DM Sans']
  },
  googleFonts: {
    display: 'swap',
    download: true,
    families: {
      'DM+Sans': [300, 400, 500, 600, 700]
    }
  },
  i18n: {
    vueI18n: '~/i18n.config.ts' // if you are using custom path, default
  },
  routeRules: {
    // Temporary workaround for prerender regression. see https://github.com/nuxt/nuxt/issues/27490
    '/': { prerender: true }
  },

  future: {
    compatibilityVersion: 4
  },
  compatibilityDate: "2024-08-22",
  typescript: {
    strict: false
  },
  // vite: {
  //   css: {
  //     postcss: false
  //   }
  // },
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  }
})