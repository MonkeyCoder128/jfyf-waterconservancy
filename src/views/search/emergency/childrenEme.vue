<template>
  <el-row :gutter="12">
    <div class="goback" @click="goback">
      <i class="el-icon-arrow-left"></i>
      <span>{{pageTitle}}</span>
    </div>
    <!--begin 设备异常所展示的部分 -->
    <div v-if="showInfo === true">
      <el-col :span="16">
        <el-card shadow="always" class="el-card">
          <el-form v-loading="listLoading" :label-position="labelPosition" ref="form" :model="formOne" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上报人：">
                  <el-input v-model="formOne.reportUserName" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="异常情况：">
                  <el-select clearable v-model="formOne.exceptionType" placeholder="异常情况">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="问题描述：">
              <!-- 图片回显上来后的展示框 -->
              <div class="imgShowBox">
                <img class="imgShow" v-for="(item,i) in this.imgArr" :key="i" :src="item" alt="">
              </div>
              <el-upload
                action="http://112.125.88.230:8002/upload/uploadFileByDate"
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="handlePictureSuccess"
                :before-upload="handleBeforeUpload"
                name='fileData'>
                <i class="el-icon-plus"></i>
                <span class="el-upload__text">*点击添加图片</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="formOne.descriptionImageList" alt="">
              </el-dialog>
              <el-col :span="14">
                <el-input type="textarea" v-model="formOne.description" placeholder="请输入详细问题描述"></el-input>
              </el-col>
            </el-form-item>
            <div v-if="formOne.exceptionType == 5 || formOne.exceptionType =='设备功能异常'">
              <el-form-item label="进展情况：">
                <el-radio-group v-model="formOne.progress">
                  <el-radio label="1">等待维修</el-radio>
                  <el-radio label="2">维修中</el-radio>
                  <el-radio label="3">维修完成</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item label="备注：">
                <el-upload
                  action="http://112.125.88.230:8002/upload/uploadFileByDate"
                  list-type="picture-card"
                  :on-remove="handleRemove_"
                  :on-success="handlePictureSuccess_"
                  :before-upload="handleBeforeUpload_"
                  name='fileData'>
                  <i class="el-icon-plus"></i>
                  <span class="el-upload__text">*点击添加图片</span>
                </el-upload>
                <el-dialog :visible.sync="dialogVisible">
                  <img width="100%" :src="formOne.remarkImageList" alt="">
                </el-dialog>
                <el-col :span="14">
                  <el-input type="textarea" v-model="formOne.remark" placeholder="请添加备注">
                  </el-input>
                </el-col>
              </el-form-item>
            </div>
            <!-- <el-form-item v-if="showUserButton">
              <el-button>取消</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item> -->
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8" v-if="formOne.exceptionType == 5 || formOne.exceptionType =='设备功能异常'">
        <el-card shadow="always" class="el-card">
          <p class="record">巡检提交记录</p>
          <div v-for="(item) in this.Xjresult" :key="item.progress">
            <ul class="jindu">
              <h5 v-if="item.progress == 0">
                <i class="el-icon-circle-check"></i>
                平台预警
              </h5>
              <h5 v-if="item.progress == 1">
                <i class="el-icon-circle-check"></i>
                等待维修
              </h5>
              <h5 v-if="item.progress == 2">
                <i class="el-icon-circle-check"></i>
                维修中
              </h5>
              <h5 v-if="item.progress == 3">
                <i class="el-icon-circle-check"></i>
                维修完成
              </h5>
              <h5 v-if="item.progress == 4">
                <i class="el-icon-circle-check"></i>
                已解决
              </h5>
              <div v-if="item.reportRecordList !== null">
                <li v-for="(message,j) in item.reportRecordList" :key="j">
                  <span>
                    <i class="el-icon-star-on"></i>
                    {{message.remark}}
                  </span>
                  <span>{{message.creatDate}}</span>
                </li>
              </div>
              <div class="nulldata" v-if="item.reportRecordList == null">
                <span>暂无数据</span>
              </div>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" class="el-card">
          <p class="record">巡检提交记录</p>
          <div v-for="(item) in this.Xjresult" :key="item.progress">
            <ul class="jindu">
              <h5 v-if="item.progress == 0">
                <i class="el-icon-circle-check"></i>
                平台预警
              </h5>
              <!-- <h5 v-if="item.progress == 1">等待维修</h5>
              <h5 v-if="item.progress == 2">维修中</h5>
              <h5 v-if="item.progress == 3">维修完成</h5> -->
              <h5 v-if="item.progress == 4">
                <i class="el-icon-circle-check"></i>
                已解决
              </h5>
              <div v-if="item.reportRecordList !== null">
                <li v-for="(message,j) in item.reportRecordList" :key="j">
                  <span>
                    <i class="el-icon-star-on"></i>
                    {{message.remark}}
                  </span>
                  <span>{{message.creatDate}}</span>
                </li>
              </div>
              <!-- <div class="nulldata" v-if="item.reportRecordList == null">
                <span>暂无数据</span>
              </div> -->
            </ul>
          </div>
          <span v-if="this.formOne.progress != 4" class="otherSpan">暂无数据</span>
        </el-card>
      </el-col>
    </div>
    <!--end 设备异常所展示的部分 -->
  </el-row>
