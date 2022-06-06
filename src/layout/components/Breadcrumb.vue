<template>
  <div class="layoutPage">
    <div id="tags-view-container" class="tags-view-container">
      <router-link
        v-for="i in visitedView"
        :key="i.path"
        class="tags-view-item"
        :class="isActive(i) ? 'active' : ''"
        :to="{ path: i.path, query: i.query }"
      >
        {{ i.meta.title }}
        <span
          v-if="i.name != 'userdata'"
          @click.prevent.stop="closeSelectedTag(i)"
          class="el-icon-close"
        />
      </router-link>
    </div>
    <el-row type="flex" justify="end" class="nav_right">
      <el-tooltip
        class="item"
        effect="dark"
        content="进入系统"
        placement="bottom"
      >
      </el-tooltip>
      <el-dropdown>
        <el-button type="text"
          ><i style="font-size: 18px" class="el-icon-s-custom"></i>
        </el-button>
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
</template>
<style lang="scss" scoped>
a {
  text-decoration: none;
}
/*
滚动条美化
 */
/*定义滚动条高宽及背景 高宽分别对应横竖滚动条的尺寸*/
::-webkit-scrollbar{
    width: 7px;
    height: 7px;
    background-color: #f7f7f7;
}

/*定义滚动条轨道 内阴影+圆角*/
::-webkit-scrollbar-track {
    box-shadow: inset 0 0 6px #cfcfd1;
    -webkit-box-shadow: inset 0 0 6px #cfcfd1;
    border-radius: 10px;
    background-color:#f7f7f7;
}

/*定义滑块 内阴影+圆角*/
::-webkit-scrollbar-thumb{
    border-radius: 10px;
    box-shadow: inset 0 0 6px #cfcfd1;
    -webkit-box-shadow: inset 0 0 6px #cfcfd1;
    background-color: #cfcfd1;
}

.layoutPage {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: #fff;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-container {
    display: flex;
    align-items: center;
    height: 50px;
    width: 96%;
    overflow-y: auto;

    .tags-view-item {
      min-width: 90px;
      white-space: nowrap;
      padding: 0 5px;
      display: flex;
      align-items: center;
      justify-content: space-around;
      border-radius: 5px;
      cursor: pointer;
      height: 26px;
      border: 1px solid #eeeeee;
      color: #999999;
      background: #fff;
      font-size: 12px;
      margin-left: 5px;

      &:first-of-type {
        margin-left: 15px;
      }
      &:last-of-type {
        margin-right: 15px;
      }
      &.active {
        color: #1c48bf;
        border-color: #1c48bf;
      }
    }
  }

  .nav_right {
    margin-right: 20px;
  }
}
</style>
<script>
export default {
  computed: {
    visitedView() {
      return this.$store.state.visitedView;
    },
  },
  watch: {
    $route() {
      let { name, fullPath, path, meta, query } = this.$route;
      let viewObj = {
        name: name,
        fullPath: fullPath,
        path: path,
        meta: meta,
        query: query,
      };
      this.$store.commit("addVisitedView", viewObj);
    },
  },
  methods: {
    isActive(route) {
      return route.path === this.$route.path;
    },
    closeSelectedTag(view) {
      this.$store.commit("delVisitedView", view);
      if (this.isActive(view)) {
        this.toLastView(this.$store.state.visitedView);
      }
    },
    toLastView(visitedView) {
      const latestView = visitedView.slice(-1)[0];
      if (latestView) {
        this.$router.push(latestView.fullPath);
      }
    },
    //返回大屏
    screen() {
      this.$router.push({ path: "/" });
    },
    outLogin() {
      this.$router.push({ path: "/login" });
      sessionStorage.clear();
      localStorage.clear();
      this.$cookies.remove("token");
      this.$message.success("已退出账号");
    },
  },
};
</script>


<style lang="scss" scoped>
.tags-view-item {
  .el-icon-close {
    font-size: 17px;
    border-radius: 50%;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    transform-origin: 100% 50%;
    &:before {
      transform: scale(0.6);
      display: inline-block;
      vertical-align: -3px;
    }
    &:hover {
      background-color: #b4bccc;
      color: #fff;
    }
  }
}
</style>
