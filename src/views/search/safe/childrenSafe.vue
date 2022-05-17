<template>
  <el-row :gutter="12">
    <div class="goback" @click="goback">
      <i class="el-icon-arrow-left"></i>
      <span>{{pageTitle}}</span>
    </div>
    <!--begin 设备异常所展示的部分 -->
    <div v-if="showInfo === true">
      <el-col :span="18">
        <el-card shadow="always" class="el-card">
          <el-form v-loading="listLoading" :label-position="labelPosition" ref="form" :model="formOne" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上报人：">
                  <el-input :disabled="true" v-model="formOne.reportUserName" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col :span="8">
                <el-form-item label="异常情况：">
                  <el-select 
                    clearable 
                    v-model="formOne.exceptionType" 
                    placeholder="异常情况"
                    :disabled="this.formOne.reportType == 2 ? true : false">
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
            <!-- 图片回显上来后的展示框 -->
            <div class="reportImg">
              <p>上报图片：</p>
              <div class="imgShowBox" v-if="this.formOne.reportType == 2">
                <img class="imgShow" v-for="(item,i) in this.imgArr" :key="i" :src="item" alt="">
              </div>
              <el-upload
                action="http://112.125.88.230:8002/upload/uploadFileByDate"
                list-type="picture-card"
                :on-remove="handleRemove"
                :on-success="handlePictureSuccess"
                :before-upload="handleBeforeUpload"
                v-if="this.formOne.reportType == 1"
                name='fileData'>
                <i class="el-icon-plus"></i>
                <span class="el-upload__text">*点击添加图片</span>
              </el-upload>
            </div>
            <el-form-item label="问题描述：">
              <el-col :span="12">
                <el-input 
                  type="textarea" 
                  :disabled="this.formOne.reportType == 2 ? true : false" 
                  v-model="formOne.description" 
                  placeholder="请输入详细问题描述">
                </el-input>
              </el-col>
            </el-form-item>
            <div v-if="formOne.reportType == 2">
              <el-divider></el-divider>
              <el-form-item label="进展情况：">
                <el-radio-group v-if="formOne.exceptionType == 5" v-model="formOne.progress">
                  <!-- <el-radio label="1">等待维修</el-radio> -->
                  <el-radio label="2">维修中</el-radio>
                  <el-radio label="3">维修完成</el-radio>
                </el-radio-group>
                <el-radio-group v-else v-model="formOne.progress">
                  <el-radio label="3">维修完成</el-radio>
                </el-radio-group>
              </el-form-item>
              <div class="reportImg">
                <p>添加图片：</p>
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
              </div>
              <el-form-item label="备注：">
                <el-col :span="12">
                  <el-input type="textarea" v-model="formOne.remark" placeholder="请添加备注">
                  </el-input>
                </el-col>
              </el-form-item>
            </div>
            <el-form-item v-if="showUserButton">
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col 
        :span="6"
        v-if="formOne.exceptionType == 5 || formOne.exceptionType =='设备功能异常'">
        <el-card shadow="always" class="el-card">
          <p class="record">巡检记录</p>
          <div v-for="(item,index) in this.Xjresult" :key="index">
            <ul class="jindu">
              <h5 v-if="item.progress == 0">
                <i class="el-icon-circle-check"></i>
                巡检记录
              </h5>
              <!-- <h5 v-if="item.progress == 1">
                <i class="el-icon-circle-check"></i>
                等待维修
              </h5> -->
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
                  <span class="spantime">
                    <i class="" v-if="item.progress == 0">预警时间：</i>
                    <i class="" v-else>上报时间：</i>
                    {{message.creatDate}}
                  </span>
                  <div class="spanImgBox" v-if="message.imageList.length>0">
                    <span 
                    v-for="(imgList,q) in message.imageList" :key="q">
                      <i>上报图片：</i>
                      <img :src="imgList" alt="">
                    </span>
                  </div>
                  <span class="spancontent">
                    <i class="" v-if="item.progress == 0">预警内容：</i>
                    <i class="" v-else>上报内容：</i>
                    {{message.remark}}
                  </span>
                </li>
              </div>
              <div class="nulldata" v-if="item.reportRecordList == null">
                <span>暂无数据</span>
              </div>
            </ul>
          </div>
        </el-card>
      </el-col>
      <el-col 
        :span="6"
        v-else>
        <el-card shadow="always" class="el-card">
          <p class="record">巡检记录</p>
          <div v-for="(item) in this.Xjresult" :key="item.progress">
            <ul class="jindu">
              <h5 v-if="item.progress == 0">
                <i class="el-icon-circle-check"></i>
                巡检记录
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
                  <span class="spantime">
                    <i class="" v-if="item.progress == 0">预警时间：</i>
                    <i class="" v-else>上报时间：</i>
                    {{message.creatDate}}
                  </span>
                  <div class="spanImgBox" v-if="message.imageList.length>0">
                    <span 
                    v-for="(imgList,q) in message.imageList" :key="q">
                      <i>上报图片：</i>
                      <img :src="imgList" alt="">
                    </span>
                  </div>
                  <span class="spancontent">
                    <i class="" v-if="item.progress == 0">预警内容：</i>
                    <i class="" v-else>上报内容：</i>
                    {{message.remark}}
                  </span>
                </li>
              </div>
              <!-- <div class="nulldata" v-if="item.reportRecordList == null">
                <span>暂无数据</span>
              </div> -->
            </ul>
          </div>
          <!-- <span class="otherSpan">暂无数据</span> -->
        </el-card>
      </el-col>
    </div>
    <!--end 设备异常所展示的部分 -->
  </el-row>
