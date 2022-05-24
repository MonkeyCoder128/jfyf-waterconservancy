<template>
  <div class="deformationPage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <div class="echartsBoxContent">
        <div class="echartsBox">
          <span>设备:流量计A</span>
          <div class="chartDataBox">
            <Chart :chartData="gaugeAllData" :width="'100%'" :height="'100%'" />
            <Chart
              :chartData="gaugeAllData2"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
        <div class="echartsBox">
          <span>设备:流量计B</span>

          <div class="chartDataBox">
            <Chart :chartData="gaugeAllData" :width="'100%'" :height="'100%'" />
            <Chart
              :chartData="gaugeAllData2"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
        <div class="echartsBox">
          <span>设备:流量计C</span>

          <div class="chartDataBox">
            <Chart :chartData="gaugeAllData" :width="'100%'" :height="'100%'" />
            <Chart
              :chartData="gaugeAllData2"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="cardBottom">
        <span class="cardTitle">检测状态</span>
        <div class="testStatus">
          <div>
            当前监测状态：<span
              style="color: #1c48bf; font-size: 14px; margin-right: 20px"
              >正常</span
            >
          </div>
          <div>
            预警总次数：<span style="color: #ea951c; font-size: 14px"
              >20次</span
            >
          </div>
        </div>
        <div class="echartsBox" style="margin: 10px 0">
          <span>预警数据对比</span>
          <Chart :chartData="warningData" :width="'100%'" :height="'100%'" />
        </div>
        <span class="cardTitle">设备检测</span>
        <div style="height: calc(100% - 200px)">
          <el-table
            :data="tableData"
            :row-style="{ height: '0' }"
            :cell-style="{ padding: '0' }"
            :header-cell-style="{ background: '#EEEEEE' }"
          >
            <el-table-column prop="date" label="监测点" />
            <el-table-column prop="name" label="预警次数" />
            <el-table-column prop="type" label="设备状态">
              <template slot-scope="scope">
                <span v-if="scope.row.type === '1'">在线</span>
                <span v-if="scope.row.type === '0'" style="color: #de1111"
                  >离线</span
                >
              </template>
            </el-table-column>
            <el-table-column label="操作">
              <template slot-scope="scope">
                <el-button @click="seeAnalyse(scope.row)" type="text">
                  查看
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
      <div class="cardBottom">
        <span class="cardTitle">预警统计</span>
        <div class="charts">
          <Chart :chartData="statData" :width="'100%'" :height="'100%'" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Chart from "@/views/screenChart/chart";
