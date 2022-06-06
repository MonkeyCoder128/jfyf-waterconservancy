<template>
  <el-row class="h100" :gutter="12">
    <el-col class="h100" :span="24">
      <div class="h100">
        <el-col class="h100" :span="6">
          <img class="titimg" src="@/assets/image/huifang.jpg" alt="" />
          <div class="card">
            <el-input placeholder="请输入点位搜索" suffix-icon="el-icon-search" v-model="filterText">
            </el-input>
            <el-tree 
              class="filter-tree" 
              :data="dataList" 
              default-expand-all 
              :filter-node-method="filterNode"
              highlight-current 
              @node-click="handleNodeClick" 
              ref="tree"
              node-key="id"
              :default-checked-keys="[5]">
              <span slot-scope="{data}">
                <span>
                  <i :class="data.icon" class="mr5"></i>{{ data.label }}
                </span>
              </span>
            </el-tree>
          </div>
        </el-col>
        <el-col :span="18" class="h93">
          <el-card shadow="always" class="el-card h93">
            <div>
              <div>
                <el-form :inline="true" :model="formData" class="demo-form-inline" size="small" ref="ruleForm">
                  <el-form-item label="时间" class="fontBold">
                    <div class="block" :span='6'>
                      <span class="demonstration"></span>
                      <el-date-picker v-model="formData.reportDate" type="daterange" start-placeholder="开始时间"
                        end-placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss"
                        :default-time="['00:00:00', '23:59:59']">
                      </el-date-picker>
                    </div>
                  </el-form-item>
                  <el-form-item>
                    <el-button style="border-radius:5px;" type="primary" size="small" @click="serchData">查询</el-button>
                  </el-form-item>
                </el-form>
              </div>
              <div>
                <el-table :data="tableData.list" :header-cell-style="{ background: '#EEEEEE', color: '#333333' }"
                  style="width: 100%">
                  <el-table-column prop="imgData" label="视频缩略图">
                    <template slot-scope="scope">
                      <img class="tableImg" :src="scope.row.imgData" alt="">
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" label="视频录制时间" width="180">
                  </el-table-column>
                  <el-table-column prop="address" label="视频信息">
                    <template slot-scope="scope">
                      <p>视频时长：{{ scope.row.videoTime }}</p>
                      <p>视频大小：{{ scope.row.videoSize }}</p>
                    </template>
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <span @click="handleClick(scope.row)" class="lookColr">查看</span>
                    </template>
                  </el-table-column>
                </el-table>
              </div>
              <div class="con-page" v-if="tableData.list && tableData.list.length > 4">
                <el-pagination background :page-size="tableData.pageSize" :page-count="tableData.totalPage"
                  :page-sizes="[10, 20, 50, 100]" :total="tableData.totalCount" :current-page="tableData.currPage"
                  layout="prev,pager,next,sizes,jumper" @current-change="changeCurrent" @size-change="handleSizeChange">
                </el-pagination>
              </div>
            </div>
          </el-card>
        </el-col>
      </div>
    </el-col>
    <el-dialog title="" :visible.sync="dialogVisible" width="70%" height="70%" :close-on-click-modal="false"
      :close-on-press-escape="false">
      <video id="video" class="h100 video-js vjs-default-skin vjs-big-play-centered" muted controls>
        <source :src="nowPlayVideoUrl" />
      </video>
    </el-dialog>
  </el-row>
