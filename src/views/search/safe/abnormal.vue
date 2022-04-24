<template>
  <el-row :gutter="12">
    <div class="goback">
      <i class="el-icon-arrow-left"></i>
      <span @click="goback">安全巡检</span>
    </div>
    <!--begin 设备异常所展示的部分 -->
    <div v-if="showInfo === true">
      <el-col :span="16">
        <el-card shadow="always" class="el-card">
          <el-form :label-position="labelPosition" ref="form" :model="formOne" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上报人：">
                  <el-input v-model="formOne.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="异常类型：">
              <el-checkbox-group v-model="formOne.type">
                <el-checkbox label="设备异常" name="type"></el-checkbox>
                <el-checkbox label="设备离线" name="type"></el-checkbox>
                <el-checkbox label="异常状态" name="type"></el-checkbox>
                <el-checkbox label="功能异常" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="问题描述：">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                <span class="el-upload__text">*点击添加图片</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-col :span="14">
                <el-input type="textarea" v-model="formOne.descDescribe" placeholder="请输入详细问题描述"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="进展情况：">
              <el-radio-group v-model="formOne.resource">
                <el-radio label="等待维修"></el-radio>
                <el-radio label="维修中"></el-radio>
                <el-radio label="维修完成"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="备注：">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                <span class="el-upload__text">*点击添加图片</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-col :span="14">
                <el-input type="textarea" v-model="formOne.descRemarks" placeholder="请添加备注">
                </el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button>取消</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" class="el-card">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </div>
    <!--end 设备异常所展示的部分 -->

    <!--begin 状态异常所展示的部分 -->
    <div v-if="showInfo === false">
      <el-col :span="16">
        <el-card shadow="always" class="el-card">
          <el-form :label-position="labelPosition" ref="form" :model="formTwo" label-width="100px">
            <el-row>
              <el-col :span="8">
                <el-form-item label="上报人：">
                  <el-input v-model="formTwo.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-form-item label="异常类型：">
              <el-checkbox-group v-model="formTwo.type">
                <el-checkbox label="设备异常" name="type"></el-checkbox>
                <el-checkbox label="异常状态" name="type"></el-checkbox>
                <el-checkbox label="流速、流量" name="type"></el-checkbox>
                <el-checkbox label="渗透压" name="type"></el-checkbox>
                <el-checkbox label="位移" name="type"></el-checkbox>
                <el-checkbox label="水质" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="问题描述：">
              <el-upload
                action="https://jsonplaceholder.typicode.com/posts/"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove">
                <i class="el-icon-plus"></i>
                <span class="el-upload__text">*点击添加图片</span>
              </el-upload>
              <el-dialog :visible.sync="dialogVisible">
                <img width="100%" :src="dialogImageUrl" alt="">
              </el-dialog>
              <el-col :span="14">
                <el-input type="textarea" v-model="formTwo.descDescribe" placeholder="请输入详细问题描述"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item>
              <el-button @click="cancel">取消</el-button>
              <el-button type="primary" @click="onSubmit">提交</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="always" class="el-card">
          <el-timeline>
            <el-timeline-item
              v-for="(activity, index) in activities"
              :key="index"
              :icon="activity.icon"
              :type="activity.type"
              :color="activity.color"
              :size="activity.size"
              :timestamp="activity.timestamp">
              {{activity.content}}
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </div>
    <!--end 状态异常所展示的部分 -->
  </el-row>
</template>

<script>
export default {
  data(){
    return{
      // 根据身份key值判断展示的内容
      showInfo: true,
      // 表单1数据
      formOne: {
        name: '',
        type: [],
        resource: '',
        descDescribe: '',
        descRemarks: '',
      },
      // 表单2数据
      formTwo: {
        name: '',
        type: [],
        descDescribe: '',
      },
      // 时间线数据
      activities: [{
        content: '平台预警',
        timestamp: '2018-04-12 20:46',
        size: 'large',
        type: 'primary',
        icon: 'el-icon-check',
        color:'#409EFF'
      }, {
        content: '等待维修',
        timestamp: '2018-04-03 20:46',
        color: '#409EFF',
        size: 'large'
      }, {
        content: '维修中',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }, {
        content: '维修完成',
        timestamp: '2018-04-03 20:46',
        size: 'large'
      }],
      // 表单对齐方式
      labelPosition: 'right',
      // 上传图片数据
      dialogImageUrl: '',
      // 控制图片是否放大展示
      dialogVisible: false
    }
  },
  methods:{
    // 返回上级路由
    goback(){
      this.$router.go(-1);
    },
    // 表单数据提交
    onSubmit() {
      console.log('submit!');
    },
    // 取消表单操作
    cancel(){
      console.log(123);
      this.$router.go(-1);
    },
    // 删除上传的图片
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    }
  }
}
</script>

<style lang="scss" scoped>
  .goback{
    cursor: pointer;
    margin-bottom: 10px;
    i{
      margin-right: 10px;
      margin-left: 5px;
    }
  }
  .el-card{
    height: 89vh;
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
</style>