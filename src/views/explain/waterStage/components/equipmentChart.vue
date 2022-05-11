<template>
  <div>
    <div ref="equipmentChart" id="equipmentChart"></div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.getLoadEcharts();
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
          series: [
            {
              name: '刻度',
              type: 'gauge',
              radius: '100%', //图表尺寸
              center: ['50%', '55.5%'],
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 10,
                  color: [
                    [0.05, '#adc78a'],
                    [0.10, '#78bba3'],
                    [0.15, '#66b6aa'],
                    [0.20, '#3babbf'],
                    [0.25, '#21a6cb'],
                    [0.30, '#2ca8c6'],
                    [0.35, '#22a6ca'],
                    [0.40, '#47afb9'],
                    [0.45, '#74baa5'],
                    [0.50, '#87be9b'],
                    [0.55, '#98c294'],
                    [0.60, '#cecf7b'],
                    [0.65, '#dfd373'],
                    [0.70, '#f2d86a'],
                    [0.75, '#f7c34c'],
                    [0.80, '#fcd45e'],
                    [0.85, '#eb9920'],
                    [0.90, '#efa730'],
                    [0.95, '#ea951c'],
                    [1, '#ea951c']
                  ]
                }
              },
              // progress: {
              //   show: true,
              //   roundCap: true,
              //   width: 13 //显示的环形的宽度
              // },
              //刻度标签
              axisTick: {
                show: true,
                lineStyle: {
                  color: 'auto',
                  width: 2
                },
                length: -2,
                splitNumber: 7
              },
              //刻度样式
              splitLine: {
                show: false,
                length: -8,
                lineStyle: {
                  color: 'auto',
                  width: 2
                }
              },
              //仪表盘轴线
              axisLabel: {
                show: false
              },
              pointer: { //仪表盘指针
                show: false,
              },
              detail: {
                show: true,
                offsetCenter: [0, '70%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: '#000',
                  fontSize: 12,
                },
                // formatter: '水位mm：{value}'
                formatter: '水位mm'
              },
              title: {
                show: false,
                offsetCenter: [0, '70%'], // x, y，单位px
                textStyle: {
                  color: '#29669B',
                  fontSize: 14
                }
              },
              data: [{
                name: "",
                value: 11
              }]
            },
            {
              name: "刻度",
              type: "gauge",
              radius: "101%", //图表尺寸
              center: ["50%", "57.5%"],
              axisLine: {
                show: true,
                lineStyle: {
                  width: 0,
                  shadowBlur: 10,
                  color: [
                    [0.15, "#66b6aa"],
                    [0.2, "#3babbf"],
                    [0.25, "#21a6cb"],
                    [0.3, "#2ca8c6"],
                    [0.35, "#22a6ca"],
                    [0.4, "#47afb9"],
                    [0.45, "#74baa5"],
                    [0.5, "#87be9b"],
                    [0.55, "#98c294"],
                    [0.6, "#cecf7b"],
                    [0.65, "#dfd373"],
                    [0.7, "#f2d86a"],
                    [0.75, "#f7c34c"],
                    [0.8, "#fcd45e"],
                    [0.85, "#eb9920"],
                    [0.9, "#efa730"],
                    [0.95, "#ea951c"],
                    [1, "#ea951c"],
                  ],
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
              radius: '79%',
              center: ['50%', '56%'],
              splitNumber: 0, //刻度数量
              startAngle: 225,
              endAngle: -45,
              progress: {
                show: true,
                roundCap: true,
                width: 12, //显示的环形的宽度
              },
              itemStyle:{//渐变颜色
                color:new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                  {
                    offset: 0.00,
                    color: '#34aac1'
                  },
                  {
                    offset: 0.20,
                    color: '#b1c88a'
                  },
                  
                  {
                    offset: 0.60,
                    color: '#fcd55e'
                  },
                  
                  {
                    offset: 0.70,
                    color: '#efa830'
                  },
                  
                  {
                    offset: 0.80,
                    color: '#ea951c'
                  },
                  {
                    offset: 1,
                    color: '#ea951c'
                  }
                ])
              },
              //仪表盘轴线相关配置，即里面的灰色环形
              axisLine: {
                show: true,
                distance: 10,
                color: 'black',
                lineStyle: {
                  width: 10,
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
              //刻度样式
              axisTick: {
                show: false
              },
              pointer: {
                show: false
              },
              title: {
                show: true,
                offsetCenter: [0, '-30%'], // x, y，单位px
                textStyle: {
                  color: '#000',
                  fontSize: 12
                }
              },
              //仪表盘详情，用于显示数据。
              detail: {
                show: true,
                roundCap:true,
                offsetCenter: [0, '16%'],
                color: '#000',
                formatter: function (params) {
                  return params + '%'
                },
                textStyle: {
                  fontSize: 12
                }
              },
              data: [{
                name: "正常率",
                value: 80.61
              }]
            },
          ]
        };
        myChart.setOption(option);
      }
    },
  };
</script>
<style lang="scss" scoped>
  #equipmentChart {
    width: 500px;
    height: 170px;
  }
</style>