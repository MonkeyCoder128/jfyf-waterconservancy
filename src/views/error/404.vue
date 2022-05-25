<template>
  <div class="warp">
    <div class="left">
      <img src="@/assets/image/404.png" alt="">
    </div>
    <div class="right">
      <div class="tit">抱歉，您的页面走丢了！</div>
      <div class="con">请刷新试试看吧。</div>
      <div class="but" @click="reload">刷新</div>
    </div>
  </div>
</template>
<script>

export default ({
  methods:{
    reload(){
      location.reload()
    }
  }
})
</script>

<style scoped>
  .warp{
    display: flex;
    align-items: center;
    height: 100%;
  }
  .left{
    width: 630px;
    height: 527px;
    margin-right: 108px;
    margin-left: 10%;

  }
  .right{
    width: 360px;
    height: 527px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .tit{
    height: 31px;
    font-size: 30px;
    font-weight: bold;
    color: #333333;
  }
  .con{
    height: 16px;
    font-size: 16px;
    font-weight: bold;
    color: #999999;
    margin-top: 18px;
    margin-bottom: 74px;
  }
  .but{
    width: 120px;
    height: 40px;
    background: #1C48BF;
    border-radius: 5px;
    line-height: 40px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    cursor: pointer;
  }
</style>