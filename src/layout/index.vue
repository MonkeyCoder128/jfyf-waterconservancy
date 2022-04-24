<template>
  <div class="box">
    <!-- <div class="sidebar"> -->
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          background-color="#304156"
          text-color="#fff"
          active-text-color="#fff"
          border-bottom="none"
          router
          :default-active="path"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
        >
          <template v-for="(item, index) in nav_menu_data">
            <!-- 二级 -->
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
    <!-- </div> -->
    <div class="app">
      <div class="navbar">
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
      </div>
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
      isCollapse: false,
      leftmenu: true,
      rightmenu: false,
      path: "/",
      nav_menu_data: [
        {
          title: "首页",
          path: "/screen",
          icon: "el-icon-s-platform",
        },
        {
          title: "实时监测",
          path: "/setTime",
          icon: "el-icon-view",
          children: [
            {
              title: "仪表盘、折线图",
              path: "/setTime/Dashboard",
              icon: "el-icon-data-line",
            },
            {
              title: "报表",
              path: "/setTime/report",
              icon: "el-icon-tickets",
            },
          ],
        },
        {
          title: "检测分析",
          path: "/explain",
          icon: "el-icon-s-opportunity",
          children: [
            {
              title: "预警",
              path: "/explain/warning",
            },
            {
              title: "数据分析",
              path: "/explain/data",
            },
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
              title: "事故上报",
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
              path: "/system/role",
            },
            {
              title: "用户管理",
              path: "/system/user",
            },
          ],
        },
        {
          title: "消息管理",
          path: "/newsManage",
          icon: "el-icon-phone-outline",
          children: [
            {
              title: "消息提醒",
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
    showmenu() {
      this.leftmenu = false;
      this.rightmenu = true;
    },
    hidemenu() {
      this.leftmenu = true;
      this.rightmenu = false;
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
  height: 4.9vh;
  overflow: hidden;
  position: relative;
  background: #fff;
  display: flex;
  flex-direction: row;
  border-bottom: 1px solid #d8dce5;
}
.app-main {
  margin: 10px;
  position: relative;
  height: 95vh;
  overflow: hidden;
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
/deep/.dangerBtn {
  color: rgba(181, 12, 12, 1);
}
/deep/.textBtn {
  color: rgb(55, 78, 176);
}
/deep/.el-button--primary {
  background-color: rgb(55, 78, 176);
  border-color: rgb(55, 78, 176);
}
/deep/.el-checkbox__input.is-checked .el-checkbox__inner,
.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: rgb(55, 78, 176);
  border-color: rgb(55, 78, 176);
}
/deep/.el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: rgb(55, 78, 176);
  border-color: rgb(55, 78, 176);
}
</style>