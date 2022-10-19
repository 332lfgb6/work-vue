import axios from 'axios'
import store from '@/store'

const request = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL,
  timeout: 10 * 1000
})

request.interceptors.request.use(config => {
  const token = store.state.user.token
  config.headers.token = token
  return config
})

request.interceptors.response.use(res => {
  return res.data.data
})

export default request
