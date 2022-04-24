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
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/screen',
    component: Layout,
    children: [{
      path: '/screen',
      name: 'screen',
      component: () => import('@/views/screen/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },

  {
    path: '/setTime',
    component: Layout,
    name: 'setTime',
    meta: { title: '实时监测', icon: 'el-icon-user' },
    children: [
      {
        path: '/setTime/Dashboard',
        name: 'Dashboard',
        component: () => import('@/views/setTime/Dashboard/index'),
        meta: { title: '仪表盘、折线图', icon: 'user' }
      },
      {
        path: '/setTime/report',
        name: 'report',
        hidden: true,
        component: () => import('@/views/setTime/report/index'),
        meta: { title: '报表', icon: 'user' }
      },
    ]
  },

  {
    path: '/explain',
    component: Layout,
    name: 'explain',
    meta: { title: '检测分析', icon: 'el-icon-user' },
    children: [
      {
        path: '/explain/warning',
        name: 'warning',
        component: () => import('@/views/explain/warning/index'),
        meta: { title: '预警', icon: 'user' }
      },
      {
        path: '/explain/data',
        name: 'data',
        hidden: true,
        component: () => import('@/views/explain/data/index'),
        meta: { title: '数据分析', icon: 'user' }
      },
    ]
  },

  {
    path: '/vide',
    component: Layout,
    name: 'vide',
    meta: { title: '视频监控', icon: 'el-icon-user' },
    children: [
      {
        path: '/vide/realtime',
        name: 'userindex',
        component: () => import('@/views/vide/realtime/index'),
        meta: { title: '实时', icon: 'user' }
      },
      {
        path: '/vide/playback',
        name: 'playback',
        hidden: true,
        component: () => import('@/views/vide/playback/index'),
        meta: { title: '回放', icon: 'user' }
      },
    ]
  },

  {
    path: '/search',
    component: Layout,
    name: 'search',
    meta: { title: '巡检管理', icon: 'el-icon-user' },
    children: [
      {
        path: '/search/rule',
        name: 'rule',
        component: () => import('@/views/search/rule/index'),
        meta: { title: '管理条例', icon: 'user' }
      },
      {
        path: '/search/safe',
        name: 'safe',
        hidden: true,
        component: () => import('@/views/search/safe/index'),
        meta: { title: '安全巡检', icon: 'el-icon-user' },
      },
      {
        path: '/search/safe',
        name: 'childrenSafe',
        hidden: true,
        component: () => import('@/views/search/safe/childrenSafe'),
        meta: { title: '异常上报', icon: 'user' }
      },
      {
        path: '/search/emergency',
        name: 'emergency',
        hidden: true,
        component: () => import('@/views/search/emergency/index'),
        meta: { title: '事故上报', icon: 'user' }
      },
      // {
      //   path: '/search/emergency',
      //   name: 'childrenEme',
      //   hidden: true,
      //   component: () => import('@/views/search/emergency/childrenEme'),
      //   meta: { title: '查看记录', icon: 'el-icon-user' }
      // },
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: { title: '系统管理', icon: 'el-icon-user' },
    children: [
      {
        path: '/system/deviceManage',
        name: 'deviceManage',
        component: () => import('@/views/system/deviceManage/index'),
        meta: { title: '设备管理', icon: 'user' }
      },
      {
        path: '/system/role',
        name: 'role',
        hidden: true,
        component: () => import('@/views/system/role/index'),
        meta: { title: '角色管理', icon: 'user' }
      },
      {
        path: '/system/user',
        name: 'user',
        hidden: true,
        component: () => import('@/views/system/user/index'),
        meta: { title: '用户管理', icon: 'user' }
      }
    ]
  },
  {
    path: '/newsManage',
    component: Layout,
    name: 'newsManage',
    meta: { title: '消息管理', icon: 'alert' },
    children: [
      {
        path: '/newsManage/news',
        name: 'news',
        component: () => import('@/views/newsManage/news/index'),
        meta: { title: '消息提醒', icon: 'alert' }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]

// const createRouter = () => new Router({
//   routes: constantRoutes
// })
const router = new VueRouter({
  routes: constantRoutes,
  mode: 'history',
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}


export default router
