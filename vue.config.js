module.exports = {
  lintOnSave: false,
  // publicPath: '/douyin/',
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          hack: `true; @import "/src/styles/vant.less";@import "/src/styles/theme-color.less";`
        }
      }
    }
  }
}
