<template>
  <div class="loginPage">
    <div class="loginBox">
      <div class="loginLeft">
        <h3>水库智慧管理平台</h3>
        <p>实时掌握大坝运行数据，全面赋能智慧水库建设</p>
      </div>
      <div class="loginRight">
        <el-form ref="loginForm" :model="loginForm" class="loginformBox">
          <span class="title">您好,欢迎登录！</span>
          <el-form-item prop="username" label="账号">
            <el-input v-model.trim="loginForm.username" type="text" auto-complete="off" prefix-icon="el-icon-user"
              placeholder="请输入账号">
            </el-input>
          </el-form-item>
          <el-form-item prop="password" label="密码">
            <el-input v-model.trim="loginForm.password" type="password" auto-complete="off" placeholder="密码"
              prefix-icon="el-icon-lock" @keyup.enter.native="handleLogin">
            </el-input>
          </el-form-item>
          <el-checkbox v-model="loginForm.autoLogin" style="margin: 0px 0px 25px 2px; float: left">15天内自动登录
          </el-checkbox>
          <el-form-item style="width: 100%">
            <el-button type="primary" style="width: 100%; height: 50px" @click.native.prevent="handleLogin">
              <span>登 录</span>
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
const Base64 = require("js-base64").Base64;
const $utils = require("../../utils/public.js")
export default {
  data () {
    return {
      loginForm: {
        username: "",
        password: "",
        autoLogin: true, //是否15天自动登录
      },
    };
  },
  created () {
    // 按 Enter 键登录系统
    document.onkeydown = (e) => {
      e = window.event || e;
      if (this.$route.path === "/login" && e.keyCode === 13) this.handleLogin(); // submitLoginForm() 为登录函数
    };
  },

  mounted () {
    if (this.$cookies.isKey("token") && localStorage.getItem("userInfo")) {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));
      this.loginForm.password = Base64.decode(userInfo.password);
      this.loginForm.username = userInfo.username;
    }
  },
  methods: {
    handleLogin: $utils.Debounce(function () {
      let that = this;
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
          let parmas = this.loginForm;
          this.$api.LOGIN.Loginform(parmas)
            .then((res) => {
              if (res.code === "200") {
                if (this.loginForm.autoLogin) {
                  $utils.setCookie('token', res.token, 15)
                } else {
                  $utils.setCookie('token', res.token)
                }
                this.$message({
                  showClose: true,
                  message: "登录成功",
                  type: "success",
                });
                that.getUser();
                this.$router.push({
                  path: "/",
                  query: {
                    flag: 1,
                  },
                });
              } else if (res.code !== "200") {
                this.$message({
                  showClose: true,
                  message: res.message,
                  type: "error",
                });
              }
              return res.token;
            })
            .catch(() => {
              return false;
            });
        }
      }
    }, 0),
    async getUser () {
      const { data } = await this.$api.LOGIN.getUserInfo();
      console.log(data);
      const userInfo = {
        userId: data.userId,
        username: data.username,
        name:data.name,
        authority: data.authorities[0].authority,
        password: Base64.encode(this.loginForm.password),
      };
      //存储用户信息
      if (this.loginForm.autoLogin) {
        window.localStorage.setItem("userInfo", JSON.stringify(userInfo));
      }
    },
  },
};
</script>
<style lang="scss" scoped>
>>>.el-input__inner {
  margin-bottom: 10px;
}

.loginPage {
  /* 加载背景图 */
  background-image: url("../../assets/image/loginBg.png");
  /* 背景图垂直、水平均居中 */
  background-position: center center;
  /* 背景图不平铺 */
  background-repeat: no-repeat;
  /* 当内容高度大于图片高度时，背景图像的位置相对于viewport固定 */
  background-attachment: fixed;
  /* 让背景图基于容器大小伸缩 */
  background-size: cover;
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;

  .loginBox {
    width: 65%;
    height: 700px;
    display: flex;
    justify-content: space-between;
    background-color: #ffffff;
    box-shadow: 0px 10px 10px 0px rgba(33, 38, 54, 0.19),
      0px -10px 10px 0px rgba(33, 38, 54, 0.19);
    border-radius: 5px;

    .loginLeft {
      padding-left: 50px;
      width: 60%;
      height: 100%;
      background-image: url("../../assets/image/logo.png");
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;

      h3 {
        margin-top: 60px;
        white-space: nowrap;
        font-size: 30px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
        line-height: 80px;
      }

      p {
        white-space: nowrap;
        font-size: 16px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #ffffff;
      }
    }

    .loginRight {
      width: 46%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;

      .loginformBox {
        width: 400px;
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