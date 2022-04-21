<template>
  <div>
    <h1>注册页面</h1>
    <el-form :model="loginForm" :rules="rules" ref="loginForm" label-width="100px" class="demo-loginForm">
      
      <el-form-item label="姓名" prop="ManagerName">
        <el-input v-model="loginForm.ManagerName"></el-input>
      </el-form-item>

      <el-form-item label="账号" prop="Account">
        <el-input v-model="loginForm.Account" @blur="ExistAccount($event)"></el-input>
      </el-form-item>

      <el-form-item label="密码" prop="ManagerPWD">
        <el-input  type="password" v-model="loginForm.ManagerPWD"></el-input>
      </el-form-item>

      <el-form-item label="工号" prop="JobNumber">
        <el-input v-model="loginForm.JobNumber"></el-input>
      </el-form-item>

      <el-form-item label="手机号" prop="PhoneNumber">
        <el-input v-model="loginForm.PhoneNumber"></el-input>
      </el-form-item>

      <el-form-item label="科室" prop="Department">
        <el-input v-model="loginForm.Department"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="register()">注册</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
import {Register,ExistAccount} from '@/Api/register'
export default {
  data() {
      return {
        loginForm: {
          ManagerName: '',
          Account: '',
          ManagerPWD: '',
          JobNumber: '',
          PhoneNumber: '',
          Department: ''
        },
        rules: {
          ManagerName: [
            { required: true, message: '请输入姓名', trigger: 'blur' },
          ],
          Account: [
            { required: true, message: '请输入账号', trigger: 'blur' },
          ],
          ManagerPWD: [
            { required: true, message: '请输入密码', trigger: 'blur' },
          ],
        }
      };
    },
  created(){

  },
  methods: {
    ExistAccount(event) {
      var value = event.target.value
      var queryJson = {Account:value}
      ExistAccount(queryJson).then(res=>{
        console.log(res)
      })
    },
    register() {
      if (this.loginForm.ManagerName === '' || this.loginForm.Account === '' || this.loginForm.ManagerPWD === '') {
        this.$message({
          showClose: true,
          message: '请输入姓名账号密码',
          type: 'warning'
        });
      } else {
        Register(this.loginForm).then(res=>{
          if(res.data.Code != 1){
            this.$message({
              showClose: true,
              message: res.data.Message,
              type: 'error'
            });
            return false;
          }else{
            this.$message({
              showClose: true,
              message: '注册成功',
              type: 'success'
            });
            this.$router.push({ path: '/' })
          }
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
h1{
  text-align: center;
}
.demo-loginForm{
  width: 30vw;
  border: solid 1px #ccc;
  margin: 0 auto;
}
</style>