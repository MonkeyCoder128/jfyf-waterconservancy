<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "./mixins/resize";

export default {
  mixins: [resize],
  props: {
    theme: {
      type: String,
      default: "macarons"
    },
    className: {
      type: String,
      default: "chart"
    },
    width: {
      type: String,
      default: "100%"
    },
    height: {
      type: String,
      default: "200px"
    },
    autoResize: {
      type: Boolean,
      default: true
    },
    chartData: {
      required: true
    },
    show: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chart: null
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        this.setOptions(val);
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart();
    });
  },
  beforeDestroy() {
    if (!this.chart) {
      return;
    }
    this.chart.dispose();
    this.chart = null;
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, this.theme);
      // this.setOptions(JSON.parse(this.chartData));
      this.setOptions(this.chartData);
    },
    setOptions(val) {
      let obj = {
        // grid: {
        //   top: 10,
        //   height: "auto"
        // },
        tooltip: {
          trigger: "axis",
          formatter: value => {
            return (
              '<div style="font-size: 13px;color: #fff;margin-bottom:5px;">' +
              value[0].value[0] +
              '： <span style="font-weight:bolder">' +
              value[0].value[1] +
              "</span> " +
              "</div>"
            );
          },
          axisPointer: {
            type: "none",
            // snap: true,
            label: {
              // show: true,
              backgroundColor: "#fff",
              color: "#00000073",
              shadowColor: "#efefef",
              shadowOffsetX: 5,
              shadowOffsetY: 5
            }
          }
        },
        xAxis: {
          type: "time",
          show: this.show
        },
        yAxis: {
          type: "value",
          show: this.show
        },
        series: [
          {
            data: val,
            type: "line",
            smooth: true,
            areaStyle: {}
          }
        ]
      };
      this.chart.setOption(obj);
    }
  }
};
</script>
