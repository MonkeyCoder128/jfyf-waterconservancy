<template>
  <div style="position: relative">
    <div ref="warningCharts" id="warningCharts"></div>
    <img src="../../../../assets/image/juxing.png" alt="" class="juxing" />
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
            name: "Access From",
            type: "pie",
            radius: ["65%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
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
              { value: 1000, name: "A设备" },
              { value: 300, name: "B设备" },
              { value: 580, name: "C设备" },
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
#warningCharts{
  width: 170px;
  height: 170px;
  margin-top: 0px;
}
.juxing {
  position: absolute;
  top: 35px;
  left: 36px;
  width: 99px;
  height: 99px;
}
</style>
