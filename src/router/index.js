import Vue from 'vue'
import VueRouter from 'vue-router'
import VueCookies from 'vue-cookies'
Vue.use(VueRouter)

/* Layout */
import Layout from '@/layout'

const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/search/rule/showFile',
    name: 'showFile',
    component: () => import('@/views/search/rule/showFile'),
    meta: { title: '条例展示', icon: 'user' }
  },
  {
    path: '/remote',
    component: () => import('@/views/remote/index'),
    hidden: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/',
    component: () => import('@/views/screen/index'),
    hidden: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/threed',
    component: () => import('@/views/screen/threed'),
    hidden: true,
    meta: {
      auth: true
    }
  },
  {
    path: '/404',
    component: () => import('@/views/error/404'),
    hidden: true
  },
  {
    path: '/realtimeMnitor',
    component: Layout,
    name: 'realtimeMnitor',
    meta: { title: '实时监测', icon: 'el-icon-user' },
    children: [
      {
        path: '/realtimeMnitor/realtime',
        name: 'realtime',
        component: () => import('@/views/realtimeMnitor/realtime/index'),
        meta: { title: '实时数据', icon: 'user', auth: true }
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
        path: '/explain/waterVelocity',
        name: 'waterVelocity',
        component: () => import('@/views/explain/waterVelocity/index'),
        meta: { title: '流速、流量', icon: 'user', auth: true }
      },
      {
        path: '/explain/waterStage',
        name: 'waterStage',
        component: () => import('@/views/explain/waterStage/index'),
        meta: { title: '水位', icon: 'user', auth: true }
      },
      {
        path: '/explain/osmoticPressure',
        name: 'osmoticPressure',
        hidden: true,
        component: () => import('@/views/explain/osmoticPressure/index'),
        meta: { title: '库压渗压', icon: 'user', auth: true }
      },
      {
        path: '/explain/waterQuality',
        name: 'waterQuality',
        hidden: true,
        component: () => import('@/views/explain/waterQuality/index'),
        meta: { title: '水质分析', icon: 'user', auth: true }
      },
      {
        path: '/explain/deformation',
        name: 'deformation',
        hidden: true,
        component: () => import('@/views/explain/deformation/index'),
        meta: { title: '形变位移', icon: 'user', auth: true }
      },
      {
        path: '/explain/alarmAnalysis',
        name: 'alarmAnalysis',
        hidden: true,
        component: () => import('@/views/explain/alarmAnalysis/index'),
        meta: { title: '预警分析', icon: 'user', auth: true }
      },

    ]
  },

  {
    path: '/video',
    component: Layout,
    name: 'video',
    meta: { title: '视频监控', icon: 'el-icon-user' },
    children: [
      {
        path: '/video/realtime',
        name: 'userindex',
        component: () => import('@/views/video/realtime/index'),
        meta: { title: '实时', icon: 'user', auth: true }
      },
      {
        path: '/video/playback',
        name: 'playback',
        hidden: true,
        component: () => import('@/views/video/playback/index'),
        meta: { title: '回放', icon: 'user', auth: true }
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
        meta: { title: '管理条例', icon: 'user', auth: true }
      },
      {
        path: '/search/rule/showFile',
        name: 'showFile',
        component: () => import('@/views/search/rule/showFile'),
        meta: { title: '条例展示', icon: 'user' }
      },
      {
        path: '/search/safe',
        name: 'safe',
        hidden: true,
        component: () => import('@/views/search/safe/index'),
        meta: { title: '安全巡检', icon: 'el-icon-user', auth: true },
      },
      {
        path: '/search/safe',
        name: 'childrenSafe',
        hidden: true,
        component: () => import('@/views/search/safe/childrenSafe'),
        meta: { title: '异常上报', icon: 'user', auth: true }
      },
      {
        path: '/search/emergency',
        name: 'emergency',
        hidden: true,
        component: () => import('@/views/search/emergency/index'),
        meta: { title: '事故上报', icon: 'user', auth: true }
      },
      {
        path: '/search/emergency',
        name: 'childrenEme',
        hidden: true,
        component: () => import('@/views/search/emergency/childrenEme'),
        meta: { title: '查看记录', icon: 'el-icon-user', auth: true }
      },
    ]
  },

  {
    path: '/system',
    component: Layout,
    name: 'system',
    meta: { title: '系统管理', icon: 'el-icon-user', auth: true },
    children: [
      {
        path: '/system/deviceManage',
        name: 'deviceManage',
        component: () => import('@/views/system/deviceManage/index'),
        meta: { title: '设备管理', icon: 'user' }
      },
      {
        path: '/system/roleManage',
        name: 'roleManage',
        hidden: true,
        component: () => import('@/views/system/roleManage/index'),
        meta: { title: '角色管理', icon: 'user', auth: true }
      },
      {
        path: '/system/userManage',
        name: 'userManage',
        hidden: true,
        component: () => import('@/views/system/userManage/index'),
        meta: { title: '用户管理', icon: 'user', auth: true }
      },
      {
        path: '/system/ulog',
        name: 'ulog',
        hidden: true,
        component: () => import('@/views/system/ulog/index'),
        meta: { title: '操作日志', icon: 'user' }
      },
      {
        path: '/system/dataManage',
        name: 'dataManage',
        component: () => import('@/views/system/dataManage/index'),
        meta: { title: '数据管理', icon: 'user' }
      },
      {
        path: '/system/userInfo',
        name: 'userInfo',
        hidden: true,
        component: () => import('@/views/system/userInfo/index'),
        meta: { title: '新增用户', icon: 'user', auth: true }
      },

    ]
  },
  {
    path: '/newsManage',
    component: Layout,
    name: 'newsManage',
    meta: { title: '消息管理', icon: 'alert', auth: true },
    children: [
      {
        path: '/newsManage/news',
        name: 'news',
        component: () => import('@/views/newsManage/news/index'),
        meta: { title: '消息列表', icon: 'alert', auth: true }
      },
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: constantRoutes,
})

//获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
//修改原型对象中的push方法
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
router.beforeEach(function (to, from, next) {
  // 判断是否需要登录权限
  if (to.matched.some(res => res.meta.auth)) {
    // 判断是否登录
    if (VueCookies.isKey('token')) {
      next()
    } else {
      next({
        path: '/login',
      }) // 没登录则跳转到登录界面
    }
  } else {
    next()
  }
})

export default router
