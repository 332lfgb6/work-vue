import request from '@/config/request'

export const followSb = userId =>
  request({
    url: 'follow/followSb',
    method: 'post',
    data: { userId },
    custom: {
      auth: true
    }
  })

export const cancelFollowSb = userId =>
  request({
    url: 'follow/cancelFollowSb',
    method: 'post',
    data: { userId },
    custom: {
      auth: true
    }
  })
