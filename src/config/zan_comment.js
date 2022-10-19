import request from '@/config/request'

export const zanComment = (zaned, commentId) =>
  request({
    url: 'zan_comment/zanComment',
    data: {
      zaned,
      commentId
    },
    custom: {
      auth: true
    }
  })
