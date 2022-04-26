<template>
  <div class="loginPage">
    <div class="loginLeft"></div>
    <div class="loginRight">
      <el-form
        ref="loginForm"
        :model="loginForm"
        :rules="loginRules"
        class="login-form"
      >
        <span class="title">水利水库管理系统</span>
        <el-form-item prop="username">
          <el-input
            v-model="loginForm.username"
            type="text"
            auto-complete="off"
            prefix-icon="el-icon-user"
            placeholder="账号/工号/手机号"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="loginForm.password"
            type="password"
            auto-complete="off"
            placeholder="密码"
            prefix-icon="el-icon-lock"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="code">
          <el-input
            v-model="loginForm.code"
            auto-complete="off"
            placeholder="请输入验证码"
            style="width: 63%; margin-right: 2%"
            prefix-icon="el-icon-key"
            @keyup.enter.native="handleLogin"
          >
          </el-input>
          <div class="login-code">
            <img src="../../assets/image/profile.jpeg" @click="getCode" />
          </div>
        </el-form-item>
        <el-checkbox
          v-model="loginForm.rememberMe"
          style="margin: 0px 0px 25px 2px; float: left"
          >记住密码
        </el-checkbox>
        <el-form-item style="width: 100%">
          <el-button
            :loading="loading"
            type="primary"
            style="width: 100%; height: 50px"
            @click.native.prevent="handleLogin"
          >
            <span v-if="!loading">登 录</span>
            <span v-else>登 录 中...</span>
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Loginform, getUserInfo } from "@/Api/login";
import Cookies from "js-cookie";
import { decrypt, encrypt } from "@/utiles/jsencrypt";
export default {
  data() {
    return {
      loginForm: {
        username: "",
        password: "",
        rememberMe: false,
        code: "",
        uuid: "",
      },
      loginRules: {
        username: [
          {
            required: true,
            trigger: "blur",
            message: "用户名不能为空",
          },
        ],
        password: [
          {
            required: true,
            trigger: "blur",
            message: "密码不能为空",
          },
        ],
        code: [
          { required: true, trigger: "change", message: "验证码不能为空" },
        ],
      },
      loading: false,
    };
  },
  created() {
    this.getCode();
  },
  methods: {
    getCode() {
      console.log(
        "%c更换验证码：",
        "color:red;font-size:18px;font-weight:bold;"
      );
    },
    // getuserMessage() {
    //   getUserInfo().then((res) => {
    //     if (res.data.code === "200") {
    //       console.log(
    //         "%当前用户信息",
    //         "color:red;font-size:18px;font-weight:bold;",
    //         res.data
    //       );
    //     }
    //   });
    // },

    handleLogin() {
      this.$refs.loginForm.validate((valid) => {
        if (valid) {
          this.loading = true;
          if (this.loginForm.rememberMe) {
            Cookies.set("username", this.loginForm.username, {
              expires: 30,
            });
            Cookies.set("password", encrypt(this.loginForm.password), {
              expires: 30,
            });
            Cookies.set("rememberMe", this.loginForm.rememberMe, {
              expires: 30,
            });
          } else {
            Cookies.remove("username");
            Cookies.remove("password");
            Cookies.remove("rememberMe");
          }
          Loginform(this.loginForm).then((res) => {
            if (res.data.code === "200") {
              this.$message({
                showClose: true,
                message: "登录成功",
                type: "success",
              });
              // this.getuserMessage();
              this.$router.push({ path: "/screen" });
            } else {
              this.loading = false;
              this.$message({
                showClose: true,
                message: res.data.message,
                type: "error",
              });
              return false;
            }
          });
          // window.sessionStorage.setItem("token", "11111111111");
          // this.$router.push({ path: "/screen" });
        }
      });
    },
  },
};
</script>
<style lang="scss" scoped>
>>> .el-input__inner {
  margin-bottom: 10px;
}

.loginPage {
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: space-between;

  .loginLeft {
    width: 60%;
    background: url("../../assets/image/logo.jpeg");
    background-size: cover;
  }

  .loginRight {
    width: 35%;
    display: flex;
    align-items: center;
    justify-content: center;

    .title {
      display: block;
      text-align: center;
      font-size: 40px;
      margin-top: 60px;
      font-family: PingFangSC-Semibold, PingFang SC;
      font-weight: 600;
      margin-bottom: 50px;
    }

    .login-code {
      width: 33%;
      height: 38px;
      float: right;

      img {
        width: 100%;
        height: 100%;
        cursor: pointer;
        vertical-align: middle;
      }
    }
  }
}
</style>