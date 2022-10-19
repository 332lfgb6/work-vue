import request from '@/config/request'

export const getVideoList = (type, historyVideoIdList, userId, topicId) =>
  request({
    url: 'video/getVideoList',
    data: {
      type,
      historyVideoIdList,
      userId,
      topicId
    }
  })

export const pubWork = data =>
  request({
    url: 'index/pubWork',
    data
  })
