// middleware/auth.ts
import { useAuthStore } from '~/stores/auth'
import { useStateStore } from '~/stores/auth/state'
import { navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  // บันทึก route ปัจจุบันก่อนทำการ authenticate
  // sessionStorage.setItem('lastRoute', to.fullPath)
  const authStore = useAuthStore()
  const stateStore = useStateStore()
  stateStore.setCurrentRoute(to.fullPath)
  if (!authStore.isAuthenticated) {
    // ถ้าไม่ผ่านการ authenticate นำทางไปหน้า login
    return navigateTo('/')
  }
  // ถ้าผ่านการ authenticate ไม่ต้องทำอะไร เพราะเราบันทึก route ไว้แล้ว
})