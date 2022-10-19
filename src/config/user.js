import Vue from 'vue'
import request from '@/config/request'

// 登录
export const login = phone =>
  request({
    url: 'user/login',
    data: { phone }
  })

// 注册
export const register = (phone, username, avatar) =>
  request({
    url: 'user/register',
    data: {
      phone,
      username,
      avatar
    }
  })

// 获取用户信息
export const getUserinfo = userId =>
  request({
    url: 'user/getUserinfo',
    data: {
      userId
    }
  })

// 退出登录
export const logout = () => request({ url: 'user/logout' })

// 获取用户列表
export const getUserList = () =>
  request({
    url: 'user/getUserList',
    method: 'get'
  })

// deprecated
// // 检查token是否有效
// export const checkToken = async () => {
//   const token = Vue.vuex_token
//   if (!token) {
//     return false
//   } else {
//     return await http.post('user/checkToken')
//   }
// }
