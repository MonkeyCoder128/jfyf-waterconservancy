<template>
  <div id="broken"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var broken = this.$echarts.init(document.getElementById("broken"));
      var fontColor = "#fff";
      var option = {
        grid: {
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "15%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        legend: {
          show: true,
          x: "center",
          top: "12%",
          y: "35",
          icon: "stack",
          itemWidth: 10,
          itemHeight: 10,
          textStyle: {
            color: "#1b4472",
          },
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              color: fontColor,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#397cbc",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: "#195384",
              },
            },
            data: [
              "11.50",
              "12.00",
              "12.10",
              "12.20",
              "12.30",
              "12.40",
              "12.50",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(㎡/s)",
            nameTextStyle: {
              color: "#ffffff",
              padding: [0, 30, -7, 0],
            },
            min: 0,
            max: 80,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#397cbc",
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: "#11366e",
              },
            },
          },
        ],
        series: [
          {
            type: "line",
            stack: "总量",
            symbol: "circle",
            symbolSize: 8,
            itemStyle: {
              normal: {
                color: "#0092f6",
                lineStyle: {
                  color: "#0092f6",
                  width: 1,
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "rgba(7,44,90,0.3)",
                    },
                    {
                      offset: 1,
                      color: "rgba(0,146,246,0.9)",
                    },
                  ]),
                },
              },
            },
            markPoint: {
              itemStyle: {
                normal: {
                  color: "red",
                },
              },
            },
            data: [80, 20, 40, 30, 60, 70, 20],
          },
        ],
      };
      broken.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
#broken {
  width: 98%;
  height: 100%;
  margin: 0 auto;
}
</style>
