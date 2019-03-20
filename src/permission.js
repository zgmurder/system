import router from './router'
import store from './store'
import { Message } from 'element-ui'
import { getUserInfo } from '@/api/login'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie
import { log } from 'util'

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(role, permissionRoles) {
  // if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  // if (!permissionRoles) return true
  // return roles.some(role => permissionRoles.indexOf(role) >= 0)
  if (role === 0 || !permissionRoles) return true
  return permissionRoles.includes(role)
}

const whiteList = ['/login', '/auth-redirect']// no redirect whitelist

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  const user = getUserInfo()
  if (user) {
    if (to.path === '/login') next({ path: '/' })
    else {
      // 页面刷新重新将数据存入vuex
      if (!store.getters.token) {
        store.dispatch('GetUserInfo').then(() => {
          return store.dispatch('GenerateRoutes', store.getters.role).then((routers) => {
            router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
            next({ ...to, replace: true })
          })
        })
      } else {
        if (hasPermission(store.getters.role, to.meta.roles)) {
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true }})
        }
      }
    }
  } else {
    if (whiteList.includes(to.path))next()
    else next(`/login?redirect=${to.path}`)
  }
  // if (getUserInfo()) { // determine if there has token
  //   /* has token*/
  //   if (to.path === '/login') {
  //     next({ path: '/' })
  //     NProgress.done() // if current page is dashboard will not trigger	afterEach hook, so manually handle it
  //   } else {
  //     if (!store.getters.name) {
  //       store.dispatch('GetUserInfo').then(({ org }) => {
  //         return store.dispatch('GenerateRoutes', (org || {}).orgSequence).then(() => {
  //           router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  //           next({ ...to, replace: true })
  //         })
  //       })
  //     } else {
  //       // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
  //       next()
  //       // if (hasPermission(store.getters.organization, to.meta.roles)) {
  //       //   next()
  //       // } else {
  //       //   next({ path: '/401', replace: true, query: { noGoBack: true }})
  //       // }
  //       // 可删 ↑
  //     }
  //     // store.dispatch('GenerateRoutes', org.orgSequence).then(() => { // 根据roles权限生成可访问的路由表
  //     //   router.addRoutes(store.getters.addRouters) // 动态添加可访问路由表
  //     //   router.push({path:to.path})
  //     //   //next()// hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
  //     // })
  //   }
  // } else {
  //   /* has no token*/
  //   if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
  //     next()
  //   } else {
  //     next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
  //     NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
  //   }
  // }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
