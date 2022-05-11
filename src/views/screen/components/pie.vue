<template>
  <div style="position: relative">
    <div id="pie" style="width: 100%; height: 170px; margin-top: 3vh"></div>
    <!-- <img src="../../../assets/image/juxing.png" alt="" class="juxing" /> -->
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
      var ydata = [
        {
          name: "二氧化碳",
          value: 18,
        },
        {
          name: "氢含量",
          value: 16,
        },
        {
          name: "氧含量",
          value: 15,
        },
        {
          name: "氦含量",
          value: 14,
        },
        {
          name: "氮含量",
          value: 10,
        },
      ];
      var color = [
        "#1289BA ",
        "#148F97",
        "#E7B20A",
        "#115CB9",
        "#EB9A26",
      ];
      var xdata = [
        "二氧化碳",
        "氢含量",
        "氧含量",
        "氦含量",
        "氮含量",
      ];

      var option = {
        color: color,
        legend: {
          color:'#fff',
          orient: "vartical",
          x: "left",
          top: "center",
          left: "70%",
          bottom: "0%",
          data: xdata,
          itemWidth: 8,
          itemHeight: 8,
          itemGap: 16,

          formatter: function (name) {
            return "" + name;
          },
        },
        series: [
          {
            type: "pie",
            clockwise: false, //饼图的扇区是否是顺时针排布
            minAngle: 2, //最小的扇区角度（0 ~ 360）
            radius: ["50%", "60%"],
            center: ["30%", "50%"],
            avoidLabelOverlap: false,
            itemStyle: {
              //图形样式
              normal: {
                // borderColor: "#ffffff",
                borderWidth: 6,
              },
            },
            label: {
              normal: {
                formatter: "{text|{b}}\n{c} ({d}%)",
                rich: {
                  text: {
                    color: "#fff",
                    fontSize: 8,
                    align: "center",
                    verticalAlign: "middle",
                  },
                  value: {
                    color: "#fff",
                    fontSize: 8,
                    align: "center",
                    verticalAlign: "middle",
                  },
                },
              },
              // emphasis: {
              //   show: true,
              //   textStyle: {
              //     fontSize: 24,
              //   },
              // },
            },
            data: ydata,
          },
        ],
      };
      pie.setOption(option);

      setTimeout(function () {
        pie.on("mouseover", function (params) {
          if (params.name == ydata[0].name) {
            pie.dispatchAction({
              type: "highlight",
              seriesIndex: 0,
              dataIndex: 0,
            });
          } else {
            pie.dispatchAction({
              type: "downplay",
              seriesIndex: 0,
              dataIndex: 0,
            });
          }
        });

        pie.on("mouseout", function (params) {
          pie.dispatchAction({
            type: "highlight",
            seriesIndex: 0,
            dataIndex: 0,
          });
        });
        pie.dispatchAction({
          type: "highlight",
          seriesIndex: 0,
          dataIndex: 0,
        });
      }, 1000);
    },
  },
};
</script>
<style  lang="scss" scoped>
.juxing {
  position: absolute;
  top: 36px;
  left: 56px;
  width: 38px;
  height: 38px;
}
</style>  
