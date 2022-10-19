<template>
  <div class="no-message">
    <component :is="`i-${icon}`" theme="outline" size="70" fill="rgba(22, 24, 35, 0.34)"></component>
    <div class="title">{{ title }}</div>
    <div class="subtitle">{{ subtitle }}</div>
  </div>
</template>

<script>
  export default {
    props: {
      icon: String,
      title: String,
      subtitle: String
    }
  }
</script>

<style lang="less">
  .no-message {
    /* 页面高度 - tabbar高度 - 过滤器高度 - 导航栏高度 */
    height: calc(100% - 32px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title {
      font-size: 16px;
      margin: 24px 0 16px;
    }
    .subtitle {
      color: rgba(@primary-color-black, 0.75);
    }
  }
</style>
