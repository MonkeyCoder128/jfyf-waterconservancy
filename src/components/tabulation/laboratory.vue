<!--
* @Filedescription:实验室检查表格组件
* @Date:2021-12-13
-->
<template>
  <div class="primary_container">
      <div class="table_container">
            <table>
               <thead>
                  <tr>
                  <th colspan="3">项目</th>
                  <th>化验结果</th>
                  <th colspan="3">项目</th>
                  <th>化验结果</th>
                </tr>
              </thead>
              <tbody>
                <!-- 第一行 -->
                <tr >
                  <td rowspan="11" class="aligning">血常规</td>
                  <td colspan="2">血红蛋白(g/L)</td>
                  <td>结果栏</td>
                  <td rowspan="7" class="aligning">内分泌</td>
                  <td colspan="2">T<sub>3</sub>(mmol/L)<sup>*</sup></td>
                  <td>1</td>
                </tr>  
                <!-- 第二行  -->
                <tr >
                  <td colspan="2">红细胞(x10<sup>12</sup>/L)</td>
                  <td>结果栏</td>
                  
                  <td colspan="2">T<sub>4</sub>(mmol/L)<sup>*</sup></td>
                  <td>1</td>
                </tr> 
                <!-- 第三行  -->
                <tr >
                  <td colspan="2">血小板(X10<sup>9</sup>/L)</td>
                  <td>结果栏</td>
                
                  <td colspan="2">Tsh(mU/L)<sup>*</sup></td>
                  <td>1</td>
                </tr> 
                <!-- 第四行  -->
                 <tr >
                  <td colspan="2">白细胞(X10<sup>9</sup>/L)</td>
                  <td>结果栏</td>
                
                  <td colspan="2">睾丸酮(nmol/L)<sup>*</sup></td>
                  <td>1</td>
                </tr> 
                <!-- 第五行  -->
                <tr>
                  <td rowspan="7" class="aligning">白细胞分类</td>
                  <td>中性杆状核粒细胞(%)</td>
                  <td>4</td>
                
                  <td colspan="2">其他必要项目<sup>*</sup></td>
                
                  <td>8</td>
                </tr>
                <!-- 第六行  -->
                <tr>
               
                 
                  <td>中性分叶核粒细胞(%)</td>
                  <td>4</td>
                
                  <td colspan="2"></td>
                 
                  <td>8</td>
                </tr>
                <!-- 第七行  -->
                <tr>
                
               
                  <td>淋巴细胞(%)</td>
                  <td>4</td>
                
                  <td colspan="2"></td>
               
                  <td>8</td>
                </tr>
                <!-- 第八行  -->
                <tr>
                
                
                  <td>单核细胞(%)</td>
                  <td>4</td>
                  <td rowspan="14" class="aligning">外周血淋巴细胞遗传学</td>
                  <td rowspan="8" class="aligning">染色体畸变分析</td>
                  <td>分析中期分裂细胞个数(个)</td>
                  <td>8</td>
                </tr>
                <!-- 第九行  -->
                <tr>
                
                
                  <td>嗜酸性粒细胞(%)</td>
                  <td>4</td>
                
                 
                  <td>染色体畸变率(%)</td>
                  <td>8</td>
                </tr>
                <!-- 第十行  -->
                <tr>
                
                
                  <td>嗜碱性粒细胞(%)</td>
                  <td>4</td>
                
                 
                  <td rowspan="6">畸变类型</td>
                  <td rowspan="6">畸变数量</td>
                </tr>
                <!-- 第十一行  -->
                <tr>
              
                 
                  <td>其他必要项目<sup>*</sup></td>
                  <td>4</td>
               
                 
                 
                
                </tr>
                <!-- 第十二行  -->
                <tr>
                  <td rowspan="7" class="aligning">尿常规</td>
                 <td colspan="2" class="keepLeft">&nbsp;&nbsp;外观</td>
                  <td>4</td>
               
                  
                 
                </tr>
                <!-- 第十三行  -->
                <tr>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;葡萄糖</td>
                  <td>4</td>
                </tr>
                <!-- 第十四行  -->
                <tr>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;蛋白</td>
                  <td>4</td>
                 
                 
                 
                 
                </tr>
                <!-- 第十五行  -->
                <tr>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;镜检<sup>*</sup></td>
                  <td>4</td>
                 
                 
                 
                  
                </tr>
                <!-- 第十六行  -->
                <tr>
                 <td colspan="2" class="keepLeft">&nbsp;&nbsp;其他必要项目<sup>*</sup></td>
                  <td>4</td>
               
                  <td rowspan="4" class="aligning">微核</td>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;方法:&nbsp;(1)常规培养法&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(2)CB微核法</td>
                </tr>
                <!-- 第十七行  -->
                <tr>
                  <td colspan="2"></td>
                  <td>4</td>
                
                  
                  <td class="keepLeft">&nbsp;&nbsp;分析细胞数量(个)</td>
                  <td>8</td>
                </tr>
                <!-- 第十八行  -->
                <tr>
                  <td colspan="2"></td>
                  <td>4</td>
                 
                 
                  <td class="keepLeft">&nbsp;&nbsp;微核淋巴细胞率(%)</td>
                  <td>8</td>
                </tr>
                <!-- 第十九行  -->
                <tr>
                  <td rowspan="9" class="aligning">血液生物化学检查</td>
                  <td rowspan="3" class="aligning">肝功能</td>
                  <td class="keepLeft">&nbsp;&nbsp;丙氨酸氨基转移酶(µ/L)</td>
                  <td>4</td>
                  <td class="keepLeft">&nbsp;&nbsp;淋巴细胞微核率(%)</td>
                  <td>8</td>
                </tr>
                <!-- 第二十行  -->
                <tr>
                  <td class="keepLeft">&nbsp;&nbsp;血清总胆红素(µmol/L)</td>
                  <td>4</td>
                  <td colspan="2" rowspan="2">&nbsp;&nbsp;其他必要项目<sup>*</sup></td>
                  <td>8</td>
                </tr>
                <!-- 第二一行  -->
                <tr>
                  <td class="keepLeft">&nbsp;&nbsp;其他必要项目<sup>*</sup></td>
                  <td>4</td>
                
                  
                
                  <td>8</td>
                </tr>
                <!-- 第二二行  -->
                <tr>
                 
                  <td rowspan="3" class="aligning">肾功能</td>
                  <td class="keepLeft">&nbsp;&nbsp;血清肌酐(µmol/L)</td>
                  <td>4</td>
                  <td rowspan="6" class="aligning">其它化验检查</td>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;精液常规检查<sup>*</sup></td>
                 
                  <td>8</td>
                </tr>
                <!-- 第二三行  -->
                <tr>
                  <td class="keepLeft">&nbsp;&nbsp;血清尿素氮(mmol/L)</td>
                  <td>4</td>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;痰细胞学检查<sup>*</sup></td>
                  <td>8</td>
                </tr>
                <!-- 第二四行  -->
                <tr>
                  <td class="keepLeft">&nbsp;&nbsp;其他必要项目<sup>*</sup></td>
                  <td>4</td>     
                  <td rowspan="2" colspan="2">
                     <div class="alone">
                        <div><p>生物样品<br/>放化测量</p></div>
                        <div>
                          <p>尿铀</p>
                          <p>尿钚</p>
                        </div>
                     </div>
                  </td>
                  <td>8</td>
                </tr>
                <!-- 第二五行  -->
                <tr>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;血糖(mmol/L)</td> 
                  <td>4</td>
                  <td>8</td>
                </tr>
                <!-- 第二六行  -->
                <tr>
                  <td colspan="2" class="keepLeft">&nbsp;&nbsp;其他必要项目<sup>*</sup></td>    
                  <td>4</td>            
                  <td colspan="2">6</td>
                  <td>8</td>
                </tr>
                <!-- 第二七行  -->
                <tr>
                   <td colspan="2"></td>
                   <td></td>
                   <td colspan="2">6</td>
                  <td>8</td>
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
          writing-mode: vertical-rl ;letter-spacing:15px
        }
        .keepLeft{
          text-align: left
        }
        .alone{
          display: flex;
          height: 93px;
          line-height: normal;
          &>div{
           width: 50%;
          }
          &>div:nth-child(1){
            border-right: 1px solid #000;
            p{
              text-align: left;
              margin-top: 5px;
              margin-left: 5px;
            }
          }
           &>div:nth-child(2){
             p{
             margin: 0;
             height: 50%;
             line-height: 46.5px;
             }
             p:nth-child(1){
               border-bottom: 1px solid #000;
             }
           }
        }
      }
    }
  }
}
</style>