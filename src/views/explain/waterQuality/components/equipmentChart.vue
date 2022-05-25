<template>
  <div class="box">
    <div ref="equipmentChart" id="equipmentChart"></div>
    <!-- <img src="../../../../assets/image/juxing.png" alt="" class="juxing" /> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      colorList: ["#ea951c", "#3f85ff", "#f3b63e", "#37abc1", "#32dfdf"],
    };
  },
  props:{
    parentData:{
      type:Object,
      default:""
    }
  },
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var equipmentChart = this.$echarts.init(this.$refs.equipmentChart);
      let colors = ["#1289ba", "#148f97", "#e7b20a", "#115cb9", "#eb9a26"];
      var dataCake = this.parentData.dataCake;
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
          right: "2%", //图例距离左的距离
          top: "2%",
          itemGap: 13,
          itemHeight: 16,
          itemWidth: 16,
          fontSize: 14,
          // textStyle: {
          //   fontSize: 14, //字体大小
          //   color: "inherit", //设置dataCake中的文字颜色跟饼图一致
          // },
          textStyle: {
            rich: {
              t0: {
                fontSize: 13,
                color: colors[0],
              },
              t1: {
                fontSize: 13,
                color: colors[1],
              },
              t2: {
                fontSize: 13,
                color: colors[2],
              },
              t3: {
                fontSize: 13,
                color: colors[3],
              },
              t4: {
                fontSize: 13,
                color: colors[4],
              },
              white: {
                color: "black",
              },
            },
          },
          formatter: function (param) {
            let index = dataCake.findIndex((v) => v.name == param);
            let str = `  {white|${param}}   {t${index}|${
              dataCake[index].value + "%"
            }}`;
            return str;
          },
        },
        color: ["#EA951C", "#3F85FF", "#F3B63E", "#37ABC1", "#32DFDF"],
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["47%", "59%"], // 这个属性修改圆环宽度
            // offsetCenter:[0,-10],
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
            data: this.parentData.dataList,
          },
        ],
      };
      equipmentChart.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
.box {
  width: 100% !important;
  height: 100%;
  #equipmentChart {
    margin: 0 auto;
    width: 95%;
    height: 100%;
  }
}
</style>  
