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
              center: ['50%', '55%'],
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
                show: true,
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
              detail: {
                offsetCenter: [0, '50%'], // x, y，单位px
                textStyle: { // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                  color: '#000',
                  fontSize: 12,
                },
                // formatter: '水位mm：{value}'
                formatter: '水位mm'
              },
              title: {
                show: true,
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
              type: 'gauge',
              radius: '80%',
              center: ['50%', '55%'],
              splitNumber: 0, //刻度数量
              startAngle: 225,
              endAngle: -45,
              axisLine: {
                show: true,
                lineStyle: {
                  width: 10,
                  color: [
                    [
                      0.9, new echarts.graphic.LinearGradient(
                        0, 0, 1, 0, [
                          {
                            offset: 0.05,
                            color: '#adc78a'
                          },
                          {
                            offset: 0.10,
                            color: '#78bba3'
                          },
                          {
                            offset: 0.15,
                            color: '#66b6aa'
                          },
                          {
                            offset: 0.20,
                            color: '#3babbf'
                          },
                          {
                            offset: 0.25,
                            color: '#21a6cb'
                          },
                          {
                            offset: 0.30,
                            color: '#2ca8c6'
                          },
                          {
                            offset: 0.35,
                            color: '#22a6ca'
                          },
                          {
                            offset: 0.40,
                            color: '#47afb9'
                          },
                          {
                            offset: 0.45,
                            color: '#74baa5'
                          },
                          {
                            offset: 0.50,
                            color: '#87be9b'
                          },
                          {
                            offset: 0.55,
                            color: '#98c294'
                          },
                          {
                            offset: 0.60,
                            color: '#cecf7b'
                          },
                          {
                            offset: 0.65,
                            color: '#dfd373'
                          },
                          {
                            offset: 0.70,
                            color: '#dfd373'
                          },
                          {
                            offset: 0.75,
                            color: '#f2d86a'
                          },
                          {
                            offset: 0.80,
                            color: '#fcd45e'
                          },
                          {
                            offset: 0.85,
                            color: '#eb9920'
                          },
                          {
                            offset: 0.90,
                            color: '#efa730'
                          },
                          {
                            offset: 0.95,
                            color: '#ea951c'
                          },
                          {
                            offset: 1,
                            color: '#ea951c'
                          }
                        ]
                      )
                    ],
                    [
                      1, '#f9dfbb'
                    ]
                  ]
                }
              },
              //分隔线样式。
              splitLine: {
                show: false,
              },
              axisLabel: {
                show: false
              },
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
                value: 90.61
              }]
            }
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