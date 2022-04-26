<template>
  <div class="userInfoPage">
    <el-card shadow="always" class="el-card">
      <el-form
        :model="user"
        :rules="userRules"
        ref="user"
        label-width="90px"
        style="width: 45%"
      >
        <el-form-item label="用户角色" prop="roleType">
          <el-select
            v-model="user.roleType"
            size="small"
            placeholder="请选择用户角色"
          >
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input
            size="small"
            v-model="user.name"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="phone">
          <el-input
            size="small"
            v-model="user.phone"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="修改密码"
          prop="newPassword"
          v-if="this.$route.query.type === 'edit'"
        >
          <el-input
            size="small"
            v-model="user.newPassword"
            placeholder="请输入新密码"
            type="password"
          />
        </el-form-item>
        <el-form-item
          label="确认密码"
          prop="confirmPassword"
          v-if="this.$route.query.type === 'edit'"
        >
          <el-input
            size="small"
            v-model="user.confirmPassword"
            placeholder="请确认新密码"
            type="password"
          />
        </el-form-item>
        <el-form-item>
          <el-button @click="closeForm()" size="small">取 消</el-button>
          <el-button type="primary" size="small" @click="submitForm()"
            >提 交</el-button
          >
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "UserInfo",
  data() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.newPassword !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    return {
      options: [
        {
          value: "选项1",
          label: "巡检员",
        },
        {
          value: "选项2",
          label: "站长",
        },
        {
          value: "选项3",
          label: "水坝巡检员",
        },
      ],
      user: {
        userId: "",
        roleType: "",
        name: "",
        phone: "",
        newPassword: "",
        confirmPassword: "",
      },
      userRules: {
        roleType: [
          {
            required: true,
            message: "请选择用户角色",
            trigger: "change",
          },
        ],
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        phone: [{ required: true, message: "请填写用户账号", trigger: "blur" }],

        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
          {
            min: 6,
            max: 20,
            message: "长度在 6 到 20 个字符",
            trigger: "blur",
          },
        ],
        confirmPassword: [
          { required: true, message: "确认密码不能为空", trigger: "blur" },
          { required: true, validator: equalToPassword, trigger: "blur" },
        ],
      },
      formDisable: false,
    };
  },
  methods: {
    /** 取消 */
    closeForm() {
      this.$refs.user.resetFields();
      this.$router.push({
        path: "/system/userManage",
      });
      console.log("%c没有值：", "color:red;font-size:18px;font-weight:bold;");
    },
    submitForm() {
      this.$refs["user"].validate((valid) => {
        if (valid) {
          if (this.$route.query.type === "add") {
            console.log(
              "%c提交新增：",
              "color:red;font-size:18px;font-weight:bold;",
              this.user
            );
          } else if (this.$route.query.type === "edit") {
            this.user.userId = this.$route.query.id;
            console.log(
              "%c提交编辑：",
              "color:red;font-size:18px;font-weight:bold;",
              this.user
            );
          }
        } else {
          return false;
        }
      });
    },
  },
  created() {
    if (this.$route.query.type === "add") {
      this.formDisable = false;
    } else if (this.$route.query.type === "edit") {
      this.formDisable = true;
    }
  },
};
</script>
 
<style  lang="scss" scoped>
.userInfoPage {
  .el-card {
    height: 93vh;
  }
}
</style>