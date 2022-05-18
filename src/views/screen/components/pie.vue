<template>
  <div id="pie" style="width: 100%; height: 100%; margin-top: -3%"></div>
</template>
<script>
export default {
  mounted() {
    this.myecharts();
  },
  methods: {
    myecharts() {
      var pie = this.$echarts.init(document.getElementById("pie"));
      let colors = ["#1289ba", "#148f97", "#e7b20a", "#115cb9", "#eb9a26"];
      var dataCake = [
        { value: 50, name: "二氧化碳" },
        { value: 40, name: "氢含量" },
        { value: 30, name: "氧含量" },
        { value: 20, name: "氮含量" },
        { value: 10, name: "氦含量" },
      ];
      var option = {
        //backgroundColor:"#0d1324",
        grid: {
          left: "0",
          right: "0",
          bottom: "10",
          top: "10",
          containLabel: true,
        },
        legend: {
          orient: "vertical",
          right: "10",
          top: "center",
          itemHeight: 20,
          itemWidth: 20,
          padding: [10, 10],
          fontSize: 20,
          textStyle: {
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
              white: {
                color: "#fff",
              },
            },
          },
          formatter: function (param) {
            let index = dataCake.findIndex((v) => v.name == param);
            let str = `{white|${param}}{t${index}|${
              dataCake[index].value + "%"
            }}`;

            return str;
          },
        },
        series: [
          {
            name: "内置圆",
            type: "pie",
            center: ["35%", "55%"],
            radius: ["35%", "42%"],
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
              borderColor: "#0b111f",
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
            center: ["35%", "55%"],
            radius: ["45%", "55%"],
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
            data: dataCake,
            itemStyle: {
              normal: {
                shadowBlur: 10,
                shadowColor: '#87888a',
                color: function (params) {
                  //自定义颜色
                  var colorList = [
                    "#1289ba",
                    "#148f97",
                    "#e7b20a",
                    "#115cb9",
                    "#eb9a26",
                  ];

                  return colorList[params.dataIndex];
                },
                borderRadius: 2,
                borderColor: "transparent",
                borderWidth: 2,
              },
            },
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
              padding: [20, -30],
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
      window.addEventListener("resize", function () {
        pie.resize();
      });
    },
  },
};
</script>
