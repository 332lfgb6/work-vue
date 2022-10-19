<template>
  <div class="basic-info">
    <navbar></navbar>
    <div class="main">
      <van-uploader
        max-count="1"
        v-model="fileList"
        multiple
        :after-read="afterRead"
        :before-read="beforeRead"
        :before-delete="deletePic"
      />
      <van-cell-group>
        <van-field v-model="username" placeholder="请输入用户名" />
      </van-cell-group>

      <van-button
        class="login-btn"
        :disabled="fileList.length === 0 || !username"
        color="#fe2c55"
        text="保存"
        :loading="loading"
        @click="register"
      ></van-button>
    </div>
  </div>
</template>

<script>
  import Navbar from './navbar/navbar'
  import { register } from '../../config/user.js'
  import { uploadImg } from '@/config/upload'
  const path = require('path')
  export default {
    components: { Navbar },
    data() {
      return {
        fileList: [],
        username: '',
        loading: false
      }
    },
    computed: {
      avatar() {
        const fileList = this.fileList
        return fileList.length ? path.basename(fileList[0].url, '.jpeg') : null
      }
    },
    methods: {
      beforeRead(file) {
        if (!file.type.startsWith('image')) {
          this.$toast('只能上传图片')
          return false
        }

        if (file.size > 5 * 1024 * 1024) {
          this.$toast('图片最大5M')
          return false
        }

        return true
      },
      async afterRead(e) {
        // const res = await uni.uploadFile({
        //   url: `${process.env.VUE_APP_BASE_URL}upload/uploadImg`, // 仅为示例，非真实的接口地址
        //   filePath: event.file[0].url,
        //   name: 'file'
        // })
        const formData = new FormData()
        formData.append('file', e.file)
        const { fileUri } = await uploadImg(formData)

        this.fileList = [{ url: fileUri }]
      },
      deletePic() {
        this.fileList = []
      },
      uploadFilePromise(url) {
        return new Promise((resolve, reject) => {
          let a = uni.uploadFile({
            url: `${process.env.VUE_APP_BASE_URL}upload/uploadImg`, // 仅为示例，非真实的接口地址
            filePath: url,
            name: 'file',
            success: res => {
              setTimeout(() => {
                resolve(res.data.data)
              }, 1000)
            }
          })
        })
      },
      async register() {
        const res = await register(this.$route.query.phone, this.username, this.avatar)
        this.$store.commit('user/SET_VUEX_TOKEN', res)
        this.$router.back()
        this.$router.back()
      }
    }
  }
</script>

<style lang="less">
  .basic-info {
    .main {
      padding: 48px;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
  }
  .login-btn {
    background-color: @primary-color-pink;
    margin-top: 16px;
    width: 150px;
  }
</style>
