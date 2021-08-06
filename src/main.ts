import { createApp } from 'vue'
import { router } from '@/router'
import { createPinia } from 'pinia'
import App from './App.vue'
import i18n from './i18n'
import naive from './naive'

const app = createApp(App)

app.use(i18n)
app.use(naive)
app.use(router)
app.use(createPinia())

app.mount('#app')
