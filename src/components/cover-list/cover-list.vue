<template>
  <div class="cover-list">
    <van-image
      class="cover"
      width="33.3vw"
      height="200"
      fit="cover"
      :src="v.cover"
      v-for="(v, i) of coverList.data"
      :key="v.id"
      @click="clickCover(i)"
    ></van-image>
    <van-overlay v-if="showVideoSComponent" :show="true" z-index="2">
      <videos v-model="coverList" :currentVideoI.sync="currentVideoI" @leftClick="showVideoSComponent = false"></videos>
    </van-overlay>
  </div>
</template>

<script>
  import Videos from '@/components/videos/videos.vue'
  export default {
    name: 'cover-list',
    components: { Videos },
    props: ['value'],
    data() {
      return {
        currentVideoI: 0,
        showVideoSComponent: false
      }
    },
    computed: {
      coverList: {
        get() {
          return this.value
        },
        set(newV) {
          this.$emit('input', newV)
        }
      }
    },
    watch: {
      showVideoSComponent(newV) {
        // 关闭遮罩后，需要重新获取用户信息、获取作品列表和点赞列表，
        // 这是因为遮罩存在的时候，你可能关注或取关了某人，或者取消点赞了某个视频。
        if (!newV) {
          this.$emit('closeOverlay')
        }
      }
    },
    methods: {
      clickCover(i) {
        this.currentVideoI = i
        this.showVideoSComponent = true
      }
    }
  }
</script>

<style lang="less">
  .cover-list {
    .cover {
      display: inline-block;
    }
  }
</style>
