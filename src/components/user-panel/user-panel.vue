<template>
  <div class="user-panel" :class="$route.name === 'my' ? 'my' : 'user'">
    <van-nav-bar v-if="$route.name === 'my'" :title="userinfo.username" border :fixed="false" @click-right="logout">
      <template #right>
        <van-icon name="revoke" size="24" color="#161823" />
      </template>
    </van-nav-bar>
    <van-nav-bar
      v-else
      :title="userinfo.username"
      border
      :fixed="false"
      @click-left="$router.back()"
      @click-right="copy"
    >
      <template #left>
        <van-icon name="arrow-left" size="24" color="#161823" />
      </template>
      <template #right>
        <van-icon name="share-o" size="24" color="#161823" />
      </template>
    </van-nav-bar>
    <div class="scroll-view">
      <div class="user-info">
        <van-image width="96" height="96" round :src="userinfo.avatar"></van-image>
        <div class="douyin-no">@{{ userinfo.douyinNo }}</div>
        <div class="data">
          <div class="follow">
            <div class="num">{{ userinfo.followerNum }}</div>
            <div class="label">已关注</div>
          </div>
          <div class="fans">
            <div class="num">{{ userinfo.fansNum }}</div>
            <div class="label">粉丝</div>
          </div>
          <div class="zan">
            <div class="num">{{ userinfo.zanNum }}</div>
            <div class="label">赞</div>
          </div>
        </div>
        <van-button
          class="follow-btn"
          v-if="$route.name !== 'my' && $route.query.userId !== vuex_userinfo.id && !userinfo.follow"
          @click="followSb"
        >
          关注
        </van-button>
        <van-button
          plain
          class="cancel-follow-btn"
          v-if="$route.name !== 'my' && $route.query.userId !== vuex_userinfo.id && userinfo.follow === 1"
          @click="cancelFollowSb"
        >
          已关注
        </van-button>
        <div>{{ userinfo.brief || '尚无个人简介' }}</div>
      </div>
      <van-tabs
        v-model="current"
        @change="change"
        color="#161823"
        line-height="2"
        line-width="48"
        title-active-color="#121212"
        title-inactive-color="#12121280"
      >
        <van-tab title="作品">
          <div v-if="workList.count"><cover-list v-model="workList" @closeOverlay="onshow"></cover-list></div>
          <div class="empty" v-else>
            <div class="primary-tip">上传你的首发视频</div>
            <div class="secondary-tip">你的视频将出现在这里</div>
          </div>
        </van-tab>
        <van-tab title="喜欢">
          <div v-if="zanList.count"><cover-list v-model="zanList" @closeOverlay="onshow"></cover-list></div>
          <div class="empty" v-else>
            <div class="primary-tip">还没有赞过任何视频</div>
            <div class="secondary-tip">赞过的视频将会显示在这里</div>
          </div>
        </van-tab>
      </van-tabs>
    </div>
  </div>
</template>

