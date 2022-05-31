<template>
  <div style="height: 88%; overflow: hidden; width: 98%; margin: 0 auto">
    <div class="table-header table-row">
      <div class="table-cell" style="width: 68%">时间</div>
      <div class="table-cell" style="width: 37%">设备</div>
      <div class="table-cell" style="width: 22%">原因</div>
    </div>
    <div style="width: 95%; height: 86%; margin: auto; font-size: 12px">
      <vue-seamless-scroll
        style="width: 100%; height: 100%; overflow-y: hidden"
        :data="CardPartsStatisticsList"
        :class-option="classOption"
        class="scroll"
      >
        <div
          v-for="(item, index) in CardPartsStatisticsList"
          :key="index"
          style="display: flex; flex-direction: row;border-bottom:solid 1px #13233d;height:30px;align-items:center;"
        >
          <div style="width: 53%;color:#fff;">{{ item.itemname }}</div>
          <div style="width: 30%;color:#fff;">{{ item.cont }}</div>
          <div :class="item.yy.search('设备异常')>=0?'red':'white'">{{item.yy}}</div>
        </div>
      </vue-seamless-scroll>
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
      CardPartsStatisticsList: [
        {
          id: 1,
          itemname: "2022-04-20 11:20:09",
          cont: "投入式水位计三",
          yy: "设备异常",
        },
        {
          id: 2,
          itemname: "2022-04-20 11:20:10",
          cont: "GNSS接收机一",
          yy: "数据异常",
        },
        {
          id: 3,
          itemname: "2022-04-20 11:20:11",
          cont: "流速流量仪一",
          yy: "数据异常",
        },
        {
          id: 4,
          itemname: "2022-04-20 11:20:12",
          cont: "振弦式渗压计一",
          yy: "数据异常",
        },
        {
          id: 5,
          itemname: "2022-04-20 11:20:13",
          cont: "水质测定仪一",
          yy: "数据异常",
        },
        {
          id: 1,
          itemname: "2022-04-20 11:20:09",
          cont: "投入式水位计三",
          yy: "设备异常",
        },
        {
          id: 2,
          itemname: "2022-04-20 11:20:10",
          cont: "GNSS接收机一",
          yy: "数据异常",
        },
        {
          id: 3,
          itemname: "2022-04-20 11:20:11",
          cont: "流速流量仪一",
          yy: "数据异常",
        },
        {
          id: 4,
          itemname: "2022-04-20 11:20:12",
          cont: "振弦式渗压计一",
          yy: "数据异常",
        },
        {
          id: 5,
          itemname: "2022-04-20 11:20:13",
          cont: "水质测定仪一",
          yy: "数据异常",
        },
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
    classOption() {
      return {
        step: 0.3, // 数值越大速度滚动越快
        limitMoveNum: 6, // 开始无缝滚动的数据量
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    },
  },
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
  color: #e5b84b;
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
