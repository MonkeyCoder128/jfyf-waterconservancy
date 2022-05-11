<template>
  <div style="position: relative">
    <div ref="equipmentChart" id="equipmentChart"></div>
    <img src="../../../../assets/image/juxing.png" alt="" class="juxing" />
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
  },
  methods: {
    myecharts() {
      var equipmentChart = this.$echarts.init(
        this.$refs.equipmentChart
      );
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
            color: "black",
            padding: [10, 10],
            fontSize: 12,
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
              borderRadius: 0,
              borderColor: "#fff",
              borderWidth: 3,
            },
            label: {
              show: false,
              position: "center",
            },

            color: ["#ea951c", "#3f85ff", "#f3b63e", "#37abc1", "#32dfdf"],
            labelLine: {
              show: false,
            },
            data: [
              { value: 2.5, name: "二氧化碳",
                formatter:function(value){
                  return  value + '%'
                }
              },
              { value: 3, name: "氢含量" },
              { value: 2.5, name: "氦含量" },
              { value: 3, name: "氧含量" },
              { value: 4, name: "氮含量" },
            ],
            labelLine: {
              normal: {
                show: false,
              },
            },
            label: {
              position: "outer",
              show: true,
              itemStyle:{
                color:(params)=> {
                  var index = params.dataIndex;
                  return this.colorList[index];
                },
              },
              color:(params)=> {
                var index = params.dataIndex;
                return this.colorList[index];
              },
              fontSize: 10,
              padding: [20, -20],
              formatter: ["{c}" + "mol/L"].join("\n"),
            },
            emphasis: {
              label: {
                show: true,
                fontSize: "16",
                fontWeight: "bold",
                color:["#ea951c", "#3f85ff", "#f3b63e", "#37abc1", "#32dfdf"],
              },
            },
          },
        ],
      };
      equipmentChart.setOption(option);
    },
  },
};
</script>
<style  lang="scss" scoped>
.juxing {
  position: absolute;
  top: 50px;
  left: 103px;
  width: 75px;
  height: 75px;
}
#equipmentChart{
  width: 400px;
  height: 160px;
  margin-top: 0px;
}
</style>  
