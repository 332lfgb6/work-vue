import axios from 'axios'
import store from '@/store'
import router from '@/router'
import { Toast } from 'vant'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL + '/api/',
  timeout: 10 * 1000,
  method: 'post'
})

request.interceptors.request.use(config => {
  const token = store.state.user.vuex_token
  config.headers.token = token

  if (config.custom?.auth && !token) {
    router.push('/login')
    return new Promise(() => {})
  }

  return config
})

request.interceptors.response.use(res => {
  const data = res.data

  const custom = res.config.custom
  if (data.errno !== 0) {
    // 如果没有显式定义custom的toast参数为false的话，默认对报错进行toast弹出提示
    if (custom.toast !== false) {
      Toast(data.errmsg)
    }

    // 如果需要catch返回，则进行reject
    if (custom?.catch) {
      return Promise.reject(data)
    } else {
      // 否则返回一个pending中的promise，请求不会进入catch中
      return new Promise(() => {})
    }
  }

  // errno为0，是否弹出成功提示。
  if (res.config.custom?.successToast) {
    Toast(data.errmsg)
  }

  return data.data

  return res.data.data
})

export default request
