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

      var zzx1 = ["300", "100", "100", "300", "200"];
      var wgx1 = ["100", "-100", "-200", "400", "-100"];
      var option = {
        grid: {
          left: "18",
          right: "5",
          bottom: "35",
          top: "45",
          containLabel: true,
        },
        legend: {
          data: ["垂直位移", "水平位移"],
          right: 20,
          top: 1,
          textStyle: {
            color: "#fff",
            fontSize: 14,
          },
          itemWidth: 12,
          itemHeight: 12,
          color: "#fff",
        },
        xAxis: {
          type: "category",
          data: ["2016", "2017", "2018", "2019", "2020"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "#193e69",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            color: "#fff",
          },
        },

        yAxis: {
          type: "value",
          name: "(mm)",
          nameTextStyle: {
            color: "#ffffff",
            padding: [0, 30, -7, 0],
          },
          splitNumber: 5,
          //boundaryGap: [0.2, 0.2],
          splitLine: {
            show: true,
            lineStyle: {
              color: "#112039", //左侧显示线
            },
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: "#193e69",
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            formatter: "{value}",
            color: "#fff",
            fontSize: 14,
          },
        },
        series: [
          //1头
          {
            type: "pictorialBar",
            symbolSize: [20, 8],
            symbolOffset: [-12, 0],
            symbolPosition: "end",
            z: 12,
            color: "#e7b20a",
            data: zzx1.map((v) =>
              Number(v) >= 0 ? Number(v) + 20 : Number(v) - 20
            ),
          },
          //1底
          {
            type: "pictorialBar",
            symbolSize: [20, 8],
            symbolOffset: [-12, 4],
            z: 12,
            color: "#816819",
            data: Array(zzx1.length).fill(0),
          },
          //2头部
          {
            type: "pictorialBar",
            symbolSize: [20, 8],
            symbolOffset: [12, 0],
            symbolPosition: "end",
            z: 12,
            color: "#1397a0",
            data: wgx1.map((v) =>
              Number(v) >= 0 ? Number(v) + 20 : Number(v) - 20
            ),
          },
          //2底部
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [20, 8],
            symbolOffset: [12, 4],
            color: "#155c69",
            z: 12,
            data: Array(wgx1.length).fill(0),
          },
          //2柱体
          {
            name: "垂直位移",
            type: "bar",
            barWidth: "20",
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#816819",
                barBorderRadius: 0,
              },
            },
            label: {
              show: false,
              position: "insideTop", //数值显示在柱子内
              formatter: function (data) {
                if (data.value < 0) {
                  return Math.abs(data.value);
                }
              },
            },
            data: zzx1,
          },
          //2柱体
          {
            name: "水平位移",
            type: "bar",
            barWidth: "20",
            itemStyle: {
              normal: {
                color: "#155c69",
                barBorderRadius: 0,
              },
            },
            label: {
              show: false,
              position: "insideTop", //数值显示在柱子内
              formatter: function (data) {
                if (data.value < 0) {
                  return Math.abs(data.value);
                }
              },
            },
            data: wgx1,
          },
        ],
      };

      deformation.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#deformation {
  width: 100%;
  height: 100%;
}
</style>