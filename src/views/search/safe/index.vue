<template>
  <el-row :gutter="12">
  <el-col :span="24">
    <el-card shadow="always" class="el-card">
      <div>
        <div>
          <el-form :inline="true" :model="formData" class="demo-form-inline" size="small">
            <el-form-item label="日期：">
              <div class="block" :span='6'>
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="formData.reportDate"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="异常上报情况：">
              <el-select clearable v-model="formData.reportType" placeholder="情况上报">
                <el-option label="已上报" value="2"></el-option>
                <el-option label="未上报" value="1"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="异常情况：">
              <el-select multiple clearable v-model="formData.exceptionTypes" placeholder="异常情况">
                <el-option label="流速、流量" value=1>流速、流量</el-option>
                <el-option label="渗透压" value=2>渗透压</el-option>
                <el-option label="位移" value=3>位移</el-option>
                <el-option label="水质" value=4>水质</el-option>
                <el-option label="设备功能" value=5>设备功能</el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="serchData">查询</el-button>
            </el-form-item>
          </el-form>

        </div>
        <div class="con-table">
          <el-table
            :data="tableData.list"
            v-loading="listLoading"
            :header-cell-style="{background:'#F7F8FC',color:'#333333'}"
            style="width: 100%"
            :key="tableData.list.id"
          >
            <el-table-column prop="exceptionLocation" label="异常位置" align="center">
            </el-table-column>
            <el-table-column prop="deviceStatus" label="设备状态" align="center">
              <template slot-scope="scope">
                <span style="color:#ddb90a" v-if="scope.row.deviceStatus == 1">设备离线</span>  
                <span v-else>设备在线</span>
              </template>
            </el-table-column>
            <el-table-column prop="exceptionType" label="异常分类" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.exceptionType == 1">流速流量异常</span>
                <span v-if="scope.row.exceptionType == 2">渗透压异常</span>
                <span v-if="scope.row.exceptionType == 3">位移</span>
                <span v-if="scope.row.exceptionType == 4">水质异常</span>
                <span v-if="scope.row.exceptionType == 5">设备功能异常</span>
              </template>
            </el-table-column>
            <el-table-column prop="reportDate" label="上报时间" align="center">
            </el-table-column>
            <el-table-column prop="reportType" label="异常上报情况" align="center">
              <template slot-scope="scope">
                <span style="color:#ff6579" v-if="scope.row.reportType == 1">未上报</span>
                <span v-else>已上报</span>
              </template>
            </el-table-column>
            <el-table-column prop="progress" label="进展" align="center">
              <template slot-scope="scope">
                <span v-if="scope.row.progress == 0">平台预警</span>
                <span v-if="scope.row.progress == 1">等待维修</span>
                <span v-if="scope.row.progress == 2">维修中</span>
                <span v-if="scope.row.progress == 3">维修完成</span>
                <span v-if="scope.row.progress == 4">已解决</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="check(scope.row.id)"
                  >
                  <span v-if="scope.row.reportType == 1">异常上报</span>
                  <span style="color:#23db3a" v-else>查看/编辑</span>
                  </el-button
                >
                <el-button :disabled="scope.row.status == 1 ? true : false" size="small" type="text" @click="deletedata(scope.row.id)" style="color:#FF6579">
                  <span style="color:gray" v-if="scope.row.status == 1">
                    已解除异常
                  </span>
                  <span style="color:#409EFF" v-if="scope.row.status == 3">
                    申请解除异常
                  </span>
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
            layout="sizes,prev, pager, next"
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
import {InintData,ReportErr} from '@/api/safe'
export default {
  name:'',
  data () {
    return {
      // 表单查询数据
      formData: {
        reportDate: [],
        endDate: '',
        startDate: '',
        reportType: '',
        exceptionTypes: '',
        status:'',
      },
      // 表格数据
      tableData: {
        list: [
          {
            id: '',
            exceptionLocation: '',
            exceptionType: '',
            reportDate: '',
            reportType: '',
            progress: '',
            deviceStatus:'',
          },
        ],
        totalCount: 0,
        pageSize: 10,
        currPage: 1,
        totalPage: 1
      },
      listLoading: false,
      // 操作按钮文字显示
      controlScopeText:'异常上报',
    };
  },
  created(){
    this.init();
  },
  methods: {
    // 获取数据
    init(){
      this.listLoading = true;
      this.tableData.currPage = 1;
      InintData({status:[1,3]},window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          this.tableData.list = res.data.result.data;
          this.listLoading = false;
          this.tableData.totalCount = res.data.result.total;
        }else{
          this.$message({
            showClose: true,
            type: 'error',
            message: res.data.msg,
          });
        }
      })
    },
    // 查询数据
    serchData () {
      this.listLoading = true;
      this.formData.startDate = '';
      this.formData.endDate = '';
      this.formData.status = [1,3];
      if(this.formData.reportDate !== '' && this.formData.reportDate !== null){
        this.formData.startDate = this.formData.reportDate[0];
        this.formData.endDate = this.formData.reportDate[1];
      }
      InintData(this.formData, window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          this.tableData.list = res.data.result.data;
          this.listLoading = false;
        }else{
          this.$message({
            showClose: true,
            type: 'error',
            message: res.data.msg,
          });
        }
      })
    },
    // 改变页数
    changeCurrent (val) {
      this.tableData.currPage = val
      this.init();
    },
    handleSizeChange (val) {
      this.tableData.pageSize = val
      this.init();
    },
    // 解除异常
    deletedata (id) {
      this.$confirm('是否确定解除巡检异常情况?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        ReportErr({id,status:2,progress:4},window.sessionStorage.getItem("token")).then(res=>{
          if(res.data.code == 200){
            this.$message({
              showClose: true,
              type: 'success',
              message: '异常解除成功!'
            });
            this.init();
          }else{
            this.$message({
              showClose: true,
              type: 'error',
              message: '已取消解除！'
            }); 
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消解除！'
        });          
      });
    },
    // 异常上报
    check(id){
      this.$router.push({name:'childrenSafe',query: {id}})
    },
    // 从后台查询数据
    getdata () {
      this.listLoading = true
      this.$http({
        method: 'post',
        url: this.$http.adornUrl('/base/basestudents/list'),
        headers: { token: this.$cookie.get('token') },
        data: this.$http.adornData({
          name: this.formData.name,
          size: this.formData.size,
          type: this.formData.type,
          currPage: this.tableData.currPage,
          pageSize: this.tableData.pageSize,
        })
      }).then(res => {
        if (res.data.code === 0) {
          this.tableData = res.data.page
        } else {
          this.$message({
            message: res.data.msg,
            type: 'error',
            duration: 1000
          })
        }
        this.listLoading = false
      })
    },
  },
  // 监听查询时间的变化
  // watch:{
  //   'formData.reportDate'(oldval,newval){
  //     this.formData.startDate = oldval[0];
  //     this.formData.endDate = oldval[1];
  //     console.log(this.formData.startDate);
  //   }
  // }
}
</script>
<style lang="scss" scoped>
  .el-card{
    height: 93vh;
    overflow: scroll;
    overflow-x: hidden;
  }
  /deep/::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width: 300px;
  }
  .con-page{
    margin-top: 15px;
  }
</style>
