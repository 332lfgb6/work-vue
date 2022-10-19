<template>
  <view class="settings page">
    <navbar></navbar>
    <view class="menus">
      <u-cell-group :customStyle="{ backgroundColor: '#1c1e2b', borderRadius: '4px' }" :border="false">
        <u-cell
          center
          :arrow="false"
          :border="false"
          :iconStyle="{ color: '#fff', marginRight: '8px' }"
          :titleStyle="{ color: '#fff' }"
          v-for="v of menus"
          :key="v.icon"
          :icon="v.icon"
          :title="v.title"
          @click="showModel = true"
        >
          <u-icon name="arrow-right" slot="right-icon"></u-icon>
        </u-cell>
      </u-cell-group>
    </view>
    <u-modal
      :show="showModel"
      title="退出？"
      :content="`@${vuex_username}`"
      closeOnClickOverlay
      confirmText="退出"
      showCancelButton
      confirmColor="#606266"
      @confirm="logout"
      @close="showModel = false"
      @cancel="showModel = false"
    ></u-modal>
    <view class="version">抖音 version1.0.0</view>
  </view>
</template>

<script>
  import Navbar from './navbar/navbar'
  import { logout } from '../../config/user'
  export default {
    components: { Navbar },
    data() {
      return {
        menus: [{ icon: 'close-circle', title: '退出登录' }],
        showModel: false
      }
    },
    methods: {
      async logout() {
        await logout()
        this.$u.vuex('vuex_token', '')
        this.$router.push('/')
      }
    }
  }
</script>

<style lang="less">
  .settings {
    background-color: #151724;
    .menus {
      padding: 16px;
    }
    .version {
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      font-size: 12px;
      height: 80px;
      line-height: 80px;
      text-align: center;
    }
  }
</style>
