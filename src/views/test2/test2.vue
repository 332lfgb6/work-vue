<template>
  <div class="test2">
    <video ref="video" src="http://192.168.68.115:8360/upload/videos/23.mp4" autoplay muted></video>
    <button @click="$router.replace('/test1')">test2</button>
  </div>
</template>

<script>
  export default {
    name: 'test2',
    components: {},
    props: {},
    mixins: [],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {
      console.log('test2 created')
    },
    activated() {
      this.$refs.video.play()
    },
    mounted() {},
    methods: {}
  }
</script>

<style lang="less" scoped>
  .test2 {
  }
</style>
