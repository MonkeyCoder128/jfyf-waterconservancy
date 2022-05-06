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
                  <el-col :span="1"
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
                  <el-col :span="1"
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
                  <el-col :span="1"
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
                <el-col :span="12"><pie /></el-col>
                <el-col :span="12"
                  ><div class="box_shuizhi">
                    <el-row class="shuizhi1">
                      <el-col :span="2" class="square"></el-col>
                      <el-col :span="13" style="padding-left: 20px"
                        >二氧化碳</el-col
                      >
                      <el-col :span="2" class="p_shuizhi1">30%</el-col>
                    </el-row>
                    <el-row class="shuizhi2">
                      <el-col :span="2" class="square1"></el-col>
                      <el-col :span="13" style="padding-left: 20px"
                        >氢含量</el-col
                      >
                      <el-col :span="2" class="p_shuizhi2">10%</el-col>
                    </el-row>
                    <el-row class="shuizhi3">
                      <el-col :span="2" class="square2"></el-col>
                      <el-col :span="13" style="padding-left: 20px"
                        >氧含量</el-col
                      >
                      <el-col :span="2" class="p_shuizhi3">60%</el-col>
                    </el-row>
                  </div></el-col
                >
              </el-row>
            </div>
          </el-col>
          <el-col :span="13" class="screen_cont"
            ><div class="box_cont box_cont_top"></div>
            <div class="box_cont">
              <div class="box_nav"><el-row :gutter="20">
                  <el-col :span="1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">水库概况</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row></div>
            </div>
            <div class="box_cont">
              <div class="box_nav">大坝巡查</div>
            </div></el-col
          >
          <el-col :span="6" class="screen_right">
            <div class="box_right">
              <div class="box_nav">天气</div>
              <weather></weather>
            </div>
            <div class="box_right">
              <div class="box_nav">渗透压监测</div>
              <broken></broken>
            </div>
            <div class="box_right">
              <div class="box_nav">压力/应力监测</div>
              <pressure></pressure>
            </div>
            <div class="box_right">
              <div class="box_nav">流速、流量监测</div>
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
  height: 161px;
  background: url("../../assets/image/nav.png");
  background-size: 100% 100%;
  position: absolute;
  z-index: 9999;
}
.el-icon-s-custom {
  font-size: 30px;
}
.row-bg {
  padding: 88px;
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
  width: 20vw;
  height: 28.5vh;
  margin-top: 1vh;
  position: relative;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px;
  overflow: hidden;
}
.box_right {
  height: 21.1vh;
}
.box_cont {
  width: 45vw;
  height: 20.5vh;
}
.box_cont_top {
  height: 44.5vh;
}
.box_nav {
  width: 86%;
  color: #87e9eb;
  line-height: 29px;
  text-shadow: 0 0 10px #87e9eb, 0 0 5px #87e9eb;
  border-top: solid 1px #142a33;
  border-bottom: solid 1px #142a33;
  margin: 0 auto;
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
.table {
  width: 100%;
  margin-top: 5px;
  color: #bebec2;
}
/deep/.el-table__body-wrapper {
  height: 152px;
  overflow: auto;
}
/deep/.el-table td.el-table__cell,
.el-table th.el-table__cell.is-leaf {
  border-bottom: 1px dashed #142f38;
}
/deep/ .el-table,
.el-table__expanded-cell {
  background-color: transparent;
}
/deep/ .el-table tr {
  background-color: transparent !important;
}
/deep/ .el-table--enable-row-transition .el-table__body td,
.el-table .cell {
  background-color: transparent;
}
/ddep/ .el-table th.el-table__cell {
  background-color: transparent !important;
}
/deep/ .el-table thead {
  color: #bebec2;
}
/deep/.el-table--enable-row-hover .el-table__body tr:hover > td.el-table__cell {
  background-color: transparent;
}

.el-table::before {
  //去除底部白线
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
.box_shuizhi {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  line-height: 13px;
}
.square,
.square1,
.square2 {
  width: 15px;
  height: 15px;
  background: #148f97;
}
.square1 {
  background: #1289ba;
}
.square2 {
  background: #115cb9;
}
.shuizhi1,
.shuizhi2,
.shuizhi3 {
  margin-top: 1.5vh;
  color: #fff;
}
.shuizhi1 {
  margin-top: 7vh;
}
.p_shuizhi1 {
  color: #148f97;
}
.p_shuizhi2 {
  color: #1289ba;
}
.p_shuizhi3 {
  color: #115cb9;
}
</style>
