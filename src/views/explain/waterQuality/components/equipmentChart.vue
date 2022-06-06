<template>
  <div class="box">
    <div ref="equipmentChart" id="equipmentChart"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorList: ["#ea951c", "#3f85ff", "#f3b63e", "#37abc1", "#32dfdf"],
    };
  },
  props:{
    parentData:{
      type:Object,
      default:""
    }
  },
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var equipmentChart = this.$echarts.init(this.$refs.equipmentChart);
      let colors = ["#EA951C", "#3F85FF", "#F3B63E", "#37ABC1", "#32DFDF"];
      var dataCake = this.parentData.dataList;
      // var option = {
      //   tooltip: {
      //     trigger: "item",
      //     formatter: "{b}: {c} ({d}%)",
      //   },
      //   // 给echarts设置百分比自适应
      //   grid: {
      //     left: "5",
      //     right: "5",
      //     top: "10",
      //     bottom: "10",
      //     containLabel: true,
      //   },
      //   legend: {
      //     // selectedMode:false,
      //     orient: "rect",
      //     right: "2%", //图例距离左的距离
      //     top: "2%",
      //     itemGap: 13,
      //     itemHeight: 16,
      //     itemWidth: 16,
      //     fontSize: 14,
      //     textStyle: {
      //       rich: {
      //         t0: {
      //           fontSize: 13,
      //           color: colors[0],
      //         },
      //         t1: {
      //           fontSize: 13,
      //           color: colors[1],
      //         },
      //         t2: {
      //           fontSize: 13,
      //           color: colors[2],
      //         },
      //         t3: {
      //           fontSize: 13,
      //           color: colors[3],
      //         },
      //         t4: {
      //           fontSize: 13,
      //           color: colors[4],
      //         },
      //         white: {
      //           color: "black",
      //         },
      //       },
      //     },
      //     formatter: function (param) {
      //       let index = dataCake.findIndex((v) => v.name == param);
      //       let str = `  {white|${param}}   {t${index}|${
      //         dataCake[index].value
      //       }}`;
      //       return str;
      //     },
      //   },
      //   color: ["#EA951C", "#3F85FF", "#F3B63E", "#37ABC1", "#32DFDF"],
      //   series: [
      //     {
      //       name: "内置圆",
      //       type: "pie",
      //       center: ["30%", "50%"],
      //       radius: ["48%", "59%"], // 这个属性修改圆环宽度
      //       silent: true,
      //       labelLine: {
      //         show: false,
      //       },
      //       label: {
      //         show: false,
      //       },
      //       itemStyle: {
      //         color: "#F8C202",
      //         borderWidth: 3,
      //         borderColor: "#fff",
      //       },
      //       data: [
      //         { value: 500, name: "" },
      //         { value: 500, name: "" },
      //         { value: 500, name: "" },
      //         { value: 500, name: "" },
      //       ],
      //     },
      //     {
      //       name: "饼图数据",
      //       type: "pie",
      //       center: ["30%", "50%"],
      //       radius: ["55%", "70%"],
      //       silent: true,
      //       itemStyle: {
      //         borderWidth: 3,
      //         borderColor: "#fff",
      //       },
      //       labelLine: {
      //         show: false,
      //       },
      //       label: {
      //         formatter: "{a|{c}mol/L}{abg|}\n{hr|}\n ",
      //         borderWidth: 1,
      //         borderRadius: 4,
      //         rich: {
      //           a: {
      //             color: "inherit", //设置外层标识字体颜色与饼图颜色一致
      //             lineHeight: 22,
      //             align: "center",
      //           },
      //           hr: {
      //             borderColor: "#EEEEEE",
      //             width: "100%",
      //             borderWidth: 1,
      //             height: 0,
      //           },
      //         },
      //       },
      //       data: this.parentData.dataList,
      //     },
      //   ],
      // };
       var option = {
        grid: {
          left: "0",
          right: "0",
          bottom: "20%",
          top: "10",
          containLabel: true,
        },
        legend: {
          selectedMode:false,
          orient: "vertical",
          right: "13%",
          top: "center",
          itemHeight: 16,
          itemWidth: 16,
          padding: [10, -35],
          fontSize: 12,
          textStyle: {
            rich: {
              t0: {
                color: colors[0],
              },
              t1: {
                color: colors[1],
              },
              t2: {
                color: colors[2],
              },
              t3: {
                color: colors[3],
              },
              t4: {
                color: colors[4],
              },
              white: {
                color: "#fff",
              },
            },
          },
          formatter: function (param) {
            let index = dataCake.findIndex((v) => v.name == param);
            let str = `{black|${param.padEnd(5, "　")}}{t${index}|${
              dataCake[index].value + "%"
            }}`;
            return str;
          },
        },
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["30%", "48%"],
            radius: ["35%", "42%"],
            silent: true,
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "#F8C202",
              borderWidth: 4,
              borderColor: 'white',
            },
            data: [
              { value: 500, name: "" },
              { value: 500, name: "" },
              { value: 500, name: "" },
              { value: 500, name: "" },
            ],
          },
          {
            name: "外层圆",
            type: "pie",
            center: ["30%", "48%"],
            radius: ["42%", "55%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: dataCake,
            itemStyle: {
              normal: {
                // shadowBlur: 1,
                shadowColor: "#87888a",
                color: function (params) {
                  //自定义颜色
                  var colorList = colors
                  return colorList[params.dataIndex];
                },
                // borderRadius: 2,
                borderColor: "white",
                borderWidth: 4,
              },
            },
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              position: "outer",
              show: true,
              color: "black",
              fontSize: 12,
              padding: [20, -32],
              // formatter: ["{c}" + "mol/L"].join("\n"),
              formatter: "{a|{c}mol/L}{abg|}\n{hr|}\n ",
              borderWidth: 1,
              borderRadius: 4,
              color: "inherit", //设置外层标识字体颜色与饼图颜色一致
              rich: {
                a: {
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#EEEEEE",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
          },
        ],
      };
      equipmentChart.setOption(option);
      window.addEventListener("resize", function () {
        equipmentChart.resize();
      });
    },
  },
};
</script>
<style  lang="scss" scoped>
.box {
  width: 100% !important;
  height: 100%;
  #equipmentChart {
    margin: 0 auto;
    width: 100%;
    height: 110%;
  }
}
</style>  
