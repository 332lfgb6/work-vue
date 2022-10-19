<template>
  <view class="index">
    <!-- 123 -->
    <navbar></navbar>
    <view class="voice" v-if="muted" @click="muted = false">
      <u-icon name="volume-off-fill"></u-icon>
      <text>解除静音</text>
    </view>
    <image class="pause" src="../../static/pause.png" v-if="pause" @click="playPause"></image>
    <view class="video-list" v-if="showVideos" @touchstart="touchstart" @touchend="touchend">
      <!--不要把touchstart和touchend写在这，因为有一定概率触发不起作用-->
      <swiper :current="current" vertical @change="changeVideo" @animationfinish="animationfinish">
        <swiper-item v-for="(item, i) of videoList" :key="item.id">
          <avatar
            :avatar-path="item.avatar"
            :follow="item.follow"
            :user-id="item.user_id"
            @followSuccess="videoList[i].follow = 1"
          ></avatar>
          <zan :video-id="item.id" :zaned="item.zaned" @updateZanStat="zaned => (videoList[i].zaned = zaned)"></zan>
          <comment @openCommentArea="openCommentArea(item.id)"></comment>
          <collect
            :video-id="item.id"
            :collected="item.collected"
            @updateCollectStat="collected => (videoList[i].collected = collected)"
          ></collect>
          <share></share>
          <cover :cover="item.poster"></cover>
          <video
            :id="item.filename"
            :controls="false"
            :show-center-play-btn="false"
            :src="item.filename"
            autoplay
            loop
            :muted="muted"
            @click="playPause"
          ></video>
        </swiper-item>
      </swiper>
    </view>

    <!--评论区-->
    <u-popup class="popup" :show="showCommentArea" @close="showCommentArea = false" mode="bottom" :round="4">
      <view class="comment-area">
        <view class="top">
          <text></text>
          <text>153 条评论</text>
          <u-icon name="close"></u-icon>
        </view>
        <view class="comment-list">
          <view class="comment-info" v-for="v of commentList" :key="v.id">
            <u-image :src="v.avatar" width="50" height="50" shape="circle"></u-image>
            <view class="right-info">
              <view>{{ v.username }}</view>
              <view class="content">{{ v.content }}</view>
              <view class="bottom">
                <view class="left">
                  <text class="time">{{ v.pub_time }}</text>
                  <text>{{ v.province }}</text>
                </view>
                <view class="right">
                  <like></like>
                  <text>245</text>
                  <dislike class="dislike"></dislike>
                </view>
              </view>
            </view>
          </view>
        </view>
        <view class="toolbar">
          <textarea placeholder="善言结善缘，恶言伤人心~" auto-height @focus="show3 = true"></textarea>
        </view>
      </view>
    </u-popup>

    <u-popup :show="show3">
      <textarea placeholder="善言结善缘，恶言伤人心~" auto-height @click="show3 = true"></textarea>
    </u-popup>

    <tabbar></tabbar>

    <!--刷完所有视频后弹出得提示-->
    <u-popup :show="showOverTip" mode="center" :round="4">
      <view class="over-tip">
        <view class="title">刷完提示</view>
        <view class="content">
          你已经看完了所有测试视频，是否重置数据？（重置数据后，所有观看历史、点赞的视频、收藏的视频将会清空。）
        </view>
        <u-button class="confirm" type="error" @click="delHistory">确定</u-button>
        <view class="cancel" @click="showOverTip = false">取消</view>
      </view>
    </u-popup>
  </view>
</template>

