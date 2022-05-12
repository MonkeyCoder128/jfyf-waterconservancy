<template>
  <div class="box">
    <div ref="brokenLineCharts" id="brokenLineCharts"></div>
  </div>
</template>
<script>
  export default {
    mounted() {
      this.myCharts();
      // window.addEventListener("resize", function () {
      //   myCharts.resize();
      // });
    },
    methods: {
      myCharts() {
        var echarts = require("echarts");
        var brokenLineCharts = this.$echarts.init(
          this.$refs.brokenLineCharts
        );
        let xLabel = ['1月', '2月', '3月', '4月', '5月', '6月'];
        let shebeiA = ["35", "38", "28", "25", "45", "40"];
        let shebeiB = ["15", "45", "35", "30", "35", "20"];
        let shebeiC = ["60", "68", "55", "45", "56", "50"];
        var option = {
          // 给echarts设置百分比自适应
          grid: {
            left: "5%",
            right: "5%",
            top: "20%",
            bottom: "20%",
            containLabel: true,
          },
          backgroundColor: '',
          tooltip: {
            trigger: 'axis',
            backgroundColor: 'transparent',
            axisPointer: {
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0,
                    color: 'rgba(126,199,255,0)' // 0% 处的颜色
                  }, {
                    offset: 0.5,
                    color: 'rgba(126,199,255,1)' // 100% 处的颜色
                  }, {
                    offset: 1,
                    color: 'rgba(126,199,255,0)' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              },
            },
  //           formatter: (p) => {
  //             let dom = `<div style="width: 79px;
	// height: 50px;;color:#fff;position: relative;">
  //       <svg style="position: absolute;top: 50%;
  //   left: 50%;
  //   transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
  //     <defs>
  //       <style>
  //         .cls-1 {
  //           fill: #07172c;
  //           fill-opacity: 0.8;
  //           stroke: #a7d8ff;
  //           stroke-linejoin: round;
  //           stroke-opacity: 0.2;
  //           stroke-width: 1px;
  //           fill-rule: evenodd;
  //         }

  //       </style>
  //     </defs>
  //     <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
  //       transform="translate(-258.5 -592.5)" />
  //   </svg>
  //       <div style="padding: 4px 8px 4px 14px;display: flex;
  //       justify-content: center;
  //       align-items: center;
  //       flex-direction: column;position: relative;z-index: 1;">
  //           <div style="margin-bottom: 4px;width:100%;display:${p[0]?'flex':'none'};justify-content:space-between;align-items:center;">
  //               <span style="font-size:14px;color:#7ec7ff;">${p[0]?p[0].seriesName:''}</span>
  //               <span style="font-size:14px;color:#fff;">${p[0]?p[0].data:''}</span>
  //           </div>
  //           <div style="width:100%;height:100%;display:${p[1]?'flex':'none'};justify-content:space-between;align-items:center;">
  //               <span style="font-size:14px;color:#7ec7ff;">${p[1]?p[1].seriesName:''}</span>
  //               <span style="font-size:14px;color:#fff;">${p[1]?p[1].data:''}</span>
  //           </div>
  //           <div style="margin-bottom: 4px;width:100%;display:${p[0]?'flex':'none'};justify-content:space-between;align-items:center;">
  //               <span style="font-size:14px;color:#7ec7ff;">${p[0]?p[0].seriesName:''}</span>
  //               <span style="font-size:14px;color:#fff;">${p[0]?p[0].data:''}</span>
  //           </div>
  //       </div>
  //   </div>`
  //             return dom
  //           }
          },
          legend: {
            align: "left",
            right: 'center',
            bottom: '0%',
            type: 'plain',
            textStyle: {
              color: '#666666',
              fontSize: 16
            },
            // icon:'rect',
            itemGap: 25,
            itemWidth: 48,
            itemHeight: 8,
            // icon: 'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
            icon: '',
            data: [{
                name: 'A设备'
              },
              {
                name: 'B设备'
              },
              {
                name: 'C设备'
              }
            ]
          },
          grid: {
            top: '15%',
            left: '10%',
            right: '10%',
            bottom: '15%',
            // containLabel: true
          },
          xAxis: [{
            type: 'category',
            boundaryGap: false,
            axisLine: { //坐标轴轴线相关设置。数学上的x轴
              show: true,
              lineStyle: {
                color: '#EEEEEE'
              },
            },
            axisLabel: { //坐标轴刻度标签的相关设置
              textStyle: {
                color: '#666666',
                padding: 16,
                fontSize: 14
              },
              formatter: function (data) {
                return data
              }
            },
            splitLine: {
              show: false,
              lineStyle: {
                color: '#192a44'
              },
            },
            axisTick: {
              show: false,
            },
            data: xLabel
          }],
          yAxis: [{
            // name: 'craig.cao',
            nameTextStyle: {
              color: "#666666",
              fontSize: 16,
              padding: 10
            },
            min: 0,
            splitLine: {
              show: true,
              lineStyle: {
                color: '#EEEEEE'
              },
            },
            axisLine: {
              show: true,
              lineStyle: {
                color: "#EEEEEE"
              }

            },
            axisLabel: {
              show: true,
              textStyle: {
                color: '#666666',
                padding: 16
              },
              formatter: function (value) {
                if (value === 0) {
                  return value
                }
                return value
              }
            },
            axisTick: {
              show: false,
            },
          }],
          series: [{
              name: 'A设备',
              type: 'line',
              // symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: [8,8],
              smooth: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: "#1289ba", // 线条颜色
                },
                borderColor: 'rgba(0,0,0,.4)',
              },
              itemStyle: {
                color: "rgba(25,163,223,1)",
                borderColor: "#646ace",
                borderWidth: 0

              },
              tooltip: {
                show: true
              },
              areaStyle: { //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: "#5faece"
                    },
                    {
                      offset: 0.2,
                      color: "#78b9d7"
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6"
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff"
                    },
                    {
                      offset: 1,
                      color: "#ffffff"
                    }
                  ], false),
                  shadowColor: 'rgba(25,163,223, 0.8)', //阴影颜色
                  shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
              data: shebeiA
            },
            {
              name: 'B设备',
              type: 'line',
              // symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: [8,8],
              smooth: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: "#2e73bf", // 线条颜色
                },
                borderColor: 'rgba(0,0,0,.4)',
              },
              itemStyle: {
                color: "rgba(10,219,250,1)",
                borderColor: "#646ace",
                borderWidth: 0
              },
              tooltip: {
                show: true
              },
              areaStyle: { //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: "#4b8ac7"
                    },
                    {
                      offset: 0.2,
                      color: "#5e9ecf"
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6"
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff"
                    },
                    {
                      offset: 1,
                      color: "#ffffff"
                    }
                  ], false),
                  shadowColor: 'rgba(10,219,250, 0.8)', //阴影颜色
                  shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
              data: shebeiB
            },
            {
              name: 'C设备',
              type: 'line',
              // symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
              showAllSymbol: true,
              symbolSize: [8,8],
              smooth: true,
              lineStyle: {
                normal: {
                  width: 2,
                  color: "#2e9ca2", // 线条颜色
                },
                borderColor: 'rgba(0,0,0,.4)',
              },
              itemStyle: {
                color: "#2ad9c9",
                borderColor: "#666666",
                borderWidth: 0
              },
              tooltip: {
                show: true
              },
              areaStyle: { //区域填充样式
                normal: {
                  //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                      offset: 0,
                      color: "#76bdc3"
                    },
                    {
                      offset: 0.2,
                      color: "#7fc0c9"
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6"
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff"
                    },
                    {
                      offset: 1,
                      color: "white"
                    }
                  ], false),
                  shadowColor: 'rgba(10,219,250, 0.8)', //阴影颜色
                  shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
                }
              },
              data: shebeiC
            }
          ]
        };
        let len = 0
        setInterval(() => {
          if (len === xLabel.length) {
            len = 0
          }
          brokenLineCharts.dispatchAction({
            type: 'showTip',
            seriesIndex: 0,
            dataIndex: len,
          })
          len++
        }, 1000)
        brokenLineCharts.setOption(option);
      },
    },
  };
</script>
<style lang="scss" scoped>
.box{
  width: 100% !important;
  height: 100%;
  #brokenLineCharts {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
}
</style>