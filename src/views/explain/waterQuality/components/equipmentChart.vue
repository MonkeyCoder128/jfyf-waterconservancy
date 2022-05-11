<template>
  <div class="box">
    <div ref="equipmentChart" id="equipmentChart"></div>
    <!-- <img src="../../../../assets/image/juxing.png" alt="" class="juxing" /> -->
  </div>
</template>
<script>
export default {
  data(){
    return{
      colorList: ["#ea951c", "#3f85ff", "#f3b63e", "#37abc1", "#32dfdf"],
    }
  },
  mounted() {
    this.myecharts();
    window.addEventListener("resize", function () {
      myecharts.resize();
    });
  },
  methods: {
    myecharts() {
      var equipmentChart = this.$echarts.init(
        this.$refs.equipmentChart
      );
      var dataCake = [
        { name: "二氧化碳", percentage: "43.67%" },
        { name: "氢含量", percentage: "29.26%" },
        { name: "氧含量", percentage: "27.07%" },
        { name: "氮含量", percentage: "29.26%" },
        { name: "氦含量", percentage: "27.07%" },
      ];
      var option = {
        tooltip: {
          trigger: "item",
          formatter: "{b}: {c} ({d}%)",
        },
        // 给echarts设置百分比自适应
        grid: {
          left: "5%",
          right: "5%",
          top: "20%",
          bottom: "20%",
          containLabel: true,
        },
        legend: {
          orient: "rect",
          right: "5%", //图例距离左的距离
          top: "5%",
          itemGap: 13,
          itemHeight: 10,
          itemWidth: 10,
          textStyle: {
            fontSize: 14, //字体大小
          },
          formatter: function (name) {
            let target, percentage;
            for (let i = 0; i < dataCake.length; i++) {
              if (dataCake[i].name === name) {
                target = dataCake[i].value;
                percentage = dataCake[i].percentage;
              }
            }
            let arr = [name + " ", " " + percentage];
            return arr.join(" ");
          },
        },
        color: ["#EA951C", "#3F85FF", "#F3B63E", "#37ABC1", "#32DFDF"],
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["35%", "45%"], // 这个属性修改圆环宽度
            silent: true,
            labelLine: {
              show: false,
            },
            label: {
              show: false,
            },
            itemStyle: {
              color: "#F8C202",
              borderWidth: 3,
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
            name: "饼图数据",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["55%", "70%"],
            silent: true,
            itemStyle: {
              borderWidth: 3,
              borderColor: "#fff",
            },
            labelLine: {
              show: false,
            },
            label: {
              formatter: "{a|{c}mol/L}{abg|}\n{hr|}\n ",
              borderWidth: 1,
              borderRadius: 4,
              rich: {
                a: {
                  color: "inherit", //设置外层标识字体颜色与饼图颜色一致
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

            data: [
              { value: 500, name: "二氧化碳" },
              { value: 335, name: "氢含量" },
              { value: 310, name: "氧含量" },
              { value: 335, name: "氮含量" },
              { value: 310, name: "氦含量" },
            ],
          },
        ],
      };
      equipmentChart.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
.box{
  width: 100% !important;
  height: 100%;
  #equipmentChart {
    margin: 0 auto;
    width: 95%;
    height: 100%;
  }
}
</style>  
