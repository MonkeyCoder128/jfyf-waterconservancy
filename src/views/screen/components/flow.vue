<template>
  <div id="flow"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var flow = this.$echarts.init(document.getElementById("flow"));

      var zzx1 = ["6", "2", "1", "3", "4"];
      var wgx1 = ["5", "3", "6", "5", "2"];
      var option = {
        grid: {
          left: "18",
          right: "5",
          bottom: "23",
          top: "32",
          containLabel: true,
        },
        legend: {
          data: ["流量", "流速"],
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
          name: "万立方米/秒",
          nameTextStyle: {
            color: "#ffffff",
            padding: [0, 0, 0, 30], // 上右下左与原位置距离
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
              Number(v) >= 0 ? Number(v) + 0.3 : Number(v) - 0.3
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
              Number(v) >= 0 ? Number(v) + 0.3 : Number(v) - 0.3
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

      flow.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#flow {
  width: 100%;
  height: 100%;
}
</style>