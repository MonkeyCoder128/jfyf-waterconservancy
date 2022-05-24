<template>
  <div id="dam2bg"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var dam2bg = this.$echarts.init(document.getElementById("dam2bg"));
      let datas = {
        // /title: "上证指数",
        value: "6",
      };

      let max = 10;
      let value = datas.value;
      let degrees = 180 - (180 * value) / max;

      //图表配置
      let centerArr = ["50%", "70%"];
      let label = {
        0: "0",
        10: "100",
      };
      let colorList = ["#148c94", "#148c94"];
      if (value < max / 3) {
        colorList = ["#148c94", "#148c94"];
      } else if (value < (max / 3) * 2) {
        colorList = ["#148c94", "#148c94"];
      }
      let colorSet = new echarts.graphic.LinearGradient(0, 1, 0, 0, [
        {
          offset: 0,
          color: colorList[0],
        },
        {
          offset: 1,
          color: colorList[1],
        },
      ]);

      //

      var option = {
        grid: {
          left: "18",
          right: "5",
          bottom: "23",
          top: "32",
          containLabel: true,
        },
        series: [
          {
            animation: false,
            name: "最外圈冷热标签",
            type: "gauge",
            z: 2,
            radius: "25%",
            splitNumber: 1,
            startAngle: 180,
            endAngle: 0,
            min: 0,
            max: max,
            center: centerArr, //整体的位置设置
            axisTick: {
              show: false,
            },
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            detail: {
              show: false,
            },
            axisLabel: {
              show: true,
              textStyle: {
                color: "#fff",
                fontSize: 12,
                padding: [10, -100],
              },
              formatter: function (val) {
                return label[val];
              },
            },
          },
          {
            type: "pie",
            animation: false,
            color: ["transparent", "transparent", "transparent"],
            //animationEasingUpdate: "cubicOut",
            startAngle: 180,
            center: centerArr,
            radius: ["80.5%", "83%"],
            hoverAnimation: false,
            labelLine: {
              show: false,
            },
            data: [
              {
                name: "",
                value: value,
                itemStyle: {
                  normal: {
                    show: true,
                    color: colorSet,
                    shadowBlur: 8,
                    shadowColor: colorList[0],
                    shadowOffsetX: 0,
                    shadowOffsetY: 4,
                    width: 6,
                  },
                },
              },
              {
                //画中间的图标
                name: "",
                value: 0,
                label: {
                  rotate: 90,
                  position: "inside",
                  width: 2,
                  height: 2,
                  padding: 2,
                  verticalAlign: "bottom",
                  backgroundColor: "#fff",
                  borderRadius: 10,
                  borderWidth: 1.5,
                  borderColor: colorList[0],
                  shadowColor: "#fff",
                  shadowBlur: 10,
                  shadowOffsetY: -1,
                },
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: 10 - value,
                itemStyle: {
                  color: "#33394c",
                },
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: 10,
              },
            ],
          },
        ],
      };

      dam2bg.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#dam2bg {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: relative;
  z-index: 0;
}
</style>
