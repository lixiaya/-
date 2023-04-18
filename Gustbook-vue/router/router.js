// 1. 定义路由组件.

import Index from '../src/index.vue'
import Login from '../src/login-admin/login.vue'
import Admin from '../src/login-admin/admin.vue'
import * as VueRouter from 'vue-router'
//二级
import All from '../src/login-admin/page/all.vue'
import Del from '../src/login-admin/page/del.vue'
import Char from '../src/login-admin/page/char.vue'

// 2. 定义一些路由
// 每个路由都需要映射到一个组件。
// 我们后面再讨论嵌套路由。
const routes = [
  {
    path: '/',
    component: Index,
  },
  {
    path: '/login',
    component: Login,
    name: Login
  },
  {
    path: '/admin',
    component: Admin,
    name: Admin,
    meta: {
      islogin: true,            // 添加该字段，表示进入这个路由是需要登录的
    },
    redirect:'/all', 
       children:[
      {path:'/all',component:All,name:All},
      
      {path:'/char',component:Char,name:Char}
    ]
  }
]

// 3. 创建路由实例并传递 `routes` 配置
// 你可以在这里输入更多的配置，但我们在这里
// 暂时保持简单
const router = VueRouter.createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: VueRouter.createWebHashHistory(),
  routes, // `routes: routes` 的缩写
})



router.beforeEach((to, from, next) => {
  if (to.meta.islogin) {
    let token= sessionStorage.getItem('token')
      if (token) {
          next()
      } else {
          next({
              path: '/login',
              query: {redirect: to.fullPath}
          })
      }
  } else {
      next()
  }
})

export default router