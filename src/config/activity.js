import request from '@/config/request'

export const getActivity = () =>
  request({
    url: 'activity/getActivity',
    custom: {
      auth: true
    }
  })
