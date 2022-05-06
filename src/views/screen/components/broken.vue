<template>
  <div id="broken" style="width: 340px; height: 135px;"></div>
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
      var broken = this.$echarts.init(document.getElementById("broken"));
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
          color: "#00ff00",
        },
        itemStyle: {
          normal: {
            color: "#000000",
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
        },
        yAxis: {
          type: "value",
          splitLine: { show: false },
          axisLine: {
            lineStyle: {
              color: "#c6c6c9",
              width: 1,
            },
          },
        },

        series: [
          {
            data: [820, 932, 901, 934, 100, 1330, 1320],
            type: "line",
            smooth: true,
            itemStyle: {
              normal: {
                color: "#00ff00",
                lineStyle: {
                  color: "#00ff00",
                },
              },
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgba(0,238,0,0.8)",
                },
                {
                  offset: 1,
                  color: "rgba(0,255,0,0.3)",
                },
              ]),
            },
          },
        ],
      };
      broken.setOption(option);
    },
  },
};
</script>
