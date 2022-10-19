<template>
  <div class="no-login">
    <component :is="icon" theme="outline" size="70" />
    <span class="tip">{{ tip }}</span>
    <van-button class="button" color="#fe2c55" text="注册" @click="$router.push('/login')"></van-button>
  </div>
</template>

<script>
  export default {
    name: 'no-login',
    components: {},
    props: {
      icon: String,
      tip: String
    },
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

<style lang="scss" scoped>
  .no-login {
    height: calc(100% - 46px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .tip {
      margin: 36px 0 26px;
    }
    .button {
      width: 180px;
    }
  }
</style>
