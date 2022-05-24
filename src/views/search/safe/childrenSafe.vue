<template>
  <el-row :gutter="12">
    <div class="goback" @click="goback">
      <i class="el-icon-arrow-left"></i>
      <span>{{pageTitle}}</span>
    </div>
    <div>
      <el-col :span="18">
        <el-card shadow="always" class="el-card">
          <el-form v-loading="listLoading" :label-position="labelPosition" ref="form" :model="formOne" label-width="100px" :rules="rules">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上报人：">
                  <el-input v-if="formOne.reportType == 1" :disabled="true" v-model="formOne.reportUserName" placeholder="请输入姓名"></el-input>
                  <el-input class="noBorder" v-if="formOne.reportType == 2" :disabled="true" v-model="formOne.reportUserName"></el-input>
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
                    :disabled="formOne.reportType == 2 ? true : false"
                    v-if="formOne.reportType == 1">
                    <el-option
                      v-for="item in options"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                  <el-select 
                    clearable 
                    v-model="formOne.exceptionType" 
                    placeholder="异常情况"
                    :disabled="formOne.reportType == 2 ? true : false"
                    v-if="formOne.reportType == 2"
                    class="noBorder">
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
              <div class="imgShowBox" v-if="formOne.reportType == 2">
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
            <el-form-item label="问题描述：" prop="description">
              <el-col :span="12">
                <el-input 
                  type="textarea" 
                  :disabled="formOne.reportType == 2 ? true : false" 
                  v-model="formOne.description" 
                  placeholder="请输入详细问题描述"
                  v-if="formOne.reportType == 1">
                </el-input>
                <el-input
                  class="noBorder"
                  :disabled="formOne.reportType == 2 ? true : false" 
                  v-model="formOne.description" 
                  placeholder="请输入详细问题描述"
                  v-if="formOne.reportType == 2">
                </el-input>
              </el-col>
            </el-form-item>
            <div v-if="formOne.reportType == 2">
              <el-divider></el-divider>
              <el-form-item label="进展情况：" prop="exceptionType">
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
              <el-form-item label="备注：" prop="remark">
                <el-col :span="12">
                  <el-input type="textarea" v-model="formOne.remark" placeholder="请添加备注">
                  </el-input>
                </el-col>
              </el-form-item>
            </div>
            <el-form-item style="display:flex;justify-content:flex-end;" v-if="showUserButton">
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <!-- 当设备功能出现异常时展示的部分 -->
      <el-col 
        :span="6"
        v-if="formOne.exceptionType == 5 || formOne.exceptionType =='设备功能异常'"
      >
        <!-- 当设备功能出现异常，并且用户 第一次 提交时展示的部分 -->
        <el-card shadow="always" class="el-card" v-if="this.isFirst == true">
          <p class="record">巡检记录</p>
          <ul class="jindu" v-if="this.isFirst == true">
            <h5>
              <i class="iconfont icon-tongzhi"></i>
              巡检记录
            </h5>
            <div class="reportRecordList">
              <el-divider class="isFirstDivider" direction="vertical"></el-divider>
              <div>
                <li >
                  <span class="spantime">
                    <i class="">预警时间：</i>
                    2022-05-16 18:00
                  </span>
                  <span class="spancontent">
                    <i class="" >预警内容：</i>
                    {{this.earlyWarning}}
                  </span>
                </li>
              </div>
            </div>
            <h5>
              <i style="color:#999999" class="el-icon-circle-check"></i>
              维修完成
            </h5>
          </ul>
        </el-card>
        <!-- 当设备功能出现异常，并且用户 非第一次 提交时展示的部分 -->
        <el-card shadow="always" class="el-card" v-if="this.isFirst == false">
          <p class="record">巡检记录</p>
          <div v-for="(item,index) in this.Xjresult" :key="index">
            <ul class="jindu">
              <h5 id="firstDom" v-if="item.progress == 0">
                <!-- <i class="el-icon-circle-check"></i> -->
                <p><span></span></p>
                巡检记录
              </h5>
              <!-- <h5 v-if="item.progress == 1">
                <i class="el-icon-circle-check"></i>
                等待维修
              </h5> -->
              <h5 v-if="item.progress == 2">
                <p><span></span></p>
                维修中
              </h5>
              <h5 v-if="item.progress == 3">
                <p><span></span></p>
                <!-- <i v-if="item.progress > 3" class="iconfont icon-tongzhi"></i>
                <i v-else style="color:gray" class="el-icon-circle-check"></i> -->
                维修完成
              </h5>
              <h5 v-if="item.progress == 4">
                <p><span></span></p>
                已解决
              </h5>
              <div class="reportRecordList">
                <el-divider v-if="item.progress>2" class="isFirstDivider" direction="vertical"></el-divider>
                <el-divider v-else direction="vertical"></el-divider>
                <div v-if="item.reportRecordList !== null">
                  <li v-if="item.progress == 0">
                     <span class="spantime">
                      <i class="">预警时间：</i>
                      2022-05-18 22:00
                    </span>
                    <span class="spancontent">
                      <i class="">预警内容：</i>
                      {{earlyWarning}}
                    </span>
                  </li>
                  <li v-for="(message,j) in item.reportRecordList" :key="j">
                    <span class="spantime">
                      <i class="">上报时间：</i>
                      {{message.creatDate}}
                    </span>
                    <div class="spanImgBox" v-if="message.imageList.length>0">
                      <span>
                        <i>上报图片：</i>
                        <div class="demo-image__preview" v-for="(imgList,q) in message.imageList" :key="q">
                          <el-image 
                            style="width: 50px; height: 50px"
                            :src="imgList"
                            :preview-src-list="srcList">
                          </el-image>
                        </div>
                      </span>
                    </div>
                    <span class="spancontent">
                      <i class="">上报内容：</i>
                      {{message.remark}}
                    </span>
                  </li>
                </div>
                <div class="nulldata" v-if="item.reportRecordList == null">
                  <span>暂无数据</span>
                </div>
              </div>
            </ul>
          </div>
          <h5 class="solveShow" v-if="solveShow == 2">
            <i style="color:gray" class="el-icon-circle-check"></i>
            已解决
          </h5>
          <h5 class="solveShow" v-if="solveShow == 1">
            <i style="color:gray" class="el-icon-circle-check"></i>
            维修完成
          </h5>
        </el-card>
      </el-col>
      <!-- 当非设备，其他功能出现异常时展示的部分 -->
      <el-col :span="6" v-else>
        <!-- 当非设备，其他功能出现异常，并且 第一次提交 展示的部分 -->
        <el-card shadow="always" class="el-card" v-if="this.isFirst == true">
          <p class="record">巡检记录</p>
          <ul class="jindu">
            <h5>
              <p><span></span></p>
              巡检记录
            </h5>
            <div class="reportRecordList">
              <el-divider class="isFirstDivider" direction="vertical"></el-divider>
              <div>
                <li >
                  <span class="spantime">
                    <i class="">预警时间：</i>
                    2022-05-16 18:00
                  </span>
                  <span class="spancontent">
                    <i class="" >预警内容：</i>
                    {{this.earlyWarning}}
                  </span>
                </li>
              </div>
            </div>
            <h5>
              <i style="color:#999999" class="el-icon-circle-check"></i>
              维修完成
            </h5>
          </ul>
        </el-card>
        <!-- 当非设备，其他功能出现异常，并且 不是第一次提交 展示的部分 -->
        <el-card shadow="always" class="el-card" v-if="this.isFirst == false">
          <p class="record">巡检记录</p>
          <div v-for="(item) in this.Xjresult" 
          :key="item.progress">
            <!-- 如果后端传过来的数据为空（用户第一次申请的时候显示） -->
            <ul class="jindu">
              <h5 v-if="item.progress == 0">
                <!-- <i class="iconfont icon-tongzhi"></i> -->
                <p><span></span></p>
                巡检记录
              </h5>
              <h5 v-if="item.progress == 3">
                <p><span></span></p>
                维修完成
              </h5>
              <h5 v-if="item.progress == 4">
                <p><span></span></p>
                已解决
              </h5>
              <div class="reportRecordList">
                <el-divider v-if="item.progress>2" class="isFirstDivider" direction="vertical"></el-divider>
                <el-divider v-else direction="vertical"></el-divider>
                <div v-if="item.reportRecordList !== null">
                  <li v-if="item.progress == 0">
                     <span class="spantime">
                      <i class="">预警时间：</i>
                      2022-05-18 22:00
                    </span>
                    <span class="spancontent">
                      <!-- <i class="" v-if="item.progress == 0">预警内容：</i>
                      <i class="" v-else>上报内容：</i> -->
                      <i class="">预警内容：</i>
                      {{earlyWarning}}
                    </span>
                  </li>
                  <li v-for="(message,j) in item.reportRecordList" :key="j">
                    <span class="spantime">
                      <i class="">上报时间：</i>
                      {{message.creatDate}}
                    </span>
                    <div class="spanImgBox" v-if="message.imageList.length>0">
                      <span>
                        <i>上报图片：</i>
                        <div class="demo-image__preview" v-for="(imgList,q) in message.imageList" :key="q">
                          <el-image 
                            style="width: 50px; height: 50px"
                            :src="imgList"
                            :preview-src-list="srcList">
                          </el-image>
                        </div>
                      </span>
                    </div>
                    <span class="spancontent">
                       <i class="">上报内容：</i>
                      {{message.remark}}
                    </span>
                  </li>
                </div>
              </div>
            </ul>
          </div>
          <h5 class="solveShow" v-if="solveShow == 2">
            <i style="color:gray" class="el-icon-circle-check"></i>
            已解决
          </h5>
          <h5 class="solveShow" v-if="solveShow == 1">
            <i style="color:gray" class="el-icon-circle-check"></i>
            维修完成
          </h5>
        </el-card>
      </el-col>
    </div>
  </el-row>
