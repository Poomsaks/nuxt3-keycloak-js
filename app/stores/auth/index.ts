// stores/auth/index.js
import { defineStore } from 'pinia'
import type { UserData } from '~/types'

export const useAuthStore = defineStore('auth', {
    state: () => ({
        isAuthenticated: false,
        user: null as UserData | null
    }),
    actions: {
        setAuthenticated(isAuthenticated: boolean) {
            this.isAuthenticated = isAuthenticated
        },
        setUser(user: UserData | null) { // Annotate user with UserData type
            this.user = user
        }
    }
})