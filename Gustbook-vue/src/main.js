import { createApp } from 'vue'

import App from './App.vue'
//引入element plus 
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import router from  '../router/router'


const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.mount('#app')

