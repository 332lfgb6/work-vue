import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    component: () => import('@/views/index/index'),
    path: '/',
    name: 'index',
    meta: {
      title: '首页',
      tabbar: true
    }
  },
  {
    component: () => import('@/views/user/user'),
    path: '/user',
    name: 'user',
    meta: {
      title: '用户'
    }
  },
  {
    component: () => import('@/views/discover/discover'),
    path: '/discover',
    name: 'discover',
    meta: {
      title: '发现',
      tabbar: true
    }
  },
  {
    component: () => import('@/views/login/login'),
    path: '/login',
    name: 'login',
    meta: {
      title: '登录'
    }
  },
  {
    component: () => import('@/views/basic-info/basic-info'),
    path: '/basic-info',
    name: 'basic-info',
    meta: {
      title: '基本信息'
    }
  },
  {
    component: () => import('@/views/message/message'),
    path: '/message',
    name: 'message',
    meta: {
      title: '消息',
      tabbar: true
    }
  },
  {
    component: () => import('@/views/my/my'),
    path: '/my',
    name: 'my',
    meta: {
      title: '我的',
      tabbar: true
    }
  },
  {
    component: () => import('@/views/test/test'),
    path: '/test',
    name: 'test',
    meta: {
      title: '测试'
    }
  },
  {
    component: () => import('@/views/settings/settings'),
    path: '/settings',
    name: 'settings',
    meta: {
      title: '设置'
    }
  },
  {
    component: () => import('@/views/history/history'),
    path: '/history',
    name: 'history',
    meta: {
      title: '观看历史'
    }
  },
  {
    component: () => import('@/views/video-preview/video-preview'),
    path: '/video-preview',
    name: 'video-preview',
    meta: {
      title: '视频预览'
    }
  },
  {
    component: () => import('@/views/video-info/video-info'),
    path: '/video-info',
    name: 'video-info',
    meta: {
      title: '视频信息'
    }
  },
  {
    component: () => import('@/views/topic/topic'),
    path: '/topic/:id',
    name: 'topic',
    meta: {
      title: '标签'
    }
  },
  {
    component: () => import('@/views/test1/test1'),
    path: '/test1',
    name: 'test1',
    meta: {
      title: '测试1'
    }
  },
  {
    component: () => import('@/views/pub-work/pub-work'),
    path: '/pub-work',
    name: 'pub-work',
    meta: {
      title: '发布作品'
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
