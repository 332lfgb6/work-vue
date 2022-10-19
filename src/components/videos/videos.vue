<template>
  <div :class="$route.name === 'index' ? 'index-videos' : 'no-index-videos'">
    <van-nav-bar
      v-if="$route.name !== 'index'"
      fixed
      :border="false"
      @click-left="clickLeft"
    >
      <template #left>
        <van-icon name="arrow-left" size="24" color="#fff" />
      </template>
    </van-nav-bar>

    <van-popup v-model="showCommentArea" position="bottom" @opened="afterOpenCommentArea">
      <div class="comment-area">
        <div class="top">
          <span></span>
          <span>{{ commentCount }} 条评论</span>
          <i-close theme="filled" size="18" fill="#333" @click="showCommentArea = false" />
        </div>
        <div class="comment-list">
          <div v-for="(v, i) in commentList.data" :key="v.id">
            <div class="comment" @touchstart="longtapComment(v,i)" @touchend="replyComment(v, i)">
              <van-image
                class="avatar"
                round
                width="32"
                height="32"
                :src="v.avatar"
                @touchend.native.stop="$router.push(`/user?userId=${v.user_id}`)"
              ></van-image>
              <div class="center">
                <div class="usernames">
                  <span class="username" @touchend.stop="$router.push(`/user?userId=${v.user_id}`)">{{ v.username
                    }}</span>
                </div>
                <span class="content">{{ v.content }}</span>
                <span class="pub-time">{{ v.pub_time }}</span>
                <div
                  class="show-more-reply"
                  v-if="v.children.count"
                  @click.stop="getChildrenCommentList(v.id, v.children.page, i)"
                >
                  查看 {{ v.children.count }} 条回复
                  <i-down theme="filled" size="14" fill="currentcolor" />
                </div>
              </div>
              <div class="zan" @click="zanComment(v.zaned, v.id, i, -1, v.zanCount)">
                <i-like
                  :class="v.zaned ? 'zaned' : 'no-zan'"
                  :theme="v.zaned ? 'filled' : 'outline'"
                  size="20"
                  fill="currentcolor"
                />
                <div>{{ v.zanCount }}</div>
              </div>
            </div>
            <div
              class="child-comment comment"
              v-for="(vv, ii) in v.children.data"
              :key="vv.id"
              @touchstart="longtapComment(vv,ii)" @touchend="replyComment(vv, ii)"
            >
              <van-image
                class="avatar"
                round
                width="32"
                height="32"
                :src="vv.avatar"
                @touchend.native.stop="$router.push(`/user?userId=${vv.user_id}`)"
              ></van-image>
              <div class="center">
                <div class="usernames">
                  <span class="username" @touchend.stop="$router.push(`/user?userId=${vv.user_id}`)">{{ vv.username
                    }}</span>
                  <span class="reply" v-if="vv.reply_user_username">回复</span>
                  <span class="username" v-if="vv.reply_user_username"
                        @touchend.stop="$router.push(`/user?userId=${vv.reply_user_id}`)">{{ vv.reply_user_username
                    }}</span>
                </div>
                <span class="content">{{ vv.content }}</span>
                <span class="pub-time">{{ vv.pub_time }}</span>
              </div>
              <div class="zan" @click="zanComment(vv.zaned, vv.id, i, ii, vv.zanCount)">
                <i-like
                  :class="vv.zaned ? 'zaned' : 'no-zan'"
                  :theme="vv.zaned ? 'filled' : 'outline'"
                  size="20"
                  fill="currentcolor"
                />
                <div>{{ vv.zanCount }}</div>
              </div>
            </div>
          </div>
        </div>
        <div class="pub-comment u-border-top">
          <van-field type="textarea" v-model="content" :placeholder="placeholder" autosize></van-field>
          <van-button class="pub-btn" type="primary" round size="mini" v-if="content" @click="pubComment">
            <i-up-small theme="filled" size="20" fill="#fff" />
          </van-button>
        </div>
      </div>
    </van-popup>

    <!--长按评论-->
    <van-action-sheet v-model="showCommentMenu" :actions="list" cancel-text="取消" close-on-click-action
                      @select="selectCommentAction" />

    <van-swipe ref="swipe" class="swipe" :initial-swipe="current" :show-indicators="false" vertical @change="change"
               :loop="false">
      <van-swipe-item class="swipe-item" v-for="(v, i) of videoList.data" :key="v.id">
        <div class="muted" v-if="vuex_muted" @click="$store.commit('app/SET_VUEX_MUTED',false)">
          <i-volume-mute theme="filled" size="24" fill="#333" />
          <span>取消静音</span>
        </div>

        <!--暂停按钮-->
        <img
          class="pause"
          width="60"
          height="60"
          :src="require('../../static/pause.png')"
          v-if="pause"
          @click="playPause"
        ></img>

        <video
          :muted="vuex_muted"
          @click="playPause"
          loop
          ref="video"
          v-if="showVideo && current === i && !flag"
          :src="v.filename"
          @loadedmetadata="loadedmetadata(v.id)"
        ></video>

        <right-info
          :pause="pause"
          :avatar="v.avatar"
          :poster="v.poster"
          :zaned="v.zaned"
          :zanCount="v.zanCount"
          :videoId="v.id"
          :userId="v.user_id"
          :follow="v.follow"
          :filename="v.filename"
          :commentCount="commentCount"
          @updateZanStat="updateZanStat($event, i)"
          @openCommentArea="openCommentArea(v.id)"
          @afterFollowSb="afterFollowSb(v.user_id)"
        ></right-info>

        <div class="video-info">
          <div class="username">@{{ v.username }}</div>
          <div class="title">
            {{ v.title }}
            <span class="topic" v-for="vv in v.topics" :key="vv.id"
                  @click="$router.push({name:'topic',params:{id:vv.id}})"> # {{ vv.name }}</span>
            <span class="at" v-for="vv in v.ats" :key="vv.id"
                  @click="$router.push(`/user?userId=${vv.id}`)"> @ {{ vv.username }}</span>
          </div>
        </div>
      </van-swipe-item>
      <van-swipe-item class="swipe-item" v-if="$route.name==='index'">
        <van-image :src="require('../../static/no-data.gif')" width="100" height="100"></van-image>
        <span class="lg-title">刷完提示</span>
        <span class="sm-title">您已刷完所有测试视频，重置数据可以帮助您清空观看历史和点赞过的视频。</span>
        <van-button class="reset" type="error" color="#262626" @click="delHistory">重置数据</van-button>
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import RightInfo from "./right-info/right-info.vue";
import { addHistory, delHistory } from "@/config/history.js";
import { pubComment, getCommentList, delComment } from "@/config/comment.js";
import { zanComment } from "@/config/zan_comment.js";
import { mapState } from "vuex";
import { getToken } from "@/utils/auth";

