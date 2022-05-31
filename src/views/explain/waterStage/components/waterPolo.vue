<template>
  <div class="box">
    <div ref="waterPolo" id="waterPolo"></div>
  </div>
</template>
<script>
// 引入echarts水球图
import 'echarts-liquidfill'
export default {
  data() {
    return {};
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
      var myChart = this.$echarts.init(this.$refs.waterPolo);
      let max = 100; //满刻度大小
      let scroe = this.parentData,
        scroePer = scroe / 50;
      let data = max * scroePer;
      let dataOption = {
        title: {
          top: "47%",
          left: "center",
          text: scroe + " mm/min",
          textStyle: {
            color: "#1C48BF",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 14,
          },
        },
        series: [
          //data数值
          {
            type: "liquidFill",
            itemStyle: {
              opacity: 0.8, //波浪的透明度
            },
            radius: "73%",
            //水波
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#35EBFB",
                },
                {
                  offset: 1,
                  color: "#2876F7",
                },
              ]),
            ],
            data: [0.3, 0.35],
            backgroundStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(189, 240, 254, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(189, 240, 254, 0.01)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(189, 240, 254, 1)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            outline: {
              borderDistance: 2,
              itemStyle: {
                borderWidth: 0,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 73, 240, 0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 73, 240, 1)",
                    },
                  ],
                },
                shadowBlur: 30,
                shadowColor: "red",
              },
            },
            // data: [
            //   {
            //     value: scroePer,
            //   },
            // ],
            label: {
              normal: {
                formatter: "",
                textStyle: {
                  fontSize: 12,
                },
              },
            },
          },
          //内层刻度线渐变
          {
            type: "gauge",
            splitNumber: 3, //刻度数量
            radius: "94%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "51%"],
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                  [0.1, "#71C5FF"],

                  [1, "#71C5FF"],
                ],
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 10,
              },
              length: 2,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
          // 底部半弧
          {
            type: "gauge",
            radius: "83%",
            startAngle: -25,
            endAngle: -154,
            show: false,
            center: ["50%", "52%"],
            progress: {
              width: 16,
              roundCap: true,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 8,
                color: [[1, "#3192D8"]], //刻度线背景色
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              width: "85%",
              borderRadius: 8,
              fontSize: 18,
            },
            data: [],
          },
        ],
      };
      myChart.setOption(dataOption);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100% !important;
  height: 100%;
  #waterPolo {
    margin: 0 auto;
    width: 95%;
    height: 100%;
  }
}
</style>