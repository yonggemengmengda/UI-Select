import { createApp } from 'vue'
import { create, NButton, NSpace, NConfigProvider, NCard, NMessageProvider, NSwitch, NEmpty, NIcon } from 'naive-ui'
import App from './App.vue'

const naive = create({
    components: [NButton, NSpace, NConfigProvider, NCard, NMessageProvider, NSwitch, NEmpty, NIcon]
})

createApp(App)
    .use(naive)
    .mount('#app')
