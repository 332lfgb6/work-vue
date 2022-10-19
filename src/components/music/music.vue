<template>
  <div class="music">
    <div class="poster-container" :style="{ backgroundImage: `url('${poster}')` }">
      <div class="player" @click="playPauseMusic" :style="{ backgroundColor: stat === 2 ? '#00000000' : '#00000090' }">
        <!--        <circle-progress-bar-->
        <!--          :border_color="stat === 2 ? '#00000000' : '#fff'"-->
        <!--          :border_back_color="stat === 2 ? '#00000000' : '#00000025'"-->
        <!--          :background="stat === 2 ? '#00000000' : '#00000090'"-->
        <!--          :border_width="3"-->
        <!--          unit="px"-->
        <!--          :size="34"-->
        <!--          :pro="pro"-->
        <!--        >-->
        <!--          <component :is="stat === 1 ? 'i-pause' : 'i-play-one'" theme="filled" size="20" fill="#fff"></component>-->
        <!--        </circle-progress-bar>-->
      </div>
    </div>
    <div class="right">
      <div class="name">{{ music_name }}</div>
      <div class="author">{{ author }}</div>
      <div class="use_num">{{ use_num }}</div>
    </div>
  </div>
</template>

<script>
  import CircleProgressBar from '@/components/circle-progress-bar/circle-progress-bar'
  export default {
    components: { CircleProgressBar },
    props: {
      poster: String,
      music_filename: String,
      music_name: String,
      author: String,
      use_num: Number,
      stat: Number // 0代表暂停，1代表播放，2代表停止
    },
    data() {
      return {
        pro: 0,
        innerAudioContext: null,
        duration: 0
      }
    },
    watch: {
      // 这个监听在音乐列表才会用到
      stat(v) {
        if (v === 2) {
          this.innerAudioContext.stop()
        }
      }
    },
    methods: {
      playPauseMusic() {
        switch (this.stat) {
          case 0:
            this.innerAudioContext.play()
            this.$emit('updateStat', 1)
            break
          case 1:
            this.innerAudioContext.pause()
            this.$emit('updateStat', 0)
            break
          case 2:
            const innerAudioContext = uni.createInnerAudioContext()
            innerAudioContext.src = this.music_filename
            innerAudioContext.onCanplay(() => {
              this.duration = innerAudioContext.duration
            })
            innerAudioContext.onEnded(() => {
              this.$emit('updateStat', 2)

              // 自然播放完毕后，重置进度条进度
              this.pro = 0

              // 自然播放完毕后，清除所有监听器
              innerAudioContext.offCanplay()
              innerAudioContext.offEnded()
              innerAudioContext.offTimeUpdate()
            })
            innerAudioContext.onTimeUpdate(() => {
              this.pro = innerAudioContext.currentTime / this.duration
            })
            innerAudioContext.play()
            this.innerAudioContext = innerAudioContext
            this.$emit('updateStat', 1)
            break
        }
      }
    }
  }
</script>

<style lang="less">
  .music {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    .poster-container {
      background-size: cover;
      overflow: hidden;
      margin-right: 8px;
      .player {
        width: 60px;
        height: 60px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .right {
      flex: 1;
      overflow: hidden;
    }
    .name {
      white-space: nowrap;
      text-overflow: ellipsis;
      overflow: hidden;
      width: 100%;
      font-weight: 600;
    }
    .author,
    .use_num {
      color: rgba(@primary-color-black, 0.75);
      margin-top: 4px;
    }
  }
</style>
