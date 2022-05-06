<template>
  <div style="position: relative">
    <div id="pie" style="width: 170px; height: 170px; margin-top: 3vh"></div>
    <img src="../../../assets/image/juxing.png" alt="" class="juxing" />
  </div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var pie = this.$echarts.init(document.getElementById("pie"));
      var option = {
        // tooltip: {
        //   trigger: "item",
        // },
        grid: {
          top: "10%",
          left: "3%",
          right: "2%",
          bottom: "3%",
          containLabel: true,
        },
        series: [
          {
            name: "Access From",
            type: "pie",
            radius: ["70%", "80%"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center",
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
              },
            },
            labelLine: {
              show: false,
            },
            data: [
              { value: 1048, name: "二氧化碳" },
              { value: 200, name: "氢含量" },
              { value: 580, name: "氧含量" },
            ],
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = ["#115cb9", "#1289ba", "#148f97"];
                  return colorList[params.dataIndex];
                },
              },
            },
          },
        ],
      };
      pie.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
.juxing {
  position: absolute;
  top: 35px;
  left: 36px;
  width: 99px;
  height: 99px;
}
</style>
