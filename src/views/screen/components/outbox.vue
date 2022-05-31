<template>
  <div style="height: 88%; overflow: hidden; width: 98%; margin: 0 auto">
    <div class="table-header table-row">
      <div class="table-cell" style="width: 68%">时间</div>
      <div class="table-cell" style="width: 37%">设备</div>
      <div class="table-cell" style="width: 22%">原因</div>
    </div>
    <div style="width: 95%; height: 86%; margin: auto;font-size:12px;">
      <marquee
        id="affiche"
        align="left"
        behavior="scroll"
        direction="up"
        height="100%"
        width="100%"
        hspace="50"
        vspace="20"
        loop="-1"
        scrollamount="4"
        scrolldelay="10"
        onMouseOut="this.start()"
        onMouseOver="this.stop()"
        class="scrollContent"
      >
        <div class="warningStage">
          <div style="width: 55%">2022-04-20 11:20:09</div>
          <div style="width: 32%">投入式水位计三</div>
          <div style="color: red; width: 18%">设备异常</div>
        </div>
        <div class="warningStage">
          <div style="width: 55%">2022-04-20 11:20:10</div>
          <div style="width: 32%">GNSS接收机一</div>
          <div style="width: 18%; color: rgb(234, 149, 28)">数据异常</div>
        </div>
        <div class="warningStage">
          <div style="width: 55%">2022-04-20 11:20:11</div>
          <div style="width: 32%">流速流量仪一</div>
          <div style="width: 18%; color: rgb(234, 149, 28)">数据异常</div>
        </div>
        <div class="warningStage">
          <div style="width: 55%">2022-04-20 11:20:12</div>
          <div style="width: 32%">振弦式渗压计一</div>
          <div style="width: 18%; color: rgb(234, 149, 28)">数据异常</div>
        </div>
        <div class="warningStage">
          <div style="width: 55%">2022-04-20 11:20:13</div>
          <div style="width: 32%">水质测定仪一</div>
          <div style="width: 18%; color: rgb(234, 149, 28)">数据异常</div>
        </div>
      </marquee>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => {
        return [];
      },
    },
  },
  data() {
    return {
      initMt: 0,
      getPlayData: [
        { time: "2022-04-20 11:20:09", cont: "投入式水位计三", yy: "异常" },
        { time: "2022-04-20 11:20:10", cont: "GNSS接收机一", yy: "异常" },
        { time: "2022-04-20 11:20:11", cont: "流速流量仪一", yy: "异常" },
        { time: "2022-04-20 11:20:12", cont: "振弦式渗压计一", yy: "异常" },
        { time: "2022-04-20 11:20:13", cont: "水质测定仪一", yy: "异常" },
      ],
      item: {
        productName: "1",
      },
      visible: true,
      stop: false,
    };
  },
  methods: {
    play() {
      const row = this.$refs["row_0"][0];

      setTimeout(() => {
        this.visible = false;

        this.$nextTick(() => {
          this.initMt++;
          if (this.initMt === this.data.length) {
            this.initMt = 0;
          }
          this.visible = true;
        });
        this.play();
      }, 2000);
    },
  },
  watch: {},
  computed: {},
  mounted() {},
};
</script>
<style lang="scss" scoped>
$cellHeight: 35px;
.table-row {
  display: flex;
  line-height: 35px;
  height: 35px;
  transition: all 0.3s;
  border-bottom: 1px solid #12213a;
}
.white {
  color: #fff;
}
.red {
  color: red;
}
.table-header {
  width: 94%;
  margin: 0 auto;
  color: #686a72;
  border-bottom: 1px solid #153052;
}
.table-cell {
  text-align: left;
  font-size: 12px;
  text-overflow: ellipsis;
  overflow: hidden;
}
// .hasBgc {
//   background: rgb(0, 59, 81);
// }
.hidden-row {
  height: 0 !important;
  line-height: 0 !important;
  display: none !important;
}
.table-body {
  height: 100%;
  overflow-y: hidden;
  .table-row {
    color: #fff;
  }
}
.scroll-wrap {
  animation: scroll 8s linear infinite;
  position: relative;
}
.scroll-wrap:hover {
  animation-play-state: paused;
}
@keyframes scroll {
  from {
    top: 0;
  }
  to {
    top: -8 * $cellHeight;
  }
}
.warningStage {
  display: flex;
  flex-direction: row;
  color: #fff;
  border-bottom: solid 1px #182d47;
  height: 30px;
}
</style>
