<template>
  <div class="realtimePage">
    <div class="echartAllBox">
      <div class="echartBox">
        <div class="topMenu">
          <span>流速、流量</span>
          <el-select
            @change="changeType"
            v-model="typeValue"
            size="mini"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <em>更多></em>
        </div>
        <div class="bottomMenu">
          <div style="background-color: blue">
            这里面是图表
            <!-- <Chart
                :chartData="laneChart_bar"
                :width="'100%'"
                :height="'100%'"
              /> -->
          </div>
          <div>
            <Chart
              :chartData="laneChart_bar"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>水位</span>
          <el-select
            @change="changeType"
            v-model="typeValue"
            size="mini"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <em>更多></em>
        </div>
        <div class="bottomMenu">
          <div style="background-color: blue">
            这里面是图表
            <!-- <Chart
                :chartData="laneChart_bar"
                :width="'100%'"
                :height="'100%'"
              /> -->
          </div>
          <div>
            <Chart
              :chartData="laneChart_bar"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>库压渗压</span>
          <el-select
            @change="changeType"
            v-model="typeValue"
            size="mini"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <em>更多></em>
        </div>
        <div class="bottomMenu">
          <div style="background-color: blue">
            这里面是图表
            <!-- <Chart
                :chartData="laneChart_bar"
                :width="'100%'"
                :height="'100%'"
              /> -->
          </div>
          <div>
            <Chart
              :chartData="laneChart_bar"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>水质分析</span>
          <el-select
            @change="changeType"
            v-model="typeValue"
            size="mini"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <em>更多></em>
        </div>
        <div class="bottomMenu">
          <div style="background-color: blue">
            这里面是图表
            <!-- <Chart
                :chartData="laneChart_bar"
                :width="'100%'"
                :height="'100%'"
              /> -->
          </div>
          <div>
            <Chart
              :chartData="laneChart_bar"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>形变位移</span>
          <el-select
            @change="changeType"
            v-model="typeValue"
            size="mini"
            placeholder="请选择消息类型"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.label"
              :label="item.value"
              :value="item.label"
            >
            </el-option>
          </el-select>
          <em>更多></em>
        </div>
        <div class="bottomMenu">
          <div style="background-color: blue">
            这里面是图表
            <!-- <Chart
                :chartData="laneChart_bar"
                :width="'100%'"
                :height="'100%'"
              /> -->
          </div>
          <div>
            <Chart
              :chartData="laneChart_bar"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
      <div class="echartBox">
        <div class="topMenu">
          <span>预警状态</span>
        </div>
        <div class="bottomMenu">
          <div style="background-color: blue">
            这里面是图表
            <!-- <Chart
                :chartData="laneChart_bar"
                :width="'100%'"
                :height="'100%'"
              /> -->
          </div>
          <div>
            <Chart
              :chartData="laneChart_bar"
              :width="'100%'"
              :height="'100%'"
            />
          </div>
        </div>
      </div>
    </div>
    <div
      style="
        border-radius: 5px;
        border-radius: 5px;
        background: #ffffff;
        padding: 21px;
        margin: 0 10px;
      "
    >
      <div class="topMenu">
        <span>设备状态监测</span>
      </div>
      <div class="deviceMenu">
        <div>正常运行设备：<span style="color: #1c48bf">14台</span></div>
        <div>异常设备：<span style="color: #ea951c">2台</span></div>
      </div>
      <el-table :data="deviceData" style="width: 100%" border>
        <el-table-column prop="name" label="设备名称" />
        <el-table-column prop="address" label="位置" />
        <el-table-column prop="type" label="设备状态">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '0'">异常</span>
            <span v-if="scope.row.type === '1'">正常</span>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 25px; text-align: center"
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
export default {
  name: "MessageManage",
  data() {
    return {
      typeValue: "",
      optionsType: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      deviceData: [
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
        {
          name: "2016-05-02",
          type: "0",
          address: "上海市普陀区金沙江路 1518 弄",
        },
      ],

      queryParams: {
        currentPage: 1,
        pageSize: 10,
      },
      laneChart_bar: {},
    };
  },
  created() {},
  methods: {
    /** 图表数据类型筛选 */
    changeType(val) {
      this.typeValue = val;
      console.log(
        "%c类型：",
        "color:red;font-size:18px;font-weight:bold;",
        val
      );
    },
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.realtimePage {
  .echartAllBox {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    .echartBox {
      padding: 10px;
      width: 32%;
      height: 230px;
      background-color: pink;
      margin-bottom: 22px;
      display: flex;
      flex-direction: column;
      border-radius: 5px;
      .bottomMenu {
        display: flex;
        align-items: center;
        justify-content: space-between;
        div {
          width: 100%;
          height: 100%;
        }
      }
    }
  }

  .topMenu {
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      font-size: 16px;
      color: #333333;
    }
    em {
      width: 31px;
      font-size: 12px;
      color: #1c48bf;
      font-style: normal;
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