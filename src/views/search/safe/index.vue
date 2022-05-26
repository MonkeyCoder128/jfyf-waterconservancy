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
              size="mini"
              ref="ruleForm"
            >
              <el-form-item label="时间">
                <div class="block" :span="6">
                  <span class="demonstration"></span>
                  <el-date-picker
                    v-model="formData.reportDate"
                    type="daterange"
                    start-placeholder="开始时间"
                    style="width: 200px"
                    end-placeholder="结束时间"
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00', '23:59:59']"
                  >
                  </el-date-picker>
                </div>
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
              <el-form-item label="上报情况" class="changeInputClass">
                <el-select
                  clearable
                  v-model="formData.reportType"
                  placeholder="情况上报"
                >
                  <el-option label="已上报" value="2"></el-option>
                  <el-option label="未上报" value="1"></el-option>
                </el-select>
              </el-form-item>
              <el-form-item>
                <el-button
                  style="border-radius: 5px"
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
              :key="tableData.list.id"
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
                    style="color: #ddb90a"
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
                  <span>{{ progressStatus.get(scope.row.progress)}}</span>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="scope">
                  <el-button size="small" type="text" @click="check(scope.row)">
                    <span
                      style="color: #1c48bf"
                      v-if="scope.row.reportType == 1"
                      >异常上报</span
                    >
                    <span style="color: #0269e9" v-else>编辑</span>
                  </el-button>
                  <el-button
                    v-if="userType == 'ROLE_ADMIN' && scope.row.status == 1"
                    :disabled="scope.row.reportType == 1 ? true : false"
                    size="small"
                    type="text"
                    @click="deletedata(scope.row.id)"
                  >
                    <span style="color: #148f97"> 解除异常 </span>
                  </el-button>
                  <el-button
                    v-if="userType == 'ROLE_ADMIN' && scope.row.status == 3"
                    :disabled="scope.row.reportType == 1 ? true : false"
                    size="small"
                    type="text"
                    @click="deletedata(scope.row.id)"
                  >
                    <span> 解除异常 </span>
                  </el-button>
                  <el-button
                    v-if="userType == 'ROLE_USER' && scope.row.status == 1"
                    :disabled="true"
                    size="small"
                    type="text"
                    @click="deletedata(scope.row.id)"
                  >
                    <span style="color: #148f97"> 已申请解除 </span>
                  </el-button>
                  <el-button
                    v-if="userType == 'ROLE_USER' && scope.row.status == 3"
                    :disabled="scope.row.reportType == 1 ? true : false"
                    size="small"
                    type="text"
                    @click="deletedata(scope.row.id)"
                  >
                    <span style="color: #148f97"> 申请解除 </span>
                  </el-button>
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
import {progressStatus} from '@/utils/public.js'
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
        status: "",
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
          },
        ],
        totalCount: 0,
        pageSize: 10,
        currPage: 1,
        totalPage: 1,
      },
      listLoading: false,
      // 操作按钮文字显示
      controlScopeText: "异常上报",
      // 存储用户类型
      userType: "",
      // 进展情况狂态码
      progressStatus,
    };
  },
  created() {
    // 获取用户类型
    const userInfo = JSON.parse(localStorage.getItem("userInfo"));
    this.userType = userInfo.authority;
    this.init();
  },
  methods: {
    // 获取数据
    init() {
      this.listLoading = true;
      this.tableData.currPage = 1;
      this.$api.SAFE.InintData({ status: [1, 3] }).then((res) => {
        if (res.code == 200) {
          this.tableData.list = res.result.data;
          this.listLoading = false;
          this.tableData.totalCount = res.result.total;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: res.msg,
          });
        }
      });
    },
    // 查询数据
    serchData() {
      this.listLoading = true;
      this.formData.startDate = "";
      this.formData.endDate = "";
      this.formData.status = [1, 3];
      if (
        this.formData.reportDate !== "" &&
        this.formData.reportDate !== null
      ) {
        this.formData.startDate = this.formData.reportDate[0];
        this.formData.endDate = this.formData.reportDate[1];
      }
      this.$api.SAFE.InintData(this.formData).then((res) => {
        if (res.code == 200) {
          this.tableData.list = res.result.data;
          this.listLoading = false;
          this.tableData.totalCount = res.result.total;
        } else {
          this.$message({
            showClose: true,
            type: "error",
            message: res.msg,
          });
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
    deletedata(id) {
      this.$confirm(
        "解除异常后，可在巡检记录查看上报情况。",
        "确定要解除该异常情况？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$api.SAFE.ReportErr({ id, status: 2, progress: 4 }).then(
            (res) => {
              if (res.code == 200) {
                this.$message({
                  showClose: true,
                  type: "success",
                  message: "异常解除成功!",
                });
                this.init();
              } else {
                this.$message({
                  showClose: true,
                  type: "error",
                  message: "已取消解除！",
                });
              }
            }
          );
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消解除！",
          });
        });
    },
    // 异常上报
    check(row) {
      this.$router.push({
        name: "childrenSafe",
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
      this.init();
    },
  },
  // 监听查询时间的变化
  // watch:{
  //   'formData.reportDate'(oldval,newval){
  //     this.formData.startDate = oldval[0];
  //     this.formData.endDate = oldval[1];
  //   }
  // }
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
/deep/.el-table__header {
  background: rgb(238, 238, 238);
  color: rgb(51, 51, 51);
}
</style>
