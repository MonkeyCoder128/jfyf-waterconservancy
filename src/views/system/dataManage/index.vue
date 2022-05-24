<template>
  <div class="dataManagePage">
    <div style="padding: 20px 20px 0 20px">
      <div class="boxTitle">
        <span class="formTile">基础数据</span>
        <span class="explain"
          >填写水库基础数据的安全值，超出数值范围系统将自动预警。</span
        >
      </div>
      <div class="boxLine"></div>
      <el-form :model="user" ref="user" label-width="90px" style="width: 45%">
        <el-form-item label="水坝位置" prop="name">
          <el-cascader
            size="small"
            style="width: 200px"
            :options="options"
            v-model="selectedOptions"
            @change="addressChoose"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="水坝名称" prop="name">
          <el-input
            size="small"
            style="width: 200px"
            v-model.trim="user.name"
            autocomplete="off"
            placeholder="请输入名称"
          ></el-input>
        </el-form-item>
        <el-form-item label="水坝概况" prop="username">
          <div class="contentBox">
            <div>
              <span style="margin-left: 0">水位</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>库存</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>出库</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>入库</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
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
      <el-form :model="user" ref="user" label-width="90px" style="width: 45%">
        <el-form-item label="形变位移" prop="name">
          <div class="contentBox contentBoxLine">
            <div style="margin-bottom: 20px">
              <span style="margin-left: 0">水平位移</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入最低数值"
              ></el-input
              ><i class="inputLine"></i>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入最高数值"
              ></el-input>
            </div>
            <div>
              <span style="margin-left: 0">高程位移</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入最低数值"
              ></el-input
              ><i class="inputLine"></i>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入最高数值"
              ></el-input>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="水质检测" prop="username">
          <div class="contentBox">
            <div>
              <span style="margin-left: 0">二氧化碳</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氧气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氢气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氮气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氦气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
          </div>
        </el-form-item>

        <el-form-item label="渗透压" prop="name">
          <el-input
            size="small"
            style="width: 200px"
            v-model.trim="user.name"
            placeholder="请输入数值"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="应力压力" prop="name">
          <el-input
            size="small"
            style="width: 200px"
            v-model.trim="user.name"
            placeholder="请输入数值"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="流速流量" prop="username">
          <div class="contentBox">
            <div>
              <span style="margin-left: 0">流速</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>流量</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氢气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氮气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
            <div>
              <span>氦气</span>
              <el-input
                onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                size="small"
                style="width: 200px"
                v-model.trim="user.username"
                autocomplete="off"
                placeholder="请输入数值"
              ></el-input>
            </div>
          </div>
        </el-form-item>
      </el-form>

      <div style="float: right">
        <el-button @click="closeForm()" size="medium">取 消</el-button>
        <el-button type="primary" @click="submitForm()" size="medium"
          >提 交</el-button
        >
      </div>
    </div>
  </div>
</template>
 
<script>
import { regionDataPlus, CodeToText } from "element-china-area-data";

export default {
  name: "DataManage",
  data() {
    return {
      pid: "0",
      user: {
        userId: null,
        roleId: "",
        name: "",
        username: "",
      },
      // 省市区级联
      options: regionDataPlus,
      selectedOptions: [],
    };
  },

  methods: {
    /**省市区三级联动 */
    addressChoose(value) {
      console.log(
        "省市区：",
        CodeToText[value[0]],
        CodeToText[value[1]],
        CodeToText[value[2]]
      );
    },
  },
  created() {
    /**获取配置管理信息 */
    this.$api.DATUM.getDetail(this.pid).then((res) => {
      if (res.code === 200) {
        console.log(
          "%c获取配置管理信息：",
          "color:red;font-size:18px;font-weight:bold;",
          res
        );
      }
    });
    /**省市查询 */
    this.$api.DATUM.provinceCity(this.pid).then((res) => {
      if (res.code === 200) {
        console.log(
          "%c省市区三级联动：",
          "color:red;font-size:18px;font-weight:bold;",
          res
        );
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
.dataManagePage {
  font-family: PingFang SC;
  background: #ffffff;
  border-radius: 5px;
  height: 100%;
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
}
</style>