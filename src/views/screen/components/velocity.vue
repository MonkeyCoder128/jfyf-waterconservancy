<template>
    <div id="velocity"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var echarts = require("echarts");
      var velocity = this.$echarts.init(document.getElementById("velocity"));
      let centerArr = ["50%", "70%"];
      var option = {
        grid: {
          top: "30",
          left: "48",
          right: "8",
          bottom: "45",
        },
        tooltip: {
          show: false,
        },
        xAxis: {
          data: ["11:50", "12:00", "12:10", "12:20", "12:30", "12:40", "12:50"],
          axisLine: {
            show: true,
            lineStyle: {
              color: "397cbc", //底部边框颜色
            },
          },
          axisTick: {
            show: false,
          },
          axisLabel: {
            textStyle: {
              color: "#fff", //底部文字颜色
              fontSize: 12,
            },
          },
        },
        yAxis: [
          {
            type: "value",
            name: "(m/s)",
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
            splitLine: {
              show: true,
              lineStyle: {
                color: "#11223b", //网格线的颜色
                width: 1,
                type: "solid",
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "397cbc", //底部边框颜色
              },
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              show: true,
              fontSize: 12,
              textStyle: {
                color: "#fff", //左文字颜色
              },
            },
          },
        ],
        series: [
          {
            type: "bar",
            barWidth: 20,
            showBackground: true,
            backgroundStyle: {
              color: "rgba(21,136,209,0.1)",
            },
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    // color: '#00FFE3',//渐变1
                    color: "rgba(21,136,209,1)", //渐变1
                  },
                  {
                    offset: 1,
                    // color: '#4693EC',//渐变2
                    color: "rgba(21,136,209,1)", //渐变2
                  },
                ]),
              },
            },
            data: [20, 30, 25, 40, 20, 30, 26],
            z: 0,
            zlevel: 0,
            // label: {
            //     show: true,
            //     position: 'top',
            //     fontSize: 14,
            //     color: '#fff', //柱状顶部文字颜色
            //     formatter: function (params) {
            //         return '20%';
            //     },
            // },
          },
          //网格
          {
            type: "pictorialBar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "#122540", //数据的间隔颜色
              },
            },
            symbolRepeat: "fixed",
            symbolMargin: 3,
            symbol: "rect",
            symbolSize: [20, 1],
            symbolPosition: "end",
            symbolOffset: [0, 0],
            data: [20, 30, 25, 40, 20, 30, 26],
            z: 1,
            zlevel: 0,
          },
          {
            type: "pictorialBar",
            barWidth: 20,
            itemStyle: {
              normal: {
                color: "transparent", //数据的间隔颜色
              },
            },
            // symbolRepeat: 'fixed',
            symbolMargin: 3,
            symbol: "rect",
            symbolSize: [30, 4],

            // symbolPosition: 'start',
            // symbolOffset: [0, 0],
            data: [20, 30, 25, 40, 20, 30, 26],
            z: 1,
            zlevel: 0,
            label: {
              show: true,
              position: "top",
              fontSize: 12,
              color: "#fff", //柱状顶部文字颜色
              // formatter: function (params) {
              //   return "20%";
              // },
            },
          },
        ],
      };
      velocity.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
#velocity {
  width: 100%;
  height: 100%;
}
</style>
