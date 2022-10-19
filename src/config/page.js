import request from '@/config/request'

// 获取首页数据
export const getIndexData = historyVideoIdList =>
  request({
    url: 'page/getIndexData2',
    method: 'get',
    params: {
      historyVideoIdList
    }
  })

// 获取我的页数据
export const getMyData = () =>
  request({
    url: 'page/getMyData',
    method: 'get',
    custom: {
      auth: true
    }
  })
