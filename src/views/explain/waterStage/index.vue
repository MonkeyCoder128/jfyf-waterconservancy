<template>
  <div class="waterStagePage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <div class="echartsBoxContent">
        <div class="echartsBox">
          <span>设备:投入式水位计一</span>
          <equipmentChart :parentData="this.childData.equipmentChartA"></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:投入式水位计二</span>
          <equipmentChart :parentData="this.childData.equipmentChartB"></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:投入式水位计三</span>
          <equipmentChart :parentData="this.childData.equipmentChartC"></equipmentChart>
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
              >43次</span
            >
          </div>
        </div>
        <div class="echartsBox" style="margin: 10px 0">
          <span>预警数据对比</span>
          <div class="warningBox">
            <warningCharts />
            <ul>
              <li>
                <div class="iconLable">
                  <span class="Icon"></span>
                  <span>投入式水位计一</span>
                </div>
                <span class="percent">38%</span>
              </li>
              <li>
                <div class="iconLable">
                  <span class="Icon"></span>
                  <span>投入式水位计二</span>
                </div>
                <span class="percent">27%</span>
              </li>
              <li>
                <div class="iconLable">
                  <span class="Icon"></span>
                  <span>投入式水位计三</span>
                </div>
                <span class="percent">35%</span>
              </li>
            </ul>
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
  name: "WaterVelocity",
  components: {
    warningCharts,
    brokenLineCharts,
    equipmentChart,
  },
  data() {
    return {
      // 子组件数据
      childData:{
        equipmentChartA:'50',
        equipmentChartB:'68',
        equipmentChartC:'80',
        brokenLineChart:{
          LineOne:[333, 300, 280, 100, 109, 37, 105, 160],
          LineTwo:[100, 138, 350, 173, 180, 150, 180, 230],
          LineThree:[233, 233, 200, 180, 199, 233, 210, 180],
        }
      },
      tableData: [
        {
          date: "投入式水位计一",
          name: "15",
          type: "0",
        },
        {
          date: "投入式水位计二",
          name: "13",
          type: "1",
        },
        {
          date: "投入式水位计三",
          name: "19",
          type: "1",
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
  .chartDataBox {
    height: 360px !important;
  }
  .waterStagePage {
    .cardMenu {
      min-height: 430px !important;
      .echartsBoxContent {
        height: 360px !important;
        .echartsBox {
          height: 360px !important;
        }
      }
      .echartsBox {
        height: 360px !important;
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
.waterStagePage {
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
    height: 200px;
    span {
      font-size: 14px;
      color: #333333;
    }
    .warningBox {
      width: 100%;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;
      align-content: center;
      height: 100%;
      ul {
        width: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        li {
          width: 60%;
          list-style: none;
          display: flex;
          justify-content: space-between;
          align-items: center;
          .iconLable {
            display: flex;
            align-items: center;
            .Icon {
              display: inline-block;
              width: 17px;
              height: 17px;
              margin-right: 9px;
            }
          }
        }
        li:nth-child(1) {
          .Icon {
            background-color: #148f97;
          }
          .percent {
            color: #148f97;
          }
        }
        li:nth-child(2) {
          .Icon {
            background-color: #1289ba;
          }
          .percent {
            color: #1289ba;
          }
        }
        li:nth-child(3) {
          .Icon {
            background-color: #115cb9;
          }
          .percent {
            color: #115cb9;
          }
        }
      }
    }
  }

  .cardMenu {
    width: 100%;
    height: 260px;
    background-color: #ffffff;
    border-radius: 5px;
    padding: 5px 12px;

    .echartsBoxContent {
      width: 100%;
      display: flex;
      justify-content: space-around;
      align-items: center;
      div {
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