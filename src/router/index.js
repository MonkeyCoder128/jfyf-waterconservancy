import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

const constantRoutes = [
  {
    path: '/',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/dashboard',
    component: Layout,
    redirect: '/dashboard/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },
  {
    path: '/user',
    component: Layout,
    name: 'user',
    redirect: '/user/index',
    meta: { title: '用户管理', icon: 'el-icon-user' },
    children: [
      {
        path: 'index',
        name: 'userindex',
        component: () => import('@/views/user/index'),
        meta: { title: '用户列表', icon: 'user' }
      },
      {
        path: 'edit',
        name: 'useredit',
        hidden: true ,
        component: () => import('@/views/user/edit'),
        meta: { title: '编辑用户', icon: 'user' }
      }
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

// const createRouter = () => new Router({
//   routes: constantRoutes
// })
const router = new VueRouter({
  routes : constantRoutes
})



export default router
