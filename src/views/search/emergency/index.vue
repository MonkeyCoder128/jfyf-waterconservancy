<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always" class="el-card">
        <div>
          <div>
            <el-form
              :inline="true"
              :model="formData"
              class="demo-form-inline"
              label-width=""
              :label-position="labelPosition"
              size="mini"
              ref="ruleForm"
            >
              <el-form-item label="时间">
                <el-date-picker
                  v-model="formData.reportDate"
                  type="daterange"
                  style="width: 200px"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  size="mini"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  :default-time="['00:00:00', '23:59:59']"
                >
                </el-date-picker>
              </el-form-item>
              <el-form-item label="异常情况" class="changeInputClass">
                <el-select
                  multiple
                  clearable
                  v-model="formData.exceptionTypes"
                  placeholder="异常情况"
                >
                  <el-option label="流速、流量" value="1">流速、流量</el-option>
                  <el-option label="渗透压" value="2">渗透压</el-option>
                  <el-option label="位移" value="3">位移</el-option>
                  <el-option label="水质" value="4">水质</el-option>
                  <el-option label="设备功能" value="5">设备功能</el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="巡检管理" class="changeInputClass">
                <el-select
                  clearable
                  v-model="formData.status"
                  placeholder="请选择"
                >
                  <el-option label="已解除" value="2"></el-option>
                  <el-option label="未解除" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="上报情况" class="changeInputClass">
                <el-select
                  clearable
                  v-model="formData.reportType"
                  placeholder="请选择"
                >
                  <el-option label="已上报" value="2"></el-option>
                  <el-option label="未上报" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="
                    background-color: #1c48bf;
                    border: 1px solid #1c48bf;
                    border-radius: 5px;
                  "
                  type="primary"
                  size="mini"
                  @click="serchData"
                  >查询</el-button
                >
                <el-button
                  style="
                    border: 1px solid #1c48bf;
                    border-radius: 5px;
                    color: #1c48bf;
                  "
                  size="mini"
                  @click="resetForm('ruleForm')"
                  >重置</el-button
                >
              </el-form-item>
            </el-form>
          </div>
          <div class="con-table">
            <el-table
              :data="tableData.list"
              v-loading="listLoading"
              :header-cell-style="{
                background: '#EEEEEE',
                color: '#333333',
                textAlign: 'left',
              }"
              :cell-style="{ textAlign: 'left' }"
              style="width: 100%"
            >
              <el-table-column
                prop="exceptionLocation"
                label="异常位置"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="deviceStatus"
                label="设备状态"
                align="center"
              >
                <template slot-scope="scope">
                  <span
                    style="color: #f8c202"
                    v-if="scope.row.deviceStatus == 1"
                    >离线</span
                  >
                  <span v-else>在线</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="exceptionType"
                label="异常情况"
                align="center"
              >
                <template slot-scope="scope">
                  <span
                    style="color: #f8c202"
                    v-if="
                      scope.row.exceptionType == 1 &&
                      scope.row.deviceStatus == 2
                    "
                    >流速流量异常</span
                  >
                  <span
                    style="color: #f8c202"
                    v-if="
                      scope.row.exceptionType == 2 &&
                      scope.row.deviceStatus == 2
                    "
                    >渗透压异常</span
                  >
                  <span
                    style="color: #f8c202"
                    v-if="
                      scope.row.exceptionType == 3 &&
                      scope.row.deviceStatus == 2
                    "
                    >位移</span
                  >
                  <span
                    style="color: #f8c202"
                    v-if="
                      scope.row.exceptionType == 4 &&
                      scope.row.deviceStatus == 2
                    "
                    >水质异常</span
                  >
                  <span
                    style="color: #f8c202"
                    v-if="
                      scope.row.exceptionType == 5 &&
                      scope.row.deviceStatus == 2
                    "
                    >设备功能异常</span
                  >
                  <span v-if="scope.row.deviceStatus == 1">/</span>
                </template>
              </el-table-column>
              <el-table-column
                prop="reportDate"
                label="预警时间"
                align="center"
              >
              </el-table-column>
              <el-table-column
                prop="reportType"
                label="上报情况"
                align="center"
              >
                <template slot-scope="scope">
                  <span style="color: #d72a13" v-if="scope.row.reportType == 1"
                    >未上报</span
                  >
                  <span v-else>已上报</span>
                </template>
              </el-table-column>
              <el-table-column prop="progress" label="进展情况" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.progress == 0">平台预警</span>
                  <span v-if="scope.row.progress == 1">等待维修</span>
                  <span v-if="scope.row.progress == 2">维修中</span>
                  <span v-if="scope.row.progress == 3">维修完成</span>
                  <span v-if="scope.row.progress == 4">已解决</span>
                </template>
              </el-table-column>
              <el-table-column prop="status" label="巡检管理" align="center">
                <template slot-scope="scope">
                  <span v-if="scope.row.status == 2">已解除异常</span>
                  <span style="color: #d72a13" v-else>未解除异常</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="text"
                    style="color: #1c48bf"
                    @click="check(scope.row)"
                    >查看
                  </el-button>
                  <!-- <el-button size="small" type="text" @click="deletedata(scope.row.id)">
                  <span style="color:#606266;" v-if="scope.row.status == 2">已处理</span>
                  <span style="color:#D72A13;" v-else>未处理</span>
                </el-button> -->
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="con-page">
            <el-pagination
              background
              :page-size="tableData.pageSize"
              :page-count="tableData.totalPage"
              :page-sizes="[10, 20, 50, 100]"
              :total="tableData.totalCount"
              :current-page="tableData.currPage"
              layout="prev,pager,next,sizes,jumper"
              @current-change="changeCurrent"
              @size-change="handleSizeChange"
            >
            </el-pagination>
          </div>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
