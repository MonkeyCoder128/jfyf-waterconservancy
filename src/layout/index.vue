<template>
  <div class="box">
    <!-- 菜单 -->
    <div class="tac">
      <span class="mentTitle">智慧水坝管理平台</span>
      <el-menu
        unique-opened
        style="width: 221px"
        text-color="#fff"
        active-text-color="#409EFF"
        active-b
        border-bottom="none"
        router
        :default-active="menuPath || path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <template v-for="(item, index) in nav_menu_data">
          <el-submenu
            v-if="item.sonMenuList"
            :index="item.menuPath"
            :key="index"
          >
            <template slot="title">
              <i :class="'iconfont ' + item.menuIcon"></i>
              <span>{{ item.name }}</span>
            </template>
            <el-menu-item-group
              v-for="(item2, index2) in item.sonMenuList"
              :key="index2"
            >
              <el-menu-item :index="item2.menuPath" :key="index2">{{
                item2.name
              }}</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
          <el-menu-item v-else :index="item.menuPath" :key="item.index">
            <i :class="item.menuIcon"></i>
            <span slot="title">{{ item.name }}</span>
          </el-menu-item>
        </template>
      </el-menu>
    </div>
    <div class="app">
      <!-- 头部 -->
      <div class="navbar">
        <Breadcrumb />
        <el-row type="flex" justify="end" class="nav_right">
          <el-tooltip
            class="item"
            effect="dark"
            content="进入系统"
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
import Breadcrumb from "./components/Breadcrumb.vue";
export default {
  components: {
    Breadcrumb,
  },
  name: "Layout",
  computed: {
    key() {
      return this.$route.path;
    },
  },
  data() {
    return {
      menuPath: "",
      fullscreen: false,
      isCollapse: false,
      leftmenu: true,
      rightmenu: false,
      path: "/",
      nav_menu_data: [],
    };
  },
  created() {
    this.onRouteChanged();
    this.$api.LOGIN.menuList().then((res) => {
      if (res.data.code === 200) {
        this.nav_menu_data = res.data.result;
        // console.log(
        //   "%c动态菜单：",
        //   "color:blue;font-size:18px;font-weight:bold;",
        //   res.data
        // );
      }
    });
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
      sessionStorage.clear();
      localStorage.clear();
      this.$message.success("已退出账号");
    },
  },
  watch: {
    $route: "onRouteChanged",
  },
};
</script>

<style lang="scss" scoped>
/*左侧菜单样式更改*/
/deep/.el-menu {
  //border-right: solid 1px #e6e6e6;
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background-image: url("../assets/image/menuBar.jpg");
}
.el-menu-vertical-demo el-menu
/*分页插件样式更改*/
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #ffffff;
}
/deep/.el-pagination.is-background .el-pager li:not(.disabled).active {
  border: 1px solid #1c48bf;
  background-color: #ffffff;
  color: #1c48bf;
  width: 26px;
  height: 26px;
  border-radius: 5px;
}
/deep/.el-pagination__jump {
  margin-left: 0;
}
/deep/.el-pagination span:not([class*="suffix"]),
.el-pagination button {
  border-radius: 5px;
}
/deep/.el-pagination.is-background .el-pager li {
  width: 26px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 5px;
}
/deep/.el-pagination.is-background .btn-prev:disabled,
.el-pagination.is-background .btn-next:disabled {
  width: 26px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 5px;
}
/deep/.el-pagination.is-background .btn-next {
  width: 26px;
  height: 26px;
  background: #ffffff;
  border: 1px solid #999999;
  border-radius: 5px;
}
/deep/.el-pagination__editor.el-input .el-input__inner {
  width: 40px;
  border: 1px solid #999999;
  height: 26px;
}
/deep/.el-pagination .el-select .el-input .el-input__inner {
  width: 85px;
  border-radius: 5px;
  border: 1px solid #999999;
}
/deep/.el-pagination .el-select .el-input {
  width: 80px;
}

/*表格样式更改*/
/deep/.el-table .cell {
  color: #333333;
}
/*表格顶部按钮样式更改*/
/deep/.el-button--primary.is-plain {
  color: #1c48bf;
  background: #ffffff;
  /* border-color: #a4b6e5; */
  border: 1px solid #319da4;
  color: #319da4;
}

.box {
  display: flex;
  flex-direction: row;
  height: 100%;
  overflow: hidden;
}
.tac {
  display: flex;
  flex-direction: column;
  width: 220px;
  .mentTitle {
    font-size: 24px;
    white-space: nowrap;
    color: #ffffff;
    background-color: #283558;
    height: 65px;
    line-height: 65px;
    text-align: center;
  }
}

.app {
  width: calc(100% - 220px);
  margin: 0;
  padding: 0;
  //overflow-y: scroll;
  height: 100%;
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
  display: flex;
  align-items: center;
  width: 100%;
  z-index: 1;
}
.app-main {
  position: relative;
  height: 98%;
  overflow: auto;
  margin: 5px 10px 10px 10px;
}
.sidebar {
  width: 200px;
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
  display: flex;
  align-items: center;
}
.el-button--text {
  font-size: 19px;
  color: #989b9c;
}
.iconfont {
  color: #fff;
  padding-right: 4px;
}
/deep/.el-submenu__title i {
  color: #fff;
}
::v-deep.el-submenu .el-menu-item {
  &:hover {
    background-color: #3553a6;
    border-right: solid 6px #2de3e1;
    color: #fff;
  }
}
::v-deep.el-submenu .el-menu-item {
  color: #fff;
}
/deep/.el-submenu__title:hover{
  background: none !important;
}
// /deep/.is-active{
//    background: none !important;
// }
/deep/.el-menu-item:hover, .el-menu-item:focus{
  background: none;
}
</style>