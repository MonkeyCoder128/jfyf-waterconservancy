<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always" class="el-card">
        <div>
          <div>
            <el-form :inline="true" :model="formData" class="demo-form-inline" size="small" ref="ruleForm">
              <el-form-item label="" class="changeInputClass">
                <el-input clearable v-model="formData.ruleName" placeholder="搜索条例" suffix-icon="el-icon-search">
                </el-input>
              </el-form-item>
              <el-form-item label="时间">
                <div class="block">
                  <el-date-picker 
                    v-model="formData.uploadDate" 
                    type="daterange" 
                    start-placeholder="开始时间"
                    end-placeholder="结束时间" 
                    value-format="yyyy-MM-dd HH:mm:ss"
                    :default-time="['00:00:00','23:59:59']">
                  </el-date-picker>
                </div>
              </el-form-item>
              <el-form-item>
                <el-button style="
                    background-color: #1c48bf;
                    border: 1px solid #1c48bf;
                    border-radius: 5px;
                  " type="primary" size="small" @click="serchData">查询</el-button>
                <el-button style="
                    border: 1px solid #1c48bf;
                    border-radius: 5px;
                    color: #1c48bf;
                  " size="small" @click="resetForm('ruleForm')">重置</el-button>
              </el-form-item>
              <el-button class="addTerm" size="small" @click="dialogVisible = true">上传条例</el-button>
            </el-form>
          </div>
          <!-- 全选选中出现 -->
          <div v-if="isAllSelect == true" style="margin-bottom: 10px">
            <el-button style="
                border: 1px solid #d72a13;
                border-radius: 5px;
                color: #d72a13;
              " size="small" @click="allSearch">
              删除{{ this.selectNumber }}项
            </el-button>
            <el-button style="
                border: 1px solid #148f97;
                border-radius: 5px;
                color: #148f97;
              " size="small" @click="allSelectDownload">
              下载{{ this.selectNumber }}项
            </el-button>
            <el-button style="
                border: 1px solid #999999;
                border-radius: 5px;
                color: #999999;
              " size="small" @click="allSelectCancel">
              取消{{ this.selectNumber }}项
            </el-button>
          </div>
          <div class="con-table">
            <el-table :data="tableData.list" v-loading="listLoading" @selection-change="selectAll" ref="multipleTable"
              :header-cell-style="{ background: '#EEEEEE', color: '#333333' }" style="width: 100%">
              <el-table-column type="selection" width="55"> </el-table-column>
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
                  <el-button size="small" type="text" style="color: #1c48bf" @click="check(scope.row.filePreviewPath)">
                    查看</el-button>
                  <el-button size="small" type="text" style="color: #148f97"
                    @click="download(scope.row.filePreviewPath)">下载</el-button>
                  <el-button size="small" type="text" @click="deletedata(scope.row.id)" style="color: #d72a13">删除
                  </el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <div class="con-page">
            <el-pagination background :page-size="tableData.pagination.size" :page-count="tableData.pagination.pages"
              :page-sizes="[10, 20, 50, 100]" :total="tableData.pagination.total"
              :current-page="tableData.pagination.current" layout="prev,pager,next,sizes,jumper"
              @current-change="changeCurrent" @size-change="handleSizeChange">
            </el-pagination>
          </div>
          <el-dialog title="上传条例" :visible.sync="dialogVisible" width="30%">
            <el-upload class="upload-demo" 
              drag 
              action="http://112.125.88.230:8002/upload/uploadFileByDate"
              :multiple="true" :before-upload="beforeAvatarUpload" :on-change="handleChange"
              :on-success="handleFileSuccess" 
              ref='upload'
              name="fileData">
              <div class="el-upload__tip" slot="tip">
                *只能上传pdf/word文件，且不超过10M
              </div>
              <i style="font-size: 50px; margin-bottom: 10px" class="el-icon-plus"></i>
              <div class="el-upload__text">
                将文件拖到此处，或<em style="color: #1c48bf">点击上传</em>
              </div>
            </el-upload>
            <span slot="footer" class="dialog-footer">
              <el-button style="
                  border: 1px solid #bdbdbd;
                  border-radius: 5px;
                  color: gray;
                " size="small" @click="dialogVisible = false">取 消</el-button>
              <el-button style="
                  background-color: #1c48bf;
                  border: 1px solid #1c48bf;
                  border-radius: 5px;
                  color: #fff;
                " size="small" @click="uploadFile">上传</el-button>
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
  import {
    Regulations,
    DeleteRule,
    InsertRule
  } from '@/api/safe'
  export default {
    name: '',
    data() {
      return {
        // 表单查询数据
        formData: {
          ruleName: '',
          // reportDate: '',
          endDate: '',
          fileId: '',
          filePreviewPath: '',
          fileSavePath: '',
          fileSize: '',
          fileSuffix: '',
          id: '',
          startDate: '',
          currentPage: 1,
          sortField: '',
          sortOrder: '',
          pageSize: 10,
          uploadDate: '',
        },
        // 表格数据
        tableData: {
          list: [{
            id: '',
            ruleName: '',
            uploadDate: '',
            fileSuffix: '',
            fileSize: '',
            pages: 0,
            size: 10,
            current: 1,
            total: 1
          }, ],
          pagination: {
            pages: 0,
            size: 10,
            current: 1,
            total: null
          }
        },
        // 新上传的表格数据
        // newRuleDate:{
        //   fileId: "",
        //   filePreviewPath: "",
        //   fileSavePath: "",
        //   fileSize: "",
        //   fileSuffix: "",
        //   ruleName: "",
        //   uploadDate: ""
        // },
        newRuleDate: [

        ],
        // 最终生成的上传数据
        finallRuleDate:[],
        listLoading: false,
        // 控制上传条例dialog的显示
        dialogVisible: false,
        // 控制删除全选按钮的显示和隐藏
        isAllSelect: false,
        // 全选框选择了几条
        selectNumber: '',
        // 存储全选数据的id
        arrDeletId: [],
        // 存储全选数据的filePreviewPath
        arrDeletFilePreviewPath: [],
        count: 0,
      };
    },
    created() {
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
        }; //传入预览参数
        for (var a in ops) {
          xurl += "&" + encodeURIComponent(a) + "=" + encodeURIComponent(ops[a]);
        }
        window.open(xurl);
      },
      // 获取list
      initData() {
        this.listLoading = true;
        Regulations({
          currentPage: this.tableData.pagination.current,
          pageSize: this.tableData.pagination.size
        }, window.sessionStorage.getItem("token")).then(res => {
          if (res.data.code == 200) {
            this.tableData.list = res.data.result.records;
            this.tableData.pagination.current = res.data.result.current;
            this.tableData.pagination.pages = res.data.result.pages;
            this.tableData.pagination.size = res.data.result.size;
            this.tableData.pagination.total = res.data.result.total;
            this.listLoading = false;
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.describe,
            });
          }
        })
      },
      // 查询数据
      serchData() {
        this.listLoading = true;
        this.formData.startDate = '';
        this.formData.endDate = '';
        if (this.formData.uploadDate !== '' && this.formData.uploadDate !== null) {
          this.formData.startDate = this.formData.uploadDate[0];
          this.formData.endDate = this.formData.uploadDate[1];
        }
        this.formData.uploadDate = '';
        Regulations(this.formData, window.sessionStorage.getItem("token")).then(res => {
          if (res.data.code == 200) {
            this.tableData.list = res.data.result.records;
            this.listLoading = false;
          } else {
            this.$message({
              showClose: true,
              type: 'error',
              message: res.data.describe,
            });
          }
        })
      },
      // 改变页数
      changeCurrent(val) {
        console.log(val);
        this.tableData.pagination.current = val;
        this.initData();
      },
      handleSizeChange(val) {
        console.log(val);
        this.tableData.pagination.size = val;
        this.initData();
      },
      // 删除数据
      deletedata(id) {
        let arr;
        if (id.length !== undefined) {
          arr = this.arrDeletId;
        } else {
          let a = [];
          a.push(id);
          arr = a;
        }
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          DeleteRule(arr, window.sessionStorage.getItem("token")).then(res => {
            if (res.data.code == 200) {
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
              this.initData();
            } else {
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
      download(url) {
        if (typeof url == 'string') {
          window.location.href = url;
        } else if (typeof url == 'object') {
          for (var k in url) {
            this.downloadURL(url[k]);
          }
        }
        this.arrDeletFilePreviewPath = [];
      },
      downloadURL(url) {
        var hiddenIFrameID = 'hiddenDownloader' + this.count++;
        var iframe = document.createElement('iframe');
        iframe.id = hiddenIFrameID;
        iframe.style.display = 'none';
        document.body.appendChild(iframe);
        iframe.src = url;
      },
      // 查看数据
      check(url) {
        console.log(url);
        // window.location.href = url;
        this.wordPreview(url)
      },
      // 上传文件
      beforeAvatarUpload(file) {
        // console.log(file);
        const isJPG = file.type === 'application/pdf' || 'application/vnd.ms-excel' || 'docx';
        const isLt2M = file.size / 1024 / 1024 < 9;

        if (!isJPG) {
          this.$message.error('上传文件只能是 pdf/docx 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传文件大小不能超过 10MB!');
        }
        return isJPG && isLt2M;
      },
      // 文件生成成功的钩子函数
      handleFileSuccess(res, file) {
        if (res.code == 200) {
          this.newRuleDate.push(res.result[0]);
          for (let i in this.newRuleDate) {
            var object = {
              fileId:'',
              filePreviewPath:'',
              fileSavePath:'',
              fileSize:'',
              fileSuffix:'',
              uploadDate:'',
              ruleName:'',
            };
            object.fileId =this.newRuleDate[i].fileId;
            object.filePreviewPath =this.newRuleDate[i].filePathHttp;
            object.fileSavePath =this.newRuleDate[i].filePathSave;
            object.fileSize =this.newRuleDate[i].fileSize;
            object.fileSuffix =this.newRuleDate[i].fileSuffix;
            object.uploadDate =this.newRuleDate[i].uploadDate;
            object.ruleName =this.newRuleDate[i].fileName;

            this.finallRuleDate.push(object);
          }
          this.newRuleDate = [];
        } else {
          this.$message({
            message: '文件上传失败,请重新上传！',
            type: 'warning'
          });
        }
      },
      // 提交上传文件
      uploadFile() {
        InsertRule(this.finallRuleDate, window.sessionStorage.getItem("token")).then(res => {
          console.log(res);
          this.finallRuleDate = [];
          this.$refs.upload.clearFiles();
          this.initData();
          this.dialogVisible = false;
        });
      },
      // 上传文件的列表控制
      handleChange(file, fileList) {
        // console.log(file);
        // console.log(fileList);
      },
      // 删除全选的文件
      allSearch() {
        this.deletedata(this.arrDeletId);
      },
      // 监听用户是否勾选全选按钮
      selectAll(attr) {
        if (attr.length > 1) {
          this.isAllSelect = true;
          this.selectNumber = attr.length;
          for (let i in attr) {
            this.arrDeletId.push(attr[i].id);
            this.arrDeletFilePreviewPath.push(attr[i].filePreviewPath)
          }
        } else {
          this.isAllSelect = false;
        }
      },
      // 下载全选的文件
      allSelectDownload(attr) {
        this.download(this.arrDeletFilePreviewPath)
      },
      // 取消全选的文件
      allSelectCancel() {
        this.$refs.multipleTable.clearSelection();
        this.arrDeletFilePreviewPath = [];
      },
      // 表单重置
      resetForm(formName) {
        // this.$refs[formName].resetFields();
        this.formData.ruleName = '';
        this.formData.uploadDate = '';
        this.initData();
      },
    },
  }
</script>
<style lang="scss" scoped>
  .el-card {
    height: 93vh;
    overflow: scroll;
    overflow-x: hidden;
  }

  /deep/::-webkit-scrollbar {
    display: none;
    /* Chrome Safari */
  }

  .el-date-editor--datetimerange.el-input,
  .el-date-editor--datetimerange.el-input__inner {
    width: 300px;
  }

  .addTerm {
    float: right;
    border: 1px solid #319da4;
    color: #319da4;
    border-radius: 5px;
  }

  /deep/ .el-upload--text {
    width: 100%;
  }

  /deep/ .el-upload-dragger {
    width: 100% !important;
  }

  .con-page {
    margin-top: 15px;
    float: right;
  }

  // 设置pagination分页的样式
  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).active {
    background-color: rgb(28, 72, 191);
  }

  /deep/ .el-pagination.is-background .el-pager li:not(.disabled).hover {
    color: rgb(28, 72, 191);
  }

  /deep/ .el-pagination__jump {
    margin-left: 0px;
  }

  /deep/ .el-pagination.is-background .el-pager li {
    border-radius: 5px;
  }

  /deep/ .btn-prev {
    border-radius: 5px !important;
  }

  /deep/.btn-next {
    border-radius: 5px !important;
  }

  /deep/ .el-pagination .el-select .el-input .el-input__inner {
    border-radius: 5px;
  }

  /deep/ .el-input__inner {
    border-radius: 5px;
  }

  // dialog上传文件的样式
  /deep/ .el-upload-dragger {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 140px;
    margin-top: 10px;
  }

  .el-upload__tip {
    position: absolute;
    top: 60px;
  }

  /deep/ .el-dialog__body {
    padding-bottom: 15px;
  }

  // /deep/ .el-dialog__header{
  //   border-bottom: 1px solid #e7e7e7;
  // }

  // 设置input样式
  .changeInputClass {
    /deep/ .el-input__inner {
      width: 170px;
    }
  }
</style>