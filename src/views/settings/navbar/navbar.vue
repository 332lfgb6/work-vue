<template>
  <u-navbar
    class="navbar"
    title="设置"
    :fixed="false"
    bgColor="#151724"
    leftIconColor="#fff"
    :titleStyle="{ color: '#fff' }"
    @leftClick="$router.back(1)"
  ></u-navbar>
</template>

<script>
  export default {
    name: 'navbar',
    components: {},
    props: {},
    mixins: [],
    data() {
      return {
        tabs: [{ name: '关注' }, { name: '推荐' }]
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      clickTab() {}
    }
  }
</script>

<style lang="less" scoped>
  .navbar {
  }
</style>
