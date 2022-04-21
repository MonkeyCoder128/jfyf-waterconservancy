<template>
   <div class="primary_container">
      <div class="table_container">
          <el-form ref="form" label-width="75px">
               <el-row :gutter="20">
                  <el-col :span="7">
                       <el-form-item label="姓名:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                        <el-form-item label="性别:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                       <el-form-item label="出生年月:">
                           <el-date-picker
                                type="date"
                                placeholder="选择日期">
                              </el-date-picker>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-row :gutter="20">
                  <el-col :span="7">
                       <el-form-item label="出生地:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                        <el-form-item label="民族:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                       <el-form-item label="文化程度:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-row :gutter="20">
                  <el-col :span="7">
                       <el-form-item label="部职别:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                        <el-form-item label="军衔:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                       <el-form-item label="入伍年月:">
                         <el-date-picker
                                type="date"
                                placeholder="选择日期">
                              </el-date-picker>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-row :gutter="20" class="certificateAndCard">
                  <el-col :span="10">
                       <el-form-item label="军官证或文职干部证号码:" class="certificate">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="10">
                        <el-form-item label="身份证号码:" class="Card">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-row :gutter="20">
                  <el-col :span="14">
                       <el-form-item label="单位住址:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                        <el-form-item label="邮政编码:" >
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
               </el-row>
               <el-row :gutter="20" class="addressAndPhone">
                  <el-col :span="14">
                       <el-form-item label="家庭住址:">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="6">
                        <el-form-item label="个人联系电话:" class="Phone">
                          <el-input></el-input>
                    </el-form-item>
                  </el-col>
               </el-row>
                <el-button type="info" @click="ggggg">信息按钮</el-button>
         </el-form>
      </div>
  </div>
</template>

<script>
export default {
methods:{
    ggggg(){
        console.log(123)
    }
}
}
</script>

<style lang="scss" scoped>
/deep/.certificateAndCard{
  .certificate{
         &>.el-form-item__label{
             width: 173px !important;
         }
         &>.el-form-item__content{
             margin-left: 173px !important;
         }
  }
  .Card{
       &>.el-form-item__label{
           width: 86px !important;
       }
       &>.el-form-item__content{
             margin-left: 86px !important;
         }
  }
}
/deep/.addressAndPhone{
    &>.el-col:nth-child(2){
      &>.Phone{
        &>.el-form-item__label{
             width: 100px !important;
         }
          &>.el-form-item__content{
             margin-left: 100px !important;
         }
    }
    }
    
}

.el-row{
    margin: 0 !important;
}
.primary_container{
  width: 100%;
  .table_container{
    margin: 0 auto;
    width: 900px;}}
</style>