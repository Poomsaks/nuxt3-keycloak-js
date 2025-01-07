// plugins/keycloak.client.ts
import { defineNuxtPlugin, useRuntimeConfig, navigateTo, useNuxtApp } from '#app'
import Keycloak from 'keycloak-js'
import { useAuthStore } from '~/stores/auth'
// import { useStateStore } from '../stores/auth/state' // Import state store
import type { UserData } from '~/types'

function getRelativeRoute(route: string) {
  return `${window.location.origin}/${route}`
}

function parseJwt(token: string | undefined) {
  if (!token) {
    return null
  }
  const base64Url = token.split('.')[1]
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/')
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)
  }).join(''))
  return JSON.parse(jsonPayload)
}

export default defineNuxtPlugin({
  name: 'keycloak',
  parallel: true,
  setup(nuxtApp) {
    const runtimeConfig = useRuntimeConfig()
    if (process.client) {
      const keycloak = new Keycloak({
        url: runtimeConfig.public.keycloakUrl,
        realm: runtimeConfig.public.keycloakRealm,
        clientId: runtimeConfig.public.keycloakClientId
      })

      keycloak
        .init({
          onLoad: 'check-sso',
          silentCheckSsoRedirectUri: getRelativeRoute('silent-check-sso.html')
        })
        .then(async (authenticated) => {
          if (authenticated) {
            const authStore = useAuthStore()
            // const stateStore = useStateStore() // Use state store
            authStore.setAuthenticated(authenticated)
            const tokenPayload = parseJwt(keycloak.token)
            if (tokenPayload && tokenPayload.sub) {
              if (!tokenPayload.role) {
                alert('ไม่มีผู้ใช้ในระบบ') // แสดงข้อความแจ้งเตือน
                keycloak.logout() // หรือทำการ logout
                return
              }

              // Validate and assign default values to ensure no undefined
              const userData: UserData = {
                id: tokenPayload.sub,
                username: tokenPayload.preferred_username ?? '',
                email: tokenPayload.email ?? '',
                firstName: tokenPayload.given_name ?? '',
                lastName: tokenPayload.family_name ?? '',
                districts: tokenPayload.districts ?? [],
                permissions: tokenPayload.permissions ?? [],
                role: tokenPayload.role ?? '',
                token: keycloak.token || '', // make sure it's not undefined
                refreshToken: keycloak.refreshToken || '', // make sure it's not undefined
                avatar: tokenPayload.avatar,
                locale: tokenPayload.locale ?? 'th'
              }
              authStore.setUser(userData)

              // Fetch options data and store in state
              // try {
              //   const { $apiFetch } = useNuxtApp()
              //   const data = await $apiFetch('/options/select')
              //   stateStore.setOptions(data.details[0]) // Store options data in state
              // } catch (error) {
              //   console.error('Error fetching options data:', error)
              // }

              // Navigate to the correct route based on role
              // if (userData.role === 'administrator') {
              //   navigateTo('/map')
              // } else if (userData.role === 'management' || userData.role === 'user') {
              //   navigateTo('/citylaw')
              // } else if (userData.role === 'police') {
              //   navigateTo('/police')
              // } else {
              //   navigateTo('/settings/devices') // Default route
              // }
              navigateTo('/protected')
              // Set interval to update token
              setInterval(() => {
                keycloak.updateToken(30).then(refreshed => {
                  if (refreshed) {
                    authStore.setUser({
                      ...authStore.user!,
                      token: keycloak.token || '', // make sure it's not undefined
                      refreshToken: keycloak.refreshToken || '' // make sure it's not undefined
                    })
                  }
                }).catch(() => {
                  console.error('Failed to refresh the token, or the session has expired')
                  keycloak.logout()
                })
              }, 30000) // Check token validity every 30 seconds
            } else {
              console.error('Token payload is missing required fields')
            }
          }
        })
        .catch((err: any) => {
          console.error('Keycloak init failed:', err)
        })

      // Make the keycloak instance available throughout your app
      nuxtApp.provide('keycloak', keycloak)
    }
  }
})