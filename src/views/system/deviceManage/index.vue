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
  name: "DeviceManage",
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
          title: "水质测定仪一",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "投入式水位计三",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "0",
        },
        {
          title: "GNSS接收机二",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "振弦式渗压计一",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "GNSS接收机五",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "流速流量仪一",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "水质测定仪一",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
        {
          title: "水质测定仪三",
          address: "陕西省西安市金丰水库",
          time:'2022-05-22  12:00:12',
          type: "1",
        },
      ],
      optionsType: [
        {
          key: "01",
          value: "陕西省西安市金丰水库",
        },
        {
          key: "02",
          value: "陕西省西安市金丰水库",
        },
        {
          key: "03",
          value: "陕西省西安金丰水库",
        },
        {
          key: "04",
          value: "陕西省西安市金丰水库",
        },
        {
          key: "05",
          value: "陕西省西安市金丰水库",
        },
        {
          key: "06",
          value: "陕西省西安市金丰水库",
        },
        {
          key: "07",
          value: "陕西省西安市金丰水库",
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