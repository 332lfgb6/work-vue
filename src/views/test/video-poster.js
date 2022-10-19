const mixinVideo = {
  methods: {
    getVideoPoster(url) {
      return new Promise(function (resolve, reject) {
        let video = document.createElement('video')
        video.setAttribute('crossOrigin', 'anonymous') // 处理跨域，H5需后台支持，请求的视频资源响应投标需有Access-Control-Allow-Origin
        video.setAttribute('src', url)
        video.setAttribute('width', 400)
        video.setAttribute('height', 400)
        video.setAttribute('preload', 'auto')
        // uni.chooseVideo选择视频，当选用手机拍摄的视频时，地址是相对地址，如 _doc/uniapp_temp_1650594368317/camera/1650594390147.mp4
        // 可播放，但是loadeddata一直不执行，会触发error事件，视频加载失败
        // 应先转换成本地地址
        video.addEventListener('loadeddata', function () {
          console.log('视频第一帧加载完')
          let canvas = document.createElement('canvas')
          let width = video.width // canvas的尺寸和图片一样
          let height = video.height
          canvas.width = width
          canvas.height = height
          canvas.getContext('2d').drawImage(video, 0, 0, width, height) // 绘制canvas
          const dataURL = canvas.toDataURL('image/jpeg') // 转换为base64
          console.log('getVideoPoster-dataURL', dataURL.slice(0, 16))
          resolve(dataURL)
        })

        video.addEventListener('error', err => {
          console.log('视频加载失败', err)
          reject(err)
        })
      })
    },
    async getAllPoster(newVal, oldVal, owner, instance) {
      console.log('执行getAllPoster')
      // renderjs中，监听的属性videos是一个数组，存放的是选取的视频信息
      // 删除，或updateVideos更新后（长度一样）
      if (newVal.length <= oldVal.length) return
      // 有默认值或添加时
      const newList = []
      for (const item of newVal) {
        // 已获取视频封面的不再重复获取
        if (item.posterUrl !== undefined) {
          newList.push({ ...item })
          continue
        }

        try {
          let url = item.url
          // 拍摄视频：_doc/uniapp_temp_1650594368317/camera/1650594390147.mp4
          // 网络视频：https://
          // 本地视频：file://
          if (!item.url.includes('file://') && !item.url.includes('https://')) {
            // 将本地URL路径转换成平台绝对路径
            // 如输入url为“_doc/a.png”：
            // Android平台转换后的路径为“/storage/sdcard0/Android/data/io.dcloud.HBuilder/.HBuilder/apps/HBuilder/doc/ａ.png”；
            // #ifdef APP-VUE
            url = 'file://' + plus.io.convertLocalFileSystemURL(item.url)
            // #endif
          }
          const dataUrl = await this.getVideoPoster(url)
          newList.push({ ...item, posterUrl: dataUrl })
        } catch (err) {
          newList.push({ ...item })
        }
      }
      this.$ownerInstance.callMethod('updateVideos', newList)
    }
  }
}

export default mixinVideo
