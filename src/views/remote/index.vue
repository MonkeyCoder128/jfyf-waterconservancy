<template>
    <div class="videoStyle" ref="init">
      <video id="video-container">
      </video>
    </div>
</template>
<script>
import  EZUIKit from 'ezuikit-js';
export default {
  data () {
    return {
     
    };
  },
  mounted () {
    let height= this.$refs.init.offsetHeight;
    let width= this.$refs.init.offsetWidth;
    // this.currentTime(); // 计时器
    let that = this
    fetch('https://open.ys7.com/jssdk/ezopen/demo/token')
      .then(response => response.json())
      .then(res => {
        var accessToken = res.data.accessToken;
        var player = new EZUIKit.EZUIKitPlayer({
          id: 'video-container', // 视频容器ID
          accessToken: accessToken,
          poster:"",
          url: 'ezopen://open.ys7.com/G39444019/1.live',
          template: 'simple', // simple - 极简版;standard-标准版;security - 安防版(预览回放);voice-语音版; theme-可配置主题；
          // plugin: ['talk'],                       // 加载插件，talk-对讲
          height: height,
          width: width,
        });
      });
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    },
  },
 

  methods: {
    change() {
      player.stop();
      // 切换为直播
      player.play({
        url:"ezopen://open.ys7.com/244640009/1.live"
      })
      // setTimeout(()=>{
      //   player.play({
      //     url:"ezopen://open.ys7.com/244640009/1.live"
      //   })      
      // },1000)
    },
    
  },
};
</script>
<style scoped lang="scss">
.videoStyle{
  height: 100%;
  width: 100%;
}

</style>
