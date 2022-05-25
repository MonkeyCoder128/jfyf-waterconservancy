<template>
  <div class="messagePage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <div class="InfoTime">
          <span style="margin-right: 10px">首次运行时间</span>
          <el-date-picker
            size="mini"
            v-model="searchTime"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            @input="handleDate"
          >
          </el-date-picker>
        </div>
        <div class="InfoTime">
          <span style="margin: 0 10px 0 30px">位置</span>
          <el-select
            @change="changeType"
            v-model="queryParams.type"
            size="mini"
            placeholder="请选择位置"
          >
            <el-option
              v-for="item in optionsType"
              :key="item.key"
              :label="item.value"
              :value="item.key"
            >
            </el-option>
          </el-select>
        </div>
        <el-button
          style="
            margin-left: 15px;
            border: 1px solid #1c48bf;
            border-radius: 5px;
            color: #1c48bf;
          "
          @click="resetTab()"
          size="mini"
          >重置</el-button
        >
      </div>
      <el-table
        :data="tableData"
        style="width: 100%"
        :header-cell-style="{ background: '#EEEEEE' }"
      >
        <el-table-column prop="title" label="设备名称" />
        <el-table-column prop="address" label="位置" />
        <el-table-column prop="time" label="首次运行时间" />
        <el-table-column label="运行状态" width="140">
          <template slot-scope="scope">
            <span v-if="scope.row.type === '1'">在线</span>
            <span v-if="scope.row.type === '0'" style="color: #f8c202"
              >离线</span
            >
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-top: 25px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.size"
        layout="  prev, pager, next,sizes, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "MessageManage",
  data() {
    return {
      searchTime: "",
      queryParams: {
        page: 1,
        size: 10,
        type: "",
        startDate: "",
        endDate: "",
      },
      total: 0,
      tableData: [
        {
          title: "设备A",
          type: "告警消息",
          address: "陕西省西安市",
          time:'2022-05-22  12:00:12',
          type: "0",
        },
        {
          title: "设备B",
          type: "提示消息",
          address: "陕西省西安市",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "设备C",
          type: "通知消息",
          address: "陕西省西安市",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "设备D",
          type: "展示消息",
          address: "陕西省西安市",
          time:'2022-05-22  12:00:12',
          type: "0",
        },
      ],
      optionsType: [
        {
          key: "01",
          value: "位置一",
        },
        {
          key: "02",
          value: "位置二",
        },
        {
          key: "03",
          value: "位置三",
        },
      ],
    };
  },
  created() {},
  methods: {
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
    },
    /** 时间筛选 */
    handleDate(e) {
      this.$nextTick(() => {
        if (e) {
          this.queryParams.startDate = e[0];
          this.queryParams.endDate = e[1];
        } else {
          this.queryParams.startDate = "";
          this.queryParams.endDate = "";
        }
      });
    },

    /** 表格筛选 */
    changeType(val) {
      this.queryParams.type = val;
    },
    /** 重置 */
    resetTab() {
      this.searchTime = "";
      this.queryParams.type = "";
      this.queryParams.startDate = "";
      this.queryParams.endDate = "";
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.messagePage {
  .el-card {
    height: 93vh;
  }
  .InfoBar {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .InfoTime {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        white-space: nowrap;
      }
    }
  }
}
</style>