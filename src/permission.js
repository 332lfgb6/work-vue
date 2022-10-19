import router from './router'
import store from './store'
import { getToken } from '@/utils/auth'
import { getUserinfo } from '@/config/user' // get token from cookie

//全局路由前置守卫
const whiteList = ['index', 'discover', 'message', 'my', 'login', 'basic-info', 'user', 'test1', 'topic']
router.beforeEach(async (to, from, next) => {
  document.title = to.meta.title // 给当前页面设置标题

  const { vuex_token, vuex_userinfo } = store.state.user
  if (vuex_token) {
    if (!vuex_userinfo.username) {
      store.commit('user/SET_VUEX_USERINFO', await getUserinfo())
    }
    next()
  } else {
    if (whiteList.includes(to.name)) {
      next()
    } else {
      next('/login')
    }
  }
})
