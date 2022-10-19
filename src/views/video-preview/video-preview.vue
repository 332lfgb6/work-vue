<template>
  <view class="video-preview page">
    <u-navbar leftIconColor="#fff" bgColor="transparent" @leftClick="zzz">
      <view class="choose-music" slot="center">
        <music-one></music-one>
        <text>选择音乐</text>
      </view>
    </u-navbar>
    <video :src="fileUri" :controls="false" :show-center-play-btn="false" autoplay loop></video>
    <view class="next-step">
      <u-button type="error" :customStyle="{ backgroundColor: '#fc2b55', height: '44px' }">下一步</u-button>
    </view>
  </view>
</template>

<script>
  import { MusicOne } from '@icon-park/vue'
  export default {
    components: {
      MusicOne
    },
    data() {
      return {
        fileUri: ''
      }
    },
    onLoad(options) {
      this.fileUri = this.$route.query.fileUri
    },
    methods: {
      zzz() {
        this.$router.back(1)
      }
    }
  }
</script>

<style lang="less">
  .video-preview {
    height: 100%;
    background-color: #000;
    .choose-music {
      background-color: #00000090;
      padding: 8px;
      border-radius: 4px;
      text {
        margin-left: 4px;
      }
    }
    video {
      width: 100%;
      height: calc(100% - 60px);
    }
    .next-step {
      padding: 8px;
    }
  }
</style>
