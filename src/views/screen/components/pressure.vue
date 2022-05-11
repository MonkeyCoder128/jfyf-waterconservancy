<template>
  <div id="pressure"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
    window.addEventListener("resize", function () {
      myecharts.resize();
    });
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var pressure = this.$echarts.init(document.getElementById("pressure"));
      var fontColor = "#fff";
      var option = {
        grid: {
          left: "6%",
          right: "8%",
          top: "20%",
          bottom: "20%",
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
              padding: [0, 30, -7, 0]
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
                color: "#e7b20a",
                lineStyle: {
                  color: "#e7b20a",
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
                      color: "#e7b20a",
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
            data: [70, 50, 20, 60, 80, 40, 60],
          },
        ],
      };
      pressure.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
#pressure {
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
</style>
