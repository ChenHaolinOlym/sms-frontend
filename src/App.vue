<template>
  <div class="wrapper">
    <NConfigProvider :theme="themeConfig" :locale="i18nConfig[0]" :date-locale="i18nConfig[1]">
      <!-- <NConfigProvider :theme="themeConfig" :locale="zhCN" :date-locale="dateZhCN"> -->
      <NLayout position="absolute">
        <NLayoutHeader class="header">
          <router-view name="NavBar" />
        </NLayoutHeader>
        <NLayoutContent embedded content-style="padding: 24px;" position="absolute" :native-scrollbar="false" class="content">
          <NMessageProvider>
            <router-view name="Content" />
          </NMessageProvider>
        </NLayoutContent>
      </NLayout>
    </NConfigProvider>
  </div>
</template>

<script setup lang="ts">
  import { darkTheme, zhCN, dateZhCN } from 'naive-ui'
  import { provide, ref, computed } from 'vue'

  // Theme change inject
  const theme = ref('')
  const changeTheme = (val: string) => {
    theme.value = val
  }
  provide('changeTheme', changeTheme)
  const themeConfig = computed(() => {
    if (theme.value == 'dark') {
      return darkTheme
    } else {
      return undefined
    }
  })

  // I18N change inject
  const i18n = ref('en')
  const changeI18N = (val: string) => {
    i18n.value = val
  }
  provide('changeI18N', changeI18N)
  const i18nConfig = computed(() => {
    if (i18n.value == 'en') {
      return [undefined, undefined]
    } else if (i18n.value == 'cn') {
      return [zhCN, dateZhCN]
    } else {
      return [undefined, undefined]
    }
  })
</script>

<style scoped>
  .wrapper {
    height: 100%;
    min-height: 100vh;
    position: relative;
  }
  .header {
    height: 42px;
  }
  .content {
    top: 42px;
  }
</style>
