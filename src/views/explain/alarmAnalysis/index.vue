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
          <div class="InfoTime">
            <span style="margin: 0 10px 0 30px">时间</span>
            <el-date-picker
              size="mini"
              v-model="searchTime"
              type="daterange"
              range-separator="-"
              style="width: 200px"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              value-format="yyyy-MM-dd HH:mm:ss"
              :default-time="['00:00:00', '23:59:59']"
              @input="handleDate"
            >
            </el-date-picker>
          </div>
          <el-button
            style="margin-left: 15px"
            @click="querySearch()"
            size="mini"
            type="primary"
            >查询</el-button
          >
          <el-button style="margin-left: 15px" @click="resetTab()" size="mini"
            >重置</el-button
          >
        </div>
        <el-button
          style="float: right; border: 1px solid #319da4; color: #319da4"
          @click="exportTable()"
          size="mini"
          >表格导出
        </el-button>
      </div>
      <el-table
        :data="warningData"
        style="width: 100%"
        :header-cell-style="{ background: '#EEEEEE' }"
      >
        <el-table-column prop="sn" label="序号" />
        <el-table-column prop="location" label="监测点位" />
        <el-table-column prop="createTime" label="上报时间" />
        <el-table-column prop="address" label="上报数据" />
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
      warningData: [
        {
          sn:'1',
          location: "投入式水位计一",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'2',
          location: "投入式水位计二",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'3',
          location: "投入式水位计三",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'4',
          location: "GNSS接收机一",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'5',
          location: "GNSS接收机二",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'6',
          location: "GNSS接收机三",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'5',
          location: "GNSS接收机四",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'6',
          location: "GNSS接收机五",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'7',
          location: "振弦式渗压计一",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'8',
          location: "振弦式渗压计二",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'9',
          location: "振弦式渗压计三",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'10',
          location: "流速流量仪一",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'11',
          location: "流速流量仪二",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
        {
          sn:'12',
          location: "流速流量仪三",
          createTime:'2022-05-26',
          address: "流量20，流速10",
        },
      ],
    };
  },
  created() {
    // this.getNewsList();
    // this.$api.NEWS.newsType(window.localStorage.getItem("token")).then(
    //   (res) => {
    //     if (res.code === 200) {
    //       this.optionsType = res.result;
    //     }
    //   }
    // );
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
          this.warningData = res.result.records;
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