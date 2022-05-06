<template>
  <div class="waterVelocityPage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <div class="echartsBoxContent">
        <div class="echartsBox">
          <span>设备:流量计A</span>
          <div class="chartDataBox">
            <Chart :chartData="gaugeAllData" :width="'100%'" :height="'100%'" />
            <Chart :chartData="gaugeAllData2" :width="'100%'" :height="'100%'" />
          </div>
        </div>
        <div class="echartsBox" style="background-color: blue">
          <span>设备:流量计B</span>
        </div>
        <div class="echartsBox" style="background-color: green">
          <span>设备:流量计C</span>
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
        </div>
        <span class="cardTitle">预警分析</span>
        <el-table
          :data="tableData"
          :row-style="{ height: '0' }"
          :cell-style="{ padding: '0' }"
        >
          <el-table-column prop="date" label="监测点" />
          <el-table-column prop="name" label="预警次数" />
          <el-table-column prop="type" label="设备状态">
            <template slot-scope="scope">
              <span v-if="scope.row.type === '0'">在线</span>
              <span v-if="scope.row.type === '1'" style="color: #de1111"
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
      <div class="cardBottom">
        <span class="cardTitle">预警统计</span>
        <div class="charts">这是echarts图表</div>
      </div>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Chart from "@/views/screenChart/chart";
export default {
  name: "WaterVelocity",
  components: { Chart },
  data() {
    return {
      gaugeAllData: {},
      gaugeAllData2: {},
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
    this.gaugeAllData = this.getALLPieItem();
    
    this.gaugeAllData2 = this.getALLPieItem2();
  },
  methods: {
    /** 查看预警分析 */
    seeAnalyse() {
      console.log(
        "%c查看预警分析：",
        "color:red;font-size:18px;font-weight:bold;"
      );
    },
    /**对比饼状图 */
    getALLPieItem() {
      let data = {
        series: [
          {
            type: "gauge",
            radius: "90%",
            startAngle: 220,
            min: 0,
            max: 240,
            splitNumber: 24,
            itemStyle: {
              color: [
                [
                  1,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0.1,
                      color: "#42E7E7 ",
                    },
                    {
                      offset: 0.6,
                      color: "#3E82FF",
                    },
                    {
                      offset: 1,
                      color: "#3E82FF",
                    },
                  ]),
                ],
              ],
              shadowColor: "#3E82FF",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 18,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.2,
                        color: "#42E7E7",
                      },
                      {
                        offset: 0.4,
                        color: "#42E7E7",
                      },
                      {
                        offset: 0.6,
                        color: "#42E7E7",
                      },
                    ]),
                  ],
                ],
              },
            },
            axisLabel: {
              show: false,
            },
            detail: {
              width: "60%",
              offsetCenter: [0, 0],
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|m/s}";
              },
              rich: {
                value: {
                  fontSize: 24,
                  fontWeight: "bolder",
                  color: "#3672E9",
                },
                unit: {
                  fontSize: 14,
                  color: "#3672E9",
                },
              },
            },
            data: [
              {
                value: 100,
              },
            ],
          },
        ],
      };
      return data;
    },
    getALLPieItem2() {
      let data = {
        series: [
          {
            type: "gauge",
            radius: "90%",
            startAngle: 220,
            min: 0,
            max: 240,
            splitNumber: 24,
            itemStyle: {
              color: [
                [
                  1,
                  new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                    {
                      offset: 0.1,
                      color: "#42E7E7 ",
                    },
                    {
                      offset: 0.6,
                      color: "#3E82FF",
                    },
                    {
                      offset: 1,
                      color: "#3E82FF",
                    },
                  ]),
                ],
              ],
              shadowColor: "#3E82FF",
              shadowBlur: 10,
              shadowOffsetX: 2,
              shadowOffsetY: 2,
            },
            progress: {
              show: true,
              roundCap: true,
              width: 18,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              lineStyle: {
                width: 18,
                color: [
                  [
                    1,
                    new echarts.graphic.LinearGradient(0, 0, 1, 0, [
                      {
                        offset: 0.2,
                        color: "#42E7E7",
                      },
                      {
                        offset: 0.4,
                        color: "#42E7E7",
                      },
                      {
                        offset: 0.6,
                        color: "#42E7E7",
                      },
                    ]),
                  ],
                ],
              },
            },
            axisLabel: {
              show: false,
            },
            detail: {
              width: "60%",
              offsetCenter: [0, 0],
              formatter: function (value) {
                return "{value|" + value.toFixed(0) + "}{unit|m/s}";
              },
              rich: {
                value: {
                  fontSize: 24,
                  fontWeight: "bolder",
                  color: "#3672E9",
                },
                unit: {
                  fontSize: 14,
                  color: "#3672E9",
                },
              },
            },
            data: [
              {
                value: 100,
              },
            ],
          },
        ],
      };
      return data;
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.waterVelocityPage {
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
    padding: 8px;
    height: 200px;
    span {
      font-size: 14px;
      color: #333333;
    }
    .chartDataBox {
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
  .cardMenu {
    width: 100%;
    height: 260px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 0 8px;
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
      width: 49.5%;
      height: auto;
      min-height: 800px;
      background-color: #ffffff;
      border-radius: 5px;
      padding: 0 8px;
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
    .charts {
    }
  }
}
</style>