</template>

<script>
import {ReportErr,SelectReport,InspectionId} from '@/Api/safe'
export default {
  data(){
    return{
      // 页面title
      pageTitle: '巡检记录',
      // 根据身份key值判断展示的内容
      showInfo: true,
      // 表单1数据
      formOne: {
        id:'',
        reportUserId: '8',
        reportUserName: '',
        progress: '',
        description: '',
        remark: '',
        exceptionType:'',
        reportType: 2,
        // 上传描述图片数据
        descriptionImageList: [],
        // 上传备注图片数据
        remarkImageList: [],
      },
      options: [{
          value: '1',
          label: '流速、流量'
        }, {
          value: '2',
          label: '渗透压异常'
        }, {
          value: '3',
          label: '位移'
        }, {
          value: '4',
          label: '水质异常'
        }, {
          value: '5',
          label: '设备功能异常'
        }],
      // 表单2数据
      formTwo: {
        name: '',
        type: [],
        descDescribe: '',
      },
      // 表单对齐方式
      labelPosition: 'right',
      // 控制图片是否放大展示
      dialogVisible: false,
      // 根据不同模控制是否显示提交按钮
      showUserButton: true,
      listLoading: false,
      imgArr: [],
      // 存储巡检记录
      Xjresult: [
        {
          progress: 0,
          reportRecordList:{
            creatDate: '',
            id: '',
            progress: '',
            recordId: '',
            remark :'暂无数据',
          }
        },
        {
          progress: 1,
          reportRecordList:null,
        },
        {
          progress: 2,
          reportRecordList:null,
        },
        {
          progress: 3,
          reportRecordList:null,
        },
        {
          progress: 4,
          reportRecordList:null,
        }
      ]
    }
  },
  created(){
    // 获取父级页面传来的参数
    this.formOne.id = this.$route.query.id;
    this.Echo()
  },
  methods:{
    // 根据id获取左侧信息回显
    Echo(){
      SelectReport(this.$route.query.id,window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          this.formOne.reportUserName = res.data.result.reportUserName;
          this.formOne.description = res.data.result.description;
          this.formOne.descriptionImageList = res.data.result.descriptionImageList;
          this.imgArr = res.data.result.descriptionImageList;
          this.formOne.progress = String(res.data.result.progress);
          this.formOne.remark = res.data.result.remark;
          this.formOne.remarkImageList = res.data.result.remarkImageList;
          this.formOne.exceptionType = String(res.data.result.exceptionType);
          console.log(this.formOne.progress);
        }
      }),
      // 根据id获取右侧信息回显
      InspectionId(this.$route.query.id,window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          for(let i in res.data.result){
            for(let k in this.Xjresult){
              if(res.data.result[i].progress == this.Xjresult[k].progress){
                this.Xjresult[k] = res.data.result[i];
              }
            }
          }
        }
      })
    },
    // 返回上级路由
    goback(){
      this.$router.go(-1);
    },
    // 表单数据提交
    onSubmit() {
      this.listLoading = true;
      ReportErr(this.formOne,window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          this.$message({
            showClose: true,
            message: res.data.describe,
            type: 'success'
          });
          this.listLoading = false;
          setTimeout(()=>{
            this.$router.go(-1);
          },1100);
        }else{
          this.$message({
            showClose: true,
            message: res.data.describe,
            type: 'error'
          });
        }
      })
    },
    // 取消表单操作
    cancel(){
      this.$router.go(-1);
    },
    // 删除上传好的图片时的钩子函数
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handleRemove_(file, fileList) {
      console.log(file, fileList);
    },
    // 图片上传前的钩子函数
    handleBeforeUpload(file){
      if(this.formOne.descriptionImageList.length>4){
        this.$message({
          message: '最多上传五张图片！',
          type: 'warning'
        });
        return false;
      }
    },
    handleBeforeUpload_(file){
      if(this.formOne.remarkImageList.length>4){
        this.$message({
          message: '最多上传五张图片！',
          type: 'warning'
        });
        return false;
      }
    },
    // 图片生成成功的钩子函数
    handlePictureSuccess(res, file){
      if(res.code == 200){
        this.formOne.descriptionImageList.push(res.result[0].filePathHttp);
        console.log(this.formOne.descriptionImageList);
      }else{
        this.$message({
          message: '图片上传失败,请重新上传！',
          type: 'warning'
        });
      }
    },
    handlePictureSuccess_(res, file){
      if(res.code == 200){
        this.formOne.remarkImageList.push(res.result[0].filePathHttp);
        console.log(this.formOne.remarkImageList);
      }else{
        this.$message({
          message: '图片上传失败,请重新上传！',
          type: 'warning'
        });
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .goback{
    cursor: pointer;
    margin: 10px auto;
    i{
      margin-right: 10px;
      margin-left: 5px;
    }
  }
  .el-card{
    height: 89vh;
    overflow: auto;
  }
  /deep/ .el-upload--picture-card{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: normal;
    width: 100px;
    height: 100px;
  }
  .el-upload__text{
    color: gray;
    font-size: 12px;
    margin-top: 10px;
  }
  /deep/ .el-col-14{
    padding-left: 0px !important;
    margin-top: 20px;
  }
  /deep/::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
  .imgShowBox{
    display: flex;
    .imgShow{
      width: 100px;
      height: 100px;
      margin-right: 10px;
      margin-bottom: 10px;
      border-radius: 6px;
    }
  }
  .otherSpan{
    font-size: 14px;
    display: inline-block;
    color: gray;
    margin-left: 20px;
    margin-top: 10px;
  }
  .record{
    text-align: center;
    margin: 10px auto 30px;
    letter-spacing: 2px;
  }
  .jindu{
    h5{
      display: flex;
      align-items: center;
      margin-top: 10px;
      color: #409eff;
      i{
        font-size: 30px;
        margin-right: 10px;
      }
    }
    div{
      li{
        list-style: none;
        margin-top: 10px;
        margin-left: 40px;
        span:nth-child(1){
          color: #67c23a;
          margin-right: 5px;
          font-size: 14px;
        }
        span:nth-child(2){
          color: gray;
          font-size: 12px;
        }
      }
    }
    .nulldata{
      span{
        font-size: 14px;
        display: inline-block;
        color: gray;
        margin-left: 40px;
        margin-top: 10px;
      }
    }
  }
</style>