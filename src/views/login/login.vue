<template>
  <div class="login">
    <navbar></navbar>
    <div class="main">
      <div class="title">登陆后即可展示自己</div>
      <van-popover
        v-model="showTooltip"
        theme="dark"
        :actions="actions"
        @select="agreement = true"
        placement="top-start"
      >
        <template #reference>
          <van-checkbox v-model="agreement">
            已阅读并同意用户协议和隐私政策以及运营商服务协议，运营商将对你提供的手机号进行验证
          </van-checkbox>
        </template>
      </van-popover>
      <van-cell-group>
        <van-field v-model="phone" placeholder="随便输入11位数字充当手机号" maxlength="11" autofocus />
      </van-cell-group>
      <div class="tip">未注册的手机号验证通过后将自动注册</div>
      <van-button
        block
        class="login-btn"
        :disabled="phone.length !== 11"
        type="primary"
        text="验证并登录"
        :loading="loading"
        :loadingText="'验证并登录中...'"
        @click="getCode"
      ></van-button>
    </div>
  </div>
</template>

<script>
  import Navbar from '@/views/login/navbar/navbar'
  import { login } from '@/config/user.js'
  export default {
    name: 'login',
    components: { Navbar },
    props: {},
    mixins: [],
    data() {
      return {
        agreement: false,
        showTooltip: false,
        phone: '',
        loading: false,
        actions: [{ text: '请先勾选,同意后再进行登录' }]
      }
    },
    computed: {},
    watch: {},
    activated() {
      this.showTooltip = true
      setTimeout(() => (this.showTooltip = false), 3000)
    },
    deactivated() {
      this.agreement = false
    },
    mounted() {},
    methods: {
      async getCode() {
        if (!this.agreement) {
          // 点击页面上弹出的tooltip以外的任意位置，showTooltip的状态都会从true变为false。而执行完getCode()后，按钮点击这个完整的
          // 过程还没有结束，因此tooltip就好像没有弹出一样。
          // ×：this.showTooltip = true
          setTimeout(() => (this.showTooltip = true), 0)
          setTimeout(() => (this.showTooltip = false), 3000)
          return
        }
        this.loading = true
        const token = await login(this.phone)
        this.loading = false
        if (!token) {
          this.$router.push({ path: '/basic-info', query: { phone: this.phone } })
        } else {
          this.$router.back(1)
          this.$store.commit('user/SET_VUEX_TOKEN', token)
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .login {
    color: #333;
    .main {
      padding: 48px;
      .title {
        font-size: 18px;
        font-weight: bold;
        margin-bottom: 8px;
      }

      // 给checkbox设置背景颜色
      ::v-deep {
        .van-checkbox__icon--checked .van-icon {
          background-color: @primary-color-pink;
          border-color: @primary-color-pink;
        }
      }

      .input {
        margin: 16px 0;
        caret-color: #ff758f;
        background-color: #f9f9f9;
      }

      .tip {
        font-size: 12px;
      }

      .login-btn {
        background-color: @primary-color-pink;
        border-color: @primary-color-pink;
        margin-top: 16px;
      }
    }
  }
</style>
