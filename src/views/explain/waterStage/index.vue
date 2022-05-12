<template>
  <div class="waterStagePage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <div class="echartsBoxContent">
        <div class="echartsBox">
          <span>设备:流量计A</span>
          <equipmentChart></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:流量计B</span>
          <equipmentChart></equipmentChart>
        </div>
        <div class="echartsBox">
          <span>设备:流量计C</span>
          <equipmentChart></equipmentChart>
        </div>
      </div>
    </div>
    <div class="bottomBox">
      <div class="cardBottom">
        <span class="cardTitle">检测状态</span>
        <div class="testStatus">
          <div>
            当前监测状态：<span style="color: #1c48bf; font-size: 14px; margin-right: 20px">正常</span>
          </div>
          <div>
            预警总次数：<span style="color: #ea951c; font-size: 14px">20次</span>
          </div>
        </div>
        <div class="echartsBox" style="margin: 10px 0">
          <span>预警数据对比</span>
          <div class="warningBox">
            <warningCharts/>
            <ul>
              <li>
                <span></span>
                <span>A设备</span>
                <span>53%</span>
              </li>
              <li>
                <span></span>
                <span>B设备</span>
                <span>30%</span>
              </li>
              <li>
                <span></span>
                <span>C设备</span>
                <span>17%</span>
              </li>
            </ul>
          </div>
        </div>
        <span class="cardTitle">预警分析</span>
        <el-table :data="tableData" :row-style="{ height: '0' }" :cell-style="{ padding: '0' }">
          <el-table-column prop="date" label="监测点" />
          <el-table-column prop="name" label="预警次数" />
          <el-table-column prop="type" label="设备状态">
            <template slot-scope="scope">
              <span v-if="scope.row.type === '0'">在线</span>
              <span v-if="scope.row.type === '1'" style="color: #de1111">离线</span>
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
          <brokenLineCharts/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import equipmentChart from './components/equipmentChart.vue';
import warningCharts from './components/warningCharts.vue';
import brokenLineCharts from './components/brokenLineChart.vue';
  export default {
    name: "WaterVelocity",
    components:{
      warningCharts,
      brokenLineCharts,
      equipmentChart,
    },
    data() {
      return {
        tableData: [{
            date: "2016-05-02",
            name: "王小虎",
            type: "0",
          },
          {
            date: "2016-05-02",
            name: "李小龙",
            type: "1",
          },
          {
            date: "2016-05-02",
            name: "张小凡",
            type: "1",
          },
          {
            date: "2016-05-02",
            name: "赵小强",
            type: "0",
          },
          {
            date: "2016-05-02",
            name: "孙晓宁",
            type: "0",
          },
        ],
        optionOne: '',
      };
    },
    methods: {
      // 预警查看
      seeAnalyse(attr){
        console.log(attr);
      }
    },
  };
</script>

<style lang="scss" scoped>
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
      min-height: 870px !important;
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
      .warningBox{
        width: 80%;
        margin: 0 auto;
        display: flex;
        justify-content: space-between;
        align-content: center;
        height: 100%;
        ul{
          width: 60%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
          li{
            width: 100%;
            list-style: none;
            display: flex;
            justify-content: space-around;
            align-items: center;
            span:nth-child(1){
              display: inline-block;
              width: 17px;
              height: 17px;
              background-color: #115cb9;
            }
            span:nth-child(3){
              color: #115cb9;
            }
          }
          li:nth-child(2){
            span:nth-child(1){
              background-color: #148f97;
            }
            span:nth-child(3){
              color: #148f97;
            }
          }
          li:nth-child(3){
            span:nth-child(1){
              background-color: #1289ba;
            }
            span:nth-child(3){
              color: #1289ba;
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
      padding: 5px 20px;

      .echartsBoxContent {
        width: 100%;
        display: flex;
        justify-content: space-between;
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
        width: 49.5%;
        height: auto;
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
        .brokenLineCharts{
          width: 100%;
          height: 500px;
        }
      }
    }
  }
</style>