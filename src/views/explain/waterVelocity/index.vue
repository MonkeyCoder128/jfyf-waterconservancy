<template>
  <div class="waterVelocityPage">
    <div class="cardMenu">
      <span class="cardTitle">当前数据</span>
      <div class="echartsBoxContent">
        <div class="echartsBox" style="background-color: pink">
          <span>设备:流量计A</span>
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
export default {
  name: "WaterVelocity",
  data() {
    return {
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
  created() {},
  methods: {
    /** 查看预警分析 */
    seeAnalyse() {
      console.log(
        "%c查看预警分析：",
        "color:red;font-size:18px;font-weight:bold;"
      );
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
  }
  .cardMenu {
    width: 100%;
    height: 260px;
    background-color: plum;
    border-radius: 5px;
    padding: 0 8px;
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