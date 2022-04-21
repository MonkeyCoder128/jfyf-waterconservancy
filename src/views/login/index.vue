<template>
  <div>
    <h1>水里水库后台管理系统</h1>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">

      <el-form-item label="账号" prop="Account">
        <el-input v-model="loginForm.Account"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="ManagerPWD">
        <el-input  type="password" v-model="loginForm.ManagerPWD"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="handleLogin('loginForm')">登录</el-button>
        <!-- <el-button type="primary" @click="register()">注册</el-button> -->
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {Loginform} from '@/Api/login'
export default {
  data() {
      return {
        loginForm: {
          Account: '',
          ManagerPWD: ''
        },
        rules: {
          Account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          ManagerPWD: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      };``
    },
  created(){

  },
  methods: {
    handleLogin() {
      this.$router.push({ path: '/screen' })
      // if (this.loginForm.Account === '' || this.loginForm.ManagerPWD === '') {
      //   this.$message({
      //     showClose: true,
      //     message: '请输入账号密码',
      //     type: 'warning'
      //   });
      // } else {
      //   Loginform(this.loginForm).then(res=>{
      //     if(res.data.Code != 1){
      //       this.$message({
      //         showClose: true,
      //         message: res.data.Message,
      //         type: 'error'
      //       });
      //       console.log('error submit!!');
      //       return false;
      //     }else{
      //       this.$message({
      //         showClose: true,
      //         message: '登录成功',
      //         type: 'success'
      //       });
      //       this.$router.push({ path: '/home' })
      //     }
      //   })
      // }
    },
    register(){
      this.$router.push({ path: '/register' })
    }
  }
}
</script>

<style lang="scss" scoped>
h1{
  text-align: center;
}
.demo-loginForm{
  width: 30vw;
  height: 50vh;
  border: solid 1px #ccc;
  margin: 0 auto;
}
</style>