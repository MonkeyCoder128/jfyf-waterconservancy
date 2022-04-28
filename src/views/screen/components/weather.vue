<template>
  <div
    id="weather"
    style="width: 270px; height: 140px;overflow: hidden;"
  ></div>
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
          backgroundColor: "transparent",
          opacity: 0.3,
          borderWidth: "0",
          top: "180",
          bottom: "0",
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
                  // color: 'white',
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
            offset: 40,
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
                  height: 25,
                  width: 25,
                },
                1: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[1]] + '.png')
                    image: "https://cctv202.com/img/sun.png",
                  },
                  height: 25,
                  width: 25,
                },
                2: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[2]] + '.png')
                    image: "https://cctv202.com/img/rain.png",
                  },
                  height: 25,
                  width: 25,
                },
                3: {
                  backgroundColor: {
                    // image: require('@/assets/weather_icon/' + this.weatherIconDic[this.weatherdata.weather[3]] + '.png')
                    image: "https://cctv202.com/img/rain.png",
                  },
                  height: 25,
                  width: 25,
                },
                b: {
                  // color: 'white',
                  fontSize: 12,
                  lineHeight: 30,
                  height: 20,
                },
              },
            },
            nameTextStyle: {
              fontWeight: "bold",
              fontSize: 14,
            },
            // data: this.weatherdata.weather
            data: ["20/12℃", "27/14℃", "27/14℃", "27/14℃"],
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
