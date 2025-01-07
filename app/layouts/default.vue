<!-- layouts/default.vue -->
<script setup lang="ts">

import { useStateStore } from '~/stores/auth/state'
const route = useRoute()
const appConfig = useAppConfig()
const { isHelpSlideoverOpen } = useDashboard()
const { locale, setLocale } = useI18n()
const authState = useStateStore()

onMounted(() => {
  const savedLocale = authState.locale
  if (savedLocale) {
    setLocale(savedLocale)
  }
})

watch(() => authState.locale, (newLocale) => {
  setLocale(newLocale)
})
// console.log('🚀 ~ file: default.vue layout line:7 ~ locale', locale)
// console.log('🚀 ~ file: default.vue layout line:8 ~ locales', locales)
// console.log('🚀 ~ file: default.vue layout line:9 ~ authState', authState.locale)
const links = [
  // {
  //   id: 'home',
  //   label: 'Home',
  //   icon: 'i-heroicons-home',
  //   to: '/',
  //   tooltip: {
  //     text: 'Home',
  //     shortcuts: ['G', 'H']
  //   }
  // },
  {
    id: 'map',
    label: 'Map',
    icon: 'i-heroicons-map',
    to: '/map',
    badge: '4',
    tooltip: {
      text: 'Map',
      shortcuts: ['G', 'Ma']
    }
  },
  {
    id: 'messaging',
    label: 'Messaging',
    icon: 'i-heroicons-chat-bubble-oval-left-ellipsis',
    to: '/messaging',
    badge: '4',
    tooltip: {
      text: 'Messaging',
      shortcuts: ['G', 'Me']
    }
  },
  {
    id: 'AI',
    label: 'AI',
    icon: 'i-heroicons-cpu-chip',
    to: '/ai',
    // badge: '4',
    tooltip: {
      text: 'AI'
      // shortcuts: ['A', 'AI']
    }
  },
  {
    id: 'citylaw',
    label: 'Citylaw',
    icon: 'i-simple-icons-accusoft',
    to: '/Citylaw',
    badge: '4',
    tooltip: {
      text: 'Citylaw'
      // shortcuts: ['G', 'Li']
    }
  },
  {
    id: 'live',
    label: 'Live',
    icon: 'i-heroicons-video-camera',
    to: '/live',
    badge: '4',
    tooltip: {
      text: 'Live',
      shortcuts: ['G', 'Li']
    }
  },
  // {
  //   id: 'users',
  //   label: 'Users',
  //   icon: 'i-heroicons-user-group',
  //   to: '/users',
  //   tooltip: {
  //     text: 'Users',
  //     shortcuts: ['G', 'U']
  //   }
  // },
  {
    id: 'settings',
    label: 'Settings',
    to: '/settings',
    icon: 'i-heroicons-cog-8-tooth',
    children: [
      // {
      //   label: 'General',
      //   to: '/settings',
      //   exact: true
      // },
      // {
      //   label: 'Add Devices',
      //   to: '/settings/devices',
      //   exact: true
      // },
      {
        label: 'Devices',
        to: '/settings/camera',
        exact: true
      },
      {
        label: 'Horn',
        to: '/settings/horn',
        exact: true
      }
      // {
      //   label: 'Add Horn',
      //   to: '/settings/addHorn',
      //   exact: true
      // }

    ],
    tooltip: {
      text: 'Settings',
      shortcuts: ['G', 'St']
    }
  }
]

const footerLinks = [
  // {
  //   label: "Invite people",
  //   icon: "i-heroicons-plus",
  //   to: "/settings/members",
  // },
  {
    label: 'Help & Support',
    icon: 'i-heroicons-question-mark-circle',
    click: () => (isHelpSlideoverOpen.value = true)
  }
]

const groups = [
  {
    key: 'links',
    label: 'Go to',
    commands: links.map(link => ({
      ...link,
      shortcuts: link.tooltip?.shortcuts
    }))
  },
  {
    key: 'code',
    label: 'Code',
    commands: [
      {
        id: 'source',
        label: 'View page source',
        icon: 'i-simple-icons-github',
        click: () => {
          window.open(
            `https://github.com/nuxt-ui-pro/dashboard/blob/main/pages${
              route.path === '/' ? '/index' : route.path
            }.vue`,
            '_blank'
          )
        }
      }
    ]
  }
]

// const defaultColors = ref(
//   ['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(color => ({
//     label: color,
//     chip: color,
//     click: () => (appConfig.ui.primary = color)
//   }))
// )

interface ColorOption {
  label: string
  chip: string
  active?: boolean // Since you're adding this property in the computed property.
  click: () => void
}

const defaultColors = ref<ColorOption[]>(
  ['green', 'teal', 'cyan', 'sky', 'blue', 'indigo', 'violet'].map(
    (color: string) => ({
      label: color,
      chip: color,
      click: () => (appConfig.ui.primary = color)
    })
  )
)
const colors = computed(() =>
  defaultColors.value.map((color: ColorOption) => ({
    ...color,
    active: appConfig.ui.primary === color.label
  }))
)

function useDashboard(): { isHelpSlideoverOpen: any } {
    throw new Error('Function not implemented.')
}
</script>

<template>
  <UDashboardLayout>
    <UDashboardPanel
      :width="250"
      :resizable="{ min: 200, max: 300 }"
      collapsible
    >
      <!-- <UDashboardNavbar class="!border-transparent" :ui="{ left: 'flex-1' }">
        <template #left>
          <TeamsDropdown />
        </template>
      </UDashboardNavbar> -->

      <UDashboardSidebar>
        <template #header>
          <UDashboardSearchButton />
        </template>

        <UDashboardSidebarLinks :links="links" />

        <UDivider />

        <!-- <UDashboardSidebarLinks
          :links="[{ label: 'Colors', draggable: true, children: colors }]"
          @update:links="colors => (defaultColors = colors)"
        /> -->

        <div class="flex-1" />

        <UDashboardSidebarLinks :links="footerLinks" />

        <UDivider class="sticky bottom-0" />

        <template #footer>
          <!-- ~/components/UserDropdown.vue -->
          <UserDropdown />
        </template>
      </UDashboardSidebar>
    </UDashboardPanel>

    <slot />

    <!-- ~/components/HelpSlideover.vue -->
    <HelpSlideover />
    <!-- ~/components/NotificationsSlideover.vue -->
    <NotificationsSlideover />

    <ClientOnly>
      <LazyUDashboardSearch :groups="groups" />
    </ClientOnly>
  </UDashboardLayout>
</template>
