import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/style/index.scss'

const pinia = createPinia()
const app = createApp(App).use(pinia).use(router)
app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
