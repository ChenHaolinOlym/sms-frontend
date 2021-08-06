<template>
  <div class="wrapper">
    <div class="start">
      <NMenu mode="horizontal" :options="options"></NMenu>
    </div>
    <div class="end">
      <NButtonGroup>
        <NButton size="large" @click="onLocaleChange">
          <template #icon>
            <NIcon><Language /></NIcon>
          </template>
        </NButton>
        <NButton size="large" @click="onThemeChange">
          <template #icon>
            <NIcon v-if="isLight"><Sunny /></NIcon>
            <NIcon v-else><Moon /></NIcon>
          </template>
        </NButton>
      </NButtonGroup>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { RouterLink } from 'vue-router'
  import { useI18n } from 'vue-i18n'
  import { NIcon } from 'naive-ui'
  import { h, inject, ref } from 'vue'
  import { Home, Calendar, Create, Settings, Sunny, Moon, Language } from '@vicons/ionicons5'

  // I18N init
  const { t, locale } = useI18n({ useScope: 'global' })
  const changeI18N: ((val: string) => void) | undefined = inject('changeI18N')

  // theme change init
  const changeTheme: ((val: string) => void) | undefined = inject('changeTheme')
  const isLight = ref(true)

  // Icon Render Helper Function
  const renderIcon = (icon: typeof Home) => {
    return () => h(NIcon, null, { default: () => h(icon) })
  }

  // Label Render Helper Function
  const renderLabel = (link: string, name: string) => {
    return () =>
      h(
        RouterLink,
        {
          to: link,
        },
        {
          default: () => name,
        },
      )
  }

  // Menu Options
  const options = [
    {
      label: renderLabel('/', t('navbar.home')),
      key: 'Home',
      icon: renderIcon(Home),
    },
    {
      label: renderLabel('/events', t('navbar.events')),
      key: 'Events',
      icon: renderIcon(Calendar),
    },
    {
      label: renderLabel('/create', t('navbar.create')),
      key: 'Create',
      icon: renderIcon(Create),
    },
    {
      label: renderLabel('/settings', t('navbar.settings')),
      key: 'Settings',
      icon: renderIcon(Settings),
    },
  ]

  // Locale Change Event
  const onLocaleChange = () => {
    if (changeI18N) {
      if (locale.value == 'en') {
        locale.value = 'cn'
        changeI18N('cn')
      } else {
        locale.value = 'en'
        changeI18N('en')
      }
    }
  }

  // Theme Change Event
  const onThemeChange = () => {
    isLight.value = !isLight.value
    if (changeTheme) {
      if (isLight.value === true) {
        changeTheme('light')
      } else {
        changeTheme('dark')
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    min-width: 100%;
  }
  .start {
    flex: 1 1 0%;
  }
  .end {
    flex-wrap: wrap;
  }
</style>
