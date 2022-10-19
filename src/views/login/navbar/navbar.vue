<template>
  <van-nav-bar left-arrow :fixed="false" @click-left="$router.back()" />
</template>

<script>
  export default {
    name: 'navbar',
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
  .navbar {
  }
</style>
