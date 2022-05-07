<template>
  <div id="pressure" style="width: 340px; height: 135px;"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var option;
      var pressure = this.$echarts.init(document.getElementById("pressure"));
      var option = {
        grid: {
          left: "10",
          top: "25%",
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        lineStyle: {
          color: "#fff000",
        },
        itemStyle: {
          normal: {
            color: "#fff000",
          },
        },
        xAxis: {
          type: "category",
          data: ["11.50", "12.00", "12.10", "12.20", "12.30", "12.40", "12.50"],
          axisLine: {
            lineStyle: {
              color: "#c6c6c9",
              width: 1,
            },
          },
          axisLabel:{
            show:'false'
          },
          axisTick:{
            show:'true'
          }
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: {
            show:'true',
            lineStyle: {
              color: "#c6c6c9",
              width: 1,
            },
          },
          axisLabel:{
            show:'false'
          },
          axisTick:{
            show:'false'
          }
        },

        series: [
          {
            data: [820, 100,  932, 1330 ,901, 934,1320],
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#fff000",
                lineStyle: {
                  color: "#fff000",
                },
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(255,255,0,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(255,255,0,0.3)",
                },
              ]),
            },
          },
        ],
      };
      pressure.setOption(option);
    },
  },
};
</script>
