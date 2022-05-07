 
<template>
  <!-- vue 实现无限向上滚动 -->
  <div id="outbox">
    <div class="outbox">
      <div style="width: 56%">时间</div>
      <div style="width: 20%">设备</div>
      <div style="width: 24%">原因</div>
    </div>
    <div id="box">
      <div
        style="z-index: 9999; position: relative"
        id="con1"
        ref="con1"
        :class="{ anim: animate == true }"
        @mouseenter="mEnter"
        @mouseleave="mLeave"
      >
        <div
          v-for="(item, index) in items"
          :key="index"
          style="
            display: flex;
            flex-direction: row;
            border-bottom: solid 1px #132540;
          "
        >
          <div style="width: 56%">{{ item.time }}</div>
          <div style="width: 20%">{{ item.name }}</div>
          <div style="width: 24%;color: red">{{ item.shebei }}</div>
        </div>
      </div>
    </div>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      animate: false,
      items: [
        //消息列表对应的数组
        { time: "2020-04-20 11:20:09", name: "A1区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:10", name: "A2区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:11", name: "B1区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:12", name: "B2区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:13", name: "A1区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:10", name: "A2区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:11", name: "B1区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:12", name: "B2区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:17", name: "A1区", shebei: "设备离线" },
        { time: "2020-04-20 11:20:18", name: "A1区", shebei: "设备离线" },
      ],
    };
  },
  mounted() {
    this.timer1 = setInterval(this.scroll, 2000); //setInterval定时器，当页面加载完执行定时器
  },

  methods: {
    scroll() {
      //建一个方法
      let con1 = this.$refs.con1;
      con1.style.marginTop = "-30px"; //设置style样式 向上移动30px
      this.animate = !this.animate; //
      var that = this; // 在异步函数中会出现this的偏移问题，此处一定要先保存好this的指向
      setTimeout(function () {
        that.items.push(that.items[0]); //尾部追加数组的第一个，放到数组最后
        that.items.shift(); //删除第一个元素
        con1.style.marginTop = "0px"; //设置style样式 向上移动30px 再回到原位
        that.animate = !that.animate; // 这个地方如果不把animate 取反会出现消息回滚的现象，此时把ul 元素的过渡属性取消掉就可以完美实现无缝滚动的效果了
      }, 500);
    },
    mEnter() {
      clearInterval(this.timer1); //鼠标移入清除定时器
    },
    mLeave() {
      this.timer1 = setInterval(this.scroll, 2000);
    },
  },
};
</script>
 
 
<style lang="scss"  scoped>
* {
  margin: 0;
  padding: 0;
}
#outbox {
  width: 85%;
  height: 80%;
  margin: 1vh auto 0;
  color: #8b8b91;
  overflow: hidden;
}
.outbox {
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #142e4e;
  font-size: 16px;
  height: 30px !important;
}
#box {
  margin: 0 auto;
  width: 100%;
  line-height: 30px;
  overflow: hidden;
  transition: all 0.5s;
  color: #e3e3e4;
  font-size: 14px;
  border-bottom: solid 1px #142e4e;
}
.anim {
  transition: all 0.5s;
}
/deep/#con1 {
  height: 200px;
  overflow: hidden !important;
}
#con1 li {
  list-style: none;
  line-height: 30px;
  height: 30px;
}
</style>