<template>
  <div id="dam2"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var dam2 = this.$echarts.init(document.getElementById("dam2"));
      var value = 60;
      var option = {
        grid: {
          left: "18",
          right: "5",
          bottom: "23",
          top: "32",
          containLabel: true,
        },
        //backgroundColor: '#010818',
        title: [
          {
            text: "已维修100",
            y: "75%",
            x: "center",
            textStyle: {
              //fontWeight: "bold",
              fontSize: 15,
              color: "#ffffff",
            },
          },
        ],
        angleAxis: {
          show: false,
          max: (100 * 360) / 180, //-45度到225度，二者偏移值是270度除360度
          type: "value",
          startAngle: 180, //极坐标初始角度
          splitLine: {
            show: false,
          },
        },
        barMaxWidth: 30, //圆环宽度
        radiusAxis: {
          show: false,
          type: "category",
        },
        //圆环位置和大小
        polar: {
          center: ["50%", "70%"],
          radius: ["50%", "70%"],
        },
        series: [
          {
            type: "bar",
            data: [
              {
                //上层圆环，显示数据
                value: value,
                itemStyle: {
                  normal: {
                    color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                      { offset: 0, color: "#148f97" },
                      { offset: 1, color: "#75d9e0" },
                    ]),
                  },
                  // color: "#59c4cb",
                },
              },
            ],
            barGap: "-100%", //柱间距离,上下两层圆环重合
            coordinateSystem: "polar",
            //roundCap: true, //顶端圆角
            z: 3, //圆环层级，同zindex
          },
          {
            //下层圆环，显示最大值
            type: "bar",
            data: [
              {
                value: 100,
                itemStyle: {
                  color: "transparent",
                  borderWidth: 0,
                },
              },
            ],
            barGap: "-100%",
            coordinateSystem: "polar",
            //roundCap: true,
            z: 1,
          },
          //仪表盘
          {
            type: "gauge",
            startAngle: 225, //起始角度，同极坐标
            endAngle: -45, //终止角度，同极坐标
            axisLine: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            splitLabel: {
              show: false,
            },
            pointer: {
              // 分隔线
              show: false, //是否显示指针
              shadowColor: "auto", //默认透明
              shadowBlur: 5,
              length: "50%",
              width: "2",
            },

            itemStyle: {
              color: "#138189",
              borderColor: "#138189",
              borderWidth: 3,
            },
            detail: {
              formatter: function (params) {
                return value + "%";
              },
              color: "#138189",
              fontSize: 20,
              offsetCenter: [0, 20],
            },
            title: {
              show: false,
            },
            data: [
              {
                value: value,
              },
            ],
          },
        ],
      };

      dam2.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#dam2 {
  width: 100%;
  height: 100%;
  margin: 0 auto;
  position: absolute;
  z-index: 9999;
}
</style>
