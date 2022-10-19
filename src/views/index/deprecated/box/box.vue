<template>
  <view class="box"></view>
</template>

<script>
  export default {
    name: 'box',
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
  .box {
    width: 100px;
    height: 100px;
    background-color: cyan;
    position: fixed;
    bottom: 0;
    z-index: 21;
  }
</style>
