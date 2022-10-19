import request from '@/config/request'

export const getCommentList = (videoId, parentCommentId, page) =>
  request({
    url: 'comment/getCommentList',
    params: {
      videoId,
      parentCommentId,
      page
    }
  })

// 发布评论
export const pubComment = (content, videoId, reply_user_id, parent_id) =>
  request({
    url: 'comment/pubComment',
    methods: 'post',
    data: {
      content,
      videoId,
      reply_user_id,
      parent_id
    },
    custom: {
      auth: true,
      successToast: true
    }
  })

// 删除评论
export const delComment = commentId =>
  request({
    url: 'comment/delComment',
    methods: 'post',
    data: {
      commentId
    },
    custom: {
      auth: true,
      successToast: true
    }
  })
