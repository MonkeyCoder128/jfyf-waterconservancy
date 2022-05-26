<template>
  <el-row>
    <el-col :span="24">
      <div class="home_bg">
        <el-row type="flex" class="nav" justify="end">
          <p class="time">{{ nowTime }}</p>
          <p class="p_nav">XX水库智慧管理平台</p>
          <div class="system" @click="goSystem">
            <img
              src="../../assets/image/xitong.png"
              alt=""
              width="20"
              height="20"
            />
            <p style="padding-left: 10px">进入系统</p>
          </div>
        </el-row>

        <el-row type="flex" class="row-bg" justify="space-between">
          <el-col class="screen_left">
            <div class="box" style="margin-top: 0 !important">
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
              <div class="box_jianrong">
                <deformation />
              </div>
            </div>
            <div class="box">
              <div class="box_nav">
                <el-row :gutter="20">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">降雨量</el-col>
                  <el-col :span="1" class="icon_title2">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <div class="box_jianrong">
                <pie />
              </div>
            </div>
          </el-col>
          <el-col class="screen_cont"
            ><div
              ref="box"
              class="box_cont box_cont_top"
              style="
                margin-top: 0 !important;
                position: relative;
                overflow: hidden;
                box-shadow: 0 0 10px #213662 inset;
              "
            >
              <div class="mengban" @click="tothreed"></div>
              <!-- <div>
                <iframe"
                  name="iframeMap"
                  id="iframeMapViewComponent"
                  width="100%"
                  height="470px"
                  v-bind:src="smgHtmlPath"
                  frameborder="0"
                  scrolling="no"
                  ref="iframeDom"
                ></iframe>
              </div> -->
              <!-- <img src="../../assets/image/3d.png" class="threed" alt="" /> -->
              <div style="height: 100%; overflow-y: hidden; display: block">
                <iframe
                  frameborder="0"
                  scrolling="no"
                  src="http://112.125.88.230/webgl/index.html"
                  :style="{ width: width, height: height }"
                  class="ifremud"
                  id="iframe"
                  style="position: static"
                ></iframe>
              </div>
            </div>
            <div class="box_cont" style="margin-top: 1.4%">
              <div class="box_nav box_nav1">
                <el-row :gutter="19">
                  <el-col :span="1" class="title1"
                    ><img src="../../assets/image/dp_title1.png" alt=""
                  /></el-col>
                  <el-col :span="19">水库概况</el-col>
                  <el-col :span="1" class="icon_title2 icon_title4">
                    <img src="../../assets/image/dp_title2.png" alt=""
                  /></el-col>
                  <el-col :span="1" class="icon_title3 icon_title5">
                    <img src="../../assets/image/dp_title3.png" alt=""
                  /></el-col>
                </el-row>
              </div>
              <div class="box_content">
                <el-row :gutter="20" class="shuiwei">
                  <el-col :span="6" style="height: 100%"
                    ><div class="bg-purple">
                      库前水位
                      <div class="num">1344m³</div>
                    </div></el-col
                  >
                  <el-col :span="6" style="height: 100%"
                    ><div class="bg-purple">
                      库存
                      <div class="num">1256m³</div>
                    </div></el-col
                  >
                  <el-col :span="6" style="height: 100%"
                    ><div class="bg-purple">
                      出库
                      <div class="num">6587m³</div>
                    </div></el-col
                  >
                  <el-col :span="6" style="height: 100%"
                    ><div class="bg-purple">
                      入库
                      <div class="num">5687m³</div>
                    </div></el-col
                  >
                </el-row>
              </div>
            </div>
            <div class="box_cont2">
              <div style="width: 50%; display: flex; flex-direction: row">
                <div style="width: 50%; position: relative">
                  <div class="box_nav box_nav2">
                    <el-row :gutter="19">
                      <el-col :span="1" class="title1"
                        ><img src="../../assets/image/dp_title1.png" alt=""
                      /></el-col>
                      <el-col :span="19">大坝巡查</el-col>
                    </el-row>
                  </div>
                  <dam />
                  <dambg />
                </div>
                <div style="width: 50%; position: relative">
                  <dam2 />
                  <dam2bg />
                </div>
              </div>
              <div style="width: 50%">
                <div class="box_nav box_nav2">
                  <el-row :gutter="19">
                    <el-col :span="1" class="title1"
                      ><img src="../../assets/image/dp_title1.png" alt=""
                    /></el-col>
                    <el-col :span="19">设备巡检统计</el-col>
                  </el-row>
                </div>
                <patrol />
              </div></div
          ></el-col>
          <el-col class="screen_right">
            <div class="box_right" style="margin-top: 0 !important">
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
              <div class="box_jianrong">
                <weather></weather>
              </div>
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
              <div class="box_jianrong">
                <broken></broken>
              </div>
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
              <div class="box_jianrong">
                <pressure></pressure>
              </div>
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
              <div class="box_jianrong">
                <flow />
              </div>
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
import patrol from "./components/patrol.vue";
import dam from "./components/dam.vue";
import dambg from "./components/dambg.vue";
import dam2 from "./components/dam2.vue";
import dam2bg from "./components/dam2bg.vue";
export default {
  components: {
    outbox,
    deformation,
    pie,
    weather,
    broken,
    pressure,
    flow,
    patrol,
    dam,
    dambg,
    dam2,
    dam2bg,
  },
  data() {
    return {
      nowTime: "",
      //smgHtmlPath: "http://112.125.88.230/webgl/index.html",
      height: 651 + "px", //自适应当前窗口高度//自适应当前窗口高度
      width: "100%", //自适应当前窗口宽度
    };
  },
  created() {},
  mounted() {
    this.nowTimes();
    this.iframe = document.getElementById("iframe");
    this.postMsg();
  },
  methods: {
    postMsg() {
      //将token传递给子页面
      let token = 0;
      let param = {
        token,
      };
      this.iframe.contentWindow.postMessage(param, "*");
    },
    timeFormate(timeStamp) {
      let year = new Date(timeStamp).getFullYear();
      let month =
        new Date(timeStamp).getMonth() + 1 < 10
          ? "0" + (new Date(timeStamp).getMonth() + 1)
          : new Date(timeStamp).getMonth() + 1;
      let date =
        new Date(timeStamp).getDate() < 10
          ? "0" + new Date(timeStamp).getDate()
          : new Date(timeStamp).getDate();
      let hh =
        new Date(timeStamp).getHours() < 10
          ? "0" + new Date(timeStamp).getHours()
          : new Date(timeStamp).getHours();
      let mm =
        new Date(timeStamp).getMinutes() < 10
          ? "0" + new Date(timeStamp).getMinutes()
          : new Date(timeStamp).getMinutes();
      let ss =
        new Date(timeStamp).getSeconds() < 10
          ? "0" + new Date(timeStamp).getSeconds()
          : new Date(timeStamp).getSeconds();
      var d = new Date(timeStamp).getDay();
      let day;
      if (d == 0) {
        day = "日";
      } else if (d == 1) {
        day = "一";
      } else if (d == 2) {
        day = "二";
      } else if (d == 3) {
        day = "三";
      } else if (d == 4) {
        day = "四";
      } else if (d == 5) {
        day = "五";
      } else if (d == 6) {
        day = "六";
      }
      this.nowTime =
        year +
        "年" +
        month +
        "月" +
        date +
        "日" +
        "\xa0" +
        "\xa0" +
        "星期" +
        day +
        "\xa0" +
        "\xa0" +
        hh +
        ":" +
        mm +
        ":" +
        ss +
        "   ";
    },
    nowTimes() {
      this.timeFormate(new Date());
      setInterval(this.nowTimes, 1000);
      this.clear();
    },
    clear() {
      clearInterval(this.nowTimes);
      this.nowTimes = null;
    },
    goSystem() {
      this.$router.push({ path: "/realtimeMnitor/realtime" });
    },
    tothreed() {
      this.$router.push({
        path: "/threed",
      });
    },
    outLogin() {
      this.$router.push({ path: "/login" });
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
.time {
  position: absolute;
  top: 0;
  left: 30px;
  font-size: 18px;
  font-family: PingFang SC;
  font-weight: 380;
  color: #4496e1;
  line-height: 54px;
}
.system {
  display: flex;
  flex-direction: row;
  position: absolute;
  top: 18px;
  right: 30px;
  line-height: 22px;
  justify-content: center;
  align-items: center;

  font-size: 17px;
  font-family: PingFang SC;
  font-weight: 380;
  color: #4496e1;
}
.system :hover {
  cursor: pointer;
}
.el-icon-s-custom {
  font-size: 30px;
}
.row-bg {
  padding: 88px 25px 0;
  height: calc(100% - 14px);
}
.p_nav {
  width: 100%;
  height: 81px;
  font-size: 30px;
  text-align: center;
  font-family: PingFang SC;
  font-weight: bold;
  color: rgba(255, 255, 255, 0.75);
  line-height: 81px;
  text-shadow: 0px 0px 12px #4464b5;
}
.screen_left,
.screen_cont,
.screen_right {
  display: flex;
  flex-direction: column;
}
.screen_left {
  width: 25%;
}
.screen_cont {
  width: 48%;
}
.screen_right {
  width: 25%;
}
.box,
.box_right,
.box_cont,
.box_cont2 {
  height: 40.5%;
  margin-top: 3%;
  position: relative;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 16px 0;
  overflow: hidden;
}
.box_right {
  height: 23.6%;
  margin-top: 3%;
}
.box_cont {
  width: 100%;
  height: 23.6%;
  margin-top: 3%;
}
.box_cont2 {
  width: 100%;
  height: 24%;
  margin-top: 1.4%;
  display: flex;
  flex-direction: row;
  padding-left: 2%;
}
.box_cont_top {
  height: 49%;
  background: none;
  background-color: rgba(0, 0, 0, 0.3);
  padding: 1%;
}
.box_content {
  height: 100%;
  width: 95%;
  margin: 0 auto;
}

.box_nav,
.box_nav1 {
  width: calc(100% - 40px);
  height: 35px;
  color: #2e89e0;
  line-height: 29px;
  text-shadow: 0 0 4px #2e89e0, 0 0 2px #87e9eb;
  border-top: solid 1px #111e38;
  border-bottom: solid 1px #111e38;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  padding: 0;
}
.box_nav1 {
  width: 95%;
}
.box_nav2 {
  width: 95%;
  height: 35px;
  color: #2e89e0;
  line-height: 29px;
  text-shadow: 0 0 10px #2e89e0, 0 0 2px #87e9eb;
  border: none;
  text-align: none;
}
.box_daba {
  width: 100%;
  height: 100%;
}
.title1 {
  padding-top: 5px;
}
.icon_title2,
.icon_title3 {
  position: absolute;
  top: 0;
  right: 5%;
}
.icon_title3 {
  right: 2%;
}
.icon_title4 {
  right: -0.5%;
}
.icon_title5 {
  right: 1.5%;
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
.shuiwei {
  margin-top: 3%;
  height: 66%;
}
.bg-purple {
  height: 100%;
  background: #0e1629;
  //border: 1px solid #3885e5;
  // opacity: 0.36;
  color: #2268c7;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 16px;
  box-shadow: 0px 0px 20px #3885e5 inset;
  margin: 0 auto;
}
.num {
  color: #fff;
  font-size: 24px;
  padding-top: 2%;
}
.threed {
  margin: 4% auto 0;
  width: 594px;
  height: 356px;
  display: block;
}
.box_dam {
  display: flex;
  flex-direction: row;
}
/deep/.ifremud {
  position: absolute;
  top: 2%;
  left: 1%;
  bottom: 2%;
}
.mengban {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  //background-color: rgba(0, 0, 0, 0.3);
  z-index: 9999;
}
.box_jianrong {
  width: 98%;
  height: 100%;
  padding: 5px;
  position: relative;
}
</style>
