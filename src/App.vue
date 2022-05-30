<template>
  <div id="app">
    <router-view />
  </div>
</template>

<style>
html,
body,
#app {
  height: 100%;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin: 0;
  padding: 0;
  background-color: rgb(244, 244, 244);
}
/* 修改message弹出框样式 */
.el-message-box{
  position: relative;
}
.el-message-box__header{
  margin-left: 35px;
}
.el-message-box__status{
  position: absolute !important;
  top: -30px !important;
}
.el-message-box__status.el-icon-warning{
  color: #F8C202 !important;
}
</style>