<script>
  import { getIndexData } from '@/config/page'
  import Avatar from '@/pages/index/avatar/avatar'
  import Zan from '@/pages/index/zan/zan'
  import Comment from '@/pages/index/comment/comment'
  import Cover from '@/pages/index/cover/cover'
  import Collect from '@/pages/index/collect/collect'
  import Share from '@/pages/index/share/share'
  import Tabbar from '@/components/tabbar/tabbar.vue'
  import Navbar from '@/pages/index/navbar/navbar'
  import { addHistory, delHistory } from '../../../config/history'
  import Box from './box/box'
  import UIcon from '../../../uni_modules/uview-ui/components/u-icon/u-icon'
  import UImage from '../../../uni_modules/uview-ui/components/u-image/u-image'
  import { Dislike, Like } from '@icon-park/vue'
  import { getCommentList } from '../../../config/comment'
  import UPopup from '../../../uni_modules/uview-ui/components/u-popup/u-popup'

  export default {
    components: {
      UPopup,
      UImage,
      UIcon,
      Box,
      Navbar,
      Tabbar,
      Share,
      Collect,
      Cover,
      Zan,
      Comment,
      Avatar,
      Dislike,
      Like
    },
    data() {
      return {
        showCommentArea: false,
        muted: true,
        videoList: [],
        videoContext: null,
        height: 0,
        current: 0,
        pause: false,
        showOverTip: false,
        comment: '',
        commentList: [],
        show3: false,
        current: 0,
        touchstartSwiperItemIndex: 0, // 滑动开始时的滑块索引
        pageY: 0,
        showVideos: true, // 重置视频的时候，为了防止key复用。
        resetingData: false
      }
    },
    onLoad() {
      // 去除底部黑框
      const system = uni.getSystemInfoSync()
      this.height = system.windowHeight - 50 + 'px'
    },
    onReady() {
      this.getIndexData()
    },
    beforeRouteLeave(to, from, next) {
      // 导航离开该组件的对应路由时调用
      // 可以访问组件实例 `this`
      next()
    },
    async onShow() {
      // 桌面回到浏览器，视频会自动播放。
      this.videoContext && this.videoContext.play()

      // 未登录状态正在观看的视频，登录成功后，要把这条视频加入到观看历史表中。
      if (this.vuex_token && this.videoList.length) {
        await addHistory(this.videoList[this.current].id)
      }
    },
    async onHide() {
      // 浏览器到桌面，视频暂停。
      this.videoContext && this.videoContext.pause()
    },
    methods: {
      touchstart(e) {
        this.pageY = e.changedTouches[0].pageY
        this.touchstartSwiperItemIndex = this.current
      },
      touchend(e) {
        // 视频滑倒了最后一个，再继续往上滑，就会弹出重置提示。
        const { pageY, current, videoList, touchstartSwiperItemIndex } = this
        e.changedTouches[0].pageY < pageY &&
          current === videoList.length - 1 &&
          current === touchstartSwiperItemIndex &&
          (this.showOverTip = true)
      },
      animationfinish(e) {
        // console.log('zzz')
        // bug: 视频暂停也会触发animationfinish
        // this.current === e.detail.current && (this.showOverTip = true)
      },
      openCommentArea(videoId) {
        this.showCommentArea = true
        this.getCommentList(videoId)
      },
      async getCommentList(videoId) {
        this.commentList = await getCommentList(videoId)
      },
      async delHistory() {
        // 滑倒最后一个视频的时候，继续下滑，会弹出重置对话框，此时虽然videoList被替换了，但是由于缓存的远古，重置数据前的音乐依然在播放。
        this.videoContext && this.videoContext.pause()
        const videoList = await delHistory()
        debugger
        this.resetingData = true
        this.current = 0
        // this.showVideos = false
        this.videoList = videoList
        this.videoContext = uni.createVideoContext(videoList[0].filename)
        uni.removeStorageSync('historyVideoIdList')
        uni.setStorageSync('historyVideoIdList', [videoList[0].id])
        this.showOverTip = false
        this.resetingData = false
        // this.showVideos = true
      },
      async getIndexData() {
        // 刷到过的视频，不会刷到第二次
        const historyVideoIdList = uni.getStorageSync('historyVideoIdList') || []
        const historyVideoIdListStr = historyVideoIdList.join(',')
        this.videoList = await getIndexData(historyVideoIdListStr)

        // 刷完所有视频后弹出得提示
        if (!this.videoList.length) return (this.showOverTip = true)

        const firstVideo = this.videoList[0]
        this.videoContext = uni.createVideoContext(firstVideo.filename)

        // 未登录状态下，看过的视频本地缓存。
        if (!this.vuex_token) {
          !historyVideoIdList.includes(firstVideo.id) && historyVideoIdList.push(firstVideo.id)
          uni.setStorageSync('historyVideoIdList', historyVideoIdList)
        }
      },
      playPause() {
        this.pause = !this.pause
        this.pause ? this.videoContext.pause() : this.videoContext.play()
      },
      async changeVideo(e) {
        if (!this.resetingData) {
          console.log('moveing')
          // 上一个视频暂停，下一个视频播放
          this.videoContext.pause()
          const current = e.detail.current
          this.videoContext = uni.createVideoContext(this.videoList[current].filename)
          this.videoContext.play()
          // 暂停按钮消失
          this.pause = false

          // 加入到观看历史中去，已登录就加入到观看历史表中去，未登录就加入到本地存储中去
          const currentVideoId = this.videoList[current].id
          if (this.vuex_token) {
            await addHistory(currentVideoId)
          } else {
            const historyVideoIdList = uni.getStorageSync('historyVideoIdList') || []
            !historyVideoIdList.includes(currentVideoId) && historyVideoIdList.push(currentVideoId)
            uni.setStorageSync('historyVideoIdList', historyVideoIdList)
          }

          this.current = current
        }
      }
    }
  }
