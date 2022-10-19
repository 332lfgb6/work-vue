<template>
  <div class="home">
    <input v-model="myId" style="margin: 10px 30px" placeholder="自己的id" />
    <input v-model="otherId" placeholder="对方的id" />
    <div class="msg">
      <div v-for="(item, index) in msg" :key="index">
        <div v-if="item.from !== myId" style="text-align: left">{{ item.from }}：{{ item.msg }}</div>
        <div v-else style="text-align: right">{{ item.from }}：{{ item.msg }}</div>
      </div>
    </div>
    <input v-model="msgInput" style="margin: 10px 30px" />
    <input type="button" value="发送" @click="send" />
  </div>
</template>

<script>
  export default {
    data() {
      return {
        myId: '',
        otherId: '',
        msg: [],
        msgInput: ''
      }
    },
    created() {},
    methods: {
      // 发送信息
      send() {
        if (this.myId && this.otherId && this.msgInput) {
          const data = {
            from: this.myId,
            to: this.otherId,
            msg: this.msgInput
          }
          // 发送信息
          this.$socket.emit('sendMsg', data)

          this.msg.push(data)
        } else {
          alert('自己的id、对方的id、对话不能为空')
        }
      }
    },
    sockets: {
      opend(data) {
        console.log('opend:', data)
      },

      joined(data) {
        console.log('joined:', data)
      },
      // 接受消息
      add(data) {
        console.log(data)
        if (data.to === this.myId) {
          this.msg.push(data)
        }
      }
    }
  }
</script>

<style scoped>
  .msg {
    border: solid 1px #ccc;
    height: 300px;
    width: 500px;
    overflow: auto;
  }
  .msg::-webkit-scrollbar {
    /*滚动条整体样式*/
    width: 4px;
    height: 4px;
  }
  .msg::-webkit-scrollbar-thumb {
    /*滚动条里面小方块*/
    border-radius: 5px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  .msg::-webkit-scrollbar-track {
    /*滚动条里面轨道*/
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
</style>
