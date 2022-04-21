<template>
  <el-row :gutter="12">
  <el-col :span="24">
    <el-card shadow="always" class="el-card">
      <div>
        <div>
          <el-form :inline="true" :model="formData" class="demo-form-inline">
            <el-form-item label="法律法规名称：">
              <el-input clearable v-model="formData.name" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="文件大小：">
              <el-input clearable v-model="formData.size" placeholder="文件大小"></el-input>
            </el-form-item>
            <el-form-item label="文件类型：">
              <el-select clearable v-model="formData.type" placeholder="文件类型">
                <el-option label="PDF" value="pdf"></el-option>
                <el-option label="WORD" value="word"></el-option>
                <el-option label="EXCEL" value="excel"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="medium" @click="serchData">查询</el-button>
            </el-form-item>
            <el-button class="addTerm" @click="dialogVisible = true">新增条例</el-button>
          </el-form>

        </div>
        <div class="con-table">
          <el-table
            :data="tableData.list"
            v-loading="listLoading"
            :header-cell-style="{background:'#F7F8FC',color:'#333333'}"
            style="width: 100%"
          >
            <el-table-column prop="name" label="法律法规名称" align="center">
            </el-table-column>
            <el-table-column prop="size" label="文件大小" align="center">
            </el-table-column>
            <el-table-column prop="type" label="文件类型" align="center">
            </el-table-column>
            <el-table-column prop="midifyTime" label="修改时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="mini"
                  type="text"
                  @click="check(scope.row.id)"
                  >查看</el-button
                >
                <el-button
                  size="mini"
                  type="text"
                  @click="dowmload(scope.row.id)"
                  >下载</el-button
                >
                <el-button size="mini" type="text" @click="deletedata(scope.row.id)" style="color:#FF6579"
                  >删除</el-button
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
        <el-dialog
          title="新增条例文件"
          :visible.sync="dialogVisible"
          width="30%">
          <el-upload
            class="upload-demo"
            drag
            action="https://jsonplaceholder.typicode.com/posts/"
            multiple
            :before-upload="beforeAvatarUpload">
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传pdf/word/excel文件，且不超过3M</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </span>
        </el-dialog>
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
          name: '',
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
              midifyTime: '2019-07-14'
            },
            {
              name: 'edison',
              size: '178kb',
              type: 'word',
              midifyTime: '2019-07-14'
            },
            {
              name: 'daniue',
              size: '178kb',
              type: 'pdf',
              midifyTime: '2019-07-14'
            }
          ],
          totalCount: 0,
          pageSize: 10,
          currPage: 1,
          totalPage: 1
        },
        listLoading: false,
        // 控制上传条例dialog的显示
        dialogVisible: false,
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
      // 删除数据
      deletedata (id) {
        console.log('删除数据' + id);
      },
      // 下载数据
      dowmload(id){
        console.log('下载数据' + id);
      },
      // 查看数据
      check(id){
        console.log('查看数据' + id);
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
      // 上传文件
      beforeAvatarUpload(file) {
        console.log(file);
        const isJPG = file.type === 'application/pdf' || 'application/vnd.ms-excel' || 'docx';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传文件只能是 pdf/xls/docx 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      }
    },
  }
</script>
<style lang="scss" scoped>
  .el-card{
    height: 93vh;
  }
  .addTerm{
    float: right;
  }
  .el-upload{
    width: 100%;
  }
  .el-upload-dragger{
    width: 100% !important;
  }
</style>
