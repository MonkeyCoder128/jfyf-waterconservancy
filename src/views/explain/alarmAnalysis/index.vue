<template>
  <div class="alarmAnalysisPage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <div class="InfoTime">
          <div class="InfoTime">
            <span style="margin-right: 10px">设备</span>
            <el-select
              @change="changeType"
              v-model="queryParams.type"
              size="small"
              placeholder="请选择消息类型"
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
          <div class="InfoTime">
            <span style="margin: 0 10px 0 30px">时间</span>
            <el-date-picker
              size="small"
              v-model="searchTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd 00:00:00"
              @input="handleDate"
            >
            </el-date-picker>
          </div>
          <el-button
            style="margin-left: 15px"
            @click="querySearch()"
            size="small"
            type="primary"
            >查询</el-button
          >
          <el-button style="margin-left: 15px" @click="resetTab()" size="small"
            >重置</el-button
          >
        </div>
        <el-button style="float: right" @click="exportTable()" size="small"
          >表格导出
        </el-button>
      </div>
      <el-table
        :data="newsData"
        style="width: 100%"
        :header-cell-style="{ background: '#EEEEEE' }"
      >
        <el-table-column prop="content" label="序号" />
        <el-table-column prop="createTime" label="监测点位" />
        <el-table-column prop="createTime" label="上报时间" />
        <el-table-column prop="type" label="上报数据" />
      </el-table>
      <el-pagination
        background
        style="margin-top: 25px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="  prev, pager, next,sizes, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "alarmAnalysis",
  data() {
    return {
      queryParams: {
        currentPage: 1,
        pageSize: 10,
        type: "",
        startDate: "",
        endDate: "",
      },
      searchTime: "",
      optionsType: [],
      total: 0,
      newsData: [],
    };
  },
  created() {
    this.getNewsList();
    this.$api.NEWS.newsType(window.localStorage.getItem("token")).then(
      (res) => {
        if (res.code === 200) {
          this.optionsType = res.result;
        }
      }
    );
  },
  methods: {
    /** 表格筛选 */
    changeType(val) {
      this.queryParams.type = val;
      this.getNewsList();
    },
    querySearch() {
      console.log("%c查询：", "color:red;font-size:18px;font-weight:bold;");
    },
    exportTable() {
      console.log("%c导出：", "color:red;font-size:18px;font-weight:bold;");
    },
    /** 重置 */
    resetTab() {
      this.searchTime = "";
      this.queryParams.type = "";
      this.queryParams.startDate = "";
      this.queryParams.endDate = "";
      this.getNewsList();
    },
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
      this.getNewsList();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getNewsList();
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
        this.getNewsList();
      });
    },
    /** 获取消息列表 */
    getNewsList() {
      this.$api.NEWS.newsList(
        this.queryParams,
        window.localStorage.getItem("token")
      ).then((res) => {
        if (res.code === 200) {
          this.newsData = res.result.records;
          this.total = res.result.total;
        }
      });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.alarmAnalysisPage {
  .el-card {
    height: 93vh;
  }

  .InfoBar {
    width: 100%;
    display: flex;
    justify-content: space-between;
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