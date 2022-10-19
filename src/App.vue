<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>

<script>
  import Tabbar from '@/components/tabbar/tabbar'
  export default {
    components: { Tabbar },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="less">
  html,
  body,
  #app,
  .no-tabbar-page {
    height: 100%;
  }

  .tabbar-page {
    height: calc(100% - 50px);
  }

  .no-tabbar-page,
  .tabbar-page {
    font-size: 14px;
    color: @primary-color-black;
  }

  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }

  // 缩放动画
  @keyframes scale {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.8);
    }
  }
  .scale-enter-active {
    animation: scale 0.2s ease reverse;
  }
  .scale-leave-active {
    animation: scale 0.2s ease;
  }
</style>
