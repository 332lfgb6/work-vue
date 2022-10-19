<template>
  <view class="history page">
    <u-navbar
      leftIconColor="#fff"
      :titleStyle="{ color: '#fff' }"
      bgColor="#151724"
      @leftClick="$router.back(1)"
      title="观看历史"
    ></u-navbar>
    <cover-list :cover-list="historyList"></cover-list>
  </view>
</template>

<script>
  import { getHistoryList } from '@/config/history.js'
  import CoverList from '@/components/cover-list/cover-list.vue'
  export default {
    components: { CoverList },
    data() {
      return {
        historyList: []
      }
    },
    onLoad() {
      this.getHistoryList()
    },
    methods: {
      async getHistoryList() {
        const { historyList } = await getHistoryList()
        this.historyList = historyList
      }
    }
  }
</script>

<style lang="less">
  .history {
    padding-top: 44px;
  }
</style>
