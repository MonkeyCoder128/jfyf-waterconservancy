<template>
  <div class="sidebar">
    <el-row class="tac">
      <el-col :span="12">
        <el-menu
          @open="handleOpen"
          @close="handleClose"
          background-color="#304156"
          text-color="#fff"
          active-text-color="#fff"
          border-bottom="none"
          router
          :default-active="path"
          class="el-menu-vertical-demo"
        >
          <template v-for="(item, index) in nav_menu_data">
            <!-- 二级 -->
            <el-submenu v-if="item.children" :index="item.path" :key="index">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group v-for="(item2, index2) in item.children" :key="index2">
                <el-menu-item :index="item2.path" :key="index2">{{item2.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>
            <el-menu-item v-else :index="item.path" :key="index">
              <i :class="item.icon"></i>
              <span slot="title">{{item.title}}</span>
            </el-menu-item>
          </template>
        </el-menu>

      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        path: "/",
        nav_menu_data: [
          {
            title: "首页",
            path: "/dashboard/dashboard",
            icon: "el-icon-house"
          },
          {
            title: "用户管理",
            path: "/user",
            icon: "el-icon-suitcase",
            children: [
              {
                title: "用户列表",
                path: "/user/index"
              },
              {
                title: "编辑用户",
                path: "/user/edit"
              }
            ]
          }
        ]
      };
    },
    created() {
      this.onRouteChanged();
    },

    methods: {
      handleOpen(key, keyPath) {
        //console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        //console.log(key, keyPath);
      },
      onRouteChanged() {
        let that = this;
        that.path = that.$route.path;
      }
    },
    watch: {
      $route: "onRouteChanged"
    }

  }
</script>

<style lang="scss" scoped>
.sidebar {
  width: 200px;
  background-color: rgb(48, 65, 86);
  border: none;
  height: 897px;
}
.el-menu{
  width: 200px;
}
</style>