<script>
  import { getUserinfo, logout } from '@/config/user.js'
  import { getVideoList } from '@/config/video.js'
  import { followSb, cancelFollowSb } from '@/config/follow.js'
  import CoverList from '../cover-list/cover-list.vue'
  import { mapState } from 'vuex'
  import { removeToken } from '@/utils/auth'
  export default {
    name: 'user-panel',
    components: { CoverList },
    props: {
      username: String,
      avatar: String,
      douyinNo: String,
      followerNum: Number,
      fansNum: Number,
      zanNum: Number,
      brief: String,

      value: Boolean
    },
    data() {
      return {
        list1: [
          {
            icon: 'i-pound-sign'
          },
          {
            icon: 'i-like'
          }
        ],
        current: 0,
        workList: {},
        zanList: {},
        userId: 0,
        userinfo: {}
      }
    },
    computed: {
      ...mapState({
        vuex_userinfo: state => state.user.vuex_userinfo,
        vuex_follow_stat_changed: state => state.user.vuex_follow_stat_changed
      }),
      needGetUserinfo: {
        get() {
          return this.value
        },
        set(newV) {
          this.$emit('input', newV)
        }
      }
    },
    activated() {
      this.onshow()
    },
    methods: {
      copy() {
        this.$copyText(location.href).then(() => {
          this.$toast('已复制')
        })
      },
      async onshow() {
        // user-panel所在页面显示时，获取用户信息、获取作品列表、获取点赞列表。
        if (this.$route.name === 'my') {
          this.userId = this.vuex_userinfo.id
        } else {
          this.userId = this.$route.query.userId
        }
        this.getUserinfo()
        this.getWorkList()
        this.getZanList()
      },
      async getUserinfo() {
        this.userinfo = await getUserinfo(this.userId)
        this.needGetUserinfo = false
      },
      async getWorkList() {
        this.workList = await getVideoList('work', null, this.userId)
      },
      async getZanList() {
        this.zanList = await getVideoList('zan', null, this.userId)
      },
      async change(e) {
        const i = e.index
        this.current = i
        if (i && this.zanList) {
          let userId
          if (this.$route.name === 'my') {
            userId = this.vuex_userinfo.id
          } else {
            userId = this.$route.query.userId
          }
          this.zanList = await getVideoList('zan', null, userId)
        }
      },
      async followSb() {
        const userId = this.userinfo.id
        await followSb(userId)
        this.userinfo.fansNum++
        this.userinfo.follow = 1

        // 通知被关注者
        this.$socket.emit('add', this.userId)

        this.decideFollowBtn()
      },
      async cancelFollowSb() {
        await cancelFollowSb(this.userinfo.id)
        this.userinfo.fansNum--
        this.userinfo.follow = 0

        // 通知被关注者
        this.$socket.emit('del', this.userId)

        this.decideFollowBtn()
      },
      decideFollowBtn() {
        // 修改vuex_follow_stat_changed的值。
        const userId = this.userinfo.id
        const vuex_follow_stat_changed = this.vuex_follow_stat_changed
        if (!vuex_follow_stat_changed.includes(userId)) {
          vuex_follow_stat_changed.push(userId)
        } else {
          vuex_follow_stat_changed.splice(vuex_follow_stat_changed.indexOf(userId), 1)
        }
        this.$store.commit('user/SET_VUEX_FOLLOW_STAT_CHANGED', vuex_follow_stat_changed)

        // 关注或取关决定是否显示作品列表和点赞列表中中的加号关注按钮。
        this.workList.data = this.workList.data.map(v => {
          if (this.vuex_follow_stat_changed.includes(v.user_id)) {
            v.follow = v.follow ? 0 : 1
          }
          return v
        })
        this.zanList.data = this.zanList.data.map(v => {
          if (this.vuex_follow_stat_changed.includes(v.user_id)) {
            v.follow = v.follow ? 0 : 1
          }
          return v
        })
      },
      async logout() {
        this.$dialog
          .confirm({
            message: '确定要退出登录吗？'
          })
          .then(async () => {
            await logout()
            this.$store.commit('user/SET_VUEX_TOKEN', '')
            this.$store.commit('user/SET_VUEX_USERINFO', {})
            removeToken()
          })
          .catch(() => {})
      }
    }
  }
</script>

<style lang="less" scoped>
  .my {
    height: calc(100% - 50px);
  }
  .user {
    height: 100%;
  }
  .scroll-view {
    height: calc(100% - 44px);
    overflow-y: scroll;
    .user-info {
      padding: 8px 0 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      .douyin-no {
        font-size: 17px;
        font-weight: 600;
        margin: 16px 0;
      }
      .data {
        width: 100%;
        padding: 0 48px;
        margin-bottom: 16px;
        .follow,
        .fans,
        .zan {
          width: 33%;
          display: inline-block;
          text-align: center;
          .num {
            font-size: 17px;
            font-weight: bold;
            margin-bottom: 4px;
          }
          .label {
            color: rgba(@primary-color-black, 0.8);
            font-size: 13px;
          }
        }
      }
      .follow-btn,
      .cancel-follow-btn {
        width: 200px;
        margin-bottom: 16px;
      }
      .follow-btn {
        background-color: @primary-color-pink;
        color: #fff;
      }
      .cancel-follow-btn {
      }
    }
    .empty {
      text-align: center;
      padding: 90px 0;
      .primary-tip {
        margin-bottom: 16px;
        font-size: 17px;
        font-weight: 600;
      }
      .secondary-tip {
        color: rgba(@primary-color-black, 0.75);
      }
    }
  }
</style>
