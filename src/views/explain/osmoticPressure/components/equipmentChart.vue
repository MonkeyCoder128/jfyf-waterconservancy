<template>
  <div class="box">
    <div ref="equipmentChart" id="equipmentChart"></div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.getLoadEcharts();
      // window.addEventListener("resize", function () {
      //   getLoadEcharts.resize();
      // });
    },
    methods: {
      // 获取echarts
      getLoadEcharts() {
        var echarts = require("echarts");
        var myChart = this.$echarts.init(
          this.$refs.equipmentChart,
        );
        var option = {
          backgroundColor: '',
          // 给echarts设置百分比自适应
          grid: {
            left: "5%",
            right: "5%",
            top: "20%",
            bottom: "20%",
            containLabel: true,
          },
          series: [
            {
              name: '刻度点',
              type: 'gauge',
              radius: '100%', //图表尺寸
              center: ['50%', '55%'],
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 10,
                  color: [
                    [0.00, '#53c3ff'],
                    [0.20, '#469dff'],
                    [0.40, '#3d7fff'],
                    [0.60, '#57d2ff'],
                    [0.80, '#66ffff'],
                    [1, '#66ffff']
                  ]
                }
              },
              axisTick: {
                show: true,
                lineStyle: {
                  color: 'auto',
                  width: 2
                },
                length: -2,
                splitNumber: 8
              },
              splitLine: {
                show: false,
                length: -8,
                lineStyle: {
                  color: 'auto',
                  width: 2
                }
              },
              axisLabel: {
                show: false
              },
              pointer: { //仪表盘指针
                show: false,
              },
              // detail: {
              //   offsetCenter: [0, '70%'], // x, y，单位px
              //   textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
              //     color: '#000',
              //     fontSize: 12,
              //   },
              //   // formatter: '水位mm：{value}'
              //   formatter: '库压渗压Mpa'
              // },
              // title: {
              //   show: true,
              //   offsetCenter: [0, '70%'], // x, y，单位px
              //   textStyle: {
              //     color: '#29669B',
              //     fontSize: 14
              //   }
              // },
              // data: [{
              //   name: "",
              //   value: 11
              // }]
            },
            {
              name: "刻度",
              type: "gauge",
              radius: "101%", //图表尺寸
              center: ["50%", "57.5%"],
              min: 0,
              max: 100,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 10,
                  color: [
                    [0.00, '#53c3ff'],
                    [0.20, '#469dff'],
                    [0.40, '#3d7fff'],
                    [0.60, '#57d2ff'],
                    [0.80, '#66ffff'],
                    [1, '#66ffff']
                  ]
                },
              },
              axisTick: {
                show: false,
              },
              splitLine: {
                show: true,
                length: -8,
                lineStyle: {
                  color: "auto",
                  width: 2,
                },
              },
              axisLabel: {
                show: false,
              },
              pointer: {
                //仪表盘指针
                show: false,
              },
              detail: {
                show: false,
              },
            },
            {
              type: 'gauge',
              radius: '80%',
              min: 0,
              max: 100,
              center: ['50%', '55%'],
              splitNumber: 1, //刻度数量
              startAngle: 225,
              endAngle: -45,
              progress: {
                show: true,
                roundCap: true,
                width: 10, //显示的环形的宽度
              },
              itemStyle:{//渐变颜色
                color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0.00,
                    color: '#53c3ff'
                  },
                  {
                    offset: 0.20,
                    color: '#469dff'
                  },
                  
                  {
                    offset: 0.40,
                    color: '#3d7fff'
                  },
                  
                  {
                    offset: 0.60,
                    color: '#57d2ff'
                  },
                  
                  {
                    offset: 0.80,
                    color: '#66ffff'
                  },
                  {
                    offset: 1,
                    color: '#66ffff'
                  }
                ]
                )
              },
              //仪表盘轴线相关配置，即里面的灰色环形
              axisLine: {
                show: true,
                distance: 10,
                color: 'black',
                lineStyle: {
                  width: 10,
                  // color: [[1, "rgba(243, 216, 106, 0.4)"]],//刻度线背景色
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              //仪表盘刻度显示值
              axisLabel: {
                show: true,
                offsetCenter: [0, '70%'],
              },
              //刻度样式
              axisTick: {
                show: true,
                // splitNumber: 0, // 控制显示刻度的数量
                lineStyle: {
                  width: 0, //不显示刻度
                  offset: 800,
                },
              },
              pointer: {
                show: false,
              },
              // title: {
              //   show: true,
              //   offsetCenter: [0, '-30%'], // x, y，单位px
              //   textStyle: {
              //     color: '#000',
              //     fontSize: 12
              //   }
              // },
              //仪表盘详情，用于显示数据。
              detail: {
                width: "60%",
                borderRadius: 8,
                offsetCenter: [0, 0],
                fontSize: 18,
                formatter: "{value} Mpa",
                color: "#49a5ff",
              },
              title: {
                offsetCenter: [0, 60],
                fontSize: 14,
              },
              data: [
                {
                  value: 60,
                  name: "库压渗压Mpa",
                },
              ],
            }
          ]
        };
        myChart.setOption(option);
      }
    },
  };
</script>
<style lang="scss" scoped>
.box{
  width: 100% !important;
  height: 100%;
  #equipmentChart {
    margin: 0 auto;
    width: 95%;
    height: 100%;
  }
}
</style>