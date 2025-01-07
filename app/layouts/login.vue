<script setup></script>

<template>
  <div>
    <slot />
    <UFooter>
      <template #center>
        {{ $t("copyright") }}
      </template>
    </UFooter>
  </div>
</template>
