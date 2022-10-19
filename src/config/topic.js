import request from '@/config/request'

// 获取标签列表
export const getTopicList = () =>
  request({
    url: 'index/getTopicList'
  })

// 获取标签信息
export const getTopicInfo = topicId =>
  request({
    url: 'topic/getTopicInfo',
    data: { topicId }
  })
