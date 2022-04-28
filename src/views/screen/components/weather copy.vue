<template>
  <div id="weather" style="width: 290px; height:127px; margin-top: 1vh;overflow:scoll;"></div>
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
            offset: 20,
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
                    image: "https://cctv202.com/img/sun.png",
                  },
                  height: 25,
                  width: 25,
                },
                1: {
                  backgroundColor: {
                    image: "https://cctv202.com/img/rain.png",
                  },
                  height: 25,
                  width: 25,
                },
                2: {
                  backgroundColor: {
                    image: "https://cctv202.com/img/rain.png",
                  },
                  height: 25,
                  width: 25,
                },
                3: {
                  backgroundColor: {
                    image: "https://cctv202.com/img/rain.png",
                  },
                  height: 25,
                  width: 25,
                },
              },
            },
            data: ["20/12℃", "27/14℃", "27/14℃","27/14℃"],
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