</script>

<style lang="less">
  .index {
    background-color: black;
    height: 100%;
    .navbar {
      ::v-deep {
        .u-navbar__content {
          background: transparent !important;
        }
      }
    }

    .voice {
      position: fixed;
      top: 100px;
      left: 50px;
      background: rgba(255, 255, 255, 0.85);
      z-index: 1000;
      padding: 8px 16px;
      display: flex;
      align-items: center;
      border-radius: 4px;
      text {
        margin-left: 16px;
        color: black;
      }
    }

    .pause {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 1000;
      width: 60px;
      height: 60px;
    }

    .video-list {
      height: 100%;
      swiper {
        height: 100%;
        z-index: 30;
        ::v-deep {
          .uni-swiper-slides {
            z-index: 30;
          }
          .uni-swiper-slide-frame {
            z-index: 30;
          }
        }
        swiper-item {
          z-index: 30;
          video {
            width: 100%;
            height: 100%;
          }
        }
      }
    }

    .over-tip {
      width: 200px;
      padding: 16px;
      text-align: center;
      .title {
        color: @primary-color-black;
        font-weight: bold;
        margin-bottom: 8px;
      }
      .content {
        color: rgba(@primary-color-black, 0.75);
        text-align: left;
        font-size: 14px;
        margin-bottom: 16px;
      }
      .confirm {
        background-color: @primary-color-pink;
      }
      .cancel {
        color: $u-tips-color;
        font-size: 14px;
        margin-top: 8px;
      }
    }

    .comment-area {
      font-size: 12px;
      height: 400px;
      position: relative;
      display: flex;
      flex-direction: column;
      .top {
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        color: @primary-color-black;
      }
      .comment-list {
        flex: 1;
        overflow: scroll;
        .comment-info {
          padding: 8px 16px;
          display: flex;
          .right-info {
            margin-left: 8px;
            flex: 1;
            color: rgba(@primary-color-black, 0.75);
            .content {
              margin: 8px 0;
              color: @primary-color-black;
              font-size: 14px;
            }
            .bottom {
              display: flex;
              justify-content: space-between;
              .time {
                margin-right: 16px;
              }
              .dislike {
                margin-left: 16px;
              }
            }
          }
        }
      }
      .toolbar {
        border-top: 1px solid rgba(@primary-color-black, 0.75);
        padding: 8px 16px;
        textarea {
          padding: 8px;
          color: rgba(@primary-color-black, 0.75);
          background-color: #f3f3f3;
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
  }
</style>
