<template>
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
</template>
<style lang="scss" scoped>
a {
  text-decoration:none;
}
.tags-view-container {
  height: 40px;
  width: 100%;
  background: #fff;
  //border-bottom: 1px solid #d8dce5;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 0 3px 0 rgba(0, 0, 0, 0.04);
  .tags-view-item {
    display: inline-block;
    position: relative;
    cursor: pointer;
    height: 26px;
    line-height: 26px;
    border: 1px solid #eeeeee;
    color: #999999;
    background: #fff;
    padding: 0 8px;
    font-size: 12px;
    margin-left: 5px;
    margin-top: 4px;
    &:first-of-type {
      margin-left: 15px;
    }
    &:last-of-type {
      margin-right: 15px;
    }
    &.active {
      background-color: rgba(36, 123, 255, 1);
      color: #fff;
      border-color: rgba(36, 123, 255, 1);
      // &::before {
      //   content: "";
      //   background: #fff;
      //   display: inline-block;
      //   width: 8px;
      //   height: 8px;
      //   border-radius: 50%;
      //   position: relative;
      //   margin-right: 2px;
      // }
    }
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
      console.log(latestView);
      if (latestView) {
        this.$router.push(latestView.fullPath);
      }
    },
  },
};
</script>


<style lang="scss" scoped>
.tags-view-item {
  .el-icon-close {
    width: 16px;
    height: 16px;
    vertical-align: 2px;
    border-radius: 50%;
    text-align: center;
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
