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
          series: [{
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
                lineStyle: {
                  width: 10,
                  // color: [
                  //   [
                  //     0.65, new echarts.graphic.LinearGradient(
                  //       0, 0, 1, 0, [
                  //         {
                  //           offset: 0.00,
                  //           color: '#53c3ff'
                  //         },
                  //         {
                  //           offset: 0.20,
                  //           color: '#469dff'
                  //         },
                          
                  //         {
                  //           offset: 0.40,
                  //           color: '#3d7fff'
                  //         },
                          
                  //         {
                  //           offset: 0.60,
                  //           color: '#57d2ff'
                  //         },
                  //         {
                  //           offset: 0.80,
                  //           color: '#66ffff'
                  //         },
                  //         {
                  //           offset: 1,
                  //           color: '#66ffff'
                  //         }
                  //       ]
                  //     )
                  //   ],
                  //   [
                  //     1, '#c8e3ff'
                  //   ]
                  // ]
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
                value: 60.23
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