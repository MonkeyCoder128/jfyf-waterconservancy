<template>
  <div class="box">
    <div ref="brokenLineCharts" id="brokenLineCharts"></div>
  </div>
</template>
<script>
export default {
  props: {
    parentData: {
      type: Object,
      default: "",
    },
  },
  mounted() {
    this.myCharts();
  },
  methods: {
    myCharts() {
      var echarts = require("echarts");
      var brokenLineCharts = this.$echarts.init(this.$refs.brokenLineCharts);
      let color = [
        "#148F97",
        "#115CB9",
        "rgba(17, 92, 185, 0.6)",
        "#F3B63E",
        "#3F85FF",
      ];
      var option = {
        legend: {
          bottom: 0,
          itemGap: 36,
          selectedMode: false,
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "6%",
          bottom: "6%",
          containLabel: true,
        },
        tooltip: {
          trigger: "axis",
          formatter: function (params) {
            let html = "";
            params.forEach((v) => {
              html += `<div style="color: #666;font-size: 14px;line-height: 24px">
                  <span style="display:inline-block;margin-right:5px;border-radius:10px;width:10px;height:10px;background-color:${
                    color[v.componentIndex]
                  };"></span>
                  ${v.seriesName}:${v.name}月
                  <span style="color:${color[v.componentIndex]};">${
                v.value
              }</span>
                  次`;
            });

            return html;
          },
          extraCssText:
            "background: #fff; border-radius: 0;box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);color: #333;",
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            axisLabel: {
              formatter: "{value}月",
              textStyle: {
                color: "#333",
              },
            },
            axisLine: {
              lineStyle: {
                color: "#D9D9D9",
              },
            },
            data: ["1", "2", "3", "4", "5", "6", "7", "8"],
          },
        ],
        yAxis: [
          {
            type: "value",
            splitNumber: 5, // 配置 Y 轴数值间隔
            max:10,
            min:0,
            axisLabel: {
              textStyle: {
                color: "#666",
              },
            },
            nameTextStyle: {
              color: "#666",
              fontSize: 12,
              lineHeight: 40,
            },
            splitLine: {
              lineStyle: {
                type: "dashed",
                color: "#E9E9E9",
              },
            },
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
          },
        ],
        series: [
          {
            name: "振弦式渗压计一",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            itemStyle: {
              color: color[0],
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#5faece",
                    },
                    {
                      offset: 0.2,
                      color: "#78b9d7",
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6",
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff",
                    },
                    {
                      offset: 1,
                      color: "#ffffff",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(25,163,223, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: this.parentData.LineOne,
          },
          {
            name: "振弦式渗压计二",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            itemStyle: {
              color: color[1],
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#4b8ac7",
                    },
                    {
                      offset: 0.2,
                      color: "#5e9ecf",
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6",
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff",
                    },
                    {
                      offset: 1,
                      color: "#ffffff",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: this.parentData.LineTwo,
          },
          {
            name: "振弦式渗压计三",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            itemStyle: {
              color: color[2],
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#76bdc3",
                    },
                    {
                      offset: 0.2,
                      color: "#7fc0c9",
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6",
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff",
                    },
                    {
                      offset: 1,
                      color: "white",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: this.parentData.LineThree,
          },
          {
            name: "振弦式渗压计四",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            itemStyle: {
              color: color[3],
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#4b8ac7",
                    },
                    {
                      offset: 0.2,
                      color: "#5e9ecf",
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6",
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff",
                    },
                    {
                      offset: 1,
                      color: "#ffffff",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: this.parentData.LineFour,
          },
          {
            name: "振弦式渗压计五",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            itemStyle: {
              color: color[4],
            },
            areaStyle: {
              //区域填充样式
              normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: "#76bdc3",
                    },
                    {
                      offset: 0.2,
                      color: "#7fc0c9",
                    },
                    {
                      offset: 0.65,
                      color: "#f6f6f6",
                    },
                    {
                      offset: 0.8,
                      color: "#ffffff",
                    },
                    {
                      offset: 1,
                      color: "white",
                    },
                  ],
                  false
                ),
                shadowColor: "rgba(10,219,250, 0.5)", //阴影颜色
                shadowBlur: 20, //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
              },
            },
            data: this.parentData.LineFive,
          },
        ],
      };
      brokenLineCharts.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100% !important;
  height: 100%;
  #brokenLineCharts {
    margin: 0 auto;
    width: 100%;
    height: 100%;
  }
}
</style>