</template>

<script>
export default {
  data(){
    return{
      // 页面title
      pageTitle: '安全巡检',
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
        status: 1,
      },
      rules: {
        description: [
          { required: true, message: '请输入问题描述', trigger: 'blur' },
        ],
        exceptionType: [
          { required: true, message: '请选择异常情况', trigger: 'change' }
        ],
        remark: [
          { type: 'date', required: true, message: '请输入备注', trigger: 'blur' }
        ],
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
      // 表单对齐方式
      labelPosition: 'right',
      // 控制图片是否放大展示
      dialogVisible: false,
      // 根据不同模控制是否显示提交按钮
      showUserButton: true,
      listLoading: false,
      // 存储回显的照片列表
      imgArr: [],
      // 控制用户时候第一次提交，该显示的内容
      isFirst: true,
      // 控制巡检信息最后一行显示 已解决/维修完成
      solveShow: 0,
      // 所有上报图片的列表集合
      srcList: [],
      // 预警信息存储
      earlyWarning: '',
    }
  },
  created(){
    // 获取父级页面传来的参数
    this.formOne.id = this.$route.params.id;
    this.formOne.reportType = this.$route.params.type;
    // 通过 index 传过来的值展示预警内容；
    switch(this.$route.params.exception) {
      case 1:
        this.earlyWarning = '流速、流量异常';
        break;
      case 2:
        this.earlyWarning = '渗透压异常';
        break;
      case 3:
        this.earlyWarning = '位移异常';
        break;
      case 4:
        this.earlyWarning = '水质异常';
        break;
      case 5:
        this.earlyWarning = '设备功能异常';
        break;
    }
    // 获取用户名
    const userInfo = JSON.parse(localStorage.getItem('userInfo'))
    this.formOne.reportUserName = userInfo.username
    // 获取表格内容
    this.Echo();
  },
  methods:{
    // 根据id获取左侧信息回显
    Echo(){
      this.$api.SAFE.SelectReport({id:this.$route.params.id}).then(res=>{
        if(res.code == 200){
          // this.formOne.reportUserName = res.result.reportUserName;
          this.formOne.description = res.result.description;
          this.formOne.descriptionImageList = res.result.descriptionImageList;
          this.formOne.progress = String(res.result.progress);
          this.formOne.remark = res.result.remark;
          this.formOne.remarkImageList = res.result.remarkImageList;
          this.formOne.exceptionType = String(res.result.exceptionType);
          this.imgArr = res.result.descriptionImageList;
        }
      }),
      // 根据id获取右侧信息回显
      this.$api.SAFE.InspectionId({inspectionId:this.$route.params.id}).then(res=>{
        if(res.code == 200){
          if(res.result.length > 0){
            this.Xjresult = res.result;
            for(let i in this.Xjresult){
              for(let c in this.Xjresult[i].reportRecordList){
                for(let q in this.Xjresult[i].reportRecordList[c].imageList){
                  this.srcList.push(this.Xjresult[i].reportRecordList[c].imageList[q]) 
                }
              }
            }
            this.isFirst = false;
            if(this.Xjresult.length >= 2){
              this.solveShow = 2
              for(let i in this.Xjresult){
                if(this.Xjresult[i].progress == 4){
                  this.solveShow = 0;
                }
              }
            }else if(this.Xjresult.length ==1 ){
              this.solveShow = 1
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
      if(this.formOne.reportType ==1){
        this.formOne.reportType = 2;
        this.formOne.remark = this.formOne.description;
        this.formOne.remarkImageList = this.formOne.descriptionImageList;
      }
      if(this.formOne.remark !== null && this.formOne.remark !== ''){
        this.$api.SAFE.ReportErr(this.formOne).then(res=>{
          if(res.code == 200){
            this.$message({
              showClose: true,
              message: res.describe,
              type: 'success'
            });
            this.listLoading = false;
            setTimeout(()=>{
              this.$router.go(-1);
            });
          }else{
            this.$message({
              showClose: true,
              message: res.describe,
              type: 'error'
            });
          }
        })
      }else{
        if(this.formOne.remark == null){
          this.formOne.reportType = 1;
        }
        this.listLoading = false;
        this.$message({
          showClose: true,
          message: '请完善信息！',
          type: 'error'
        });
      }
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
    margin: 0px auto 10px;
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
      margin-top: 5px;
      i{
        font-size: 30px;
        margin-right: 10px;
        color: #1c48bf;
      }
      p{
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border: 1px solid #1c48bf;
        border-radius: 50%;
        margin: 0 10px 0 3px;
        span{
          display: inline-block;
          width: 10px;
          height: 10px;
          background-color: #1c48bf;
          border-radius: 50%;
        }
      }
    }
    div{
      // li:nth-child(1){
      //   margin-top: 120px;
      // }
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
            color: #666666;
            img{
              width: 50px;
              height: 50px;
              border-radius: 5px;
            }
            .el-image{
              border-radius: 5px;
              margin-left: 5px;
            }
          }
        }
        .spantime{
          color: #666666;
          margin-right: 5px;
          font-size: 14px;
        }
        .spancontent{
          color: #666666;
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
  /deep/ .noBorder{
    input{
      border: none !important;
      background-color: transparent !important;
      padding:0 0;
      color: gray !important;
    }
    i{
      display: none;
    }
  }
  .reportRecordList{
    display: flex;
    position: relative;
    .el-divider--vertical{
      height: 100%;
      position: absolute;
      top: 3px;
      left: 7px;
      background-color: #1c48bf;
    }
  }
  .isFirstDivider{
    background-color: #EEEEEE !important;
  }
  .solveShow{
    display: flex;
    align-items: center;
    margin-top: 5px;
    i{
      font-size: 28px;
      margin-right: 10px;
      margin-left: 2px;
    }
  }
</style>