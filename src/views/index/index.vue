<template>
  <div class="index tabbar-page">
    <videos
      ref="videos"
      v-model="videoList"
      :currentVideoI.sync="currentVideoI"
      @alterDelHistory="getVideoList"
    ></videos>
  </div>
</template>

<script>
  import { getVideoList } from '../../config/video.js'
  import Videos from '../../components/videos/videos'
  import { mapState } from 'vuex'
  export default {
    components: {
      Videos
    },
    data() {
      return {
        // src: 'https://img.cdn.aliyun.dcloud.net.cn/guide/uniapp/%E7%AC%AC1%E8%AE%B2%EF%BC%88uni-app%E4%BA%A7%E5%93%81%E4%BB%8B%E7%BB%8D%EF%BC%89-%20DCloud%E5%AE%98%E6%96%B9%E8%A7%86%E9%A2%91%E6%95%99%E7%A8%8B@20181126-lite.m4v',
        src: 'http://192.168.139.115:8360/upload/videos/11.mp4',
        fil: true,
        list: [
          {
            text: '要显示的文本',
            color: '#FF0000',
            time: 9
          }
        ],
        videoList: {},
        currentVideoI: 0
      }
    },
    computed: {
      ...mapState({
        vuex_follow_stat_changed: state => state.user.vuex_follow_stat_changed
      })
    },
    async mounted() {
      await this.getVideoList()
    },
    activated() {
      // 从user页到videos组件所在页时，如果关注状态发生了变化，则需要修改圆形关注按钮的状态。
      if (this.videoList.count) {
        this.videoList.data = this.videoList.data.map(v => {
          if (this.vuex_follow_stat_changed.includes(v.user_id)) {
            v.follow = v.follow ? 0 : 1
          }
          return v
        })
      }
    },
    methods: {
      async getVideoList() {
        let historyVideoIdList = localStorage.getItem('historyVideoIdList')
        historyVideoIdList = historyVideoIdList ? historyVideoIdList.split(',') : []
        this.videoList = await getVideoList('index', historyVideoIdList)
        this.currentVideoI = 0
      }
    }
  }
</script>

<style lang="less"></style>
