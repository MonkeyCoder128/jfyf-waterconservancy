<template>
  <el-row :gutter="12">
  <el-col :span="24">
    <el-card shadow="always" class="el-card">
      <div>
        <div>
          <el-form :inline="true" :model="formData" class="demo-form-inline" size="small">
            <el-form-item label="法律法规名称：">
              <el-input clearable v-model="formData.ruleName" placeholder="名称"></el-input>
            </el-form-item>
            <el-form-item label="日期：">
              <div class="block">
                <span class="demonstration"></span>
                <el-date-picker
                  v-model="formData.uploadDate"
                  type="datetimerange"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :default-time="['12:00:00']"
                  value-format="yyyy-MM-dd 00:00:00">
                </el-date-picker>
              </div>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" size="small" @click="serchData">查询</el-button>
            </el-form-item>
            <el-button class="addTerm" size="small" @click="dialogVisible = true">新增条例</el-button>
          </el-form>

        </div>
        <div class="con-table">
          <el-table
            :data="tableData.list"
            v-loading="listLoading"
            :header-cell-style="{background:'#F7F8FC',color:'#333333'}"
            style="width: 100%"
          >
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column prop="ruleName" label="法律法规名称" align="center">
            </el-table-column>
            <el-table-column prop="fileSize" label="文件大小" align="center">
            </el-table-column>
            <el-table-column prop="fileSuffix" label="文件类型" align="center">
            </el-table-column>
            <el-table-column prop="uploadDate" label="修改时间" align="center">
            </el-table-column>
            <el-table-column label="操作" align="center">
              <template slot-scope="scope">
                <el-button
                  size="small"
                  type="text"
                  @click="check(scope.row.filePreviewPath)"
                  >查看</el-button
                >
                <el-button
                  size="small"
                  type="text"
                  @click="download(scope.row.filePreviewPath)"
                  >下载</el-button
                >
                <el-button size="small" type="text" @click="deletedata(scope.row.id)" style="color:#FF6579"
                  >删除</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div class="con-page">
          <el-pagination
            background
            :page-size="tableData.pagination.size"
            :page-count="tableData.pagination.pages"
            :page-sizes="[10, 20, 50, 100]"
            :total="tableData.pagination.total"
            :current-page="tableData.pagination.current"
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
            action="http://112.125.88.230:8002/upload/uploadFileByDate"
            multiple
            :before-upload="beforeAvatarUpload"
            :on-success="handleFileSuccess"
            name='fileData'>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
            <div class="el-upload__tip" slot="tip">只能上传pdf/word/excel文件，且不超过3M</div>
          </el-upload>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="uploadFile">确 定</el-button>
          </span>
        </el-dialog>
        <!-- <iframe src='http://127.0.0.1/file/2022-04-24/221807266527969280.jpg' width='100%' height='100%' frameborder='1'>
			  </iframe> -->
      </div>
    </el-card>
  </el-col>
