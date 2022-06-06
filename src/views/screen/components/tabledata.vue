<template>
  <div style="height:100%">
    <div v-for="(item, index) in getPlayData" :key="index" class="getPlayData">
      <section :class="index==0?'red':''" :style="{'background':item.fixed?'none':'rgba(34, 88, 140, .1)'}">
        <div class="table-cell" style="width: 40%" :title="item.time">
          {{ item.time }}
        </div>
        <div class="table-cell" style="width: 60%" :title="item.time">
          {{ item.cont }}
        </div>
      </section>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      getPlayData: [
        { time: "名称", cont: "数据",fixed:true },
        { time: "总容量：", cont: "410.50万立方米" ,fixed:false},
        { time: "性质：", cont: "粘土心墙砂砾石坝",fixed:true },
        { time: "坝长：", cont: "405.67米",fixed:false },
        { time: "坝高：", cont: "30.26米",fixed:true },
        { time: "流域面积：", cont: "29.84平方公里",fixed:false },
      ],
    };
  },
};
</script>
<style lang="scss" scoped>
.getPlayData{
  display: flex;
  width: 96%;
  height: 14.3%;
  color: #fff;
  margin: 0 auto;
  font-size: 12px;
  section{
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
    
  padding-left: 10px;
  }
}
.red{
  color: #2A78BFFF;
}
@media screen and (min-device-width: 1360px) and (max-device-width: 1919px) {
  .getPlayData {
    height: 13.3% !important;
  }
}
</style>
