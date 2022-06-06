<template>
  <div id="weather">
    <div></div>
    <div id="weater_top">
      <div>
        <img
          :src="url"
          alt=""
          style="width: 32px; height: 32px; display: block; margin-right: 5px"
        />
      </div>
      <div style="font-size: 30px">{{ week }}</div>
      <div class="box_week">
        <div>℃</div>
        <div>{{ dayweather }}</div>
      </div>
    </div>
    <div id="weater_box">
      <div class="box" v-for="(item, index) in list" :key="index">
        <p style="margin-bottom: 5%">
          {{ index == 0 ? "今天" : "星期" + item.week }}
        </p>
        <img
          :src="item.url"
          alt=""
          style="width: 20px; height: 20px; display: block; margin-bottom: 3%"
        />
        <p>{{ item.daytemp }}/{{ item.nighttemp }}℃</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      week: "",
      dayweather: "",
      list: [],
      url: "",
    };
  },
  created() {
    fetch(
      "https://restapi.amap.com/v3/weather/weatherInfo?key=999596a030ca6b37f79322b8432c5e74&city=610103&extensions=all&output=json"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this.list = data.forecasts[0].casts.filter((i) => {
          if (i.week == "1") {
            i.week = "一";
          } else if (i.week == "2") {
            i.week = "二";
          } else if (i.week == "3") {
            i.week = "三";
          } else if (i.week == "4") {
            i.week = "四";
          } else if (i.week == "5") {
            i.week = "五";
          } else if (i.week == "6") {
            i.week = "六";
          } else if (i.week == "7") {
            i.week = "日";
          }
          if (i.dayweather == "晴") {
            i.url = require("../../../assets/image/taiyang.png");
          } else if (
            i.dayweather == "少云" ||
            i.dayweather == "晴间多云" ||
            i.dayweather == "多云" ||
            i.dayweather == "阴" ||
            i.dayweather == "平静"
          ) {
            i.url = require("../../../assets/image/duoyun.png");
          } else if (
            i.dayweather == "有风" ||
            i.dayweather == "微风" ||
            i.dayweather == "和风" ||
            i.dayweather == "清风" ||
            i.dayweather == "强风/劲风" ||
            i.dayweather == "疾风" ||
            i.dayweather == "大风" ||
            i.dayweather == "烈风" ||
            i.dayweather == "风暴" ||
            i.dayweather == "清风" ||
            i.dayweather == "狂爆风" ||
            i.dayweather == "飓风" ||
            i.dayweather == "热带风暴"
          ) {
            i.url = require("../../../assets/image/guafeng.png");
          } else if (
            i.dayweather == "霾" ||
            i.dayweather == "中度霾" ||
            i.dayweather == "重度霾" ||
            i.dayweather == "严重霾" ||
            i.dayweather == "雾" ||
            i.dayweather == "浓雾" ||
            i.dayweather == "强浓雾" ||
            i.dayweather == "轻雾" ||
            i.dayweather == "大雾" ||
            i.dayweather == "特强浓雾" ||
            i.dayweather == "狂爆风"
          ) {
            i.url = require("../../../assets/image/wumai.png");
          } else if (
            i.dayweather == "阵雨" ||
            i.dayweather == "雷阵雨" ||
            i.dayweather == "雷阵雨并伴有冰雹" ||
            i.dayweather == "小雨" ||
            i.dayweather == "中雨" ||
            i.dayweather == "冻雨" ||
            i.dayweather == "大雨" ||
            i.dayweather == "暴雨" ||
            i.dayweather == "大暴雨" ||
            i.dayweather == "特大暴雨" ||
            i.dayweather == "强阵雨" ||
            i.dayweather == "强雷阵雨" ||
            i.dayweather == "极端降雨" ||
            i.dayweather == "毛毛雨/细雨" ||
            i.dayweather == "雨" ||
            i.dayweather == "小雨-中雨" ||
            i.dayweather == "中雨-大雨" ||
            i.dayweather == "大雨-暴雨" ||
            i.dayweather == "暴雨-大暴雨" ||
            i.dayweather == "大暴雨-特大暴雨"
          ) {
            i.url = require("../../../assets/image/xiayu.png");
          } else if (
            i.dayweather == "阵雨夹雪" ||
            i.dayweather == "雨雪天气" ||
            i.dayweather == "雨夹雪" ||
            i.dayweather == " 雪" ||
            i.dayweather == "阵雪" ||
            i.dayweather == "小雪" ||
            i.dayweather == "中雪" ||
            i.dayweather == "大雪" ||
            i.dayweather == "暴雪" ||
            i.dayweather == "小雪-中雪" ||
            i.dayweather == "中雪-大雪" ||
            i.dayweather == "大雪-暴雪"
          ) {
            i.url = require("../../../assets/image/xiaxue.png");
          } else if (i.dayweather == "浮尘") {
            i.url = require("../../../assets/image/fuchen.png");
          } else if (i.dayweather == "扬沙") {
            i.url = require("../../../assets/image/shazi.png");
          } else if (
            i.dayweather == "沙尘暴" ||
            i.dayweather == "强沙尘暴 " ||
            i.dayweather == "龙卷风"
          ) {
            i.url = require("../../../assets/image/fengbao.png");
          } else if (
            i.dayweather == "沙尘暴" ||
            i.dayweather == "强沙尘暴 " ||
            i.dayweather == "龙卷风"
          ) {
            i.url = require("../../../assets/image/fengbao.png");
          } else if (i.dayweather == "冷") {
            i.url = require("../../../assets/image/leng.png");
          } else if (i.dayweather == "热") {
            i.url = require("../../../assets/image/re.png");
          }

          return i;
        });
        this.url = this.list[0].url;
        this.week = data.forecasts[0].casts[0].daytemp;
        this.dayweather = data.forecasts[0].casts[0].dayweather;
      });
  },
};
</script>
<style lang="scss" scoped>
#weather {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
#weater_top {
  color: #fff;
  width: 32%;
  height: 35%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 2%;
  padding: 2% 0 5% 5%;
  flex-direction: row;
}
#weater_box {
  color: #fff;
  width: 100%;
  height: 45%;
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
.box_week {
  display: flex;
  flex-direction: column;
  font-size: 15px;
  line-height: 16px;
}
@media screen and (max-width: 1400px) {
   #weater_top {
    height: 27%;
  }
}

</style>
