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
          left: "1.2%",
          right: "2%",
          bottom: "10%",
          top: "15%",
          containLabel: true,
        },
        legend: {
          data: ["垂直位移", "水平位移"],
          right: 5,
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
            padding: [0, 30, -7, 0]
          },
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
          {
            type: "pictorialBar",
            symbolSize: [25, 8],
            symbolOffset: [-16, -4],
            symbolPosition: "end",
            z: 12,
            color: "#e7b20a",
            data: zzx1,
          },
          //1底
          {
            type: "pictorialBar",
            symbolSize: [25, 8],
            symbolOffset: [-16, 4],
            z: 12,
            color: "#816819",
            data: zzx1,
          },
          //2头部
          {
            type: "pictorialBar",
            symbolSize: [25, 8],
            symbolOffset: [15,0],
            symbolPosition: "end",
            z: 12,
            color: "#1397a0",
            data: wgx1,
          },
          //2底部
          {
            name: "",
            type: "pictorialBar",
            symbolSize: [25, 8],
            symbolOffset: [16, 4],
            color: "#155c69",
            z: 12,
            data: wgx1,
          },
          //2柱体
          {
            name: "垂直位移",
            type: "bar",
            barWidth: "25",
            itemStyle: {
              normal: {
                opacity: 1,
                color: "#816819",
                barBorderRadius: 0,
              },
            },
            label: {
              show: false,
            },
            data: zzx1,
          },
          //2柱体
          {
            name: "水平位移",
            type: "bar",
            barWidth: "27",
            itemStyle: {
              normal: {
                color: "#155c69",
                barBorderRadius: 0,
              },
            },
            label: {
              show: false,
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
  width: 95%;
  height: 100%;
  margin: 0 auto;
}
</style>