export default {
  name: "videos",
  components: { RightInfo },
  props: {
    value: Object,
    currentVideoI: Number
  },
  mixins: [],
  data() {
    return {
      flag: false,
      showVideo: true,
      pause: false,
      videoConspan: null,
      showCommentArea: false,
      showFollowedBtn: false,
      follow: 0,
      content: "",
      currentVideoId: 0,
      commentList: [],
      showCommentMenu: false,
      currentCommentId: 0,
      currentCommentI: 0,
      currentComment: {},
      currentUserId: 0,
      placeholder: "添加评论...",
      focus: false,
      currentUsername: "",
      replyUserId: 0,
      timeOutEvent: 0
    };
  },
  computed: {
    ...mapState({
      vuex_muted: state => state.app.vuex_muted
    }),
    videoList: {
      get() {
        return this.value;
      },
      set(newV) {
        this.$emit("input", newV);
      }
    },
    current: {
      get() {
        return this.currentVideoI;
      },
      set(newV) {
        this.$emit("update:currentVideoI", newV);
      }
    },
    commentCount() {
      const videoList = this.videoList;
      return videoList.count ? videoList.data[this.current]?.commentCount : 0;
    },
    ...mapState({
      vuex_userinfo: state => state.user.vuex_userinfo,
      vuex_follow_stat_changed: state => state.user.vuex_follow_stat_changed
    }),
    list() {
      return [{ name: "回复" }, { name: this.vuex_userinfo.id === this.currentComment.user_id ? "删除" : "举报" }];
    }
  },
  watch: {
    // 登录成功后，把所有未登录状态下看过的视频添加到观看历史中去。
    async ["vuex_userinfo.username"](newV, oldV) {
      if (!oldV && newV) {
        let historyVideoIdList = localStorage.getItem("historyVideoIdList");
        historyVideoIdList = historyVideoIdList ? historyVideoIdList.split(",") : [];
        await addHistory(historyVideoIdList);
      }
    },
    showCommentArea(newV) {
      if (!newV) {
        this.currentComment = {};
        this.currentCommentI = 0;
        this.currentCommentId = 0;
        this.placeholder = "";
      }
    }
  },
  activated() {
    this.$refs.swipe.swipeTo(this.current, { immediate: true });
    this.$refs.video && this.$refs.video[0].play();
    this.pause = false;
  },
  methods: {
    async loadedmetadata(videoId) {
      this.$refs.video[0].play();

      // 看过的视频放到历史记录中去
      if (!getToken()) {
        let historyVideoIdList = localStorage.getItem("historyVideoIdList");
        historyVideoIdList = historyVideoIdList ? historyVideoIdList.split(",") : [];
        if (!historyVideoIdList.includes(videoId.toString())) {
          historyVideoIdList.push(videoId);
          localStorage.setItem("historyVideoIdList", historyVideoIdList);
        }
      } else {
        await addHistory([videoId]);
      }
    },
    clickLeft() {
      this.$refs.video[0].pause();
      this.pause = true;
      this.$emit("leftClick");
    },
    afterFollowSb(userId) {
      this.videoList.data = this.videoList.data.map(v => {
        if (userId === v.user_id) {
          v.follow = 1;
        }
        return v;
      });
    },
    async delHistory() {
      if (getToken()) {
        await delHistory();
      } else {
        localStorage.removeItem("historyVideoIdList");
      }
      this.$emit("alterDelHistory");
    },
    updateZanStat(e, i) {
      const video = this.videoList.data[i];
      video.zaned = e;
      e ? video.zanCount++ : video.zanCount--;
    },
    async zanComment(zaned, commentId, i1, i2, zanCount) {
      await zanComment(zaned, commentId);

      // 更改点赞的状态和数量
      const commentData = this.commentList.data[i1];
      zaned ? zanCount-- : zanCount++;
      if (i2 === -1) {
        commentData.zaned = zaned ? 0 : 1;
        commentData.zanCount = zanCount;
      } else {
        commentData.children.data[i2].zaned = zaned ? 0 : 1;
        commentData.children.data[i2].zanCount = zanCount;
      }
    },
    blur() {
      // console.log('blur');
    },
    longtapComment(currentComment, currentCommentI) {
      let _this = this;
      clearTimeout(_this.timeOutEvent);
      _this.timeOutEvent = setTimeout(function() {
        _this.timeOutEvent = 0;
        //  处理长按事件...
        _this.currentComment = currentComment;
        _this.currentCommentI = currentCommentI;
        _this.showCommentMenu = true;
      }, 1500);
    },
    //手如果在600毫秒内就释放，则取消长按事件
    replyComment(currentComment, currentCommentI) {
      let _this = this;
      clearTimeout(_this.timeOutEvent);
      if (_this.timeOutEvent !== 0) {
        //  处理单击事件
        this.currentComment = currentComment;
        this.currentCommentI = currentCommentI;
        this.placeholder = `回复 ${currentComment.username}:`;
        this.focus = false;
        this.$nextTick(() => {
          this.focus = true;
        });
      }
    },
    async selectCommentAction(name) {
      switch (name.name) {
        case "删除":
          await delComment(this.currentComment.id);

          // 评论数量-1
          this.videoList.data[this.current].commentCount--;

          const commentData = this.commentList.data;
          if (this.currentComment.parent_id) {
            // console.log('after',JSON.parse(JSON.stringify(commentData)));
            commentData[this.currentCommentI].children.data.splice(this.currentCommentI, 1);
            // console.log('now',JSON.parse(JSON.stringify(commentData)));
          } else {
            commentData.splice(this.currentCommentI, 1);
          }

          this.content = "";
          this.currentComment = {};
          this.currentCommentI = 0;
          this.currentCommentId = 0;
          break;
        case "回复":
          this.placeholder = `回复 ${currentComment.username}:`;
          this.focus = false;
          this.$nextTick(() => {
            this.focus = true;
          });
          break;
      }
    },
    async getChildrenCommentList(parentCommentId, page, parentCommentI) {
      page++;
      const commentList = await getCommentList(this.currentVideoId, parentCommentId, page);
      const currentParentComment = this.commentList.data[parentCommentI];
      currentParentComment.children.data.push(...commentList.data);
      currentParentComment.children.count -= commentList.data.length;
    },
    async openCommentArea(currentVideoId) {
      this.showCommentArea = true;
      this.currentVideoId = currentVideoId;
    },
    async afterOpenCommentArea() {
      this.commentList = await getCommentList(this.currentVideoId, 0, 1);
    },
    // 发送网络请求
    async pubComment() {
      let { user_id, id, parent_id } = this.currentComment;
      if (this.vuex_userinfo.id === user_id && parent_id === 0) {
        user_id = 0;
      }
      parent_id = parent_id === 0 ? id : parent_id;
      const comment = await pubComment(this.content, this.currentVideoId, user_id, parent_id);

      // 通知被回复的人
      // todo
      // this.$socket.emit('add',)

      // 评论数量+1
      this.videoList.data[this.current].commentCount++;

      const commentData = this.commentList.data;
      if (comment.parent_id) {
        // console.log('after',JSON.parse(JSON.stringify(commentData)));
        commentData[this.currentCommentI].children.data.unshift(comment);
        // console.log('now',JSON.parse(JSON.stringify(commentData)));
      } else {
        commentData.unshift(comment);
      }

      this.content = "";
      this.currentComment = {};
      this.currentCommentI = 0;
      this.currentCommentId = 0;
    },
    open() {
      // console.log('open');
    },
    playPause() {
      this.pause = !this.pause;
      this.pause ? this.$refs.video[0].pause() : this.$refs.video[0].play();
      // this.show = !this.show
    },
    change(e) {
      this.current = e;
      this.pause = false;
      this.currentComment = {};
    }
  }
};
</script>

