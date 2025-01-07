import { defineStore } from "pinia"

// stores/auth/state.ts
export const useStateStore = defineStore('profile', {
    state: () => ({
        locale: 'th',
        currentRoute: null as string | null
    }),
    actions: {
        setLocale(locale: string) {
            this.locale = locale
        },
        setCurrentRoute(currentRoute: string | null) { // Annotate user with UserData type
            this.currentRoute = currentRoute
        }
    }
})

