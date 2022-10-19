<template>
  <div class="message tabbar-page">
    <van-nav-bar title="通知" border />
    <no-login v-if="!vuex_userinfo.username" icon="i-message-one" tip="消息和通知将显示在这里"></no-login>
    <div class="main-main-content" v-else>
      <div class="filters">
        <div
          class="filter"
          :class="currentFilter === v ? 'active-filter' : 'inactive-filter'"
          v-for="v in filters"
          :key="v.id"
          @click="currentFilter = v"
        >
          {{ v }}
        </div>
      </div>
      <no-message
        v-if="currentFilter === '所有活动' && !filterActivityInfo.length"
        icon="comment-one"
        title="所有动态"
        subtitle="关于你的账号的通知将显示在这里。"
      ></no-message>
      <no-message
        v-if="currentFilter === '赞' && !filterActivityInfo.length"
        icon="like"
        title="视频收到的赞"
        subtitle="当有人点赞你的视频时，你会在这里收到点赞通知"
      ></no-message>
      <no-message
        v-if="currentFilter === '评论' && !filterActivityInfo.length"
        icon="comment"
        title="视频收到的评论"
        subtitle="当有人评论你的视频时，你会在这里收到评论通知"
      ></no-message>
      <no-message
        v-if="currentFilter === '提及和标记' && !filterActivityInfo.length"
        icon="at-sign"
        title="提及你"
        subtitle="当有人提及你时，你会在这里收到提及通知"
      ></no-message>
      <no-message
        v-if="currentFilter === '粉丝' && !filterActivityInfo.length"
        icon="user"
        title="新粉丝"
        subtitle="当有人关注你时，你会在这里看到粉丝通知"
      ></no-message>
      <div class="activity-list">
        <div class="activity" v-for="v of filterActivityInfo" :key="v.id">
          <div class="left">
            <van-image :src="v.avatar" width="72" height="72" fit="cover" round></van-image>
            <div class="text-info">
              <div class="username">{{ v.username }}</div>
              <div>{{ v.desc }}</div>
            </div>
          </div>
          <van-image v-if="v.table_name !== 'follow'" :src="v.cover" width="72" fit="cover" height="72"></van-image>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Tabbar from '@/components/tabbar/tabbar.vue'
  import NoMessage from './no-message/no-message.vue'
  import { mapState } from 'vuex'
  import NoLogin from '@/components/no-login/no-login'
  import { getActivity } from '@/config/activity'
  export default {
    components: { NoLogin, Tabbar, NoMessage },
    data() {
      return {
        currentFilter: '所有活动',
        // filters: ['所有活动', '赞', '评论', '提及和标记', '粉丝'],
        filters: ['所有活动', '赞', '评论', '粉丝'],
        activityInfo: {
          data: []
        }
      }
    },
    computed: {
      ...mapState({
        vuex_userinfo: state => state.user.vuex_userinfo
      }),
      filterActivityInfo() {
        const data = this.activityInfo.data
        switch (this.currentFilter) {
          case '所有活动':
            return data
            break
          case '赞':
            return data.filter(v => ['history', 'zan_comment'].includes(v.table_name))
            break
          case '评论':
            return data.filter(v => ['comment'].includes(v.table_name))
            break
          case '粉丝':
            return data.filter(v => ['follow'].includes(v.table_name))
            break
        }
      }
    },
    activated() {
      if (this.vuex_userinfo.username) {
        this.getActivity()
      }
    },
    methods: {
      async getActivity() {
        const activityInfo = await getActivity()
        activityInfo.data = activityInfo.data.map(v => {
          switch (v.table_name) {
            case 'comment':
              v.desc = v.parent_id ? '回复了你的评论' : '评论了你的视频'
              break
            case 'follow':
              v.desc = '关注了你'
              break
            case 'zan_comment':
              v.desc = '点赞了你的评论'
              break
            case 'history':
              v.desc = '点赞了你的视频'
              break
          }
          return v
        })
        this.activityInfo = activityInfo
      }
    }
  }
</script>

<style lang="less" scoped>
  .message {
    .main-main-content {
      height: calc(100% - 46px);
      .filters {
        height: 32px;
        display: flex;
        align-items: center;
        .filter {
          height: 22px;
          border-radius: 11px;
          line-height: 22px;
          padding: 0 8px;
          margin-left: 8px;
          font-weight: 600;
        }
        .active-filter {
          background-color: @primary-color-black;
          color: #fff;
        }
        .inactive-filter {
          background-color: #f1f1f1;
          color: @primary-color-black;
        }
      }
      .activity-list {
        overflow-y: scroll;
        height: calc(100% - 32px);
        .activity {
          padding: 8px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .left {
            display: flex;
            align-items: center;
            .text-info {
              display: inline-block;
              margin-left: 4px;
              .username {
                font-weight: bold;
                margin-bottom: 4px;
              }
            }
          }
        }
      }
    }
  }
</style>