</template>

<script>
import {ReportErr,SelectReport,InspectionId} from '@/api/safe'
export default {
  data(){
    return{
      // 页面title
      pageTitle: '安全巡检',
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
      // 存储巡检记录
      Xjresult: [
        {
          progress: 0,
          reportRecordList: null,
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
      ],
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
    }
  },
  created(){
    // 获取父级页面传来的参数
    this.formOne.id = this.$route.params.id;
    this.formOne.reportType = this.$route.params.type;
    this.Echo();
  },
  methods:{
    // 根据id获取左侧信息回显
    Echo(){
      SelectReport(this.$route.params.id,window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          this.formOne.reportUserName = res.data.result.reportUserName;
          this.formOne.description = res.data.result.description;
          this.formOne.descriptionImageList = res.data.result.descriptionImageList;
          // console.log(res.data.result.descriptionImageList);
          this.formOne.progress = String(res.data.result.progress);
          this.formOne.remark = res.data.result.remark;
          this.formOne.remarkImageList = res.data.result.remarkImageList;
          this.formOne.exceptionType = String(res.data.result.exceptionType);
          this.imgArr = res.data.result.descriptionImageList;
          console.log(this.formOne);
        }
      }),
      // 根据id获取右侧信息回显
      InspectionId(this.$route.params.id,window.sessionStorage.getItem("token")).then(res=>{
        if(res.data.code == 200){
          console.log(res.data.result);
          if(res.data.result.length > 0){
            this.Xjresult = res.data.result;
          }
          // for(let i in res.data.result){
          //   for(let k in this.Xjresult){
          //     if(res.data.result[i].progress === this.Xjresult[k].progress){
          //       console.log(123);
          //       this.Xjresult[k] = res.data.result[i];
          //     }
          //   }
          // }
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
      this.formOne.reportType = 2;
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
      this.formOne.descriptionImageList.pop();
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
      if(this.formOne.remarkImageList.length>1){
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
    },
    // 点击取消，回退上级页面
    cancel(){
      this.$router.go(-1);
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
  /deep/ .el-col-12{
    padding-left: 0px !important;
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
  .record{
    margin: 10px auto 30px;
    letter-spacing: 1px;
    font-weight: 600;
  }
  .otherSpan{
    font-size: 14px;
    display: inline-block;
    color: gray;
    margin-left: 40px;
    margin-top: 10px;
  }
  .jindu{
    h5{
      display: flex;
      align-items: center;
      margin-top: 10px;
      color: #1c48bf;
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
        display: flex;
        flex-direction: column;
        background-color: #EEEEEE;
        box-sizing: border-box;
        padding: 5px 8px;
        border-radius: 5px;
        i{
          font-style: normal;
        }
        .spanImgBox{
          span{
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;
            font-size: 14px;
            img{
              width: 50px;
              height: 50px;
              border-radius: 5px;
            }
          }
        }
        .spantime{
          // color: #67c23a;
          margin-right: 5px;
          font-size: 14px;
        }
        .spancontent{
          color: gray;
          font-size: 14px;
          margin-top: 5px;
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
  .reportImg{
    display: flex;
    margin-bottom: 20px;
    p{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100px;
      height: 100px;
      font-size: 14px;
      color: #606266;
    }
  }
  .remark{
    margin-bottom: 20px;
    /deep/ .el-form-item__label{
      height: 100px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
    }
  }
</style>