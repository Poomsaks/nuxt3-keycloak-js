<script setup>
import { useNuxtApp } from '#app'
definePageMeta({
  layout: false
})
// const router = useRouter()
const { $keycloak } = useNuxtApp()
const { t } = useI18n()

const providers = [
  {
    label: t('continueSSO'),
    icon: 'i-simple-icons-keystone',
    color: 'white',
    click: () => {
      console.log('Redirect to IDP')
    }
  }
]

function onSubmit() {
  console.log('Submitted')
  $keycloak.login()
}
</script>

<template>
  <UContainer class="grid place-content-center h-screen">
    <NuxtLayout name="login">
      <UCard class="max-w-sm w-full">
        <UAuthForm
          :providers="providers"
          :title="$t('welcome')"
          align="top"
          icon="i-heroicons-lock-closed"
          :ui="{ base: 'text-center', footer: 'text-center' }"
          @click="onSubmit()"
        >
          <template #description>
            {{ $t('haveAccount') }}
            <NuxtLink to="/protected" class="text-primary font-medium">
              {{ $t('signUp') }}
            </NuxtLink>
          </template>

          <template #footer>
            {{ $t('agreement') }}
            <NuxtLink to="/protected" class="text-primary font-medium">
              {{ $t('termsOfService') }}
            </NuxtLink>
          </template>
        </UAuthForm>
      </UCard>
      <!-- <UContainer class="grid place-content-center">
        <img src="~/assets/images/logo.png" alt="IOC">
        <UButton block @click="goto">
          {{ $t("signIn") }}
        </UButton>
      </UContainer> -->
      <!-- <ULandingSection :description="$t('copyright')" /> -->
    </NuxtLayout>
  </UContainer>
</template>