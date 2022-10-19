<template>
  <u-popup
    mode="right"
    :show="show"
    @close="close"
    @open="open"
    :customStyle="{ backgroundColor: '#151724', width: '150px' }"
  >
    <u-cell-group>
      <u-cell
        :border="false"
        :iconStyle="{ color: '#fff' }"
        :titleStyle="{ color: '#fff' }"
        v-for="v of menus"
        :key="v.icon"
        :icon="v.icon"
        :title="v.title"
        @click="$router.push({ name: v.pageName })"
      ></u-cell>
    </u-cell-group>
  </u-popup>
</template>

<script>
  export default {
    props: ['show'],
    data() {
      return {
        menus: [
          { icon: 'clock', title: '观看历史', pageName: 'history' },
          { icon: 'setting', title: '设置', pageName: 'settings' }
        ]
      }
    },
    methods: {
      open() {
        // console.log('open');
      },
      close() {
        this.$parent.$parent.showPopup = false
      }
    }
  }
</script>

<style></style>