export default {
  name: "Deformation",
  components: { Chart },
  data() {
    return {
      gaugeAllData: {},
      gaugeAllData2: {},
      warningData: {},
      statData: {},
      tableData: [
        {
          date: "2016-05-02",
          name: "王小虎1",
          type: "0",
        },
        {
          date: "2016-05-02",
          name: "王小虎1",
          type: "0",
        },
        {
          date: "2016-05-02",
          name: "王小虎1",
          type: "0",
        },
        {
          date: "2016-05-02",
          name: "王小虎1",
          type: "0",
        },
        {
          date: "2016-05-02",
          name: "王小虎1",
          type: "0",
        },
      ],
    };
  },
  created() {
    this.gaugeAllData = this.getBluegradient();
    this.gaugeAllData2 = this.getYellowgradient();
    this.warningData = this.getWarningData();
    this.statData = this.getStatData();
  },
  methods: {
    /** 查看设备检测 */
    seeAnalyse(row) {
      this.$router.push({
        path: "/explain/alarmAnalysis",
        query: {
          id: row.id,
        },
      });
      console.log(
        "%c查看设备检测：",
        "color:red;font-size:18px;font-weight:bold;"
      );
    },
    /**仪表盘蓝色渐变 */
    getBluegradient() {
      let data = {
        series: [
          //外层光晕渐变
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "60%"],
            startAngle: 180,
            endAngle: 10,
            pointer: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 3,
                color: [
                  [
                    1,
                    {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0.6,
                          color: "rgba(62, 130, 255, 0)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(67, 142, 255, 0.77)", // 100% 处的颜色
                        },
                      ],
                    },
                  ],
                ],
                borderColor: "#000",
                borderWidth: "2",
              },
            },
            axisLabel: {
              show: false,
            }, //刻度标签。
            axisTick: {
              show: false,
              splitNumber: 5,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            }, //刻度样式
            splitLine: {
              show: false,
            }, //分隔线样式
            detail: {
              show: false,
            },
            title: {
              show: false,
            },
          },
          {
            type: "gauge",
            radius: "90%",
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 1,
            center: ["50%", "60%"],
            progress: {
              show: true,
              width: 16,
              roundCap: true,
              itemStyle: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(66, 231, 231, 1)", // 100% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(62, 130, 255, 1)", // 0% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 16,
                color: [[1, "rgba(66, 231, 231, 0.4)"]],
              },
            },
            axisTick: {
              show: true,
              splitNumber: 1,
              lineStyle: {
                width: 0, //不显示刻度
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              width: "60%",
              borderRadius: 8,
              offsetCenter: [0, -10],
              fontSize: 18,
              formatter: "{value} m/s",
              color: "#3672E9",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 60,
                name: "流速m/s",
              },
            ],
          },

          //内层刻度线渐变
          {
            type: "gauge",
            splitNumber: 4, //刻度数量
            radius: "78%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "60%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                  [0.1, "#17D5F7"],
                  [0.2, "#17D5F7"],
                  [0.3, "#17D5F7"],
                  [0.4, "#17D5F7"],
                  [0.5, "#1BF0AC"],
                  [0.6, "#1BF0AC"],
                  [0.7, "#1BF0AC"],
                  [0.8, "#1BF0AC"],
                  [0.9, "rgba(147, 255, 203, 1)"],
                  [1, "rgba(147, 255, 203, 1)"],
                ],
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 3,
              },
              length: 3,
              splitNumber: 9,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
        ],
      };
      return data;
    },
    /**仪表盘黄色渐变 */
    getYellowgradient() {
      let data = {
        series: [
          //外层光晕渐变
          {
            type: "gauge",
            radius: "100%",
            center: ["50%", "60%"],
            startAngle: 180,
            endAngle: 10,
            pointer: {
              show: false,
            },
            axisLine: {
              show: true,
              lineStyle: {
                width: 3,
                color: [
                  [
                    1,
                    {
                      x: 0,
                      y: 1,
                      x2: 0,
                      y2: 0,
                      colorStops: [
                        {
                          offset: 0.6,
                          color: "rgba(62, 130, 255, 0)", // 0% 处的颜色
                        },
                        {
                          offset: 1,
                          color: "rgba(59, 194, 220, 0.77)", // 100% 处的颜色
                        },
                      ],
                    },
                  ],
                ],
                borderColor: "#000",
                borderWidth: "2",
              },
            },
            axisLabel: {
              show: false,
            }, //刻度标签。
            axisTick: {
              show: false,
              splitNumber: 5,
              lineStyle: {
                color: "#fff",
                width: 2,
              },
            }, //刻度样式
            splitLine: {
              show: false,
            }, //分隔线样式
            detail: {
              show: false,
            },
            title: {
              show: false,
            },
          },
          {
            type: "gauge",
            radius: "90%",
            startAngle: 200,
            endAngle: -20,
            min: 0,
            max: 100,
            splitNumber: 1,
            center: ["50%", "60%"],
            progress: {
              show: true,
              width: 16,
              roundCap: true,
              itemStyle: {
                color: {
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(243, 216, 106, 1)", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "rgba(42, 192, 231, 1)", // 100% 处的颜色
                    },
                  ],
                  global: false, // 缺省为 false
                },
              },
            },
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 16,
                color: [[1, "rgba(243, 216, 106, 0.4)"]], //刻度线背景色
              },
            },
            axisTick: {
              show: true,
              splitNumber: 1,
              lineStyle: {
                width: 0, //不显示刻度
              },
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: true,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              width: "60%",
              borderRadius: 8,
              offsetCenter: [0, -10],
              fontSize: 18,
              formatter: "{value} m/s",
              color: "#40C3D9",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 60,
                name: "流量m/s",
              },
            ],
          },

          //内层刻度线渐变
          {
            type: "gauge",
            splitNumber: 4, //刻度数量
            radius: "78%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "60%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                  [0.1, "rgba(63, 194, 218, 0.4)"],
                  [0.2, "rgba(63, 194, 218, 0.4)"],
                  [0.3, "rgba(63, 194, 218, 0.4)"],
                  [0.4, "rgba(63, 194, 218, 0.4)"],
                  [0.5, "rgba(63, 194, 218, 0.4)"],
                  [0.6, "rgba(147, 255, 203, 0.8)"],
                  [0.7, "#F3D86A"],
                  [0.8, "#F3D86A"],
                  [0.9, "rgba(243, 216, 106, 1)"],
                  [1, "rgba(243, 216, 106, 1)"],
                ],
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 3,
              },
              length: 3,
              splitNumber: 9,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            pointer: {
              show: false,
            },
          },
        ],
      };
      return data;
    },
    /**设备检测图表 */
    getWarningData() {
      let colors = ["#148F97", "#1289BA", "#115CB9"];
      var dataCake = [
        { name: "A设备", value: 50 },
        { name: "C设备", value: 80 },
        { name: "B设备", value: 70 },
      ];
      let data = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          data: ["A设备", "C设备", "B设备"],
          icon: "rect",
          left: "65%", //图例距离左的距离
          top: "7%",
          itemGap: 35,
          itemWidth: 19,
          itemHeight: 19,
          textStyle: {
            fontSize: 14, //字体大小
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
            },
          },
          formatter: function (param) {
            let index = dataCake.findIndex((v) => v.name == param);
            let str = `{white|${param.padEnd(5, "　")}}    {t${index}|${
              dataCake[index].value + "%"
            }}`;
            return str;
          },
        },
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["40%", "50%"],
            radius: ["50%", "60%"], // 这个属性修改圆环宽度
            silent: true,
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "#F8C202",
              borderWidth: 3,
              borderColor: "#fff",
            },
            data: [
              { value: 500, name: "" },
              { value: 500, name: "" },
              { value: 500, name: "" },
              { value: 500, name: "" },
            ],
          },
          {
            type: "pie",
            radius: ["65%", "80%"],
            center: ["40%", "50%"],
            silent: true,
            label: {
              show: false,
            },
            labelLine: {
              show: false,
            },
            label: {
              formatter: "{a|{c}/次}{abg|}\n{hr|}\n ",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "inherit", //继承颜色，设置颜色一致对应
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
            data: dataCake,
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = ["#148F97", "#1289BA", "#115CB9"];
                  return colorList[params.dataIndex];
                },
                borderRadius: 0,
                borderColor: "#fff",
                borderWidth: 3,
              },
            },
          },
        ],
      };
      return data;
    },
    /**预警统计图表 */
    getStatData() {
      let color = ["#148F97", "#115CB9", "rgba(17, 92, 185, 0.6)"];
      let data = {
        legend: {
          bottom: 15,
          itemGap: 36,
        },
        grid: {
          left: "3%",
          right: "3%",
          top: "6%",
          bottom: "8%",
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
                万元`;
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
            splitNumber: 8, // 配置 Y 轴数值间隔
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
            name: "A设备",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
              normal: {
                color: color[0],
              },
              borderColor: "rgba(0,0,0,.4)",
            },
            itemStyle: {
              color: "rgba(25,163,223,1)",
              borderColor: "#646ace",
              borderWidth: 0,
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
            data: [333, 300, 280, 100, 109, 37, 105, 160],
          },
          {
            name: "B设备",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
              normal: {
                color: color[1],
              },
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
            data: [100, 138, 350, 173, 180, 150, 180, 230],
          },
          {
            name: "C设备",
            type: "line",
            smooth: true,
            symbolSize: 8,
            zlevel: 3,
            lineStyle: {
              normal: {
                color: color[2],
              },
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
            data: [233, 233, 200, 180, 199, 233, 210, 180],
          },
        ],
      };
      return data;
    },
  },
};
</script>
 
<style  lang="scss" scoped>
@media screen and (min-width: 2000px) and (max-width: 3840px) {
  .echartsBox {
    height: 360px;
  }
  .chartDataBox {
    height: 360px;
  }
  .cardMenu {
    min-height: 430px;
    .echartsBoxContent {
      height: 360px;
    }
    .echartsBox {
      height: 360px;
    }
  }
  .bottomBox {
    min-height: calc(100% - 430px);
  }
  .cardBottom {
    min-height: 870px;
  }
  .charts {
    height: 730px;
  }
}

@media screen and (min-width: 960px) and (max-width: 1920px) {
  .echartsBox {
    height: 200px;
  }
  .chartDataBox {
    height: 200px;
  }
  .cardMenu {
    min-height: 260px;
    .echartsBoxContent {
      height: 200px;
    }
  }
  .cardBottom {
    height: 600px;
  }
  .charts {
    height: 560px;
  }
}
.deformationPage {
  height: 100%;
  .cardTitle {
    font-size: 16px;
    color: #333333;
    line-height: 46px;
  }
  .echartsBox {
    border: 1px solid #eeeeee;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    padding: 10px 20px;
    span {
      font-size: 14px;
      color: #333333;
    }
    .chartDataBox {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .cardMenu {
    width: 100%;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 5px 12px;
    .echartsBoxContent {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      .echartsBox {
        width: 32.5%;
      }
    }
  }
  .bottomBox {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 13px;
    .cardBottom {
      width: 49.7%;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 5px 20px;
      .testStatus {
        display: flex;
        align-items: center;
        font-size: 12px;
        div {
          display: flex;
          align-items: center;
          span {
            color: #333333;
            line-height: 25px;
          }
        }
      }
    }
  }
}
</style>