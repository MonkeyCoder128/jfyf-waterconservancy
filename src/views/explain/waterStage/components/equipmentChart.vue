<template>
  <div class="box">
    <div ref="equipmentChart" id="equipmentChart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      echartsData: "",
    };
  },
  props: {
    parentData: {
      type: String,
      default: "",
    },
  },
  created() {},
  mounted() {
    this.getLoadEcharts();
  },
  methods: {
    // 获取echarts
    getLoadEcharts() {
      var echarts = require("echarts");
      var myChart = this.$echarts.init(this.$refs.equipmentChart);
      var option = {
        // 给echarts设置百分比自适应
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "20%",
          containLabel: true,
        },
        series: [
          {
            name: "刻度",
            type: "gauge",
            radius: "100%", //图表尺寸
            center: ["50%", "55.5%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 10,
                color: [
                  [0.05, "#adc78a"],
                  [0.1, "#78bba3"],
                  [0.15, "#66b6aa"],
                  [0.2, "#3babbf"],
                  [0.25, "#21a6cb"],
                  [0.3, "#2ca8c6"],
                  [0.35, "#22a6ca"],
                  [0.4, "#47afb9"],
                  [0.45, "#74baa5"],
                  [0.5, "#87be9b"],
                  [0.55, "#98c294"],
                  [0.6, "#cecf7b"],
                  [0.65, "#dfd373"],
                  [0.7, "#f2d86a"],
                  [0.75, "#f7c34c"],
                  [0.8, "#fcd45e"],
                  [0.85, "#eb9920"],
                  [0.9, "#efa730"],
                  [0.95, "#ea951c"],
                  [1, "#ea951c"],
                ],
              },
            },
            //刻度标签
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 2,
              },
              length: -2,
              splitNumber: 7,
            },
            //刻度样式
            splitLine: {
              show: false,
              length: -8,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            //仪表盘轴线
            axisLabel: {
              show: false,
            },
            pointer: {
              //仪表盘指针
              show: false,
            },
            detail: {
              show: false,
              offsetCenter: [0, "70%"], // x, y，单位px
              textStyle: {
                // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                color: "#000",
                fontSize: 12,
              },
              // formatter: '水位mm：{value}'
              formatter: "水位mm",
            },
          },
          {
            name: "刻度",
            type: "gauge",
            radius: "101%", //图表尺寸
            center: ["50%", "57.5%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 10,
                color: [
                  [0.15, "#66b6aa"],
                  [0.2, "#3babbf"],
                  [0.25, "#21a6cb"],
                  [0.3, "#2ca8c6"],
                  [0.35, "#22a6ca"],
                  [0.4, "#47afb9"],
                  [0.45, "#74baa5"],
                  [0.5, "#87be9b"],
                  [0.55, "#98c294"],
                  [0.6, "#cecf7b"],
                  [0.65, "#dfd373"],
                  [0.7, "#f2d86a"],
                  [0.75, "#f7c34c"],
                  [0.8, "#fcd45e"],
                  [0.85, "#eb9920"],
                  [0.9, "#efa730"],
                  [0.95, "#ea951c"],
                  [1, "#ea951c"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: -8,
              lineStyle: {
                color: "auto",
                width: 2,
              },
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              //仪表盘指针
              show: false,
            },
            detail: {
              show: false,
            },
          },
          {
            type: "gauge",
            radius: "79%",
            min: 0,
            max: 100,
            center: ["50%", "56%"],
            splitNumber: 1, //刻度数量
            startAngle: 225,
            endAngle: -45,
            progress: {
              show: true,
              roundCap: true,
              width: 10, //显示的环形的宽度
            },
            itemStyle: {
              //渐变颜色
              color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0.0,
                  color: "#34aac1",
                },
                {
                  offset: 0.2,
                  color: "#b1c88a",
                },

                {
                  offset: 0.6,
                  color: "#fcd55e",
                },

                {
                  offset: 0.7,
                  color: "#efa830",
                },

                {
                  offset: 0.8,
                  color: "#ea951c",
                },
                {
                  offset: 1,
                  color: "#ea951c",
                },
              ]),
            },
            //仪表盘轴线相关配置，即里面的灰色环形
            axisLine: {
              show: true,
              distance: 10,
              color: "black",
              lineStyle: {
                width: 10,
                color: [[1, "#f9dfbb"]], //刻度线背景色
              },
            },
            //分隔线样式。
            splitLine: {
              show: false,
            },
            //仪表盘刻度显示值
            axisLabel: {
              min: 0,
              max: 100,
              show: true,
              // inside: true,
              textStyle: {
                padding: [10, 10],
              },
              // 设置刻度值的距离位移
              distance: -20,
            },
            //刻度样式
            axisTick: {
              show: false,
              //刻度线向外或向里
              inside: false,
              //刻度线长度
              length: 3,
              //刻度线外边距离
              margin: 10,
            },
            pointer: {
              show: false,
            },
            //仪表盘详情，用于显示数据。
            detail: {
              width: "60%",
              borderRadius: 8,
              offsetCenter: [0, 0],
              fontSize: 18,
              formatter: "{value} mm",
              color: "#EA951C",
            },
            title: {
              offsetCenter: [0, 60],
              fontSize: 14,
            },
            data: [
              {
                value: this.parentData,
                name: "水位mm",
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100% !important;
  height: 100%;
  #equipmentChart {
    margin: 0 auto;
    width: 95%;
    height: 100%;
  }
}
</style>