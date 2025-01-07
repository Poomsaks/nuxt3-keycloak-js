// tyepes/index.d.ts
import type { Avatar } from '#ui/types'

export type UserStatus = 'subscribed' | 'unsubscribed' | 'bounced'

export interface User {
    id: number
    name: string
    email: string
    avatar?: Avatar
    status: UserStatus
    location: string
    avatar: { src: string; alt: string; size: string }
    token: string
}


export interface Mail {
    id: number
    unread?: boolean
    from: User
    subject: string
    body: string
    date: string
}

export interface Member {
    name: string
    username: string
    role: 'member' | 'owner'
    avatar: Avatar
}

export interface Notification {
    id: number
    unread?: boolean
    sender: User
    body: string
    date: string
}

export type Period = 'daily' | 'weekly' | 'monthly'

export interface Range {
    start: Date
    end: Date
}

export interface ColorOption {
    label: string
    chip: string
    active?: boolean // Since you're adding this property in the computed property.
    click: () => void
}

export interface KeycloakInstance {
    logout: () => void
    // กำหนดเมธอดอื่นๆ ที่คุณต้องการใช้
}

export interface AuthState {
    isAuthenticated: boolean
    user: User | null // Assuming `User` is the type you want to associate with the authenticated state.
}

// types/index.d.ts (or you can define it directly in your store file for simplicity)

export interface UserData {
    id: string
    avatar: { src: string; alt: string; size: string }
    username: string
    email: string
    firstName: string
    lastName: string
    token: string | undefined
    refreshToken: string | undefined
}



// ระบุ $apiFetch เป็นฟังก์ชันที่รับพารามิเตอร์เป็น URL และส่งคืน Promis
declare module '#app' {
    interface NuxtApp {
        $apiFetch: (url: string, options?: RequestInit) => Promise<any>
    }
}