</template>
<script>
export default {
  data () {
    return {
      nowPlayVideoUrl: "http://112.125.88.230/file/video/%E7%9B%B4%E6%92%AD%E5%9B%9E%E6%94%BE.mp4",
      dialogVisible: false,// 查看视频
      p_video: '',
      filterText: "",
      formData: {
        reportDate: [],
        endDate: '',
        startDate: '',
      },
      tableData: {
        list: [
          {
            imgData: require('../../../assets/image/huifang.jpg'),
            date: '2022-04-12  12:00:09',
            videoTime: '24h',
            videoSize: '10M'
          }
        ],
        totalCount: 0,
        pageSize: 10,
        currPage: 1,
        totalPage: 1
      },
      dataList: [{
        id: 111,
        label: "全部",
        children: [{
          id: 1,
          label: "水库库区",
          icon: 'el-icon-reading',
          children: [
            {
              id: 5,
              label: "水库库区 -1",
              icon: 'el-icon-location-outline',
              class:'is-current'
            },
            {
              id: 6,
              label: "水库库区 -2",
              icon: 'el-icon-location-outline'
            },
          ],
        },
        {
          id: 2,
          label: "水库水坝区",
          icon: 'el-icon-reading',
          children: [
            {
              id: 9,
              label: "水库水坝区 -1",
              icon: 'el-icon-location-outline'
            }
          ],
        }
        ],
      }],
      defaultProps: {
        children: "children",
        label: "label",
      },
      listLoading: false,
    };
  },
  created(){
    
  },
  mounted () {
    this.$refs.tree.setCurrentKey(this.dataList[0].children[0].children[0].id);
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    // 查看视频
    handleClick (index) {
      this.dialogVisible = true;
    },
    //树
    filterNode (value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    //点击事件
    handleNodeClick (data) {
      this.p_video = data.label
    },
    // 改变页数
    changeCurrent (val) {
      this.tableData.currPage = val
      // this.init();
    },
    handleSizeChange (val) {
      this.tableData.pageSize = val
      // this.init();
    },
    // 查询数据
    serchData () {
      this.listLoading = true;
      this.formData.startDate = '';
      this.formData.endDate = '';
      if (this.formData.reportDate !== '' && this.formData.reportDate !== null) {
        this.formData.startDate = this.formData.reportDate[0];
        this.formData.endDate = this.formData.reportDate[1];
      }

    },
  },
};
</script>
<style scoped lang="scss">
/deep/.el-input--suffix .el-input__inner {
  padding: 0 10px;
  height: 30px;
  line-height: 30px;
}

/deep/.el-dialog__body {
  padding: 0;
  height: 70vh;
}
.el-col-6 {
  width: 21%;
}
.el-col-18 {
  width: 79%;
}
@media screen and (min-width: 2000px) {
  .el-col-6{
    width: 18%;
  }
  .el-col-18{
    width: 82%;
  }
}

/deep/.el-dialog__headerbtn {
  z-index: 2;
  border: 1px solid #fff;
  color: #fff;
  border-radius: 50%;
  height: 34px;
  width: 34px;
}

/deep/.el-dialog__headerbtn .el-dialog__close {
  color: #fff;
}

/deep/.el-dialog__header {
  padding: 0;
}

/deep/.el-input__icon {
  line-height: 30px;
}

.h100 {
  height: 100%;
}

.card {
  padding: 20px;
  box-sizing: border-box;
  background: #fff;
  height: calc(100% - 235px);
}

#video {
  width: 100%;
}

.fontBold {
  font-weight: bold;
}

h2 {
  text-align: center;
  width: 100%;
}

.h93 {
  height: 93vh;
}

.titimg {
  width: 100%;
  height: 220px;
  background: #FFFFFF;
  border-radius: 5px;
  margin-bottom: 15px;
}

.mr5 {
  margin-right: 5px;
}

.blue {
  color: #1C48BF;
}

.tableImg {
  width: 120px;
  height: 80px;
}

.con-page {
  margin-top: 15px;
  float: right;
}

/deep/.el-tree-node:focus>.el-tree-node__content {
  color: #1C48BF !important;
}

/*节点失焦时的背景颜色*/
/deep/.el-tree--highlight-current .el-tree-node.is-current>.el-tree-node__content {
  color: #1C48BF !important;
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

.lookColr {
  color: #1C48BF;
  cursor: pointer;
}
</style>
