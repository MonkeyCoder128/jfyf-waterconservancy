<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always" style="height: 95vh">
        <el-col :span="6">
          <el-card shadow="hover">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText">
            </el-input>

            <el-tree
              class="filter-tree"
              :data="data"
              :props="defaultProps"
              default-expand-all
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree"
            >
            </el-tree
          ></el-card>
        </el-col>
        <el-col :span="18">
          <el-card shadow="hover">
            <h2>{{p_video}}监控</h2>
            <video
              id="video"
              class="video-js vjs-default-skin vjs-big-play-centered"
              muted
              controls
            >
              <source
                src="/PLTV/88888888/224/3221225611/index.m3u8"
                type="application/x-mpegURL"
              />
            </video>
          </el-card>
        </el-col>
      </el-card>
    </el-col>
  </el-row>
</template>
<script>
import Videojs from "video.js";
import "videojs-contrib-hls";
export default {
  data() {
    return {
      p_video:'A区',
      filterText: "",
      data: [
        {
          id: 1,
          label: "A区",
          children: [
            {
              id: 5,
              label: "A区 -1",
            },
            {
              id: 6,
              label: "A区 -2",
            },
          ],
        },
        {
          id: 2,
          label: "B区",
          children: [
            {
              id: 5,
              label: "B区 -1",
            },
            {
              id: 6,
              label: "B区 -2  ",
            },
          ],
        },
        {
          id: 3,
          label: "C区",
          children: [
            {
              id: 7,
              label: "C区 -1",
            },
            {
              id: 8,
              label: "C区 -2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
    };
  },
  mounted() {
    setTimeout(() => {
      this.getVideo();
    });
  },
  watch: {
    filterText(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    //直播
    getVideo() {
      this.player = Videojs("video", {
        bigPlayButton: true,
        autoplay: false,
        controls: true,
        width: 300,
        preload: "auto",
      });
    },
    //树
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击事件
    handleNodeClick(data) {
      this.p_video = data.label
    },
  },
};
</script>
<style scoped>
.el-card {
  height: 90vh;
}
#video {
  margin: 2vh auto 0;
  width: 60vw;
  height: 80vh;
}
h2{
  text-align: center;
  width: 100%;
}
</style>
