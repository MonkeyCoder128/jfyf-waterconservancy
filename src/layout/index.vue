<template>
  <div class="box">
    <!-- 菜单 -->
    <div class="tac">
      <span class="mentTitle">金丰水库智慧管理平台</span>
      <el-menu
        unique-opened
        style="width: 221px"
        text-color="#fff"
        active-text-color="#fff"
        active-b
        border-bottom="none"
        router
        :default-active="menuPath || path"
        class="el-menu-vertical-demo"
        :collapse="isCollapse"
      >
        <div class="el_menubg"></div>
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
      if (res.code === 200) {
        this.nav_menu_data = res.result;
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
  },
  watch: {
    $route: "onRouteChanged",
  },
};
</script>

<style lang="scss" scoped>
/*左侧菜单样式更改*/
/deep/.el-menu {
  list-style: none;
  position: relative;
  margin: 0;
  padding-left: 0;
  background: #283558;
}
.el_menubg {
  position: absolute;
  bottom: 0;
  left: 0;
  background-image: url("../assets/image/daohang.png");
  background-size: 100% 100%;
  height: 220px;
  width: 220px;
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
    font-size: 21px;
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
    font-size: 16px;
  }
}
::v-deep.el-submenu .el-menu-item {
  color: #fff;
}
/deep/.el-submenu__title:hover {
  background: none !important;
}
/deep/.el-menu-item:hover,
.el-menu-item:focus {
  background: none;
}
/deep/ .el-menu-item.is-active {
  background-color: #3553a6;
  border-right: solid 6px #2de3e1;
  color: #fff;
}
</style>