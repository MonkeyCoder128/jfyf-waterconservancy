<!--
* @Filedescription:NasaTlx组件
* @Date:2021-12-14
-->
<template>
  <div class="primary_container">
      <div class="table_container">
          <el-row :gutter="20">
            <el-col :span="6">编号:</el-col>
            <el-col :span="6">3333333</el-col>
            <el-col :span="6">姓名:</el-col>
            <el-col :span="6">周乾</el-col>
         </el-row>
          <el-row :gutter="20">
            <el-col :span="6">记录时间:</el-col>
            <el-col :span="6">2021年12月14日</el-col>
         </el-row>
         <div class="instruction_container">
             <h4>指导语:</h4>
            <p>
                NASA-TLX问卷是根据六个维度即心理需求、生理需求、时间需求、自我绩效、努力程度和挫折程度来描述受试者在执行任务过程中的自我感觉的任务负荷大小。每个维度上的计分是一条21个点组成的线段，两端分别表示 “很低/很高”。请您仔细阅读附表《NASA-TLX量表各维度指标意义》，然后根据您自己在执行任务过程中的真实感受如实作答，请在您感觉最能符合您此时自我感受的线段底部拖动选择分数。谢谢配合！
            </p>
            <ul>
                <li v-for="(item,index) in demand" :key="index">
                      <div class="score_container">
                          <h4>{{item}}</h4>
                          <ol><li v-for="(item,index) in 20" :key='index'></li><li></li></ol>
                          <p>很低</p>
                          <p>很高</p>
                      </div>
                </li>
            </ul>
         </div>
         <div class="collude_container">
             <p>第二步  在下列15组中，每2项进行相互比较，请选出每组2项中你认为对工作成绩影响最大<br/>的那一条目，在相应项目后打“√” ：</p>
             <ul>
                 <li v-for="(item,index) in 15" :key="index">
                     <img src="../../assets/1639463782(1).png">
                     <div>
                         <p>心理需求</p>
                         <p>体力需求</p>
                     </div>
                     <div>
                         <i class="el-icon-check"></i>
                         <i class="el-icon-check"></i>
                     </div>
                 </li>
             </ul>
         </div>
      </div>
  </div>
</template>

<script>
export default {
    data() {
      return {
       demand:['心理需求','体力需求','时间需求','作业需求','努力程度','挫折程度']
      }
    },
}
</script>

<style lang="scss" scoped>
.primary_container{
  width: 100%;
  .table_container{
    margin: 0 auto;
    width: 900px;
     li{
        list-style-type: none;
            }
    &>.el-row:nth-child(1){
        .el-col:nth-child(1),.el-col:nth-child(3){
            width: 56px;
        }
         .el-col:nth-child(2),.el-col:nth-child(4){
              height: 25px;
             width: 116px;
             border-bottom: 1px solid #000;
             padding-left: 0 !important;
             padding-right: 0 !important;
         }
    }
    &>.el-row:nth-child(2){
        margin-top: 10px;
         .el-col:nth-child(1){
            width: 90px;
        }
         .el-col:nth-child(2){
              height: 25px;
             width: 135px;
             border-bottom: 1px solid #000;
             padding-left: 0 !important;
             padding-right: 0 !important;
         }
    }
    &>.instruction_container{
        margin-top: 10px;
        h4{
            margin: 0;
        }
        p{
            margin: 0;
            text-indent: 2em;
        }
        &>ul{
            padding: 0;
            &>li{
                margin-top: 25px;
              .score_container{
                  position: relative;
                  &>p{
                      text-indent:0
                  }
                  &>p:nth-child(3){
                    position: absolute;
                     left: 0;
                  }
                  &>p:nth-child(4){
                    position: absolute;
                    right: 379px;
                  }
                  ol{
                      display: flex;
                      padding: 0;
                      border-left: 1px solid #000;
                      position: relative;
                      margin-top: 15px;
                      li{
                          width: 25px;
                          height: 20px;
                          border-right: 1px solid #000;
                           border-bottom: 1px solid #000;
                      }
                      li:nth-child(10){
                           border-right: 1px solid #000;
                      }
                      li:last-child{
                          position: absolute;
                          left: 258px;
                         top: -15px;
                         width: 1px;
                         border-bottom: none;
                      }
                  }
              }
            }
            &>li:first-child{
                margin-top: 0;
            }
        }
    }
    &>.collude_container{
        margin-top: 60px;
        &>ul{
            display: flex;
            flex-wrap: wrap;
            width: 575px;
            padding: 0;
            &>li{
                width: 115px;
                display: flex;
                overflow: hidden;
                margin-bottom: 15px;
                &>div{
                    flex-grow: 1;
                    &>p{
                        margin: 0;
                    }
                    &>P:nth-child(2){
                        margin-top: 16px;
                    }
                }
                &>img{
                    position: relative;
                    top: 3px;
                }
                &>div:nth-child(3){
                    display: flex;
                   flex-direction: column;
                   justify-content: space-around;
                }
            }
        }
    }
}}
</style>