export default {
  name: "",
  data() {
    return {
      // 表单查询数据
      formData: {
        reportDate: [],
        endDate: "",
        startDate: "",
        reportType: "",
        exceptionTypes: "",
        status: [],
      },
      // 表格数据
      tableData: {
        list: [
          {
            id: "",
            exceptionLocation: "",
            exceptionType: "",
            reportDate: "",
            reportType: "",
            progress: "",
            deviceStatus: "",
            status: "",
          },
        ],
        totalCount: 0,
        pageSize: 10,
        currPage: 1,
        totalPage: 1,
      },
      listLoading: false,
      // 表单对齐方式
      labelPosition: "right",
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 获取数据
    init() {
      this.tableData.currPage = 1;
      this.listLoading = true;
      this.$api.SAFE.InintData({}).then((res) => {
        if (res.code == 200) {
          this.tableData.list = res.result.data;
          this.listLoading = false;
          this.tableData.totalCount = res.result.total;
        }
      });
    },
    // 查询数据
    serchData() {
      this.listLoading = true;
      this.tableData.currPage = 1;
      this.formData.startDate = "";
      this.formData.endDate = "";
      if (this.formData.status == "") {
        this.formData.status = [];
      } else {
        // 判断 this.formData.status 状态，如果为string，转成arr；
        if (typeof this.formData.status == "string") {
          let arr = [];
          if (this.formData.status == 1) {
            arr.push(3);
          }
          arr.push(Number(this.formData.status));
          this.formData.status = arr;
        }
      }
      if (
        this.formData.reportDate !== "" &&
        this.formData.reportDate !== null
      ) {
        this.formData.startDate = this.formData.reportDate[0];
        this.formData.endDate = this.formData.reportDate[1];
      }
      this.$api.SAFE.InintData(this.formData).then((res) => {
        // 接口请求完成之后把 this.formData.status 改正字符串格式
        if (this.formData.status.length == 2) {
          this.formData.status = "1";
        } else {
          this.formData.status = String(this.formData.status);
        }
        if (res.code == 200) {
          this.tableData.list = res.result.data;
          this.listLoading = false;
          this.tableData.totalCount = res.result.total;
        }
      });
    },
    // 改变页数
    changeCurrent(val) {
      this.tableData.currPage = val;
      this.init();
    },
    handleSizeChange(val) {
      this.tableData.pageSize = val;
      this.init();
    },
    // 解除异常
    deletedata(id) {},
    // 查看异常情况
    check(row) {
      this.$router.push({
        name: "childrenEme",
        params: {
          id: row.id,
          type: row.reportType,
          exception: row.exceptionType,
        },
      });
    },
    // 表单重置
    resetForm(formName) {
      // this.$refs[formName].resetFields();
      this.formData.reportDate = [];
      this.formData.exceptionTypes = [];
      this.formData.reportType = "";
      this.formData.status = "";
      this.init();
    },
  },
};
</script>
<style lang="scss" scoped>
.el-card {
  height: 93vh;
  overflow: scroll;
  overflow-x: hidden;
}
/deep/::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.el-date-editor--datetimerange.el-input,
.el-date-editor--datetimerange.el-input__inner {
  width: 300px;
}
.con-page {
  margin-top: 15px;
  float: right;
}
// 设置input样式
.changeInputClass {
  /deep/ .el-input__inner {
    width: 170px;
  }
}
</style>
