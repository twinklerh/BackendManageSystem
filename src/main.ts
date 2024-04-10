import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/router/permission'         //  全局路由守卫
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import '@/style/index.scss'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import pinia from './store'

const app = createApp(App).use(pinia).use(router)

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(ElementPlus, {locale: zhCn})
app.mount('#app')
