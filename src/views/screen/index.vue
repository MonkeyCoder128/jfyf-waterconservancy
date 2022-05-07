<template>
  <el-row>
    <el-col :span="24">
      <div class="home_bg">
        <el-row type="flex" class="nav" justify="end">
          <p class="p_nav">智慧水坝管理平台</p>
          <el-col :span="1"
            ><el-dropdown trigger="click">
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

        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col :span="6" class="screen_left">
            <div class="box">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">安全监测</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <outbox />
            </div>
            <div class="box">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">坝基变形监测</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <deformation />
            </div>
            <div class="box">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">水质监测</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <el-row>
                <el-col :span="24"><pie /></el-col>
              </el-row>
            </div>
          </el-col>
          <el-col :span="11" class="screen_cont"
            ><div class="box_cont box_cont_top"><img src="../../assets/image/3d.png" class="threed"  alt=""
                  /></div>
            <div class="box_cont">
              <div class="box_nav box_nav1">
                <el-row :gutter="19">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">水库概况</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="6"><div class="bg-purple">库前水位<div class="num">1344m³</div></div></el-col>
                  <el-col :span="6"><div class="bg-purple">库存<div class="num">1256m³</div></div></el-col>
                  <el-col :span="6"><div class="bg-purple">出库<div class="num">6587m³</div></div></el-col>
                  <el-col :span="6"><div class="bg-purple">入库<div class="num">5687m³</div></div></el-col>
                </el-row>
              </div>
            </div>
            <div class="box_cont">
              <div class="box_nav box_nav1">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">大坝巡查</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div></div
          ></el-col>
          <el-col :span="6" class="screen_right">
            <div class="box_right">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">天气</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <weather></weather>
            </div>
            <div class="box_right">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">渗透压监测</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <broken></broken>
            </div>
            <div class="box_right">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">压力/应力监测</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <pressure></pressure>
            </div>
            <div class="box_right">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">流速、流量监测</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <flow />
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import outbox from "./components/outbox.vue";
import deformation from "./components/deformation.vue";
import pie from "./components/pie.vue";
import weather from "./components/weather.vue";
import broken from "./components/broken.vue";
import pressure from "./components/pressure.vue";
import flow from "./components/flow.vue";
export default {
  components: {
    outbox,
    deformation,
    pie,
    weather,
    broken,
    pressure,
    flow,
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    Login() {
      this.$router.push({ path: "/realtimeMnitor" });
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
  z-index: 1;
}
.nav {
  width: 100%;
  background: url("../../assets/image/top.png");
  background-size: 100% 100%;
  background-color: rgba(0, 0, 0, 0.3);
  position: absolute;
  z-index: 9999;
}
.el-icon-s-custom {
  font-size: 30px;
}
.row-bg {
  padding: 88px 25px;
  padding-bottom: 0;
}
.p_nav {
  width: 100%;
  text-align: center;
  font-size: 31px;
  line-height: 72px;
  background: linear-gradient(#96f6fa, #4cabb0, #214f51);
  -webkit-background-clip: text;
  color: transparent;
  font-weight: bold;
  letter-spacing: 23px;
  margin-left: 105px;
}
.screen_left,
.screen_cont,
.screen_right {
  display: flex;
  flex-direction: column;
}
.box,
.box_right,
.box_cont {
  height: 28.5vh;
  margin-top: 1vh;
  position: relative;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px 0;
  overflow: hidden;
}
.box_right {
  height: 21.1vh;
}
.box_cont {
  height: 20.5vh;
}
.box_cont_top {
  height: 44.5vh;
  background: none;
}
.box_nav,
.box_nav1 {
  width: 86%;
  height: 35px;
  color: #2e89e0;
  line-height: 29px;
  text-shadow: 0 0 10px #2e89e0, 0 0 2px #87e9eb;
  border-top: solid 1px #142a33;
  border-bottom: solid 1px #142a33;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}
.box_nav1 {
  width: 95%;
}
.title1 {
  padding-top: 5px;
}
.icon_title2,
.icon_title3 {
  position: absolute;
  top: 0;
  right: 2vw;
}
.icon_title3 {
  right: 1vw;
}
/deep/::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

.el-table::before {
  //去除底部白线
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

.bg-purple {
  width: 100%;
  height: 10vh;
  margin-top: 3vh;
  background: #0e1629;
  border: 1px solid #3885e5;
  // opacity: 0.36;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 15px;
}
.num{
  color: #fff;
  font-size: 24px;
}
.threed{
  margin:4% auto 0;
  width: 594px;
  height: 356px;
  display: block;
}
</style>
