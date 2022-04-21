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
            path: "/screen",
            icon: "el-icon-s-platform"
          },
          {
            title: "实时监测",
            path: "/setTime",
            icon: "el-icon-view",
            children: [
              {
                title: "仪表盘、折线图",
                path: "/setTime/Dashboard",
                icon: "el-icon-data-line"
              },
              {
                title: "报表",
                path: "/setTime/report",
                icon: "el-icon-tickets"
              }
            ]
          },
          {
            title: "检测分析",
            path: "/explain",
            icon: "el-icon-s-opportunity",
            children: [
              {
                title: "预警",
                path: "/explain/warning"
              },
              {
                title: "数据分析",
                path: "/explain/data"
              }
            ]
          },
          {
            title: "视频监控",
            path: "/vide",
            icon: "el-icon-video-camera",
            children: [
              {
                title: "实时",
                path: "/vide/realtime"
              },
              {
                title: "回放",
                path: "/vide/playback"
              }
            ]
          },
          {
            title: "巡检管理",
            path: "/search",
            icon: "el-icon-suitcase",
            children: [
              {
                title: "管理条例",
                path: "/search/rule"
              },
              {
                title: "安全巡检",
                path: "/search/safe"
              },
              {
                title: "事故上报",
                path: "/search/emergency"
              }
            ]
          },
          {
            title: "系统管理",
            path: "/system",
            icon: "el-icon-s-tools",
            children: [
              {
                title: "设备管理",
                path: "/system/equipment"
              },
              {
                title: "用户管理",
                path: "/system/user"
              }
            ]
          },
          {
            title: "消息提醒",
            path: "/alert",
            icon: "el-icon-phone-outline"
          },
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
  width: 10vw;
  background-color: rgb(48, 65, 86);
  border: none;
  height: 95vh;
  overflow: scroll;
  overflow-x: hidden;
  
}
.el-menu{
  width: 200px;
}

::-webkit-scrollbar {
    display: none; /* Chrome Safari */
  }
</style>