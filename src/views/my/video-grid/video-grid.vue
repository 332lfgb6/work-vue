<template>
  <view class="video-grid">
    <u-sticky bgColor="#151724">
      <u-tabs-2
        :current="currentTab"
        :scrollable="false"
        lineColor="#efcf32"
        :activeStyle="{ color: '#fff' }"
        :inactiveStyle="{ color: '#ffffff90' }"
        :list="list"
        @click="click"
        @change="changeTab"
      ></u-tabs-2>
    </u-sticky>
    <cover-list v-if="currentTab === 0" :cover-list="publicWorks"></cover-list>
    <cover-list v-if="currentTab === 2" :cover-list="collectedVideoList"></cover-list>
    <cover-list v-if="currentTab === 3" :cover-list="zanedVideoList"></cover-list>
    <view class="none">暂时没有更多了</view>
  </view>
</template>

<script>
  import CoverList from '@/components/cover-list/cover-list.vue'
  import { getZanedVideoList, getCollectedVideoList } from '@/config/history'
  export default {
    props: ['publicWorks'],
    components: { CoverList },
    data() {
      return {
        currentTab: 0,
        list: [
          { name: '作品' },
          { name: '私密', onlyU: true },
          { name: '收藏', onlyU: true },
          { name: '喜欢', onlyU: true }
        ],
        zanedVideoList: [],
        collectedVideoList: []
      }
    },
    methods: {
      click() {},
      async changeTab(e) {
        const i = e.index
        this.currentTab = i
        switch (i) {
          case 2:
            this.collectedVideoList = await getCollectedVideoList()
            break
          case 3:
            this.zanedVideoList = await getZanedVideoList()
            break
        }
      }
    }
  }
</script>

<style lang="less">
  .video-grid {
    background-color: #151724;
    .none {
      height: 80px;
      line-height: 80px;
      text-align: center;
      color: #ffffff90;
      font-size: 14px;
    }
  }
</style>
