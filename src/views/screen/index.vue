
<template>
  <el-row>
    <el-col :span="24">
      <div class="home_bg">
        <el-row type="flex" class="nav" justify="end">
          <el-col :span="1"
            ><el-dropdown>
              <el-button type="text"
                ><i class="el-icon-s-custom"></i>
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native.prevent="Login"
                  >进入系统</el-dropdown-item
                >
                <el-dropdown-item @click.native.prevent="outLogin"
                  >退出登录</el-dropdown-item
                >
              </el-dropdown-menu>
            </el-dropdown></el-col
          >
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {},
  methods: {
    Login() {
      this.$router.push({ path: "/setTime" });
    },
    outLogin() {
      this.$router.push({ path: "/" });
      this.$message.success("已退出账号");
    },
  },
};
</script>
<style lang="scss" scoped>
.home_bg {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/image/bg.png");
  background-size: 100% 100%;
  position: relative;
}
.nav {
  height: 161px;
  background: url("../../assets/image/nav.png");
  background-size: 100% 100%;
}
.el-icon-s-custom {
  font-size: 30px;
}
</style>