</el-row>
</template>
<script>
  import {Regulations,DeleteRule,InsertRule} from '@/Api/safe'
  export default {
    name:'',
    data () {
      return {
        // 表单查询数据
        formData: {
          ruleName: '',
          // reportDate: '',
          endDate: '',
          fileId:'',
          filePreviewPath:'',
          fileSavePath:'',
          fileSize:'',
          fileSuffix:'',
          id:'',
          startDate: '',
          currentPage: 1,
          sortField:'',
          sortOrder:'',
          pageSize: 10,
          uploadDate:'',
        },
        // 表格数据
        tableData: {
          list: [
            {
              id: '',
              ruleName:'',
              uploadDate: '',
              fileSuffix: '',
              fileSize:'',
              pages: 0,
              size: 10,
              current: 1,
              total: 1
            },
          ],
          pagination:{
            pages: 0,
            size: 10,
            current: 1,
            total: null
          }
        },
        // 新上传的表格数据
        newRuleDate:{
          fileId: "",
          filePreviewPath: "",
          fileSavePath: "",
          fileSize: "",
          fileSuffix: "",
          ruleName: "",
          uploadDate: ""
        },
        listLoading: false,
        // 控制上传条例dialog的显示
        dialogVisible: false,
      };
    },
    created(){
      this.initData();
    },
    methods: {
      // 预览
      //url为word文件地址，可以是ip地址
      wordPreview(url) {
        var xurl = "https://view.xdocin.com/xdoc?_xdoc=";
        xurl += encodeURIComponent(url);
        console.log(xurl);
        var ops = {
          "_pdf": true, //word/excel文档尝试以pdf方式显示，默认false
          // "_watermark": "XDOC文档预览", //水印文本，显示水印
          // "_saveable": false, //是否允许保存PDF，默认true
          // "_printable": false, //是否允许打印PDF，默认true
          // "_copyable": false, //是否允许选择复制内容，默认true
          // "_toolbar": false, //是否显示底部工具条，默认true
          // "_title": "文档预览", //自定义标题
          // "_expire": 30, //预览链接有效期，单位分钟，默认永久有效
          // "_limit": "1,3", //限制页数，如：“5”表示只显示前5页，“2,5”表示从第2页开始的5页，对pdf/doc/docx/ppt/pptx有效
        };//传入预览参数
        for (var a in ops) {
          xurl += "&" + encodeURIComponent(a) + "=" + encodeURIComponent(ops[a]);
        }
        window.open(xurl);
      },
      // 获取list
      initData (){
        this.listLoading = true;
        Regulations({currentPage:this.tableData.pagination.current,pageSize:this.tableData.pagination.size},window.sessionStorage.getItem("token")).then(res=>{
          if(res.data.code == 200){
            this.tableData.list = res.data.result.records;
            this.tableData.pagination.current = res.data.result.current;
            this.tableData.pagination.pages = res.data.result.pages;
            this.tableData.pagination.size = res.data.result.size;
            this.tableData.pagination.total = res.data.result.total;
            this.listLoading = false;
          }else{
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.describe,
            });
          }
        })
      },
      // 查询数据
      serchData () {
        this.listLoading = true;
        this.formData.startDate = '';
        this.formData.endDate = '';
        if(this.formData.uploadDate !== '' && this.formData.uploadDate !== null){
          this.formData.startDate = this.formData.uploadDate[0];
          this.formData.endDate = this.formData.uploadDate[1];
        }
        this.formData.uploadDate = '';
        Regulations(this.formData, window.sessionStorage.getItem("token")).then(res=>{
          if(res.data.code == 200){
            this.tableData.list = res.data.result.records;
            this.listLoading = false;
          }else{
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.describe,
            });
          }
        })
      },
      // 改变页数
      changeCurrent (val) {
        console.log(val);
        this.tableData.pagination.current = val;
        this.initData ();
      },
      handleSizeChange (val) {
        console.log(val);
        this.tableData.pagination.size = val;
        this.initData ();
      },
      // 删除数据
      deletedata (id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteRule([id],window.sessionStorage.getItem("token")).then(res=>{
            if(res.data.code == 200){
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.initData();
            }else{
              this.$message({
                type: 'error',
                message: res.data.describe,
              });
            }
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 下载数据
      download(url){
        window.location.href = url;
      },
      // 查看数据
      check(url){
        console.log(url);
        // window.location.href = url;
        this.wordPreview(url)
      },
      // 上传文件
      beforeAvatarUpload(file) {
        // console.log(file);
        const isJPG = file.type === 'application/pdf' || 'application/vnd.ms-excel' || 'docx';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传文件只能是 pdf/xls/docx 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      // 文件生成成功的钩子函数
      handleFileSuccess(res, file){
        if(res.code == 200){
          this.newRuleDate.fileId = res.result[0].fileId;
          this.newRuleDate.filePreviewPath = res.result[0].filePathHttp;
          this.newRuleDate.fileSavePath = res.result[0].filePathSave;
          this.newRuleDate.fileSize = res.result[0].fileSize;
          this.newRuleDate.fileSuffix = res.result[0].fileSuffix;
          this.newRuleDate.uploadDate = res.result[0].uploadDate;
          this.newRuleDate.ruleName = res.result[0].fileName;
          console.log(this.newRuleDate);
        }else{
          this.$message({
            message: '文件上传失败,请重新上传！',
            type: 'warning'
          });
        }
      },
      // 提交上传文件
      uploadFile(){
        InsertRule([this.newRuleDate],window.sessionStorage.getItem("token")).then(res=>{
          console.log(res);
          this.initData();
        })
      }
    },
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
  .addTerm{
    float: right;
  }
  /deep/ .el-upload--text{
    width: 100%;
  }
  /deep/ .el-upload-dragger{
    width: 100% !important;
  }
  .con-page{
    margin-top: 15px;
  }
</style>
