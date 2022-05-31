<template>
  <div class="realtimePage">
    <div class="echartAllBox">
      <div class="echartBox">
        <div class="topMenu">
          <span>水雨情</span>
          <div class="selectCharts">
            <em style="color: #333333">类别</em>
            <el-select
              style="margin: 0 12px"
              @change="changeRainWater"
              v-model="rainWater"
              size="mini"
            >
              <el-option
                v-for="item in rainWaterOption"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
          </div>
          <div class="selectCharts">
            <em style="color: #333333">设备</em>
            <el-select
              v-if="rainWater === 'water'"
              style="margin: 0 12px"
              @change="changeWaterLevel"
              v-model="waterLevelType"
              size="mini"
            >
              <el-option
                v-for="item in levelOption"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <el-select
              v-if="rainWater === 'rainfall'"
              style="margin: 0 12px"
              @change="changeRainfallType"
              v-model="rainfallType"
              size="mini"
            >
              <el-option
                v-for="item in rainOption"
                :key="item.label"
                :label="item.value"
                :value="item.label"
              >
              </el-option>
            </el-select>
            <em @click="jumpWaterStage">更多></em>
          </div>
        </div>
        <div class="chartDataBox" v-if="rainWater === 'water'">
          <Chart :chartData="waterLevelData" :width="'100%'" :height="'100%'" />
        </div>
        <div class="chartDataBox" v-if="rainWater === 'rainfall'">
          <Chart :chartData="rainfallData" :width="'100%'" :height="'100%'" />
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
                v-for="item in offsetOptions"
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
                v-for="item in pressureOptions"
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
                v-for="item in tachometerOptions"
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
                v-for="item in analyseOptions"
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
            >18台</span
          >
        </div>
        <div>
          异常设备：<span style="color: #ea951c; font-size: 18px">1台</span>
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
import Chart from "@/views/screenChart/chart";
import * as echarts from "echarts";
import "echarts-liquidfill"; //在这里引入水球图
export default {
  name: "Realtime",
  components: { Chart },
  data() {
    return {
      speedData: {}, //流速
      fluxData: {}, //流量
      rainWater: "rainfall", //水雨情类型
      waterLevelData: {}, //水位
      rainfallData: {}, //降雨量
      pressureData: {}, //库压渗压
      waterQuality: {}, //水质分析
      shiftData: {}, //形变
      offsetData: {}, //位移
      alarmStateData: {}, //预警状态
      waterLevelType: "1",
      rainfallType: "2",
      deformationType: "1",
      osmometerType: "1",
      flowRateType: "1",
      waterQualityType: "1",
      rainWaterOption: [
        {
          value: "水位",
          label: "water",
        },
        {
          value: "降雨量",
          label: "rainfall",
        },
      ],
      levelOption: [
        {
          value: "投入式水位计一",
          label: "1",
        },
        {
          value: "投入式水位计二",
          label: "2",
        },
        {
          value: "投入式水位计三",
          label: "3",
        },
      ],
      rainOption: [
        {
          value: "翻斗式雨量计一",
          label: "1",
        },
        {
          value: "翻斗式雨量计二",
          label: "2",
        },
        {
          value: "翻斗式雨量计三",
          label: "3",
        },
      ],
      offsetOptions: [
        {
          value: "GNSS接收机一",
          label: "1",
        },
        {
          value: "GNSS接收机二",
          label: "2",
        },
        {
          value: "GNSS接收机三",
          label: "3",
        },
        {
          value: "GNSS接收机四",
          label: "4",
        },
        {
          value: "GNSS接收机五",
          label: "5",
        },
      ],
      pressureOptions: [
        {
          value: "振弦式渗压计一",
          label: "1",
        },
        {
          value: "振弦式渗压计二",
          label: "2",
        },
        {
          value: "振弦式渗压计三",
          label: "3",
        },
        {
          value: "振弦式渗压计四",
          label: "4",
        },
        {
          value: "振弦式渗压计五",
          label: "5",
        },
      ],
      tachometerOptions: [
        {
          value: "流速流量仪一",
          label: "1",
        },
        {
          value: "流速流量仪二",
          label: "2",
        },
        {
          value: "流速流量仪三",
          label: "3",
        },
        {
          value: "流速流量仪四",
          label: "4",
        },
      ],
      analyseOptions: [
        {
          value: "水质测定仪一",
          label: "1",
        },
        {
          value: "水质测定仪二",
          label: "2",
        },
        {
          value: "水质测定仪三",
          label: "3",
        },
      ],
      deviceData: [
        {
          name: "投入式水位计一",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "投入式水位计二",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "投入式水位计三",
          type: "0",
          address: "陕西省西安市XX水库",
        },
        {
          name: "GNSS接收机一",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "GNSS接收机二",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "GNSS接收机三",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "GNSS接收机四",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "GNSS接收机五",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "振弦式渗压计一",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "振弦式渗压计二",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "振弦式渗压计三",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "流速流量仪一",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "流速流量仪二",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "流速流量仪三",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "流速流量仪四",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "流速流量仪四",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "水质测定仪一",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "水质测定仪二",
          type: "1",
          address: "陕西省西安市XX水库",
        },
        {
          name: "水质测定仪三",
          type: "1",
          address: "陕西省西安市XX水库",
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
    this.rainfallData = this.getRainfallData();
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
    /** 水雨情---类型筛选 */
    changeRainWater(val) {
      this.rainWater = val;
    },
    /** 水位---类型筛选 */
    changeWaterLevel(val) {
      this.waterLevelType = val;
      this.waterLevelData = this.getWaterLevelData();
    },
    /** 降雨量---类型筛选 */
    changeRainfallType(val) {
      this.rainfallType = val;
      this.rainfallData = this.getRainfallData();
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
                value: 20,
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
              formatter: "{value} m",
              color: "#EA951C",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 27,
                name: "水位m",
              },
            ],
          },
        ],
      };
      return data;
    },
    /**降雨量图表 */
    getRainfallData() {
      let max = 100; //满刻度大小
      let scroe = 20,
        scroePer = scroe / 50;
      let data = max * scroePer;
      let dataOption = {
        title: {
          top: "47%",
          left: "center",
          text: scroe + " mm/min",
          textStyle: {
            color: "#1C48BF",
            fontStyle: "normal",
            fontWeight: "bold",
            fontSize: 18,
          },
        },
        series: [
          //data数值
          {
            type: "liquidFill",
            itemStyle: {
              opacity: 0.8, //波浪的透明度
            },
            radius: "73%",
            //水波
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#35EBFB",
                },
                {
                  offset: 1,
                  color: "#2876F7",
                },
              ]),
            ],
            data: [0.3, 0.35],
            backgroundStyle: {
              color: {
                type: "radial",
                x: 0.5,
                y: 0.5,
                r: 0.5,
                colorStops: [
                  {
                    offset: 0,
                    color: "rgba(189, 240, 254, 0)", // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(189, 240, 254, 0.01)", // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(189, 240, 254, 1)", // 100% 处的颜色
                  },
                ],
                globalCoord: false, // 缺省为 false
              },
            },
            outline: {
              borderDistance: 2,
              itemStyle: {
                borderWidth: 0,
                borderColor: {
                  type: "linear",
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [
                    {
                      offset: 0,
                      color: "rgba(69, 73, 240, 0)",
                    },
                    {
                      offset: 1,
                      color: "rgba(69, 73, 240, 1)",
                    },
                  ],
                },
                shadowBlur: 30,
                shadowColor: "red",
              },
            },
            // data: [
            //   {
            //     value: scroePer,
            //   },
            // ],
            label: {
              normal: {
                formatter: "",
                textStyle: {
                  fontSize: 12,
                },
              },
            },
          },

          //内层刻度线渐变
          {
            type: "gauge",
            splitNumber: 4, //刻度数量
            radius: "86%", //图表尺寸
            startAngle: 200,
            endAngle: -20,
            center: ["50%", "51%"],
            axisLine: {
              show: true,
              lineStyle: {
                width: 0,
                shadowBlur: 0,
                color: [
                  [0.1, "#71C5FF"],

                  [1, "#71C5FF"],
                ],
              },
            },
            axisTick: {
              show: true,
              lineStyle: {
                color: "auto",
                width: 10,
              },
              length: 2,
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
          {
            type: "gauge",
            radius: "80%",
            startAngle: -25,
            endAngle: -154,
            show: false,
            center: ["50%", "52%"],
            progress: {
              width: 16,
              roundCap: true,
            },
            pointer: {
              show: false,
            },
            axisLine: {
              roundCap: true,
              lineStyle: {
                width: 8,
                color: [[1, "#3192D8"]], //刻度线背景色
              },
            },
            axisTick: {
              show: false,
            },
            splitLine: {
              show: false,
            },
            axisLabel: {
              show: false,
            },
            anchor: {
              show: false,
            },
            title: {
              show: false,
            },
            detail: {
              width: "85%",
              borderRadius: 8,
              fontSize: 18,
            },
            data: [],
          },
        ],
      };
      return dataOption;
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
            max: 10,
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
              formatter: "{value} MPa",
              color: "#3672E9",
            },
            title: {
              offsetCenter: [0, "65%"],
              fontSize: 14,
            },
            data: [
              {
                value: 1.4,
                name: "库压渗压MPa",
              },
            ],
          },
        ],
      };
      return data;
    },
    /**水质分析 */
    getWaterQuality() {
      let colors = ["#EA951C", "#3F85FF", "#F3B63E", "#37ABC1", "#32DFDF"];
      var dataCake = [
        { value: 50, name: "二氧化碳" },
        { value: 40, name: "氢含量" },
        { value: 30, name: "氧含量" },
        { value: 20, name: "氮含量" },
        { value: 10, name: "氦含量" },
      ];
      let data = {
        legend: {
          selectedMode: false,
          icon: "rect",
          left: "67%", //图例距离左的距离
          y: "center",
          itemGap: 15,
          itemHeight: 17,
          itemWidth: 17,
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
              t3: {
                color: colors[3],
              },
              t4: {
                color: colors[4],
              },
            },
          },
          formatter: function (param) {
            let index = dataCake.findIndex((v) => v.name == param);
            let str = `{white|${param.padEnd(5, "　")}}{t${index}|${
              dataCake[index].value + "%"
            }}`;
            return str;
          },
        },
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["32%", "50%"],
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
            center: ["32%", "50%"],
            radius: ["55%", "70%"],
            avoidLabelOverlap: false,
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
            data: dataCake,
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#EA951C",
                    "#3F85FF",
                    "#F3B63E",
                    "#37ABC1",
                    "#32DFDF",
                  ];

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
                value: 2,
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
                value: 3,
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
      });
    },
    /** 水位跳转 */
    jumpWaterStage() {
      let optionType = null;
      if (this.rainWater === "rainfall") {
        optionType = this.rainfallType; //降雨量设备值
      } else if (this.rainWater === "water") {
        optionType = this.waterLevelType; //水位设备值
      }
      this.$router.push({
        name: "waterStage",
        query: {
          type: this.rainWater,
          optionType: optionType,
        },
      });
    },
    /** 库压渗压 */
    jumpOsmoticPressure() {
      this.$router.push({
        name: "osmoticPressure",
      });
    },
    /** 水质分析 */
    jumpWaterQuality() {
      this.$router.push({
        name: "waterQuality",
      });
    },
    /** 形变位移 */
    jumpDeformation() {
      this.$router.push({
        name: "deformation",
      });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.selectCharts {
  /deep/.el-input__inner {
    width: 133px;
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