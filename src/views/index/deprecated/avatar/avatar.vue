<template>
  <view class="avatar" :style="{ backgroundImage: `url('${avatarPath}')` }">
    <view class="follow-btn-relative" v-if="!follow || showFollowedBtn">
      <transition name="scale">
        <view key="1" class="no-follow" v-if="!showFollowedBtn" @click="followSb">
          <u-icon name="plus" color="#fff" size="12"></u-icon>
        </view>
        <view key="2" class="followed" v-else>
          <u-icon name="checkmark" color="#fe2a57" size="12"></u-icon>
        </view>
      </transition>
    </view>
  </view>
</template>

<script>
  import { followSb } from '../../../../config/follow'

  export default {
    name: 'avatar',
    components: {},
    props: {
      avatarPath: {
        type: String,
        required: true
      },
      follow: Number,
      userId: Number
    },
    mixins: [],
    data() {
      return {
        showFollowedBtn: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async followSb() {
        await followSb(this.userId)
        this.showFollowedBtn = true
        setTimeout(() => {
          this.showFollowedBtn = false
        }, 2000)
        this.$emit('followSuccess')
      }
    }
  }
</script>

<style lang="less" scoped>
  .avatar {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    border: 3px solid white;
    position: absolute;
    right: 16px;
    bottom: calc(16px + 80px + 16px + 16px + 60px + 16px + 60px + 16px + 60px + 16px + 60px);
    z-index: 1000;
    background-size: cover;
    .follow-btn-relative {
      width: 100%;
      height: 100%;
      position: relative;
      .no-follow,
      .followed {
        position: absolute;
        left: 0;
        right: 0;
        bottom: -10px;
        margin: auto;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .no-follow {
        background-color: #fe2a57;
      }
      .followed {
        background-color: #fff;
      }
    }
  }
</style>
