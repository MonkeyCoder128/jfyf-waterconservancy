<template>
  <div class="dataManagePage">
    <div v-if="WhethertoAdd === false">
      <div style="padding: 20px 20px 0 20px">
        <div class="editBtn">
          <div class="boxTitle">
            <span class="formTile">基础数据</span>
            <span class="explain"
              >填写水库基础数据的安全值，超出数值范围系统将自动预警。</span
            >
          </div>

          <el-button
            v-if="efitDisable"
            style="
              width: 100px;
              margin-left: 15px;
              border: 1px solid #1c48bf;
              border-radius: 5px;
              color: #1c48bf;
            "
            size="small"
            @click="editForm()"
            >编辑</el-button
          >
        </div>
        <div class="boxLine"></div>
        <el-form
          :model="configForm"
          ref="configForm"
          label-width="90px"
          style="width: 45%"
        >
          <el-form-item label="水坝位置" prop="address">
            <!--省市三级联动-->
            <el-cascader
              :disabled="efitDisable"
              size="small"
              style="width: 200px"
              placeholder="请选择水坝位置"
              v-model="location"
              :options="options"
              :props="{ value: 'label' }"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="水坝名称" prop="name">
            <el-input
              :disabled="efitDisable"
              size="small"
              style="width: 200px"
              v-model.trim="configForm.name"
              autocomplete="off"
              placeholder="请输入名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="水坝概况">
            <div class="contentBox">
              <div>
                <span style="margin-left: 0">水位</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.shuiWei"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>库存</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.kuCun"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>出库</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.chuKu"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>入库</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.ruKu"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>降雨量</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.jiangyuliang"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="boxLine"></div>
      <div style="padding: 20px 20px 0 20px">
        <div class="boxTitle">
          <span class="formTile">监测数据</span>
          <span class="explain"
            >填写水库监测数据的安全值，超出数值范围系统将自动预警。</span
          >
        </div>
        <div class="boxLine"></div>
        <el-form
          :model="configForm"
          ref="configForm"
          label-width="90px"
          style="width: 45%"
        >
          <el-form-item label="形变位移" prop="name">
            <div class="contentBox contentBoxLine">
              <div style="margin-bottom: 20px">
                <span style="margin-left: 0">水平位移</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.shuiPingWeiYiMin"
                  autocomplete="off"
                  placeholder="请输入最低数值"
                ></el-input
                ><i class="inputLine"></i>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.shuiPingWeiYiMax"
                  autocomplete="off"
                  placeholder="请输入最高数值"
                ></el-input>
              </div>
              <div>
                <span style="margin-left: 0">高程位移</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.gaoChengWeiYiMin"
                  autocomplete="off"
                  placeholder="请输入最低数值"
                ></el-input
                ><i class="inputLine"></i>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.gaoChengWeiYiMax"
                  autocomplete="off"
                  placeholder="请输入最高数值"
                ></el-input>
              </div>
            </div>
          </el-form-item>
          <el-form-item label="水质检测" prop="co2">
            <div class="contentBox">
              <div>
                <span style="margin-left: 0">二氧化碳</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.co2"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>氧气</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.o2"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>氢气</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.h2"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>氮气</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.n2"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>氦气</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.he"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
            </div>
          </el-form-item>

          <el-form-item label="渗透压" prop="shenTouYa">
            <el-input
              :disabled="efitDisable"
              size="small"
              style="width: 200px"
              v-model.trim="configForm.shenTouYa"
              placeholder="请输入数值"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="应力压力" prop="yingLiYaLi">
            <el-input
              :disabled="efitDisable"
              size="small"
              style="width: 200px"
              v-model.trim="configForm.yingLiYaLi"
              placeholder="请输入数值"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="流速流量" prop="username">
            <div class="contentBox">
              <div>
                <span style="margin-left: 0">流速</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.liuSu"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
              <div>
                <span>流量</span>
                <el-input
                  :disabled="efitDisable"
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                  size="small"
                  style="width: 200px"
                  v-model.trim="configForm.liuLiang"
                  autocomplete="off"
                  placeholder="请输入数值"
                ></el-input>
              </div>
            </div>
          </el-form-item>
        </el-form>

        <div style="float: right">
          <el-button
            @click="closeForm()"
            size="medium"
            v-if="efitDisable === false"
            >取 消</el-button
          >
          <el-button
            type="primary"
            @click="submitForm()"
            v-if="efitDisable === false"
            size="medium"
            >保 存</el-button
          >
        </div>
      </div>
    </div>

    <div v-if="WhethertoAdd === true" class="noDataBox">
      <img src="../../../assets/image/nulldata.png" alt="" />
      <div>
        <span>当前页面暂无数据，去</span>
        <i @click="addForm()">添加数据</i>
      </div>
      <p>添加数据后系统将会对超出安全值的数据进行预警！</p>
    </div>
  </div>
