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
                  v-model="formData.dataTime"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item label="异常上报情况：">
              <el-select clearable v-model="formData.type" placeholder="情况上报">
                <el-option label="已上报" value="1"></el-option>
                <el-option label="未上报" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="设备异常：">
              <el-select clearable v-model="formData.type" placeholder="设备异常">
                <el-option label="异常1" value="1"></el-option>
                <el-option label="异常2" value="2"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="异常情况：">
              <el-select clearable v-model="formData.type" placeholder="异常情况">
                <el-option label="情况1" value="1"></el-option>
                <el-option label="情况2" value="2"></el-option>
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
          >
            <el-table-column prop="name" label="异常位置" align="center">
            </el-table-column>
            <el-table-column prop="size" label="设备异常" align="center">
            </el-table-column>
            <el-table-column prop="type" label="点位异常" align="center">
            </el-table-column>
            <el-table-column prop="reportTime" label="上报时间" align="center">
            </el-table-column>
            <el-table-column prop="situation" label="异常上报情况" align="center">
            </el-table-column>
            <el-table-column prop="progress" label="进展" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="check(scope.row.id)"
                  >异常上报</el-button
                >
                <el-button size="mini" type="text" @click="deletedata(scope.row.id)" style="color:#FF6579"
                  >解除异常</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="con-page" v-if="tableData.totalPage > 1">
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

export default {
  name:'',
  data () {
    return {
      // 表单查询数据
      formData: {
        dataTime: '',
        size: '',
        type: '',
      },
      // 表格数据
      tableData: {
        list: [
          {
            name: 'craig',
            size: '178kb',
            type: 'excel',
            reportTime: '2019-07-14',
            situation: '/',
            progress: '等待维修'
          },
          {
            name: 'edison',
            size: '178kb',
            type: 'word',
            reportTime: '2019-07-14',
            situation: '/',
            progress: '等待维修'
          },
          {
            name: 'daniue',
            size: '178kb',
            type: 'pdf',
            reportTime: '2019-07-14',
            situation: '/',
            progress: '等待维修'
          }
        ],
        totalCount: 0,
        pageSize: 10,
        currPage: 1,
        totalPage: 1
      },
      listLoading: false,
    };
  },
  methods: {
    // 查询数据
    serchData () {
      this.tableData.currPage = 1
      this.getdata()
    },
    // 改变页数
    changeCurrent (val) {
      this.tableData.currPage = val
      this.getdata()
    },
    handleSizeChange (val) {
      this.tableData.pageSize = val
      this.getdata()
    },
    // 解除异常
    deletedata (id) {
      this.$confirm('是否确定解除巡检异常情况?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        console.log('解除异常' + id);
        this.$message({
          type: 'success',
          message: '删除成功!'
        });
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        });          
      });
    },
    // 异常上报
    check(id){
      console.log('异常上报' + id);
      this.$router.push({name:'childrenSafe',query: {id:'1'}})
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
}
</script>
<style lang="scss" scoped>
  .el-card{
    height: 93vh;
  }
  .el-date-editor--datetimerange.el-input, .el-date-editor--datetimerange.el-input__inner{
    width: 300px;
  }
</style>
