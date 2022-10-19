<template>
  <div class="music">
    <div class="poster-container" :style="{ backgroundImage: `url('${poster}')` }" @click="playPauseMusic">
      <div class="poster" :style="{ backgroundColor: stat === 2 ? '#00000000' : '#00000080' }">
        <van-circle
          v-model="pro"
          size="34"
          stroke-width="100"
          :layer-color="stat === 2 ? '#00000000' : '#ffffff50'"
          :color="stat === 2 ? '#00000000' : '#fff'"
        >
          <van-icon class="play-btn" :name="stat === 1 ? 'pause' : 'play'" color="#fff"></van-icon>
        </van-circle>
        <audio
          ref="audio"
          :src="music_filename"
          v-show="false"
          @canplay="getDuration"
          @timeupdate="updateTime"
          @ended="ended"
        ></audio>
      </div>
    </div>
    <div class="right-right-info">
      <div class="name">{{ music_name }}</div>
      <div class="author">{{ author }}</div>
      <div class="use_num">{{ use_num }}</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'music2',
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
          this.$refs.audio.pause()
          this.$refs.audio.currentTime = 0
        }
      }
    },
    deactivated() {
      this.$emit('updateStat', 2)
    },
    methods: {
      getDuration() {
        this.duration = this.$refs.audio.duration
      },
      updateTime(e) {
        this.pro = (e.target.currentTime / this.duration) * 100
      },
      ended() {
        this.$emit('updateStat', 2)
        this.pro = 0
      },
      playPauseMusic() {
        switch (this.stat) {
          case 0:
            this.$refs.audio.play()
            this.$emit('updateStat', 1)
            break
          case 1:
            this.$refs.audio.pause()
            this.$emit('updateStat', 0)
            break
          case 2:
            this.$refs.audio.play()
            this.$emit('updateStat', 1)
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .music {
    padding: 8px 16px;
    display: flex;

    .poster-container {
      width: 60px;
      height: 60px;
      margin-right: 16px;
      background-size: cover;

      .poster {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        .play-btn {
          line-height: 34px;
        }
      }
    }

    .right-right-info {
      flex: 1;
      overflow: hidden;
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
  }
</style>
