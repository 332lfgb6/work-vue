<template>
  <div class="topic-page">
    <van-nav-bar left-arrow @click-left="$router.back()" @click-right="copy">
      <template #right>
        <van-icon name="share-o" size="24" />
      </template>
    </van-nav-bar>
    <div class="topic-info">
      <van-image :src="topicInfo.img" width="80" height="80" radius="4"></van-image>
      <div class="right-info">
        <div># {{ topicInfo.name }}</div>
        <span>{{ topicInfo.videoNum }} 个视频</span>
      </div>
    </div>
    <cover-list v-model="topicInfo2"></cover-list>
  </div>
</template>

<script>
  import { getTopicInfo } from '@/config/topic'
  import { getVideoList } from '@/config/video'
  import CoverList from '@/components/cover-list/cover-list'

  export default {
    name: 'topic',
    components: { CoverList },
    props: {},
    mixins: [],
    data() {
      return {
        topicId: 0,
        topicInfo: {},
        topicInfo2: {}
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    activated() {
      this.topicId = this.$route.params.id
      this.getTopicInfo()
      this.getVideoListByTopic()
    },
    methods: {
      copy() {
        this.$copyText(location.href).then(() => {
          this.$toast('已复制')
        })
      },
      async getTopicInfo() {
        this.topicInfo = await getTopicInfo(this.topicId)
      },
      async getVideoListByTopic() {
        this.topicInfo2 = await getVideoList('topic', null, null, this.topicId)
      }
    }
  }
</script>

<style lang="less" scoped>
  .topic-page {
    .topic-info {
      padding: 16px;
      .right-info {
        display: inline-block;
        vertical-align: top;
        margin-left: 16px;
        div {
          font-size: 20px;
          font-weight: 600;
          margin-bottom: 8px;
        }
        span {
          font-size: 13px;
          color: rgba(@primary-color-black, 0.5);
        }
      }
    }
  }
</style>
