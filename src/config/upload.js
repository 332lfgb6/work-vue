import request from '@/config/request'

// todo
// 获取首页数据
export const uploadVideo = filePath =>
  http.upload('upload/uploadVideo', {
    filePath
  })

// 上传图像
export const uploadImg = data =>
  request({
    url: 'upload/uploadImg',
    data
  })
