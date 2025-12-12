import { createApp } from 'vue'
import { createPinia } from 'pinia'

import Popper from 'vue3-popper'

import App from './App.vue'
import router from './router'

const app = createApp(App)
app.component('PopperComponent', Popper)

app.use(createPinia())
app.use(router)

app.mount('#app')
