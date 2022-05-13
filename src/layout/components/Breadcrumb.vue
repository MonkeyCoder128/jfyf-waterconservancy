<template>
  <div>
    <el-breadcrumb
      class="breadcrumb-container"
      separator-class="el-icon-arrow-right"
    >
      <el-breadcrumb-item
        v-for="(item, index) in levelList"
        :key="item.path"
        :to="index==1?'':item.path"
        >{{ item.meta.title }}</el-breadcrumb-item
      >
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  data() {
    return {
      levelList: [],
    };
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
  created() {
    this.getBreadcrumb();
  },
  methods: {
    getBreadcrumb() {
      let matched = this.$route.matched.filter((item) => item.name);
      const first = matched[0];
      if (
        first &&
        first.name.trim().toLocaleLowerCase() !==
          "/realtimeMnitor/realtime".toLocaleLowerCase()
      ) {
        matched = [
          { path: "/realtimeMnitor/realtime", meta: { title: "首页" } },
        ].concat(matched);
      }
      this.levelList = matched;
    },
  },
};
</script>

<style lang="scss"  scoped>
.breadcrumb-container {
  width: 100%;
  font-size: 15px;
  line-height: 45px;
  margin-left: 5%;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner {
  color: #1c48bf;
}
/deep/ .el-breadcrumb__item:last-child .el-breadcrumb__inner:hover {
  color: #1c48bf;
}
/deep/ .el-breadcrumb__inner.is-link, .el-breadcrumb__inner a{
    color: #a2a2a2;
    font-weight: none;
}
/deep/ .el-breadcrumb__inner{
    color: #a2a2a2
}
</style>