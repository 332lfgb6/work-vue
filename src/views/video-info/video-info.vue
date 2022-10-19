<template>
  <view class="video-list"><videos></videos></view>
</template>

<script>
  import Videos from '@/components/videos/videos.vue'
  export default {
    comments: { Videos },
    data() {
      return {}
    },
    onLoad() {}
  }
</script>

<style lang="less">
  .video-list {
    height: 100%;
  }
</style>
