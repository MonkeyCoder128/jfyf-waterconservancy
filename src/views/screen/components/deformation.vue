<template>
  <div id="deformation"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var deformation = this.$echarts.init(
        document.getElementById("deformation")
      );
      var fontColor = "#fff";
      var option = {
        grid: {
          left: "25",
          right: "0",
          top: "40",
          bottom: "27",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "item",
        },
        legend: {
          selectedMode:false,
          data: ["水平位移", "高程位移"],
          right: 8,
          top: 1,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          itemWidth: 12,
          itemHeight: 12,
          color: "#fff",
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
              "11:50",
              "12:00",
              "12:10",
              "12:20",
              "12:30",
              "12:40",
              "12:50",
            ],
          },
        ],
        yAxis: [
          {
            type: "value",
            name: "(mm)",
            nameTextStyle: {
              color: "#ffffff",
              padding: [0, 30, -7, 0],
            },
            min: -4,
            max: 4,
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
          {
            type: "value",
            show: false,
            name: "(㎡/s)",
            nameTextStyle: {
              color: "#ffffff",
              padding: [0, 30, -7, 0],
            },
            min: 0,
            max: 8,
          },
        ],
        series: [
          {
            type: "line",
            yAxisIndex: 1,
            name: "高程位移",
            itemStyle: {
              normal: {
                color: "#155c69",
                barBorderRadius: 0,
              },
            },
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
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
            data: [2, -1, -1, 1, -1, 1.2, -1].map(
              (v) => v + 4
            ),
          },
          {
            type: "line",
            yAxisIndex: 1,
            name: "水平位移",
            itemStyle: {
              normal: {
                color: "#155c69",
                barBorderRadius: 0,
              },
            },
            symbol: "circle",
            symbolSize: 8,
            smooth: true,
            itemStyle: {
              normal: {
                color: "#E7B20AFF",
                lineStyle: {
                  color: "#E7B20AFF",
                  width: 1,
                },
                areaStyle: {
                  //color: '#94C9EC'
                  color: new echarts.graphic.LinearGradient(0, 1, 0, 0, [
                    {
                      offset: 0,
                      color: "#2e89e085",
                    },
                    {
                      offset: 1,
                      color: "#E7B20AFF",
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
            data: [1, -2, -1.5, -1.5, 1, 0.2, -1].map(
              (v) => v + 4
            ),
          },
        ],
      };

      deformation.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
#deformation {
  width: 100%;
  height: 100%;
}
</style>
