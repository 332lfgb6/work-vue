<template>
  <div class="right-info">
    <div
      class="avatar"
      :style="{ backgroundImage: `url('${avatar}')` }"
      @click="$router.push({ path: '/user', query: { userId } })"
    >
      <div class="follow-btn-relative" v-if="!follow || showFollowedBtn">
        <transition name="scale">
          <div key="1" class="no-follow" v-if="!showFollowedBtn" @click.stop="followSb">
            <i-plus theme="filled" size="16" fill="#fff" />
          </div>
          <div key="2" class="followed" v-else><i-check theme="filled" size="16" fill="#fe2c55" /></div>
        </transition>
      </div>
    </div>

    <!-- 点赞 -->
    <div class="zan" @click="zanVideo">
      <transition name="scale" mode="out-in">
        <i-like key="1" v-if="!zaned" class="icon" theme="filled" fill="#fff" size="40"></i-like>
        <i-like key="2" v-else class="icon" theme="filled" fill="#fe2c55" size="40"></i-like>
      </transition>
      <div>{{ zanCount }}</div>
    </div>

    <!-- 评论 -->
    <div class="comment" @click="$emit('openCommentArea')">
      <i-message-one class="icon" theme="filled" fill="#fff" size="40"></i-message-one>
      <div>{{ commentCount }}</div>
    </div>

    <!-- 转发 -->
    <a class="share" @click="share">
      <i-share-two theme="filled" size="40" fill="#fff" :strokeWidth="2" />
      <!--<div>0</div>-->
    </a>

    <!-- 唱片 -->
    <div class="poster-container">
      <van-image
        class="poster"
        :class="pause ? '' : 'playing-poster'"
        :src="poster"
        width="34"
        height="34"
        round
      ></van-image>
      <i-music-one class="music" :class="pause ? '' : 'playing-music'" theme="filled" size="17" fill="#fff" />
    </div>
  </div>
</template>

<script>
  import { zanVideo, addHistory } from '@/config/history.js'
  import { followSb } from '@/config/follow.js'
  export default {
    props: {
      pause: Boolean,
      avatar: String,
      poster: String,
      zaned: Number,
      zanCount: Number,
      videoId: Number,
      userId: Number,
      commentCount: Number,
      follow: Number,
      filename: String
    },
    data() {
      return {
        showFollowedBtn: false,
        showCommentArea: false
      }
    },
    methods: {
      closeCommentArea() {
        this.showCommentArea = false
      },
      openCommentArea() {},
      async zanVideo() {
        const zaned = this.zaned === 0 ? 1 : 0
        await zanVideo(this.videoId, zaned)
        this.$emit('updateZanStat', zaned)
      },
      async followSb() {
        await followSb(this.userId)

        // 通知被关注者
        this.$socket.emit('add', this.userId)

        this.showFollowedBtn = true
        this.$emit('afterFollowSb')
        setTimeout(() => {
          this.showFollowedBtn = false
        }, 2000)
      },
      share() {
        window.open(this.filename)
      }
    }
  }
</script>

<style lang="less" scoped>
  .right-info {
    position: absolute;
    bottom: 16px;
    right: 16px;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    .avatar {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-size: cover;
      margin-bottom: 24px;
      .follow-btn-relative {
        position: relative;
        width: 100%;
        height: 100%;
        .no-follow,
        .followed {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          position: absolute;
          bottom: -10px;
          left: 0;
          right: 0;
          margin: auto;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .no-follow {
          background-color: @primary-color-pink;
        }
        .followed {
          background-color: #fff;
        }
      }
    }

    .zan,
    .comment,
    .share {
      margin-bottom: 16px;
      text-align: center;
    }

    .poster-container {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background-color: #363636;
      display: flex;
      justify-content: center;
      align-items: center;
      position: relative;
      @keyframes poster {
        from {
          transform: rotateX(0);
        }
        to {
          transform: rotate(360deg);
        }
      }
      .poster {
        width: 34px;
        height: 34px;
        border-radius: 50%;
      }
      .playing-poster {
        animation: poster 6s linear infinite;
      }
      @keyframes music {
        0% {
          opacity: 0;
          top: 16px;
          left: -16px;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0;
          top: -16px;
          left: -32px;
        }
      }
      .music {
        opacity: 0;
        position: absolute;
      }
      .playing-music {
        animation: music 3s linear infinite;
      }
    }

    .icon {
      display: inline-block;
    }
  }
</style>
