<template>
  <div id="dam"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var dam = this.$echarts.init(document.getElementById("dam"));
      let datas = {
        title: "上证指数",
        value: "5.9",
      };

      let max = 10;
      let value = datas.value;
      let degrees = 180 - (180 * value) / max;

      //图表配置
      let centerArr = ["50%", "50%"];
      let label = {
        0: "0",
        10: "100",
      };
      let colorList = ["#7f91fe", "#1d40d9"];
      if (value < max / 3) {
        colorList = ["#1d55e3", "#1d55e3"];
      } else if (value < (max / 3) * 2) {
        colorList = ["#1d55e3", "#1d55e3"];
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
          left: "5%",
          right: "5%",
          top: "15%",
          bottom: "15%",
          containLabel: true,
        },
        series: [
          // 进度条
          {
            name: "仪表盘",
            type: "gauge",
            radius: "70%", // 半径
            startAngle: 180, //开始角度 左侧角度
            endAngle: 0, //结束角度 右侧
            splitNumber: 10,

            center: ["50%", "48%"],
            axisLine: {
              lineStyle: {
                color: [
                  [0.7, "#1d40dc"], //外环基础色
                  [1, "transparent"], // 阴影色
                ],
                width: 15,
              },
            },
            axisLabel: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            itemStyle: {
              show: false,
            },
            detail: {
              formatter: function (value) {
                return `${value * 100}%`;
              },
              offsetCenter: [0, "-20%"],
              textStyle: {
                fontSize: "18",
                fontWeight: "600",
                color: "#7f9ff7",
              },
            },
            title: {
              offsetCenter: [0, "100%"],
            },
            pointer: {
              show: false,
              length: "75%",
              width: 20, //指针粗细
            },
            data: [
              {
                name: "",
                value: 0.7,
              },
            ],
          },

          {
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
            color: ["transparent", "transparent", "transparent"],
            animationEasingUpdate: "cubicOut",
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
                  shadowOffsetY: 1,
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

      dam.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#dam {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
