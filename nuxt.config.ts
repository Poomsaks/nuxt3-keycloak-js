// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // devtools: { enabled: true },
  runtimeConfig: {
    public: {
      keycloakUrl: "https://iam.pointit.co.th",
      keycloakRealm: "pointit",
      keycloakClientId: "fe",
    },
  },

  compatibilityDate: "2024-08-22",
})