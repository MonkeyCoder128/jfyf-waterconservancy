<template>
  <div :class="className" :style="{ height: height, width: width }" />
</template>

<script>
import * as echarts from "echarts";
require("echarts/theme/macarons"); // echarts theme
import resize from "../dashboard/mixins/resize";
export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: "chart",
    },
    renderType: {
      type: String,
      default: "canvas",
    },
    width: {
      type: String,
      default: "400px",
    },
    height: {
      type: String,
      default: "250px",
    },
    chartData: {
      type: Object,
      default: {},
    },
  },
  data() {
    return {
      chart: null,
    };
  },
  watch: {
    chartData: {
      deep: true,
      handler(val) {
        if (this.chart) this.chart.clear();
        this.setOptions(val);
      },
    },
  },
  created() {},
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
      this.chart = echarts.init(this.$el, { renderer: this.renderType });
      if (this.chartData) this.setOptions(this.chartData);
      const that = this;
      this.chart.on("click", function (param) {
        that.$emit("clickNode", param);
        if (param.dataType == "node") {
        }
      });
      this.chart.on("contextmenu", function (param) {
        that.$emit("contextmenu", param);
      });
    },
    setOptions(val) {
      if (this.chart) this.chart.setOption(val);
    },
  },
};
</script>
