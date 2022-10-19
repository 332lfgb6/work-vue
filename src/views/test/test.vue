<template>
  <div class="test"><button @click="click">按钮</button></div>
</template>

<script>
const io = require('socket.io-client')
export default {
  name: 'test',
  data() {
    return {
      websock: null,
      socket: null
    }
  },
  // sockets: {
  //   // 通过vue实例对象sockets实现组件中的事件监听
  //   connect: function() {
  //     // socket的connect事件
  //     console.log('sockedtxxxxxx')
  //   },
  //   STREAM_STATUS(data) {
  //     // 后端按主题名推送的消息数据
  //     console.log('Page：' + data)
  //   }
  // },
  created() {
    this.socket = io('http://192.168.61.115:8360')

    this.socket.on('opend', function(data) {
      console.log('opend:', data)
    })

    this.socket.on('joined', function(data) {
      console.log('joined:', data)
    })

    // this.initWebSocket();
    // var socket = io('http://192.168.61.115:8360')
    // socket.on('opend', function(data) {
    //   console.log('opend:', data)
    // })
    // socket.on('joined', function(data) {
    //   console.log('joined:', data)
    // })
  },
  destroyed() {
    this.websock.close() //离开路由之后断开websocket连接
  },
  methods: {
    click() {
      this.socket.emit('addUser', 'zzz')
    },
    initWebSocket() {
      //初始化weosocket
      const wsuri = 'ws://192.168.61.115:8360'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() {
      //连接建立之后执行send方法发送数据
      let actions = { test: '12345' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() {
      //连接建立失败重连
      this.initWebSocket()
    },
    websocketonmessage(e) {
      //数据接收
      const redata = JSON.parse(e.data)
    },
    websocketsend(Data) {
      //数据发送
      this.websock.send(Data)
    },
    websocketclose(e) {
      //关闭
      console.log('断开连接', e)
    }
  }
}
</script>
<style lang="less"></style>