<style lang="less" scoped>
.index-videos {
  height: 100%;
}

.no-index-videos {
  height: 100%;
}

.van-nav-bar {
  background-color: #00000000;
}

.comment-area {
  height: 400px;
  display: flex;
  flex-direction: column;

  .top {
    padding: 8px 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .comment-list {
    overflow-y: auto;
    flex: 1;

    .comment {
      padding: 8px 16px;
      display: flex;

      .avatar {
        margin-right: 16px;
      }

      .center {
        font-size: 15px;
        flex: 1;

        .usernames {
          font-size: 13px;
          margin-bottom: 8px;
          // 评论去的username
          .username {
            font-weight: 700;
          }

          .reply {
            margin: 0 4px;
          }
        }

        .pub-time {
          color: rgba(@primary-color-black, 0.8);
          margin-left: 4px;
        }

        .show-more-reply {
          margin-top: 8px;
          color: rgba(@primary-color-black, 0.8);
          font-size: 13px;
        }
      }

      .zan {
        color: #16182380;
        text-align: center;

        .zaned {
          color: @primary-color-pink;
        }

        .no-zan {
          color: rgba(@primary-color-black, 0.5);
        }
      }
    }

    .child-comment {
      margin-left: 48px;
    }
  }

  .pub-comment {
    display: flex;
    align-items: flex-end;
    padding: 8px 16px;

    .pub-btn {
      margin-left: 8px;
      background-color: @primary-color-pink;
      border-color: @primary-color-pink;
    }
  }
}

.swipe {
  height: 100%;
  background-color: #000;

  .swipe-item {
    height: 100%;
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .muted {
      width: 140px;
      height: 36px;
      border-radius: 4px;
      box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 1px;
      background: rgba(255, 255, 255, 0.85);
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 72px;
      left: 12px;
      z-index: 10000000;

      span {
        margin-left: 4px;
        font-weight: bold;
      }
    }

    .cover,
    video {
      width: 100%;
      height: 100%;
      background-color: black;
    }

    .pause {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      margin: auto;
      z-index: 1000;
      width: 60px;
      height: 60px;
    }

    .video-info {
      width: 270px;
      color: #fff;
      position: absolute;
      bottom: 16px;
      left: 16px;
      // background-color: #00000010;

      // 视频左下角的username
      .username {
        margin-bottom: 4px;
        font-size: 17px;
        font-weight: 600;
      }

      .title {
        font-size: 15px;
        .topic {
          font-weight: 600;
        }
        .at{
          color: yellow;
        }
      }
    }

    .lg-title {
      font-size: 16px;
      margin: 24px 0 16px;
      color: #fff;
    }

    .sm-title {
      width: 200px;
      line-height: 1.5;
      color: #808080;
      margin-bottom: 48px;
    }

    .reset {
      width: 150px;
    }
  }
}
</style>
