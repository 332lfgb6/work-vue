import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './permission'

// 复制粘贴
import VueClipboard from 'vue-clipboard2'
Vue.use(VueClipboard)

// websocket
import VueSocketIO from 'vue-socket.io'
Vue.use(
  new VueSocketIO({
    debug: false,
    connection: process.env.VUE_APP_BASE_URL,
    vuex: {
      store,
      actionPrefix: 'SOCKET_',
      mutationPrefix: 'SOCKET_'
    },
    options: { path: '/socket.io/' } // Optional options
  })
)

// 引入vime
import '@vime/core/themes/default.css'
// import { Player, Ui } from '@vime/vue'
// Vue.use(Player)
// Vue.use(Ui)

// 引入vant
import Vant from 'vant'
import 'vant/lib/index.less'
Vue.use(Vant)

// // 真机调试
// import VConsole from 'vconsole'
// const vConsole = new VConsole()

// 引入iconpark
import { install } from '@icon-park/vue/es/all'
install(Vue, 'i')

// import VideoPlayer from 'vue-video-player'
// require('video.js/dist/video-js.css')
// require('vue-video-player/src/custom-theme.css')
// Vue.use(VideoPlayer)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
