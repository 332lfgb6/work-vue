<template>
  <div class="cover">
    <image :src="cover" alt="" />
  </div>
</template>

<script>
  export default {
    name: 'cover',
    components: {},
    props: {
      cover: {
        type: String
      }
    },
    mixins: [],
    data() {
      return {}
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {}
  }
</script>

<style lang="less" scoped>
  .cover {
    width: 80px;
    height: 80px;
    position: absolute;
    bottom: 16px;
    right: 16px;
    z-index: 1000;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    background-image: linear-gradient(#333, #666);
    image {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      object-fit: cover;
    }
  }
</style>
