<template>
  <div style="height: 88%; overflow: hidden; width: 98%; margin: 0 auto">
    <div class="table-header table-row">
      <div class="table-cell" style="width: 68%">时间</div>
      <div class="table-cell" style="width: 25%">设备</div>
      <div class="table-cell" style="width: 12%">原因</div>
    </div>
    <div class="table-body" style="width: 94%; margin: 0 auto">
      <div :class="{ 'scroll-wrap': getPlayData.length > 0 }">
        <div
          class="table-row"
          :class="{ hasBgc: index % 2 === 0 }"
          v-for="(item, index) in getPlayData"
          :key="index"
          :ref="'row_' + index"
        >
          <div
            class="table-cell"
            style="align: center; width: 58%"
            :title="item.time"
          >
            {{ item.time }}
          </div>
          <div
            class="table-cell"
            style="align: center; width: 30%"
            :title="item.cont"
          >
            {{ item.cont }}
          </div>
          <div class="table-cell" :title="item.publish">
            <!-- <span :class="item.yy.search('异常')>=0?'red':'white'">{{item.yy}}</span> -->
            <span style="color: red">{{ item.yy }}</span>
          </div>
        </div>
      </div>
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
        // { time: "2022-04-20 11:20:14", cont: "B4区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:09", cont: "A1区", yy: "设备离线" },
        // { time: "2022-04-20 11:20:10", cont: "A2区", yy: "流速异常" },
        // { time: "2022-04-20 11:20:11", cont: "B1区", yy: "水质异常" },
        // { time: "2022-04-20 11:20:12", cont: "B2区", yy: "流量异常" },
        // { time: "2022-04-20 11:20:13", cont: "B3区", yy: "流速异常" },
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
  computed: {
    // getPlayData() {
    //   return this.data.concat(this.data.slice(0, 4));
    // },
  },
  mounted() {
    // this.play();
  },
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
</style>