</template>
 
<script>
import provinces from "./provinces.json";
export default {
  name: "DataManage",
  data() {
    return {
      pid: "0",
      configForm: {
        address: [], //水坝位置
        name: "", //水坝名称
        shuiWei: "", //水位
        kuCun: "", //库存
        chuKu: "", //出库
        ruKu: "", //入库
        jiangyuliang: "", //降雨量
        shuiPingWeiYiMin: "", //水平位移最小值
        shuiPingWeiYiMax: "", //水平位移最大值
        gaoChengWeiYiMin: "", //高程位移最小值
        gaoChengWeiYiMax: "", //高程位移最大值
        co2: "", //二氧化碳
        o2: "", //氧气
        h2: "", //氢气
        n2: "", //氮气
        he: "", //氦气
        shenTouYa: "", //渗透压
        yingLiYaLi: "", //应力压力
        liuSu: "", //流速
        liuLiang: "", //流量
      },
      toAdd: true, //是否为新添数据
      WhethertoAdd: true, //是否为数据页面
      efitDisable: false, //是否可编辑
      options: provinces, // 省市区级联
      location: [],
    };
  },

  methods: {
    /**编辑事件 */
    editForm() {
      this.efitDisable = false;
    },
    /**添加事件 */
    addForm() {
      this.WhethertoAdd = false;
    },
    /**取消事件 */
    closeForm() {
      if (this.toAdd === true) {
        this.WhethertoAdd = true;
      } else if (this.toAdd === false) {
        this.WhethertoAdd = false;
        this.efitDisable = true;
      }
    },
    /**保存事件 */
    submitForm() {
      this.toAdd = false;
      this.efitDisable = true;
    },
    /**省市区三级联动 */
    addressChoose(value) {
      console.log(
        "省市区：",
      );
    },

    /**配置管理添加修改接口 */
    // this.$api.DATUM.updateConfig(this.pid).then((res) => {
    //   if (res.code === 200) {
    //     if(res.result===null){
    //       this.efitDisable=false;
    //     }else{
    //       this.efitDisable=true;
    //     }
    //     console.log(
    //       "%c获取配置管理信息：",
    //       "color:red;font-size:18px;font-weight:bold;",
    //       res
    //     );
    //   }
    // });
  },
  created() {
    console.log(
      "%c获取省市json文件：",
      "color:red;font-size:18px;font-weight:bold;",
      provinces
    );
    /**获取配置管理信息 */
    this.$api.DATUM.getDetail(this.pid).then((res) => {
      if (res.code === 200) {
        if (res.result === null) {
          this.toAdd = true;
        } else {
          this.toAdd = false;
        }
      }
    });
  },
};
</script>
 
<style  lang="scss" scoped>
/deep/ .el-form-item__label {
  font-size: 14px;
  font-weight: bold;
  color: #333333;
}
/deep/.el-form-item__label {
  margin-right: 10px;
}
.dataManagePage {
  font-family: PingFang SC;
  background: #ffffff;
  border-radius: 5px;
  height: 100%;
  .editBtn {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .boxTitle {
    display: flex;
    flex-direction: column;
    font-weight: bold;
    .formTile {
      font-size: 16px;
      color: #333333;
    }
    .explain {
      font-size: 14px;
      color: #999999;
      margin: 10px 0 18px 0;
    }
  }
  .boxLine {
    width: 100%;
    height: 1px;
    background: #eeeeee;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .contentBox {
    display: flex;
    align-items: center;
    div {
      display: flex;
      align-items: center;
      span {
        font-size: 14px;
        font-weight: bold;
        color: #666666;
        white-space: nowrap;
        margin: 0 10px 0 20px;
      }
      .inputLine {
        width: 20px;
        height: 1px;
        background: #999999;
        margin: 0 6px;
      }
    }
  }
  .contentBoxLine {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .noDataBox {
    height: 80%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      width: 264px;
      height: 235px;
    }
    div {
      display: flex;
      align-items: center;
      font-size: 16px;
      font-weight: bold;
      margin: 13px 0 10px 0;
      span {
        color: #999999;
      }
      i {
        color: #1c48bf;
        font-style: normal;
        cursor: pointer;
      }
    }
    p {
      font-size: 14px;
      font-weight: bold;
      color: #999999;
    }
  }
}
</style>