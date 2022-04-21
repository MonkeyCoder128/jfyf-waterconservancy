<!--
* @Filedescription:眼科检查表格组件
* @Date:2021-12-14
-->
<template>
  <div class="primary_container">
      <div class="table_container">
            <table>
              <tbody>
                <!-- 第一行 -->
                <tr >
                  <td colspan="2">项目</td>
                  <td colspan="4">检查结果</td>
                </tr> 
                <!-- 第一行 -->
                <tr >
                  <td colspan="2">色觉</td>
                  <td colspan="4"></td>
                </tr>  
                <!-- 第二行  -->
                <tr>
                  <td colspan="2">眼别</td>
                  <td colspan="2">右</td>
                  <td colspan="2">左</td>
                </tr>
                <!-- 第三行  -->
                <tr>
                  <td rowspan="2">视力</td>
                  <td>裸眼</td>
                  <td>远视力</td>
                  <td>近视力*</td>
                  <td>远视力</td>
                  <td>近视力*</td>
                </tr>
                <tr>
                  <td>矫正</td>
                  <td>远视力</td>
                  <td>近视力*</td>
                  <td>远视力</td>
                  <td>近视力*</td>
                </tr>
                <!-- 第四行  -->
                <tr>
                  <td colspan="2">眼前部</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第五行  -->
                <tr>
                  <td colspan="2">晶体裂隙灯<br>检查所见</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第六行  -->
                <tr>
                  <td colspan="2">晶体裂隙灯<br>及正面图</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第七行  -->
                <tr>
                  <td colspan="2">玻璃体</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第八行  -->
                <tr>
                  <td colspan="2">眼底</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第九行  -->
                <tr>
                  <td colspan="2">眼底</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第十行  -->
                <tr>
                  <td colspan="2">视野*</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
                <!-- 第十一行  -->
                <tr>
                  <td colspan="2">医师签字</td>
                  <td colspan="2"></td>
                  <td colspan="2"></td>
                </tr>
              </tbody>
            </table>
    </div>
  </div>
</template>

<script>
export default {
     data() {
        return {
        
        }
      }
}
</script>

<style lang="scss" scoped>
.primary_container{
  width: 100%;
  .table_container{
    margin: 0 auto;
    width: 900px;
    table{
      width: 100%;
      border-collapse: collapse;
      line-height: 45px;
       tr,td,th{
         border:1px solid #000;
         text-align: center;
       }
      &>thead{
        tr{
           th:nth-child(1),th:nth-child(3){
            width: 35%;
           }
            th:nth-child(2),th:nth-child(4){
            width: 15%;
           }
        }
      }
      &>tbody{
        .aligning{
          writing-mode: vertical-rl ;width: 6%;letter-spacing:15px
        }
      }
    }
  }
}
</style>