<template>
  <div class="consoleBox">
      <div class="box"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      oldScrollTop: 0,
      scrollFlag: true,
      Intervall: null,
    };
  },

  mounted() {
    this.getUpdataData();
    //监听滚动事件
    document.querySelector(".box").addEventListener("scroll", this.scrolling);

    this.scrollToBottom();
  },
  destroyed() {
    // 销毁监听滚动事件
    document
      .querySelector(".consoleBox")
      .removeEventListener("scroll", this.scrolling);
  },
  methods: {
    //滚动条保持最底部方法
    scrollToBottom() {
      this.$nextTick(() => {
        var container = this.$el.querySelector(".box");
        container.scrollTop = container.scrollHeight;
      });
    },

    scrolling() {
      let scrollTop = document.querySelector(".box").scrollTop;
      // 更新——滚动前，滚动条距文档顶部的距离
      let scrollStep = scrollTop - this.oldScrollTop;
      this.oldScrollTop = scrollTop;
      //判断当前是向上or向下滚动
      if (scrollStep < 0) {
        //向上
        console.log("正在向上滚动");
        this.scrollFlag = false;
      } else {
        console.log("正在向下滚动");
        this.scrollFlag = true;
      }
    },
    getUpdataData() {
      //定时获取后台返回数据
      this.Interval = setInterval(() => {
        ajax("/xxx/xxx/xx").then((res) => {
          //更新数据
          this.xxx = res.data;
          //当数据更新完毕清除定时器
          if (res.code === 0) {
            clearInterval(this.Interval);
          }
        });
        //调用保持滚动条方法（这一步也可以在updated生命周期调用）
        if (this.scrollFlag) {
          this.scrollToBottom();
        }
      }, 1000);
    },
  },
};
</script>
<style scoped>
.consoleBox {
  width: 100%;
  min-height: 500px;
  max-height: 1780px;
  overflow-x: hidden;
  overflow-y: auto;
}

.consoleBox::-webkit-scrollbar {
  width: 10px !important; /*高宽分别对应横竖滚动条的尺寸*/
  height: 1px !important;
}

.consoleBox::-webkit-scrollbar-thumb {
  /*滚动条里面小方块*/
  border-radius: 10px !important;
  background-color: skyblue !important;
  /*background-color: 0096c7 !important;*/
  background-image: -webkit-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2) 25%,
    transparent 25%,
    transparent 50%,
    rgba(255, 255, 255, 0.2) 50%,
    rgba(255, 255, 255, 0.2) 75%,
    transparent 75%,
    transparent
  );
}

.consoleBox::-webkit-scrollbar-track {
  /*滚动条里面轨道*/
  box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
  background: #ededed;
  border-radius: 10px;
}
</style>
