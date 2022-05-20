<template>
  <el-row class="h100" :gutter="12">
    <el-col class="h100" :span="24">
      <div class="h100">
        <el-col class="h100" :span="6">
          <img class="titimg" src="@/assets/image/huifang.jpg" alt="" />
          <div class="card">
            <el-input placeholder="请输入点位搜索" suffix-icon="el-icon-search" v-model="filterText">
            </el-input>
            <el-tree class="filter-tree" :data="dataList" default-expand-all :filter-node-method="filterNode"
              highlight-current @node-click="handleNodeClick" ref="tree">
              <span slot-scope="{data}">
                <span>
                  <i :class="data.icon" class="mr5"></i>{{ data.label }}
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col class="h100 relt" :span="18">
          <!-- <div class="posti">{{ nowDate }}</div> -->
          <div class="videoStyle" ref="init">
           <video id="video-container">
            </video>
          </div>
        </el-col>
      </div>
    </el-col>
  </el-row>
</template>
<script>
import  EZUIKit from 'ezuikit-js';
export default {
  data () {
    return {
      nowDate:'',
      p_video: '',
      filterText: "",
      dataList: [{
        id: 111,
        label: "全部",
        children: [{
          id: 1,
          label: "A区",
          icon: 'el-icon-reading',
          children: [
            {
              id: 5,
              label: "A区 -1",
              icon: 'el-icon-location-outline'
            },
            {
              id: 6,
              label: "A区 -2",
              icon: 'el-icon-location-outline'
            },
          ],
        },
        {
          id: 2,
          label: "B区",
          icon: 'el-icon-reading',
          children: [
            {
              id: 5,
              label: "B区 -1",
              icon: 'el-icon-location-outline'
            },
            {
              id: 6,
              label: "B区 -2  ",
              icon: 'el-icon-location-outline'
            },
          ],
        },
        {
          id: 3,
          label: "C区",
          icon: 'el-icon-reading',
          children: [
            {
              id: 7,
              label: "C区 -1",
              icon: 'el-icon-location-outline'
            },
            {
              id: 8,
              label: "C区 -2",
              icon: 'el-icon-location-outline'
            },
          ],
        }],
      }],
      defaultProps: {
        children: "children",
        label: "label",
      },
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
          // handleSuccess:function(ress){
          //   console.log('0-0-0-',ress)
          // }
        });
      });
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    },
  },
  // beforeDestroy() {
  //   if (this.formatDate) {
  //     clearInterval(this.formatDate); // 在Vue实例销毁前，清除时间定时器
  //   }
  // },

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
    //树
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击事件
    handleNodeClick (data) {
      this.p_video = data.label;
      
    },
    currentTime() {
      setInterval(this.formatDate, 1000);
    },
    // 计时器
    formatDate() {
      let date = new Date();
      let year = date.getFullYear(); // 年
      let month = date.getMonth() + 1; // 月
      let day = date.getDate(); // 日
      let week = date.getDay(); // 星期
      let weekArr = [ "星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六" ];
      let hour = date.getHours(); // 时
      hour = hour < 10 ? "0" + hour : hour; // 如果只有一位，则前面补零
      let minute = date.getMinutes(); // 分
      minute = minute < 10 ? "0" + minute : minute; // 如果只有一位，则前面补零
      let second = date.getSeconds(); // 秒
      second = second < 10 ? "0" + second : second; // 如果只有一位，则前面补零
      this.nowDate = `${year}-${month}-${day}  ${weekArr[week]}  ${hour}:${minute}:${second} `;
    }
  },
};
</script>
<style scoped lang="scss">
/deep/.el-input--suffix .el-input__inner {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}
.videoStyle{
  height: calc(100% - 50px);
  width: 100%;
}

/deep/.el-input__icon {
  line-height: 30px;
}
.el-col-6{
  width: 18%;
}
.el-col-18{
  width: 82%;
}
.h100 {
  height: 100%;
}
.w100 {
  width: 100%;
}

.relt {
  position: relative;
}

.posti {
  position: absolute;
  top: 0;
  height: 60px;
  background-color: rgba(0, 0, 0, 0.16);
  width: calc(100% - 12px);
  color: #fff;
  text-align: right;
  z-index: 2;
  line-height: 60px;
  padding-right: 20px;
}

.card {
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  height: calc(100% - 287px);
}

#video {
  // margin: 2vh auto 0;
  width: 100%;
}

h2 {
  text-align: center;
  width: 100%;
}

.titimg {
  width: 100%;
  height: 220px;
  background: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 15px;
}

.filter-tree {
  position: relative;
  background: #FFFFFF;
  color: #606266;
  border: 1px solid #DCDFE6;
  margin-top: 15px;
  border-radius: 5px;
  min-height: calc(100% - 45px);
  overflow-y: auto;
}

.mr5 {
  margin-right: 5px;
}

.blue {
  color: #1C48BF;
}

/deep/.el-tree-node:focus>.el-tree-node__content {
  color: #1C48BF !important;
}

/*节点失焦时的背景颜色*/
/deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  color: #1C48BF !important;
}
</style>
