<template>
  <div class="share">
    <u-icon class="icon" name="share-fill" color="#fff" size="40"></u-icon>
    <text>699</text>
  </div>
</template>

<script>
  export default {
    name: 'share',
    components: {},
    props: {},
    mixins: [],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="less" scoped>
  .share {
    width: 60px;
    height: 60px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: absolute;
    z-index: 1000;
    bottom: calc(16px + 80px + 16px);
    right: 24px;
    .icon {
      margin-bottom: 4px;
    }
  }
</style>
