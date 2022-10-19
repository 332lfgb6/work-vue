<template>
  <div class="pub-work no-tabbar-page">
    <van-nav-bar title="发布作品" left-arrow @click-left="$router.back()" @click-right="onClickRight">
      <template #right>
        <van-button
          class="pub-btn"
          :loading="loading"
          :color="preview ? '#fe2c55' : '#16182380'"
          type="primary"
          round
          size="mini"
        >
          <i-up-small theme="filled" size="20" fill="#fff" />
        </van-button>
      </template>
    </van-nav-bar>
    <van-cell-group>
      <van-field v-model="title" rows="2" type="textarea" placeholder="在这里输入文案..." />
    </van-cell-group>
    <van-uploader
      v-show="false"
      accept="video/*"
      :after-read="afterRead"
      :before-read="beforeRead"
      :before-delete="deletePic"
      ref="upload"
    ></van-uploader>
    <div class="upload-area">
      <div class="uploader" v-if="!preview" @click="$refs.upload.chooseFile()">
        <van-button icon="plus" type="primary" color="#fe2c55">上传视频</van-button>
      </div>
      <video v-else :src="preview" autoplay muted @click="$refs.upload.chooseFile()"></video>
    </div>
  </div>
</template>

<script>
  import { pubWork } from '@/config/video'

  export default {
    name: 'pub-work',
    components: {},
    props: {},
    mixins: [],
    data() {
      return {
        title: '',
        file: {},
        preview: '',
        loading: false
      }
    },
    computed: {},
    watch: {},
    created() {},
    mounted() {},
    methods: {
      async onClickRight() {
        const formData = new FormData()
        formData.append('file', this.file)
        formData.append('title', this.title)
        this.loading = true
        await pubWork(formData)
        this.$toast({
          message: '发布成功',
          onClose: () => {
            this.title = ''
            this.preview = ''
            this.file = {}
            this.loading = false
            this.$router.back()
          }
        })
      },
      afterRead(e) {
        const file = e.file
        this.preview = URL.createObjectURL(file)
        this.file = file
      },
      beforeRead() {
        return true
      },
      deletePic() {}
    }
  }
</script>

<style lang="less" scoped>
  .pub-work {
    .upload-area {
      height: calc(100% - 46px - 80px);
      padding: 16px;
      .uploader {
        height: 100%;
        border-radius: 10px;
        border: 5px dashed rgba(@primary-color-black, 0.5);
        display: flex;
        justify-content: center;
        align-items: center;
      }
      video {
        width: 100%;
        height: 100%;
        background: black;
      }
    }
  }
</style>
