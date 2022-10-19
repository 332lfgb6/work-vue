<template>
  <div class="discover tabbar-page">
    <van-nav-bar title="发现" :fixed="false" />
    <van-tabs v-model="active" @change="changeIndex">
      <van-tab title="用户">
        <div class="user-list">
          <div class="user" v-for="v of userList" :key="v.id">
            <van-image class="avatar" round showLoading :src="v.avatar" width="40px" height="40px"></van-image>
            <div>
              <div class="name">{{ v.username }}</div>
              <div class="fans_num_douyin_no">
                <span class="douyin_no">@{{ v.douyinNo }}</span>
                <span class="fans_num">{{ v.fans_num }}粉丝</span>
              </div>
            </div>
          </div>
        </div>
      </van-tab>
      <van-tab title="音乐">
        <div class="music-list">
          <music2
            v-for="(v, i) of musicList"
            :key="v.id"
            :author="v.author"
            :music_filename="v.music_filename"
            :music_name="v.music_name"
            :poster="v.poster"
            :use_num="v.use_num"
            :stat="v.stat"
            @updateStat="updateStat($event, v, i)"
          ></music2>

          <!--          <div class="box" style="width: 100px; height: 100px; background-color: cyan" v-for="n of 20"></div>-->
        </div>
      </van-tab>
      <van-tab title="标签">
        <div class="topic-list">
          <div
            class="topic"
            v-for="v in topicList.data"
            :key="v.id"
            @click="$router.push({ name: 'topic', params: { id: v.id } })"
          >
            <div class="left">
              <div class="topic-icon">#</div>
              <span class="topic-name">{{ v.name }}</span>
            </div>
            <span class="video-num">{{ v.videoNum }} 个视频</span>
          </div>
        </div>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
  import tabbar from '@/components/tabbar/tabbar.vue'
  import { getUserList } from '@/config/user.js'
  import { getMusicList } from '@/config/music.js'
  import Music2 from '@/components/music2/music2'
  import { getTopicList } from '@/config/topic'
  export default {
    data() {
      return {
        active: 0,
        userList: [],
        musicList: [],
        value: 0,
        current: 0,
        playingI: -1,
        innerAudioContext: null,
        duration: 0, // 音频的时长,
        pro: 0,

        playingMusicI: -1,

        topicList: {}
      }
    },
    components: {
      Music2,
      tabbar
    },
    async created() {
      this.userList = await getUserList()
    },
    methods: {
      async changeIndex(e) {
        switch (e) {
          case 1:
            const musicList = await getMusicList()
            this.musicList = musicList.map(v => {
              v.stat = 2
              return v
            })
            break
          case 2:
            this.topicList = await getTopicList()
            break
        }
      },
      async playPauseMusic(i) {
        const musicList = this.musicList
        const playingI = this.playingI
        if (i === playingI) {
          switch (musicList[playingI].stat) {
            case 0:
              this.innerAudioContext.play()
              musicList[playingI].stat = 1
              break
            case 1:
              this.innerAudioContext.pause()
              musicList[playingI].stat = 0
              break
            case 2:
              this.pro = 0
              this.innerAudioContext.play()
              musicList[playingI].stat = 1
              break
          }
        } else {
          this.innerAudioContext && this.innerAudioContext.stop()
          this.pro = 0
          const innerAudioContext = uni.createInnerAudioContext()
          innerAudioContext.src = musicList[i].music_filename
          innerAudioContext.play()
          if (playingI !== -1) {
            musicList[playingI].stat = 2
          }
          musicList[i].stat = 1
          this.innerAudioContext = innerAudioContext
          this.innerAudioContext.onCanplay(e => {
            this.duration = innerAudioContext.duration
          })
          this.innerAudioContext.onEnded(() => {
            musicList[i].stat = 2
          })
          this.innerAudioContext.onTimeUpdate(() => {
            this.pro = innerAudioContext.currentTime / this.duration
          })
          this.playingI = i
        }
      },
      updateStat(e, v, i) {
        // 第一次点击播放音乐按钮
        if (this.playingMusicI === -1) {
          v.stat = e
          this.playingMusicI = i
          return
        }

        // 同一首歌点击播放暂停
        if (this.playingMusicI === i) {
          v.stat = e
          return
        }

        // 播放一首新歌
        this.musicList[this.playingMusicI].stat = 2
        v.stat = e
        this.playingMusicI = i
      }
    }
  }
</script>

<style lang="less" scoped>
  .discover {
    .van-tabs {
      height: calc(100% - 46px);
      ::v-deep {
        .van-tabs__content {
          height: calc(100% - 44px);
          .van-tab__pane {
            height: 100%;
          }
        }
      }
    }

    .user-list,
    .music-list,
    .topic-list {
      padding: 8px 0;
      height: 100%;
      overflow: auto;
    }

    .topic-list {
      .topic {
        padding: 8px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        .left {
          display: flex;
          align-items: center;
          .topic-icon {
            width: 32px;
            height: 32px;
            border-radius: 16px;
            border: 1px solid rgba(@primary-color-black, 0.5);
            line-height: 32px;
            text-align: center;
            font-weight: 600;
          }
          .topic-name {
            font-weight: 600;
            margin-left: 16px;
          }
        }
        .video-num {
          color: rgba(@primary-color-black, 0.5);
        }
      }
    }

    ::v-deep {
      // 滑块的背景颜色
      .u-tabs__wrapper__nav__line {
        background-color: @primary-color-black !important;
      }
    }

    .user {
      padding: 8px 16px;
      font-size: 14px;
      display: flex;
      align-items: center;
      .avatar,
      .poster-container {
        margin-right: 8px;
      }
      .name {
        font-weight: 600;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .fans_num_douyin_no,
      .author,
      .use_num {
        color: rgba(@primary-color-black, 0.75);
      }
    }

    .user {
      height: 60px;
      .fans_num_douyin_no {
        margin-top: 8px;
      }
      .fans_num {
        margin-left: 8px;
      }
    }
  }
</style>
