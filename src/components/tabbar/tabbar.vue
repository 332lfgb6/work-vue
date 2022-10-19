<template>
  <van-tabbar
    v-if="$route.meta.tabbar"
    :class="isIndex ? 'index-tabbar' : ''"
    v-model="active"
    :fixed="false"
    route
    :border="!isIndex"
    @change="changeTabbar"
  >
    <van-tabbar-item replace to="/">
      <template #icon="props">
        <i-home :theme="props.active ? 'filled' : 'outline'" size="24" :fill="isIndex ? '#fff' : '#000'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/discover">
      <template #icon="props">
        <i-search :theme="props.active ? 'filled' : 'outline'" size="24" :fill="isIndex ? '#fff' : '#000'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item>
      <template #icon="props">
        <img class="add-btn" :src="require(`../../static/add-${isIndex ? 'white' : 'black'}.svg`)" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/message" :badge="badge || ''">
      <template #icon="props">
        <i-message-one :theme="props.active ? 'filled' : 'outline'" size="24" :fill="isIndex ? '#fff' : '#000'" />
      </template>
    </van-tabbar-item>
    <van-tabbar-item replace to="/my">
      <template #icon="props">
        <i-user :theme="props.active ? 'filled' : 'outline'" size="24" :fill="isIndex ? '#fff' : '#000'" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script>
  import { uploadVideo } from '@/config/upload.js'

  export default {
    name: 'tabbar',
    components: {},
    props: {},
    mixins: [],
    data() {
      return {
        pageName: '',
        active: 0,
        badge: 0
      }
    },
    computed: {
      isIndex() {
        return this.$route.name === 'index'
      }
    },
    watch: {},
    created() {
      this.pageName = this.$route.name
    },
    mounted() {},
    sockets: {
      add(data) {
        // console.log('add', data, typeof data)
        if (data == this.$store.state.user.vuex_userinfo.id) {
          this.badge++
        }
      },
      del(data) {
        // console.log('del', data, typeof data)
        if (data == this.$store.state.user.vuex_userinfo.id) {
          this.badge--
        }
      }
    },
    methods: {
      changeTabbar(i) {
        switch (i) {
          case 2:
            this.$router.push('/pub-work')
            break
          case 3:
            this.badge = 0
            break
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .index-tabbar {
    background-color: #000;

    .van-tabbar-item--active {
      background-color: #000;
    }
  }

  .add-btn {
    width: 75px;
    height: 50px !important;
  }

  .white-tabbar {
    ::v-deep {
      // tabbar background-color
      .u-tabbar__content {
        background: white;
      }
    }
  }

  .black-tabbar {
    ::v-deep {
      // tabbar background-color
      .u-tabbar__content {
        background: black;
      }
    }
  }
</style>
