import { useAuthStore } from '~/stores/auth'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.provide('apiFetch', async (url: string, options: RequestInit = {}) => {
        const authStore = useAuthStore()
        const user = authStore.user

        if (!user) {
            throw new Error('User not authenticated')
        }

        const token = user.token
        // Ensure headers object exists
        if (!options.headers) {
            options.headers = new Headers()
            options.headers.append('Authorization', `Bearer ${token}`)
            // console.log('🚀 ~ file: fetch.vue  line:17 ~ options', options)
        } else if (options.headers instanceof Headers) {
            options.headers.append('Authorization', `Bearer ${token}`)
        } else {
            (options.headers as Record<string, string>)['Authorization'] = `Bearer ${token}`
        }

        // Use native fetch instead of $fetch
        return fetch(url, options).then(response => response.json())
    })
})
