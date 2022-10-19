<template>
  <div class="collect">
    <transition name="scale" mode="out-in">
      <u-icon
        key="1"
        v-if="!collected"
        class="icon"
        name="star-fill"
        color="#fff"
        size="40"
        @click="collectVideo"
      ></u-icon>
      <u-icon key="2" v-else class="icon" name="star-fill" color="#fbb807" size="40" @click="collectVideo"></u-icon>
    </transition>
    <text>786</text>
  </div>
</template>

<script>
  import { collectVideo } from '../../../../config/history'

  export default {
    name: 'collect',
    components: {},
    props: {
      videoId: Number,
      collected: Number
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
      async collectVideo() {
        const collected = this.collected === 0 ? 1 : 0
        await collectVideo(this.videoId, collected)
        this.$emit('updateCollectStat', collected)
      }
    }
  }
</script>

<style lang="less" scoped>
  .collect {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1000;
    bottom: calc(16px + 80px + 16px + 16px + 60px);
    right: 24px;
    .icon {
      margin-bottom: 4px;
    }
  }
</style>
