import Vue from 'vue'
import VueRouter from 'vue-router'

import home from '../views/home.vue'
import login from '../views/login.vue'
import list from '../views/list.vue'

import { Message } from 'element-ui'
import _request from '../views/utils/request.js'

Vue.use(VueRouter)

const routes = [
  {  path: '/', name: 'home', component: home },
  {  path: '/list', name: 'list', component: list , meta: { isLogin: true }},
  {  path: '/login', name: 'login', component: login },
]

const router = new VueRouter({
  routes
})

router.beforeEach(async (to, from, next) => {
  // 是否需要登录  不是登录页，并且isLoginw=为true的就是要登录
  if (to.path != '/login' && to.meta.isLogin) {
    const token = localStorage.getItem('token')
    // 没有token,跳到登录页
    if (!token) {
      Message('请先登录再访问此页')
      next('/login')
      return
    }
    // 调用封装过拦截器的axios,里面每次请求都在header发送了token
    const res = await _request.post('/verifytoken')
    // token过期或失效，跳到登录页
    if (res.data.code === 400) {
      localStorage.removeItem('token')
      Message.error(res.data.message)
      next('/login')
      return
    }
  }
  // 不需要登录或token正确的就可以下一页
  next()
})

export default router
