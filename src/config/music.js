import request from '@/config/request'

// 获取首页数据
export const getMusicList = () =>
  request({
    url: 'music/getMusicList'
  })
