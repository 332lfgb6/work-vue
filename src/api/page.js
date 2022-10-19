import request from '@/utils/request'

export const getIndexData = historyVideoIdList => {
  return request({
    url: '/page/getIndexData2',
    params: { historyVideoIdList }
  })
}
