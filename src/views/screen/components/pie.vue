<template>
  <div style="position: relative">
    <div id="pie" style="width: 95%; height: 200px; margin: 0 atuo"></div>
    <img src="../../../assets/image/juxing.png" alt="" class="juxing" />
  </div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
    window.addEventListener("resize", function () {
      myecharts.resize();
    });
  },
  methods: {
    myecharts() {
      var pie = this.$echarts.init(document.getElementById("pie"));
      var option = {
        tooltip: {
          trigger: "item",
        },
        legend: {
          type: "scroll",
          orient: "vertical",
          top: "center",
          right: 40,
          itemHeight: 17,
          itemWidth: 17,
          textStyle: {
            color: "#fff",
            padding: [10, 10],
            fontSize: 15,
          },
        },
        series: [
          {
            //name: "Access From",
            type: "pie",
            radius: ["52%", "65%"],
            center: ["35%", "55%"],
            avoidLabelOverlap: false,
            itemStyle: {
              borderRadius: 10,
              borderColor: "rgba(0, 0, 0, 0.3)",
              borderWidth: 2,
            },
            label: {
              show: false,
              position: "center",
            },

            color: ["#1289ba", "#148f97", "#e7b20a", "#115cb9", "#eb9a26"],
            labelLine: {
              show: false,
            },
            data: [
              { value: 4, name: "二氧化碳" },
              { value: 3, name: "氢含量" },
              { value: 2, name: "氦含量" },
              { value: 4, name: "氧含量" },
              { value: 2, name: "氮含量" },
            ],
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              position: "outer",
              show: true,
              color: "#fff",
              fontSize: 12,
              padding: [20, -20],
              formatter: ["{c}" + "mol/L"].join("\n"),
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "20",
                fontWeight: "bold",
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
  top: 32%;
  left: 23%;
  width: 20%;
  height: 47%;
}
</style>  
