<template>
  <div id="weather">
    <div id="weater_top">
      <div style="font-size:30px;">{{week}}</div>
      <div class="box_week">
        <div>℃</div>
        <div>{{ dayweather }}</div>
      </div>
    </div>
    <div id="weater_box">
      <div class="box" v-for="(item, index) in list" :key="index">
        <p>{{ "星期" + item.week }}</p>
        <img :src="item.url" alt="" style="width:20px;height:20px;">
        <p>{{ item.daytemp }}/{{ item.nighttemp }}℃</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      week:'',
      dayweather:'',
      list: [],
    };
  },
  mounted() {
    fetch(
      "https://restapi.amap.com/v3/weather/weatherInfo?key=999596a030ca6b37f79322b8432c5e74&city=610103&extensions=all&output=json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.list = data.forecasts[0].casts.filter(i=>{
          i.url=''
          if(i.dayweather=='晴'){
            i.url='https://www.cctv202.com/img/sun.png'
          }else if(i.dayweather=='阴' || i.dayweather=='少云' ){
            i.url='https://www.cctv202.com/img/rain.png'
          }
          return i
      })
        this.week = data.forecasts[0].casts[0].daytemp
        this.dayweather = data.forecasts[0].casts[0].dayweather
      });
  },
};
</script>
<style lang="scss" scoped>
#weather {
  width: 100%;
  height: 140px;
  overflow: hidden;
  padding: 20px;
}
#weater_top {
  color: #fff;
  width: 10%;
  height: 35%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
}
#weater_box {
  color: #fff;
  width: 100%;
  height: 53%;
  display: flex;
  justify-content: space-between;
  .box {
    width: 100px;
    height: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: space-between;
  }
}
.box_week{
  display: flex;
  flex-direction: column;
  font-size: 15px;
  line-height: 16px;
}
</style>
