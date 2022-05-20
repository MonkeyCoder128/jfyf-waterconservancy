<template>
  <div class="realtimePage">
    <div class="echartAllBox">
      <div class="echartBox">
        <div class="topMenu">
          <span>流速、流量</span>
          <div class="selectCharts">
            <em style="color: #333333">设备</em>
            <el-select
              style="margin: 0 12px"
              @change="changeFlowRate"
              v-model="flowRateType"
              size="mini"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <em @click="jumpWaterVelocity">更多></em>
          </div>
        </div>
        <div class="chartDataBox">
          <Chart :chartData="speedData" :width="'100%'" :height="'100%'" />
          <Chart :chartData="fluxData" :width="'100%'" :height="'100%'" />
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>水位</span>
          <div class="selectCharts">
            <em style="color: #333333">设备</em>
            <el-select
              style="margin: 0 12px"
              @change="changeWaterLevel"
              v-model="waterLevelType"
              size="mini"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <em @click="jumpWaterStage">更多></em>
          </div>
        </div>
        <div class="chartDataBox">
          <Chart :chartData="waterLevelData" :width="'100%'" :height="'100%'" />
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>库压渗压</span>
          <div class="selectCharts">
            <em style="color: #333333">设备</em>
            <el-select
              style="margin: 0 12px"
              @change="changeOsmometer"
              v-model="osmometerType"
              size="mini"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <em @click="jumpOsmoticPressure">更多></em>
          </div>
        </div>
        <div class="chartDataBox">
          <Chart :chartData="pressureData" :width="'100%'" :height="'100%'" />
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>水质分析</span>
          <div class="selectCharts">
            <em style="color: #333333">设备</em>
            <el-select
              style="margin: 0 12px"
              @change="changeWaterQuality"
              v-model="waterQualityType"
              size="mini"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <em @click="jumpWaterQuality">更多></em>
          </div>
        </div>
        <div class="chartDataBox">
          <Chart :chartData="waterQuality" :width="'100%'" :height="'100%'" />
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>形变位移</span>
          <div class="selectCharts">
            <em style="color: #333333">设备</em>
            <el-select
              style="margin: 0 12px"
              @change="changeDeformation"
              v-model="deformationType"
              size="mini"
            >
              <el-option
                v-for="item in optionsType"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <em @click="jumpDeformation">更多></em>
          </div>
        </div>
        <div class="chartDataBox">
          <Chart :chartData="shiftData" :width="'100%'" :height="'100%'" />
          <Chart :chartData="offsetData" :width="'100%'" :height="'100%'" />
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>预警状态</span>
        </div>
        <div class="bottomMenu">
          <div class="chartDataBox" style="width: 60%">
            <Chart
              :chartData="alarmStateData"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
          <marquee
            id="affiche"
            align="left"
            behavior="scroll"
            direction="up"
            height="300"
            width="200"
            hspace="50"
            vspace="20"
            loop="-1"
            scrollamount="4"
            scrolldelay="10"
            onMouseOut="this.start()"
            onMouseOver="this.stop()"
            class="scrollContent"
          >
            <div class="warningStage">
              <i class="el-icon-warning-outline"></i><span>A1区水位过高</span>
            </div>
            <div class="bodyDam">
              <i class="el-icon-warning-outline"></i><span>A2区坝体形变</span>
            </div>
            <div class="osmometer">
              <i class="el-icon-warning-outline"></i><span>A1区渗压异常</span>
            </div>
            <div class="lakeQuality">
              <i class="el-icon-warning-outline"></i><span>A1区水位过高</span>
            </div>
            <div class="earlyWarning">
              <i class="el-icon-warning-outline"></i><span>A1区气象预警</span>
            </div>
            <div class="warningStage">
              <i class="el-icon-warning-outline"></i><span>A1区水位过高</span>
            </div>
            <div class="bodyDam">
              <i class="el-icon-warning-outline"></i><span>A2区坝体形变</span>
            </div>
            <div class="osmometer">
              <i class="el-icon-warning-outline"></i><span>A1区渗压异常</span>
            </div>
            <div class="lakeQuality">
              <i class="el-icon-warning-outline"></i><span>A1区水位过高</span>
            </div>
            <div class="earlyWarning">
              <i class="el-icon-warning-outline"></i><span>A1区气象预警</span>
            </div>
          </marquee>
        </div>
      </div>
    </div>
    <div
      style="
        border-radius: 5px;
        border-radius: 5px;
        background: #ffffff;
        padding: 21px;
        margin-bottom: 40px;
      "
    >
      <div class="topMenu">
        <span>设备状态监测</span>
      </div>
      <div class="deviceMenu">
        <div>
          正常运行设备：<span
            style="color: #1c48bf; margin-right: 20px; font-size: 18px"
            >14台</span
          >
        </div>
        <div>
          异常设备：<span style="color: #ea951c; font-size: 18px">2台</span>
        </div>
      </div>
      <el-table
        :data="deviceData"
        style="width: 100%"
        :header-cell-style="{ background: '#EEEEEE' }"
      >
        <el-table-column prop="name" label="设备名称" />
        <el-table-column prop="address" label="位置" />
        <el-table-column prop="type" label="设备状态" width="200px">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '0'" style="color: #ea951c"
              >异常</span
            >
            <span v-if="scope.row.type === '1'" style="color: #1c48bf"
              >正常</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-top: 25px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </div>
  </div>
