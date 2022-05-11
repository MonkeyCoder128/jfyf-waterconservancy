<template>
  <div class="box">
    <!-- 菜单 -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          background-color="#304156"
          text-color="#fff"
          active-text-color="#409EFF"
          border-bottom="none"
          router
          :default-active="path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in nav_menu_data">
            <el-submenu v-if="item.children" :index="item.path" :key="index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
              </template>
              <el-menu-item-group
                v-for="(item2, index2) in item.children"
                :key="index2"
              >
                <el-menu-item :index="item2.path" :key="index2">{{
                  item2.title
                }}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="item.index">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.title }}</span>
            </el-menu-item>
          </template>
        </el-menu>
      </el-col>
    </el-row>
    <div class="app">
      <!-- 头部 -->
      <div class="navbar">
        <el-row type="flex">
          <el-radio-group
            v-model="isCollapse"
            class="nav_menu"
            style="margin-bottom: 20px"
          >
            <div @click="showmenu" v-show="leftmenu">
              <el-radio-button :label="true"
                ><i class="el-icon-s-fold"
              /></el-radio-button>
            </div>
            <div @click="hidemenu" v-show="rightmenu">
              <el-radio-button :label="false"
                ><i class="el-icon-s-unfold"
              /></el-radio-button>
            </div>
          </el-radio-group>
        </el-row>
        <el-row type="flex" justify="end" class="nav_right">
          <el-tooltip
            class="item"
            effect="dark"
            content="全屏"
            placement="bottom"
          >
            <a href="javascript:;" @click="screen()"
              ><i class="el-icon-full-screen"></i
            ></a>
          </el-tooltip>
          <el-dropdown>
            <el-button type="text"><i class="el-icon-s-custom"></i> </el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native.prevent="screen"
                >返回大屏</el-dropdown-item
              >
              <el-dropdown-item @click.native.prevent="outLogin"
                >退出登录</el-dropdown-item
              >
            </el-dropdown-menu>
          </el-dropdown>
        </el-row>
      </div>
      <!-- 首页 -->
      <section class="app-main">
        <transition name="fade-transform" mode="out-in">
          <router-view :key="key" />
        </transition>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "Layout",
  computed: {
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      fullscreen: false,
      isCollapse: false,
      leftmenu: true,
      rightmenu: false,
      path: "/",
      nav_menu_data: [
        // {
        //   title: "首页",
        //   path: "/screen",
        //   icon: "el-icon-s-platform",
        // },
        {
          title: "实时监测",
          path: "/realtimeMnitor",
          icon: "el-icon-view",
          children: [
            {
              title: "实时数据",
              path: "/realtimeMnitor/realtime",
              icon: "el-icon-data-line",
            },
          ],
        },
        {
          title: "检测分析",
          path: "/explain",
          icon: "el-icon-s-opportunity",
          children: [
            {
              title: "流速、流量",
              path: "/explain/waterVelocity",
            },
            {
              title: "水位",
              path: "/explain/waterStage",
            },
            {
              title: "库压渗压",
              path: "/explain/osmoticPressure",
            },
            {
              title: "水质分析",
              path: "/explain/waterQuality",
            },
            {
              title: "形变位移",
              path: "/explain/deformation",
            },
            // {
            //   title: "预警分析",
            //   path: "/explain/alarmAnalysis",
            // },
          ],
        },
        {
          title: "视频监控",
          path: "/vide",
          icon: "el-icon-video-camera",
          children: [
            {
              title: "实时",
              path: "/vide/realtime",
            },
            {
              title: "回放",
              path: "/vide/playback",
            },
          ],
        },
        {
          title: "巡检管理",
          path: "/search",
          icon: "el-icon-suitcase",
          children: [
            {
              title: "管理条例",
              path: "/search/rule",
            },
            {
              title: "安全巡检",
              path: "/search/safe",
            },
            {
              title: "巡检记录",
              path: "/search/emergency",
            },
          ],
        },
        {
          title: "系统管理",
          path: "/system",
          icon: "el-icon-s-tools",
          children: [
            {
              title: "设备管理",
              path: "/system/deviceManage",
            },
            {
              title: "角色管理",
              path: "/system/roleManage",
            },
            {
              title: "用户管理",
              path: "/system/userManage",
            },
          ],
        },
        {
          title: "消息管理",
          path: "/newsManage",
          icon: "el-icon-phone-outline",
          children: [
            {
              title: "消息列表",
              path: "/newsManage/news",
            },
          ],
        },
      ],
    };
  },
  created() {
    this.onRouteChanged();
  },
  methods: {
    onRouteChanged() {
      let that = this;
      that.path = that.$route.path;
    },
    //菜单
    showmenu() {
      this.leftmenu = false;
      this.rightmenu = true;
    },
    hidemenu() {
      this.leftmenu = true;
      this.rightmenu = false;
    },
    //全屏
    screen() {
      let element = document.documentElement;
      if (this.fullscreen) {
        this.$message.success("退出全屏模式");
        this.fullscreenTitle = "进入全屏模式";
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitCancelFullScreen) {
          document.webkitCancelFullScreen();
        } else if (document.mozCancelFullScreen) {
          document.mozCancelFullScreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      } else {
        this.$message.success("进入全屏模式");
        this.fullscreenTitle = "退出全屏模式";
        if (element.requestFullscreen) {
          element.requestFullscreen();
        } else if (element.webkitRequestFullScreen) {
          element.webkitRequestFullScreen();
        } else if (element.mozRequestFullScreen) {
          element.mozRequestFullScreen();
        } else if (element.msRequestFullscreen) {
          // IE11
          element.msRequestFullscreen();
        }
      }
      this.fullscreen = !this.fullscreen;
    },
    screen() {
      this.$router.push({ path: "/screen" });
    },
    outLogin() {
      this.$router.push({ path: "/" });
      this.$message.success("已退出账号");
    },
  },
  watch: {
    $route: "onRouteChanged",
  },
};
</script>

<style lang="scss" scoped>
.box {
  display: flex;
  flex-direction: row;
}
.app {
  width: 100%;
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
::v-deep .el-col-12,
.el-menu {
  height: 100%;
}
::v-deep .el-submenu {
  overflow: hidden;
}
.navbar {
  height: 60px;
  overflow: hidden;
  position: relative;
  background: #fff;
  border-bottom: 1px solid #d8dce5;
  padding: 5px;
  display: flex;
}
.app-main {
  position: relative;
  min-height: calc(100vh - 60px);
  overflow: hidden;
  margin: 10px;
}
.sidebar {
  width: 200px;
  background-color: rgb(48, 65, 86);
  border: none;
  height: 100vh;
  overflow: scroll;
  overflow-x: hidden;
}
/deep/.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
.el-radio-button {
  background: #fff;
}
.el-radio-button i {
  font-size: 20px;
}
/deep/ .el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #000;
  background-color: #ffffff;
  border: none;
}
/deep/.width {
  width: 100px;
}
.nav_menu {
  display: flex;
  flex-direction: row;
  margin-bottom: 20px;
}
::v-deep .el-radio-button__inner {
  padding: 8px 11px;
}
.el-tooltip {
  font-size: 20px;
  color: #606266;
  margin-right: 10px;
}
.nav_right {
  float: right;
  position: absolute;
  right: 1vw;
  padding: 10px;
}
.el-button--text {
  margin-top: -12px;
  font-size: 19px;
  color: #989b9c;
}
</style>