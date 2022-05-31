<template>
  <div class="waterStagePage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <i>数据类别</i>
      <el-select 
        size="mini"
        @change="changeType"
        placeholder="水位"
        v-model="category">
        <el-option label="水位" value="water"></el-option>
        <el-option label="降雨量" value="rainfall"></el-option>
      </el-select>
      <div class="echartsBoxContent">
        <div class="echartsBox">
          <span>设备:投入式水位计一</span>
          <waterPolo 
            :parentData="childData.waterPoloA"
            v-if="category == 'rainfall'">
          </waterPolo>
          <equipmentChart
            :parentData="childData.equipmentChartA"
            v-else
          ></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:投入式水位计二</span>
          <waterPolo 
            :parentData="childData.waterPoloB"
            v-if="category == 'rainfall'">
          </waterPolo>
          <equipmentChart
            :parentData="childData.equipmentChartB"
            v-else
          ></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:投入式水位计三</span>
          <waterPolo 
            :parentData="childData.waterPoloC"
            v-if="category == 'rainfall'">
          </waterPolo>
          <equipmentChart
            :parentData="childData.equipmentChartC"
            v-else
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
              >47次</span
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
import waterPolo from "./components/waterPolo.vue";
export default {
  name: "WaterStage",
  components: {
    warningCharts,
    brokenLineCharts,
    equipmentChart,
    waterPolo,
  },
  data() {
    return {
      // 子组件数据
      childData: {
        equipmentChartA: "27",
        equipmentChartB: "27",
        equipmentChartC: "27",
        waterPoloA: '18',
        waterPoloB: '16',
        waterPoloC: '13',
        brokenLineChart: {
          LineOne: [1, 2, 2, 3, 2, 1, 3, 1],
          LineTwo: [1, 0, 2, 1, 2, 1, 2, 3],
          LineThree: [2, 3, 1, 4, 4, 2, 1, 2],
        },
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
          type: "0",
        },
        {
          date: "投入式水位计三",
          name: "19",
          type: "1",
        },
      ],
      // 存储当前水雨情类别
      category: "water",
    };
  },
  created(){
    // 获取父级页面传来的参数
    this.category = this.$route.query.type;
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
    // 水雨情类型改变
    changeType(option){
      this.category = option;
    }
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
  .waterStagePage {
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
    height: 600px;
  }
  .charts {
    height: 560px;
  }
}
.waterStagePage {
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
    padding: 5px 12px;

    .echartsBoxContent {
      width: 100%;
      height: auto;
      display: flex;
      flex-flow: wrap;
      div {
        width: 32.1%;
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
// 设置水雨情select选择器的样式
/deep/ .el-input--mini .el-input__inner{
  width: 90px;
  height: 20px;
}
/deep/ .el-input--mini .el-input__icon{
  line-height: 12px;
}
.cardMenu{
  i{
    font-size: 12px !important;
    font-style: normal;
    margin:0 10px 0 20px;
  }
}
</style>