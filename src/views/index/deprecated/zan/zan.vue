<template>
  <view class="comment">
    <transition name="scale" mode="out-in">
      <u-icon key="1" v-if="!zaned" class="icon" name="heart-fill" color="#fff" size="40" @click="zanVideo"></u-icon>
      <u-icon key="2" v-else class="icon" name="heart-fill" color="#fe2c55" size="40" @click="zanVideo"></u-icon>
    </transition>
    <text>3675</text>
  </view>
</template>

<script>
  import { zanVideo } from '../../../../config/history'

  export default {
    name: 'love',
    components: {},
    props: {
      videoId: Number,
      zaned: Number
    },
    mixins: [],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async zanVideo() {
        const zaned = this.zaned === 0 ? 1 : 0
        await zanVideo(this.videoId, zaned)
        this.$emit('updateZanStat', zaned)
      }
    }
  }
</script>

<style lang="less" scoped>
  .comment {
    //background-image: linear-gradient(#fa5983,#ff2f5b);
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1000;
    bottom: calc(16px + 80px + 16px + 16px + 60px + 16px + 60px + 16px + 60px);
    right: 24px;
    .icon {
      margin-bottom: 4px;
    }
  }
</style>
