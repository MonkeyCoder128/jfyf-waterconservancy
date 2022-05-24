<template>
  <div id="weather">
    {{ info }}
  </div>
</template>
<script>
export default {
  data() {
    return {
      info: "",
    };
  },
  mounted() {
    fetch(
      "https://restapi.amap.com/v3/weather/weatherInfo?key=999596a030ca6b37f79322b8432c5e74&city=610103&extensions=all"
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
      });
  },
};
</script>
<style lang="scss" scoped>
#weather {
  width: 100%;
  height: 140px;
  overflow: hidden;
}
#weather_box {
  width: 100%;
  margin: 0 auto;
  overflow: hidden;
}
.btn_title {
  color: #2e89e0;
  background-color: rgba(62, 160, 200, 0.3);
  padding: 5px;
  position: absolute;
  right: 0;
}
.rain {
  display: flex;
  flex-direction: row;
}
.rain_p {
  display: flex;
  flex-direction: column;
  font-size: 10px;
}
.weater_p {
  margin: 4% auto 1%;
  width: calc(100% - 39px);
}
</style>
