<template>
  <div class="messagePage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <div class="InfoTime">
          <span style="margin-right: 10px">时间</span>
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
          <span style="margin: 0 10px 0 30px">消息类型</span>
          <el-select
            @change="changeType"
            v-model="queryParams.type"
            size="mini"
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
        :data="newsData"
        style="width: 100%"
        :row-style="{ height: '59px' }"
        :cell-style="{ padding: '0' }"
        :header-cell-style="{ background: '#EEEEEE' }"
      >
        <el-table-column prop="content" label="消息内容" />
        <el-table-column prop="type" label="消息类型">
          <template slot-scope="scope">
            {{ scope.row.type === "0" ? "异常状态预警" : "申请解除异常状态" }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="消息时间" width="400" />
      </el-table>
      <el-pagination
        background
        style="margin-top: 25px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.currentPage"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
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
    this.$api.NEWS.newsType().then((res) => {
      if (res.data.code === 200) {
        this.optionsType = res.data.result;
      }
    });
  },
  methods: {
    /** 表格筛选 */
    changeType(val) {
      this.queryParams.type = val;
      this.getNewsList();
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
      this.$api.NEWS.newsList(this.queryParams).then((res) => {
        if (res.data.code === 200) {
          this.newsData = res.data.result.records;
          this.total = res.data.result.total;
        }
      });
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