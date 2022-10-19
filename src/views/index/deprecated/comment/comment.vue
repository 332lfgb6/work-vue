<template>
  <view class="comment" @click="$emit('openCommentArea')">
    <u-icon class="icon" name="chat-fill" color="#fff" size="40"></u-icon>
    <text>573</text>
  </view>
</template>

<script>
  export default {
    name: 'comment',
    components: {},
    props: {},
    mixins: [],
    data() {
      return {
        show: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      open() {
        // console.log('open');
      },
      close() {
        this.show = false
        // console.log('close');
      }
    }
  }
</script>

<style lang="less" scoped>
  .comment {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1000;
    bottom: calc(16px + 80px + 16px + 16px + 60px + 16px + 60px);
    right: 24px;
    .icon {
      margin-bottom: 4px;
    }
    //.popup {
    //  z-index: 1200 !important;
    //  background-color: red !important;
    //}
  }
</style>
