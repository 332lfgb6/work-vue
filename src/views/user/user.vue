<template>
  <div class="no-tabbar-page"><user-panel ref="user-panel"></user-panel></div>
</template>

<script>
  import { getUserProfile } from '@/config/user.js'
  import UserPanel from '@/components/user-panel/user-panel.vue'
  export default {
    components: { UserPanel },
    methods: {}
  }
</script>

<style lang="less"></style>
