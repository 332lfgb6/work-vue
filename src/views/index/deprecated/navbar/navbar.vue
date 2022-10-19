<template>
  <u-navbar class="navbar" left-icon="">
    <u-tabs
      current="1"
      :list="tabs"
      slot="center"
      :activeStyle="{ color: '#fff' }"
      :inactiveStyle="{ color: '#ffffff80' }"
      lineColor="#fff"
    ></u-tabs>
    <u-icon name="search" color="#fff" size="30" slot="right"></u-icon>
  </u-navbar>
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
      clickTab(current) {
        this.current = current
      }
    }
  }
</script>

<style lang="less" scoped>
  .navbar {
  }
</style>
