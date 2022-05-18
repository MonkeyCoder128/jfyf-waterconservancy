<template>
  <div id="weather_box">
    <el-row class="weater_p">
      <el-col :span="3"
        ><img
          src="https://cctv202.com/img/rain.png"
          width="30px"
          height="30px"
        />
      </el-col>
      <el-col :span="15" class="rain" style="color: #fff"
        ><div style="font-size: 32px">18</div>
        <div class="rain_p">
          <div>℃</div>
          小雨
        </div></el-col
      >
      <el-col :span="2"
        ><el-button type="primary" class="btn_title"
          >蓝色暴雨预警</el-button
        ></el-col
      >
    </el-row>
    <div id="weather"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var weather = this.$echarts.init(document.getElementById("weather"));
      var option = {
        grid: {
          show: true,
          //backgroundColor: "transparent",
          opacity: 0.3,
          borderWidth: "0",
          top: "180",
          bottom: "2",
        },
        tooltip: {
          trigger: "axis",
        },
        legend: {
          show: false,
        },
        xAxis: [
          // 星期
          {
            type: "category",
            boundaryGap: false,
            position: "top",
            offset: 110,
            zlevel: 100,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: ["{a|{value}}"].join("\n"),
              rich: {
                a: {
                  color: "white",
                  fontSize: 14,
                },
              },
            },
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 19,
            },
            data: ["今天", "明天", "周三", "周四"],
          },
          // 天气图标
          {
            type: "category",
            boundaryGap: false,
            position: "top",
            offset: 50,
            zlevel: 100,
            axisLine: {
              show: false,
            },
            axisTick: {
              show: false,
            },
            axisLabel: {
              interval: 0,
              formatter: function (value, index) {
                return "{" + index + "| }\n{b|" + value + "}";
              },
              rich: {
                0: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[0]] + '.png')
                    image: "https://cctv202.com/img/rain.png",
                  },
                  height: 20,
                  width: 20,
                },
                1: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[1]] + '.png')
                    image: "https://cctv202.com/img/sun.png",
                  },
                  height: 20,
                  width: 20,
                },
                2: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[2]] + '.png')
                    image: "https://cctv202.com/img/sun.png",
                  },
                  height: 20,
                  width: 20,
                },
                3: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[3]] + '.png')
                    image: "https://cctv202.com/img/sun.png",
                  },
                  height: 20,
                  width: 20,
                },
                b: {
                  color: "white",
                  fontSize: 12,
                  lineHeight: 30,
                  width: 80,
                  height: 20,
                },
              },
            },
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 14,
            },
            // data: this.weatherdata.weather
            data: ["20/12℃", "27/14℃", "27/18℃", "27/22℃"],
          },
        ],
        yAxis: {
          type: "value",
          show: false,
          axisLabel: {
            formatter: "{value} °C",
            color: "white",
          },
        },
      };

      weather.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
#weather {
  width: 100%;
  height: 140px;
  overflow: hidden;
}
#weather_box {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.btn_title {
  color: #2e89e0;
  background-color: rgba(62, 160, 200, 0.3);
  padding: 5px;
  position: absolute;
  right: 0;
}
.rain {
  display: flex;
  flex-direction: row;
}
.rain_p {
  display: flex;
  flex-direction: column;
  font-size: 10px;
}
.weater_p {
  margin: 4% auto 1%;
  width: calc(100% - 39px);
}
</style>
