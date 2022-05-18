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
        <el-form-item label="用户角色" prop="roleId">
          <el-select
            v-model="user.roleId"
            size="small"
            placeholder="请选择用户角色"
          >
            <el-option
              v-for="item in optionsRole"
              :key="item.roleId"
              :label="item.roleName"
              :value="item.roleId"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名称" prop="name">
          <el-input
            size="small"
            v-model.trim="user.name"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="用户账号" prop="username">
          <el-input
            onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
            size="small"
            v-model.trim="user.username"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="修改密码"
          prop="password"
          v-if="this.$route.query.type === 'edit'"
        >
          <el-input
            size="small"
            v-model.trim="user.password"
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
            v-model.trim="user.confirmPassword"
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
    return {
      queryParams: {
        page: 1,
        size: 10000,
        message: "",
      },
      optionsRole: [],
      user: {
        userId: null,
        roleId: "",
        name: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
      userRules: {},
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
            this.$api.USER.addinsertUser(this.user).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "用户新增成功！",
                  type: "success",
                });
                this.$router.push({
                  path: "/system/userManage",
                });
              }
            });
          } else if (this.$route.query.type === "edit") {
            this.user.userId = this.$route.query.id;
            this.$api.USER.updateUserInfo(this.user).then((res) => {
              if (res.data.code === 200) {
                this.$message({
                  message: "修改成功！",
                  type: "success",
                });
                this.$router.push({
                  path: "/system/userManage",
                });
              }
            });
          }
        } else {
          return false;
        }
      });
    },
  },
  created() {
    const equalToPassword = (rule, value, callback) => {
      if (this.user.password !== value) {
        callback(new Error("两次输入的密码不一致"));
      } else {
        callback();
      }
    };
    if (this.$route.query.type === "add") {
      this.formDisable = false;
      this.userRules = {
        roleId: [
          {
            required: true,
            message: "请选择用户角色",
            trigger: "change",
          },
        ],
        name: [
          { required: true, message: "请输入用户名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        username: [
          {
            required: true,
            message: "请填写用户账号",
            trigger: "blur",
          },
          {
            pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
            message: "请输入正确的手机号码",
            trigger: "blur",
          },
        ],
        password: [
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
      };
    } else if (this.$route.query.type === "edit") {
      this.userRules = {
        password: [
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
      };
      this.$api.USER.viewUserInfo(this.$route.query.id).then((res) => {
        if (res.data.code === 200) {
          this.user = res.data.result;
          this.user.password = "";
          this.user.roleId = Number(res.data.result.roleId);
        }
      });
      this.formDisable = true;
    }
    this.$api.ROLE.roleList(this.queryParams).then((res) => {
      if (res.data.code === 200) {
        this.optionsRole = res.data.result.data;
      }
    });
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