import request from '@/config/request'

// 获取观看历史列表
export const getHistoryList = () =>
  request({
    url: 'history/getHistoryList',
    method: 'get',
    custom: {
      auth: true
    }
  })

// 删除观看历史
export const delHistory = () =>
  request({
    url: 'history/delHistory2',
    method: 'delete',
    custom: {
      auth: true
    }
  })

// 添加观看历史
export const addHistory = videoIdList => {
  request({
    url: 'history/addHistory',
    data: {
      videoIdList
    },
    custom: {
      auth: true,
      catch: true
    }
  })
}

// 点赞视频
export const zanVideo = (videoId, zaned) =>
  request({
    url: 'history/zanVideo',
    method: 'put',
    data: {
      videoId,
      zaned
    },
    custom: {
      auth: true
    }
  })

//获取赞过的视频列表
export const getZanedVideoList = () =>
  request({
    url: 'history/getZanedVideoList',
    method: 'get',
    custom: {
      auth: true
    }
  })

// 收藏视频
export const collectVideo = (videoId, collected) =>
  request({
    url: 'history/collectVideo',
    data: {
      videoId,
      collected
    },
    custom: {
      auth: true
    }
  })

//获取收藏过的视频列表
export const getCollectedVideoList = () =>
  request({
    url: 'history/getCollectedVideoList',
    method: 'get',
    custom: {
      auth: true
    }
  })
