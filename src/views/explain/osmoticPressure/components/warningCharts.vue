<template>
  <div style="position: relative" class="box">
    <div ref="warningCharts" id="warningCharts"></div>
    <!-- <img src="../../../../assets/image/juxing.png" alt="" class="juxing" /> -->
  </div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var warningCharts = this.$echarts.init(
        this.$refs.warningCharts
      );
      var option = {
        // tooltip: {
        //   trigger: "item",
        // },
        grid: {
          top: "2%",
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["50%", "50%"],
            radius: ["50%", "59%"], // 这个属性修改圆环宽度
            silent: true,
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "#F8C202",
              borderWidth: 4,
              borderColor: "#fff",
            },
            data: [
              { value: 500, name: "" },
              { value: 500, name: "" },
              { value: 500, name: "" },
              { value: 500, name: "" },
            ],
          },
          {
            name: "外层圆",
            type: "pie",
            radius: ["65%", "80%"],
            avoidLabelOverlap: false,
            label: {
              formatter: "{a|{c}/次}{abg|}\n{hr|}\n ",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "inherit", //继承颜色，设置颜色一致对应
                  lineHeight: 22,
                  align: "center",
                },
                hr: {
                  borderColor: "#EEEEEE",
                  width: "100%",
                  borderWidth: 1,
                  height: 0,
                },
              },
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "10",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 630, name: "A设备" },
              { value: 370, name: "B设备" },
              { value: 480, name: "C设备" },
            ],
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = ["#115cb9", "#1289ba", "#148f97"];
                  return colorList[params.dataIndex];
                },
                borderRadius: 0,
                borderColor: "#fff",
                borderWidth: 3,
              },
            },
          },
        ],
      };
      warningCharts.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
.box{
  width: 100% !important;
  height: 100%;
}
#warningCharts{
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
// .juxing {
//   position: absolute;
//   top: 35px;
//   left: 36px;
//   width: 99px;
//   height: 99px;
// }
</style>
