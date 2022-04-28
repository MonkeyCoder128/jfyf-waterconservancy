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
              <div class="box_nav">安全监测</div>
              <el-table :data="tableData" class="table"  :header-cell-style="{background:'transparent!important'}">
                <el-table-column prop="date" label="时间" min-width="90px">
                </el-table-column>
                <el-table-column prop="name" label="设备" min-width="30px">
                </el-table-column>
                <el-table-column prop="address" label="原因"> </el-table-column>
              </el-table>
            </div>
            <div class="box">
              <div class="box_nav">坝基变形监测</div>
            </div>
            <div class="box">
              <div class="box_nav">水质监测</div>
              <el-row>
                <el-col :span="12"><pie></pie></el-col>
                <el-col :span="12"
                  ><div class="box_shuizhi">
                    <el-row class="shuizhi1">
                      <el-col :span="2" class="square"></el-col>
                      <el-col :span="14" style="padding-left: 20px"
                        >二氧化碳</el-col
                      >
                      <el-col :span="2" class="p_shuizhi1">30%</el-col>
                    </el-row>
                    <el-row class="shuizhi2">
                      <el-col :span="2" class="square1"></el-col>
                      <el-col :span="14" style="padding-left: 20px"
                        >氢含量</el-col
                      >
                      <el-col :span="2" class="p_shuizhi2">10%</el-col>
                    </el-row>
                    <el-row class="shuizhi3">
                      <el-col :span="2" class="square2"></el-col>
                      <el-col :span="14" style="padding-left: 20px"
                        >氧含量</el-col
                      >
                      <el-col :span="2" class="p_shuizhi3">60%</el-col>
                    </el-row>
                  </div></el-col
                >
              </el-row>
            </div>
          </el-col>
          <el-col :span="6" class="screen_cont"><div></div></el-col>
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
            </div>
          </el-col>
        </el-row>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import broken from "./components/broken.vue";
import pie from "./components/pie.vue";
import weather from "./components/weather.vue";
import pressure from "./components/pressure.vue";
export default {
  components: {
    broken,
    pie,
    pressure,
    weather
  },
  data() {
    return {
      tableData: [
        {
          date: "2016-05-02 11:20:24",
          name: "A1区",
          address: "设备离线",
        },
        {
          date: "2016-05-02 11:20:24",
          name: "A1区",
          address: "设备离线",
        },
        {
          date: "2016-05-02 11:20:24",
          name: "A1区",
          address: "设备离线",
        },
        {
          date: "2016-05-02 11:20:24",
          name: "A1区",
          address: "设备离线",
        },
      ],
    };
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
.box_right {
  width: 20vw;
  height: 28.5vh;
  margin-top: 1vh;
  position: relative;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px;
}
.box_right {
  height: 21.1vh;
}
.box_nav {
  width: 339px;
  height: 30px;
  color: #87e9eb;
  background: url("../../assets/image/box_nav.png");
  padding-left: 22px;
  line-height: 29px;
  text-shadow: 0 0 10px #87e9eb, 0 0 5px #87e9eb;
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
/deep/  .el-table, .el-table__expanded-cell {
    background-color: transparent;
}
/deep/ .el-table tr {
    background-color: transparent!important;
}
/deep/ .el-table--enable-row-transition .el-table__body td, .el-table .cell{
   background-color: transparent;
}
/ddep/ .el-table th.el-table__cell{
  background-color: transparent!important;
}
/deep/ .el-table thead {color: #bebec2;}
/deep/.el-table--enable-row-hover .el-table__body tr:hover>td.el-table__cell{
  background-color: transparent;
}

.el-table::before {//去除底部白线
	 left: 0;
	 bottom: 0;
	 width: 100%;
	 height: 0px;
}
.box_shuizhi {
  display: flex;
  flex-direction: column;
}
.square,
.square1,
.square2 {
  width: 20px;
  height: 20px;
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
