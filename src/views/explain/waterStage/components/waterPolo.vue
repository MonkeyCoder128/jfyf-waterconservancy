<template>
  <div class="box">
    <div ref="waterPolo" id="waterPolo"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    parentData: {
      type: String,
      default: "",
    },
  },
  created() {},
  mounted() {
    this.getLoadEcharts();
  },
  methods: {
    // 获取echarts
    getLoadEcharts() {
      var echarts = require("echarts");
      var myChart = this.$echarts.init(this.$refs.waterPolo);
      var max = 100; //满刻度大小
      var scroe = this.parentData,
      scroePer = scroe / 50;
      var data = max * scroePer;
      let option = {
        title: {
          top: "47%",
          left: "center",
          text: scroe + "mm/min",
          textStyle: {
            color: "#1C48BF",
            fontStyle: "normal",
            fontWeight: "normal",
            fontSize: 16,
          },
        },
        series: [
          {
            type: "liquidFill",
            itemStyle: {
              opacity: 0.8, //波浪的透明度
              shadowBlur: 10, //波浪的阴影范围
              shadowColor: "#FFB931", //阴影颜色
            },
            radius: "80%",
            //水波
            color: [
              new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "#35EBFB",
                },
                {
                  offset: 1,
                  color: "#2876F7",
                },
              ]),
            ],
            data: [
              {
                value: scroePer,
              },
            ],
            center: ["50%", "50%"],
            backgroundStyle: {
              color: "#fff",
            },
            label: {
              normal: {
                formatter: "",
                textStyle: {
                  fontSize: 12,
                },
              },
            },
            outline: {
              itemStyle: {
                borderColor: "transparent",
                borderWidth: 5,
              },
              borderDistance: 0,
            },
          },
          //外环线
          {
            color: ["#3192D8", "transparent"],
            type: "pie",
            center: ["50%", "50%"],
            radius: ["80%", "82%"],
            hoverAnimation: false,
            data: [
              {
                name: "",
                value: data,
                label: {
                  show: false,
                  position: "center",
                  color: "#fff",
                  fontSize: 38,
                  fontWeight: "bold",
                  formatter: function (o) {
                    return data;
                  },
                },
              },
              {
                //画剩余的刻度圆环
                name: "",
                value: max - data,
                label: {
                  show: false,
                },
                labelLine: {
                  show: false,
                },
              },
            ],
          },
        ],
      };
      myChart.setOption(option);
    },
  },
};
</script>
<style lang="scss" scoped>
.box {
  width: 100% !important;
  height: 100%;
  #waterPolo {
    margin: 0 auto;
    width: 95%;
    height: 100%;
  }
}
</style>