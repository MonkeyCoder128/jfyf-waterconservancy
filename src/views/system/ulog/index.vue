<template>
  <div class="ulogPage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <div class="InfoTime">
          <span style="margin-right: 10px">时间</span>
          <el-date-picker
            size="mini"
            style="width: 200px"
            v-model="searchTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            value-format="yyyy-MM-dd HH:mm:ss"
            :default-time="['00:00:00', '23:59:59']"
            @input="handleDate"
          >
          </el-date-picker>
        </div>
      </div>
      <el-table
        :data="ulogData"
        style="width: 100%"
        :header-cell-style="{ background: '#EEEEEE' }"
        :row-style="{height:'59px'}" :cell-style="{padding: '0'}"
      >
        <el-table-column prop="username" label="用户名" />
        <el-table-column prop="requestIp" label="IP" />
        <el-table-column prop="address" label="IP来源" />
        <el-table-column prop="description" label="描述" />
        <el-table-column prop="browser" label="浏览器" />
        <el-table-column prop="createTime" label="操作日期" />
      </el-table>
      <el-pagination
        background
        style="margin-top: 40px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "Ulog",
  data() {
    return {
      queryParams: {
        page: 1,
        size: 10,
        startDate: "",
        endDate: "",
      },
      searchTime: "",
      total: 0,
      ulogData: [],
    };
  },
  created() {
    this.getUlogList();
  },
  methods: {
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
      this.getUlogList();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getUlogList();
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
        this.getUlogList();
      });
    },
    /** 获取操作日志列表 */
    getUlogList() {
      this.$api.ULOG.ulogData(this.queryParams).then((res) => {
        if (res.code === 200) {
          this.ulogData = res.result.data;
          this.total = res.result.total;
        }
      });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.ulogPage {
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