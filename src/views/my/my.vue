<template>
  <div class="tabbar-page">
    <div class="my-page" v-if="!vuex_userinfo.username">
      <van-nav-bar title="个人资料">
        <!--        <template #right>-->
        <!--          <van-icon name="ellipsis" size="24"></van-icon>-->
        <!--        </template>-->
      </van-nav-bar>
      <no-login icon="i-user" tip="注册账号"></no-login>
    </div>
    <user-panel ref="user-panel" v-model="needGetUserinfo" v-else></user-panel>
  </div>
</template>

<script>
  import UserPanel from '@/components/user-panel/user-panel.vue'
  import Tabbar from '@/components/tabbar/tabbar.vue'
  import { mapState } from 'vuex'
  import NoLogin from '@/components/no-login/no-login'

  export default {
    components: { NoLogin, Tabbar, UserPanel },
    data() {
      return {
        needGetUserinfo: false
      }
    },
    computed: {
      ...mapState({
        vuex_userinfo: state => state.user.vuex_userinfo
      })
    },
    onShow() {
      // 只要进入到user页或my页，就重新获取用户信息。
      setTimeout(() => {
        this.needGetUserinfo = true
      }, 500)

      this.$refs['user-panel'] && this.$refs['user-panel'].onshow()
    },
    onReady() {
      this.$refs['user-panel'] && this.$refs['user-panel'].onshow()
    },
    methods: {}
  }
</script>

<style lang="less">
  .my-page {
    height: calc(100% - 52px);
  }
</style>
