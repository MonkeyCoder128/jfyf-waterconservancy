<template>
  <div class="osmoticPressurePage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <div class="echartsBoxContent">
        <div class="echartsBox">
          <span>设备:振弦式渗压计一</span>
          <equipmentChart
            :parentData="this.childData.equipmentChartA"
          ></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:振弦式渗压计二</span>
          <equipmentChart
            :parentData="this.childData.equipmentChartB"
          ></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:振弦式渗压计三</span>
          <equipmentChart
            :parentData="this.childData.equipmentChartC"
          ></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:振弦式渗压计四</span>
          <equipmentChart
            :parentData="this.childData.equipmentChartD"
          ></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:振弦式渗压计五</span>
          <equipmentChart
            :parentData="this.childData.equipmentChartE"
          ></equipmentChart>
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
              >46次</span
            >
          </div>
        </div>
        <div class="echartsBox echartsBoxBottom" style="margin: 10px 0">
          <span>预警数据对比</span>
          <div class="warningBox">
            <warningCharts />
          </div>
        </div>
        <span class="cardTitle">设备检测</span>
        <el-table
          :data="tableData"
          :row-style="{ height: '0' }"
          :cell-style="{ padding: '0' }"
          :header-cell-style="{ background: '#EEEEEE', color: '#333333' }"
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
        <div class="brokenLineCharts">
          <brokenLineCharts :parentData="this.childData.brokenLineChart" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import equipmentChart from "./components/equipmentChart.vue";
import warningCharts from "./components/warningCharts.vue";
import brokenLineCharts from "./components/brokenLineChart.vue";
export default {
  name: "OsmoticPressure",
  components: {
    warningCharts,
    brokenLineCharts,
    equipmentChart,
  },
  data() {
    return {
      // 子组件数据
      childData: {
        equipmentChartA: "1.1",
        equipmentChartB: "1.3",
        equipmentChartC: "1.5",
        equipmentChartD: "1.2",
        equipmentChartE: "1.7",
        brokenLineChart: {
          LineOne: [3, 1, 0, 2, 1, 0, 0, 2],
          LineTwo: [2, 1, 1, 3, 0, 1, 0, 0],
          LineThree: [2, 1, 1, 2, 0, 0, 1, 2],
          LineFour: [1, 2, 0, 1, 2, 1, 0, 1],
          LineFive: [0, 0, 3, 1, 2, 1, 0, 2],
        },
      },
      tableData: [
        {
          date: "振弦式渗压计一",
          name: "9",
          type: "0",
        },
        {
          date: "振弦式渗压计二",
          name: "9",
          type: "0",
        },
        {
          date: "振弦式渗压计三",
          name: "10",
          type: "0",
        },
        {
          date: "振弦式渗压计四",
          name: "8",
          type: "0",
        },
        {
          date: "振弦式渗压计五",
          name: "9",
          type: "0",
        },
      ],
      optionOne: "",
    };
  },
  methods: {
    // 查看预警分析
    seeAnalyse(row) {
      this.$router.push({
        path: "/explain/alarmAnalysis",
        query: {
          id: row.id,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@media screen and (min-width: 2000px) and (max-width: 3840px) {
  .echartsBoxBottom {
    height: 350px;
  }
  .chartDataBox {
    height: 330px !important;
  }
  .osmoticPressurePage {
    .cardMenu {
      min-height: 430px !important;
      .echartsBoxContent {
        .echartsBox {
          height: 330px !important;
        }
      }
    }
  }
  .bottomBox {
    min-height: calc(100% - 430px);
  }
  .cardBottom {
    min-height: 870px !important;
    .brokenLineCharts {
      height: 730px !important;
    }
  }
}

@media screen and (min-width: 960px) and (max-width: 1920px) {
  .echartsBoxBottom {
    height: 220px !important;
  }
  .chartDataBox {
    height: 200px;
  }
  .cardMenu {
    min-height: 260px;
    .echartsBoxContent {
      .echartsBox {
        height: 200px;
      }
    }
  }

  .bottomBox {
    margin-bottom: 60px;
  }
  .cardBottom {
    height: 626px;
  }
  .charts {
    height: 560px;
  }
}

@media screen and (min-width: 600px) and (max-width: 1780px) {
  .cardMenu {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 5px 12px;
    .echartsBoxContent {
      width: 100%;
      height: auto;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      flex-wrap: wrap;
      .echartsBox {
        width: 31% !important;
        margin: 0 6px 5px;
      }
    }
  }
}
.osmoticPressurePage {
  height: auto;
  overflow: auto;
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
  }
  .echartsBoxBottom {
    .warningBox {
      width: 100%;
      height: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-content: center;
    }
  }
  .cardMenu {
    width: 100%;
    height: auto;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 5px 20px;

    .echartsBoxContent {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: wrap;
      .echartsBox {
        width: 32%;
        margin-right: 20px;
        margin-bottom: 20px;
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
      min-height: 600px;
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
      .brokenLineCharts {
        width: 100%;
        height: 550px;
      }
    }
  }
}
</style>