<template>
  <div id="inspection"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var inspection = this.$echarts.init(
        document.getElementById("inspection")
      );
      var option = {
        tooltip: {
          trigger: "axis",
          show: false,
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
          },
        },
        legend: {
          show: false,
        },
        grid: {
          top: "10",
          left: "10",
          right: "10",
          bottom: "25",
          containLabel: true,
        },
        xAxis: [
          {
            splitLine: {
              show: false,
            },
            type: "value",
            show: true,
            axisTick: {
              show: false,
            },

            axisLine: {
              show: true,
              lineStyle: {
                color: "#2E89E0FF",
              },
            },
            min: 0,
            max: 80,
            axisLabel: {
              formatter: "{value}",
              textStyle: {
                color: "#fff",
              },
            },
          },
        ],
        yAxis: [
          {
            splitLine: {
              show: false,
            },
            axisLine: {
              //y轴
              show: true,
            },
            type: "category",
            axisTick: {
              show: false,
            },
            inverse: true,
            data: ["6月", "5月", "4月", "3月", "2月", "1月"],
            axisLabel: {
              color: "#fff",
              fontSize: 14,
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#2E89E0FF",
              },
            },
            
          },
        ],
        series: [
          {
            name: "标准化",
            type: "bar",
            barWidth: 12, // 柱子宽度
            label: {
              show: true,
              position: "right", // 位置
              color: "#fff",
              fontSize: 10,
              distance: 15, // 距离
              formatter: "{c}", // 这里是数据展示的时候显示的数据
            }, // 柱子上方的数值
            itemStyle: {
              barBorderRadius: [0, 20, 20, 0], // 圆角（左上、右上、右下、左下）

              color: new echarts.graphic.LinearGradient(
                1,
                0,
                0,
                0,
                [
                  {
                    offset: 0,
                    color: "#148F97FF",
                  },
                  {
                    offset: 1,
                    color: "#148F97FF",
                  },
                ],
                false
              ), // 渐变
            },
            data: [34, 40, 28, 28, 20, 32],
          },
        ],
      };
      inspection.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#inspection {
  width: 100%;
  height: 100%;
}
</style>
