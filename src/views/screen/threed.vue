<template>
  <div>
    <div class="nav_bg">
      <!-- <el-button
        type="danger"
        icon="el-icon-back"
        circle
        class="button_icon"
        @click="huitui"
      ></el-button> -->
      <div icon="" class="el-icon-back" @click="huitui"></div>
      <el-link @click="huitui" style="color:#fff;">首页大屏</el-link>
    </div>
    <div
      ref="box"
      class="box_cont box_cont_top"
      style="
        margin-top: 0 !important;
        position: relative;
        overflow: hidden;
        box-shadow: 0 0 10px #213662 inset;
      "
    >
      <div style="height: 100%; overflow-y: hidden; display: block">
        <iframe
          frameborder="0"
          scrolling="no"
          src="http://112.125.88.230/webgl/index.html"
          :style="{ width: width, height: height }"
          class="ifremud"
          style="position: static"
        ></iframe>
      </div>
      <p class="el-icon-back"></p>
    </div>
  </div>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      height: window.screen.height + "px", //自适应当前窗口高度//自适应当前窗口高度
      width: "100%", //自适应当前窗口宽度
    };
  },
  created() {},
  mounted() {
    this.nowTimes();
  },
  methods: {
    huitui() {
      this.$router.push({ path: "/" });
    },
  },
};
</script>
<style lang="scss" scoped>
.nav_bg {
  width: 100%;
  height: 4%;
  background-color: rgba(0, 0, 0, 0.2);
  position: absolute;
  top: 0;
  left: 0;
  z-index: 9999;
  font-size: 20px;
  color: #fff;
  line-height: 35px;
}
.nav_bg a{
  text-decoration:none;
}
.el-icon-back{
  font-size: 15px;
  padding:0 10px 0 1%;
  cursor: pointer;
}
</style>