</template>
<script>
import * as echarts from "echarts";
import Chart from "@/views/screenChart/chart";
export default {
  name: "MessageManage",
  components: { Chart },
  data() {
    return {
      speedData: {}, //流速
      fluxData: {}, //流量
      waterLevelData: {}, //水位
      pressureData: {}, //库压渗压
      waterQuality: {}, //水质分析
      shiftData: {}, //形变
      offsetData: {}, //位移
      alarmStateData: {}, //预警状态
      flowRateType: "黄金糕",
      waterLevelType: "黄金糕",
      osmometerType: "黄金糕",
      waterQualityType: "黄金糕",
      deformationType: "黄金糕",
      optionsType: [
        {
          value: "设备A",
          label: "黄金糕",
        },
        {
          value: "设备B",
          label: "双皮奶",
        },
        {
          value: "设备C",
          label: "蚵仔煎",
        },
        {
          value: "设备D",
          label: "龙须面",
        },
        {
          value: "设备E",
          label: "北京烤鸭",
        },
      ],
      deviceData: [
        {
          name: "设备一",
          type: "0",
          address: "陕西省显示雁塔区",
        },
        {
          name: "设备二",
          type: "0",
          address: "陕西省显示高陵区",
        },
        {
          name: "设备三",
          type: "1",
          address: "陕西省显示碑林区",
        },
        {
          name: "设备四",
          type: "0",
          address: "陕西省显示莲湖区",
        },
        {
          name: "设备五",
          type: "1",
          address: "陕西省显示长安区",
        },
        {
          name: "设备六",
          type: "1",
          address: "陕西省显示鄠邑区",
        },
        {
          name: "设备七",
          type: "0",
          address: "陕西省显示高新区",
        },
        {
          name: "设备八",
          type: "1",
          address: "陕西省显示灞桥区",
        },
      ],
      total: 0,

      queryParams: {
        currentPage: 1,
        pageSize: 10,
      },
      laneChart_bar: {},
    };
  },
  created() {
    this.speedData = this.getSpeedData();
    this.fluxData = this.getFluxData();
    this.waterLevelData = this.getWaterLevelData();
    this.pressureData = this.getPressureData();
    this.waterQuality = this.getWaterQuality();
    this.shiftData = this.getShiftData();
    this.offsetData = this.getOffsetData();
    this.alarmStateData = this.getalarmStateData();
  },

  methods: {
    /** 流速流量---类型筛选 */
    changeFlowRate(val) {
      this.flowRateType = val;
      this.speedData = this.getSpeedData();
      this.fluxData = this.getFluxData();
    },
    /** 水位---类型筛选 */
    changeWaterLevel(val) {
      this.waterLevelType = val;
      this.waterLevelData = this.getWaterLevelData();
    },
    /** 库压渗压---类型筛选 */
    changeOsmometer(val) {
      this.osmometerType = val;
      this.pressureData = this.getPressureData();
    },

    /** 水质分析---类型筛选 */
    changeWaterQuality(val) {
      this.waterQualityType = val;
      this.waterQuality = this.getWaterQuality();
    },
    /** 形变位移---类型筛选 */
    changeDeformation(val) {
      this.deformationType = val;
      this.shiftData = this.getShiftData();
      this.offsetData = this.getOffsetData();
    },

    /**仪表盘蓝色渐变------流速 */
    getSpeedData() {
      let data = {
        series: [
          //外层光晕渐变
          {
            type: "gauge",
            radius: "90%",
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
            radius: "80%",
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
            radius: "70%", //图表尺寸
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
    /**仪表盘黄色渐变------流量 */
    getFluxData() {
      let data = {
        series: [
          //外层光晕渐变
          {
            type: "gauge",
            radius: "90%",
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
            radius: "80%",
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
            radius: "70%", //图表尺寸
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
    /**水位图表 */
    getWaterLevelData() {
      let data = {
        series: [
          {
            name: "刻度点",
            type: "gauge",
            radius: "95%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "58%"],
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
              show: true,
              lineStyle: {
                color: "auto",
                width: 2,
              },
              length: -2,
              splitNumber: 8,
            },
            splitLine: {
              show: false,
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
            name: "刻度",
            type: "gauge",
            radius: "95%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "60%"],
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
              length: -10,
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
            type: "gauge",
            radius: "80%",
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
                      color: "#ea951c", // 100% 处的颜色
                    },
                    {
                      offset: 0.3,
                      color: "#fdd861", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#16a3d0", // 100% 处的颜色
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
                width: 14,
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
              formatter: "{value} mm",
              color: "#EA951C",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 60,
                name: "水位mm",
              },
            ],
          },
        ],
      };
      return data;
    },
    /**库压渗压 */
    getPressureData() {
      let data = {
        series: [
          {
            name: "刻度点",
            type: "gauge",
            radius: "95%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "58%"],
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                color: [
                  [0.15, "#52c3ff"],
                  [0.55, "#3d7fff"],
                  [1, "#66ffff"],
                ],
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 2,
              },
              length: -2,
              splitNumber: 8,
            },
            splitLine: {
              show: false,
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
            name: "刻度",
            type: "gauge",
            radius: "95%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "60%"],
            axisLine: {
              show: false,
              lineStyle: {
                width: 0,
                shadowBlur: 10,
                color: [
                  [0.15, "#52c3ff"],
                  [0.55, "#3d7fff"],
                  [1, "#66ffff"],
                ],
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: true,
              length: -10,
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
            type: "gauge",
            radius: "80%",
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
                      color: "#52c3ff ", // 100% 处的颜色
                    },
                    {
                      offset: 0.3,
                      color: "#3d7fff", // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: "#3d7fff", // 100% 处的颜色
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
                width: 14,
                color: [[1, "rgba(63, 133, 255, 0.4)"]], //刻度线背景色
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
              formatter: "{value} Mpa",
              color: "#3672E9",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 60,
                name: "库压渗压Mpa",
              },
            ],
          },
        ],
      };
      return data;
    },
    /**水质分析 */
    getWaterQuality() {
      var dataCake = [
        { name: "二氧化碳", percentage: "43.67%" },
        { name: "氢含量", percentage: "29.26%" },
        { name: "氧含量", percentage: "27.07%" },
        { name: "氮含量", percentage: "29.26%" },
        { name: "氦含量", percentage: "27.07%" },
      ];
      let data = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        legend: {
          orient: "vertical",
          left: "50%", //图例距离左的距离
          top: "15%",
          itemGap: 15,
          itemHeight: 17,
          itemWidth: 17,
          textStyle: {
            fontSize: 14, //字体大小
          },
          formatter: function (name) {
            let target, percentage;
            for (let i = 0; i < dataCake.length; i++) {
              if (dataCake[i].name === name) {
                target = dataCake[i].value;
                percentage = dataCake[i].percentage;
              }
            }
            let arr = [name + " ", " " + percentage];
            return arr.join(" ");
          },
        },
        color: ["#EA951C", "#3F85FF", "#F3B63E", "#37ABC1", "#32DFDF"],
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["40%", "50%"], // 这个属性修改圆环宽度
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
            name: "饼图数据",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["55%", "70%"],
            silent: true,
            itemStyle: {
              borderWidth: 3,
              borderColor: "#fff",
            },
            labelLine: {
              show: false,
            },
            label: {
              formatter: "{a|{c}mol/L}{abg|}\n{hr|}\n ",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "inherit",
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

            data: [
              { value: 500, name: "二氧化碳" },
              { value: 335, name: "氢含量" },
              { value: 310, name: "氧含量" },
              { value: 335, name: "氮含量" },
              { value: 310, name: "氦含量" },
            ],
          },
        ],
      };
      return data;
    },
    /**仪表盘蓝色渐变------形变 */
    getShiftData() {
      let data = {
        series: [
          //外层光晕渐变
          {
            type: "gauge",
            radius: "90%",
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
            radius: "80%",
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
              formatter: "{value} mm",
              color: "#3672E9",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 60,
                name: "水平位移mm",
              },
            ],
          },

          //内层刻度线渐变
          {
            type: "gauge",
            splitNumber: 4, //刻度数量
            radius: "70%", //图表尺寸
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
    /**仪表盘黄色渐变------位移 */
    getOffsetData() {
      let data = {
        series: [
          //外层光晕渐变
          {
            type: "gauge",
            radius: "90%",
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
            radius: "80%",
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
              formatter: "{value} mm",
              color: "#40C3D9",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 60,
                name: "高程位移mm",
              },
            ],
          },

          //内层刻度线渐变
          {
            type: "gauge",
            splitNumber: 4, //刻度数量
            radius: "70%", //图表尺寸
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
    /**预警状态 */
    getalarmStateData() {
      let color = ["#37ABC1", "#3F85FF", "#EA951C", "#27C4C4", "#F3B63E"];
      let chartData = [
        {
          name: "库区水位",
          value: 40083,
        },
        {
          name: "坝体形变",
          value: 33974,
        },
        {
          name: "库压渗压",
          value: 15400,
        },
        {
          name: "库区水质",
          value: 11021,
        },
        {
          name: "气象预警",
          value: 30696,
        },
      ];
      let arrName = [];
      let arrValue = [];
      let sum = 0;
      let pieSeries = [],
        lineYAxis = [];

      // 数据处理
      chartData.forEach((v, i) => {
        arrName.push(v.name);
        arrValue.push(v.value);
        sum = sum + v.value;
      });

      // 图表option整理
      chartData.forEach((v, i) => {
        pieSeries.push({
          name: "",
          type: "pie",
          clockWise: false,
          hoverAnimation: false,
          radius: [90 - i * 15 + "%", 82 - i * 15 + "%"],
          center: ["40%", "55%"],
          label: {
            show: false,
          },
          data: [
            {
              value: v.value,
              name: v.name,
            },
            {
              value: sum - v.value,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
            },
          ],
        });
        pieSeries.push({
          name: "",
          type: "pie",
          silent: true,
          z: 1,
          clockWise: false, //顺时加载
          hoverAnimation: false, //鼠标移入变大
          radius: [90 - i * 15 + "%", 82 - i * 15 + "%"],
          center: ["40%", "55%"],
          label: {
            show: false,
          },
          data: [
            {
              value: 7.5,
              itemStyle: {
                color: "#E3F0FF",
              },
            },
            {
              value: 2.5,
              name: "",
              itemStyle: {
                color: "rgba(0,0,0,0)",
              },
            },
          ],
        });
        v.percent = ((v.value / sum) * 100).toFixed(1) + "%";
        lineYAxis.push({
          value: i,
          textStyle: {
            rich: {
              name: {
                color: color[i],
                padding: [0, 5],
              },
              circle: {
                color: color[i],
                padding: [0, 5],
              },
            },
          },
        });
      });

      let data = {
        color: color,
        grid: {
          top: "0",
          bottom: "45%",
          left: "40%",
          containLabel: false,
        },
        yAxis: [
          {
            type: "category",
            inverse: true,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              formatter: function (params) {
                let item = chartData[params];
                return (
                  "{line|}{circle|●}{name|" +
                  item.name +
                  "：" +
                  item.percent +
                  "}"
                );
              },
              interval: 0,
              inside: true,
              show: true,
            },
            data: lineYAxis,
          },
        ],
        xAxis: [
          {
            show: false,
          },
        ],
        series: pieSeries,
      };

      return data;
    },
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
    },
    /** 流速流量跳转 */
    jumpWaterVelocity() {
      this.$router.push({
        name: "waterVelocity",
        params: { deviceId: "david" },
      });
    },
    /** 水位跳转 */
    jumpWaterStage() {
      this.$router.push({
        name: "waterStage",
        params: { deviceId: "david" },
      });
    },
    /** 库压渗压 */
    jumpOsmoticPressure() {
      this.$router.push({
        name: "osmoticPressure",
        params: { deviceId: "david" },
      });
    },
    /** 水质分析 */
    jumpWaterQuality() {
      this.$router.push({
        name: "waterQuality",
        params: { deviceId: "david" },
      });
    },
    /** 形变位移 */
    jumpDeformation() {
      this.$router.push({
        name: "deformation",
        params: { deviceId: "david" },
      });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.selectCharts {
  /deep/.el-input__inner {
    width: 90px;
    height: 20px;
  }
}
/deep/.el-select .el-input .el-select__caret {
  transform: rotateZ(90deg);
  margin-right: -10px;
}
.realtimePage {
  height: 100%;
  overflow-y: auto;
  .echartAllBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    .echartBox {
      padding: 10px;
      width: 33%;
      height: 280px;
      background-color: #ffffff;
      margin-bottom: 10px;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      .bottomMenu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        .scrollContent::-webkit-scrollbar {
          display: none;
        }
        .scrollContent {
          width: 35%;
          margin-right: 15px;
          max-height: 200px;
          overflow-y: auto;
          cursor: pointer;
          div {
            width: 100%;
            padding: 0 10px;
            height: 30px;
            border-radius: 5px;
            display: flex;
            align-items: center;
            margin-bottom: 9px;
            span {
              font-size: 12px;
            }
            i {
              margin-right: 10px;
            }
          }
          .warningStage {
            background-color: rgba(55, 171, 193, 0.2);
            span,
            i {
              color: #37abc1;
              z-index: 99999;
            }
          }
          .bodyDam {
            background-color: rgba(63, 133, 255, 0.2);
            span,
            i {
              color: #3f85ff;
            }
          }
          .osmometer {
            background-color: rgba(234, 149, 28, 0.2);
            span,
            i {
              color: #ea951c;
            }
          }
          .lakeQuality {
            background-color: rgba(55, 171, 193, 0.2);
            span,
            i {
              color: #27c4c4;
            }
          }
          .earlyWarning {
            background-color: rgba(243, 182, 62, 0.2);
            span,
            i {
              color: #f3b63e;
            }
          }
        }
      }
      .chartDataBox {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }
  }

  .topMenu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 5px;
    span {
      font-size: 16px;
      color: #333333;
    }
    em {
      width: 31px;
      font-size: 12px;
      color: #1c48bf;
      font-style: normal;
      cursor: pointer;
    }
  }
  .deviceMenu {
    display: flex;
    align-items: center;
    margin: 15px 0;
    font-size: 14px;
    div {
      display: flex;
      align-items: center;
    }
  }
}
</style>