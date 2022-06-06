<template>
  <div style="position: relative" class="box">
    <div ref="warningCharts" id="warningCharts"></div>
  </div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var warningCharts = this.$echarts.init(this.$refs.warningCharts);
      let colors = ["#148F97", "#1289BA", "#115CB9", "#37ABC1", "#EA951C"];
      var dataCake = [
        { name: "水质测定仪一", value: 10 },
        { name: "水质测定仪二", value: 15 },
        { name: "水质测定仪三", value: 12 },
      ];
      var option = {
        legend: {
          selectedMode: false,
          data: ["水质测定仪一", "水质测定仪二", "水质测定仪三"],
          icon: "rect",
          orient: "vertical",
          left: "50%", //图例距离左的距离
          y: "center",
          itemGap: 10,
          itemWidth: 19,
          itemHeight: 19,
          textStyle: {
            fontSize: 14, //字体大小
            rich: {
              t0: {
                color: colors[0],
              },
              t1: {
                color: colors[1],
              },
              t2: {
                color: colors[2],
              },
              t3: {
                color: colors[3],
              },
              t4: {
                color: colors[4],
              },
            },
          },
          formatter: function (param) {
            let index = dataCake.findIndex((v) => v.name == param);
            let str = `{white|${param.padEnd(5, "　")}}    {t${index}|${
              dataCake[index].value + "%"
            }}`;
            return str;
          },
        },
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["30%", "50%"],
            radius: ["50%", "60%"], // 这个属性修改圆环宽度
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
            type: "pie",
            center: ["30%", "50%"],
            radius: ["65%", "80%"],
            avoidLabelOverlap: false,
            labelLine: {
              show: false,
            },
            label: {
              formatter: "{a|{c}/次}{abg|}\n{hr|}\n ",
              fontSize: 1,
              borderWidth: 1,
              borderRadius: 4,
              padding: [20, -20],
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
            data: dataCake,
            itemStyle: {
              normal: {
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#148F97",
                    "#1289BA",
                    "#115CB9",
                    "#37ABC1",
                    "#EA951C",
                  ];
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
.box {
  width: 100% !important;
  height: 100%;
}
#warningCharts {
  width: 100%;
  height: 100%;
  margin: 0 auto;
}
</style>
