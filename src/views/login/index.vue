<template>
  <div class="loginPage">
    <div class="loginBox">
      <div class="loginLeft"></div>
      <div class="loginRight">
        <el-form ref="loginForm" :model="loginForm" class="loginformBox">
          <span class="title">您好,欢迎登录！</span>
          <el-form-item prop="username" label="账号">
            <el-input
              v-model.trim="loginForm.username"
              type="text"
              auto-complete="off"
              prefix-icon="el-icon-user"
              placeholder="请输入账号"
            >
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input
              v-model.trim="loginForm.password"
              type="password"
              auto-complete="off"
              placeholder="密码"
              prefix-icon="el-icon-lock"
              @keyup.enter.native="handleLogin"
            >
            </el-input>
          </el-form-item>
          <el-checkbox
            v-model="loginForm.rememberMe"
            style="margin: 0px 0px 25px 2px; float: left"
            >15天内自动登录
          </el-checkbox>
          <el-form-item style="width: 100%">
            <el-button
              type="primary"
              style="width: 100%; height: 50px"
              @click.native.prevent="handleLogin"
            >
              <span>登 录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { Loginform, menuList, getUserInfo } from "@/api/login";
import Cookies from "js-cookie";
import { encrypt } from "@/utils/jsencrypt";
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
    };
  },
  created() {},
  mounted() {
    this.getCookie();
  },
  methods: {
    // 设置cookie,登录成功之后进行调用 传入账号名，密码，和保存天数3个参数
    setCookie(name, pwd, exdays) {
      console.log(
        "%c存储cookie：",
        "color:blue;font-size:18px;font-weight:bold;",
        name,
        pwd,
        exdays
      );
      var exdate = new Date(); // 获取时间
      exdate.setTime(exdate.getTime() + 24 * 60 * 60 * 1000 * exdays); // 保存的天数
      // 字符串拼接cookie
      window.document.cookie =
        "userName" + "=" + name + ";path=/;expires=" + exdate.toGMTString();
      window.document.cookie =
        "userPwd" + "=" + pwd + ";path=/;expires=" + exdate.toGMTString();
    },
    // 读取cookie 将用户名和密码回显到input框中
    getCookie() {
      if (document.cookie.length > 0) {
        var arr = document.cookie.split("; "); // 这里显示的格式需要切割一下自己可输出看下
        for (var i = 0; i < arr.length; i++) {
          var arr2 = arr[i].split("="); // 再次切割

          console.log(
            "%c读取cookie：",
            "color:red;font-size:18px;font-weight:bold;",
            arr2[0],
            arr2[1]
          );

          // 判断查找相对应的值
          if (arr2[0] === "username") {
            this.loginForm.username = arr2[1]; // 保存到保存数据的地方即v-model
          } else if (arr2[0] === "password ") {
            this.loginForm.password = arr2[1];
          }
        }
      }
    },
    handleLogin: function () {
      if (!this.loginForm.username) {
        this.$message({
          message: "请输入账号",
          type: "warning",
        });
      } else if (!this.loginForm.password) {
        this.$message({
          message: "请输入密码",
          type: "warning",
        });
      } else {
        if (this.loginForm.username && this.loginForm.password) {
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
          Loginform(this.loginForm)
            .then((res) => {
              if (res.data.code === "200") {
                window.sessionStorage.setItem("token", res.data.token);
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });

                Cookies.set("username", this.loginForm.username, {
                  expires: 30,
                });
                Cookies.set("password", encrypt(this.loginForm.password), {
                  expires: 30,
                });
                Cookies.set("rememberMe", this.loginForm.rememberMe, {
                  expires: 30,
                });
                this.$router.push({ path: "/screen" });
              } else if (res.data.code !== "200") {
                this.$message({
                  showClose: true,
                  message: res.data.message,
                  type: "error",
                });
              }
              return res.data.token;
            })
            .then((res) => {
              menuList(window.sessionStorage.getItem("token"))
                .then((res) => {
                  if (res.data.code === 200) {
                  }
                })
                .then(() => {
                  getUserInfo(window.sessionStorage.getItem("token"))
                    .then((response) => {
                      if (response.data.code === 200) {
                        console.log(
                          "%c用户信息：",
                          "color:blue;font-size:18px;font-weight:bold;",
                          response.data
                        );
                        //用户ID存储
                        window.sessionStorage.setItem(
                          "userId",
                          response.data.data.userId
                        );
                        //用户名存储
                        window.sessionStorage.setItem(
                          "username",
                          response.data.data.username
                        );
                        //用户类型存储
                        window.sessionStorage.setItem(
                          "authority",
                          response.data.data.authorities[0].authority
                        );
                      }
                      return response;
                    })
                    .catch(() => {
                      this.$message({
                        showClose: true,
                        message: "用户信息获取异常",
                        type: "error",
                      });
                      return false;
                    });
                })
                .catch(() => {
                  return false;
                });
            })
            .catch(() => {
              return false;
            });
        }
      }
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
  align-items: center;
  justify-content: center;
  .loginBox {
    width: 60%;
    height: 700px;
    display: flex;
    justify-content: space-between;
    .loginLeft {
      width: 60%;
      height: 100%;
      background-size: cover;
      background-image: url("../../assets/image/logo.png");
    }

    .loginRight {
      width: 35%;
      display: flex;
      align-items: center;
      justify-content: center;
      .loginformBox {
        width: 500px;
      }

      .title {
        font-size: 24px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #333333;
        line-height: 120px;
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
}
</style>