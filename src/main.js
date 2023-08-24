import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
// 导入路由
import router from '@/router/index'

// 导入pinia
import { createPinia } from 'pinia'
// 创建pinia实例
const pinia = createPinia()

// 导入vant
import { Button,Form, Field, CellGroup,RadioGroup, Radio,Dialog,Toast } from 'vant'
// 2. 引入组件样式
import 'vant/lib/index.css'

// 导入rem.js
import '@/utils/rem.js'

createApp(App)
.use(router)
.use(pinia)
.use(Button)
.use(Form)
.use(Field)
.use(CellGroup)
.use(RadioGroup)
.use(Radio)
.use(Dialog)
.use(Toast)
.mount('#app')

