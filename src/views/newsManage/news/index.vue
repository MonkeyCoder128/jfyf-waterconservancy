<template>
  <div class="messagePage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <el-input
          style="width: 320px"
          placeholder="搜索条例"
          suffix-icon="el-icon-search"
          v-model="searchMes"
          @keyup.enter.native="searchEnterRole"
          @click.native="searchEnterRole"
          size="mini"
          clearable
        >
        </el-input>
        <div class="InfoTime">
          <span>日期</span>
          <el-date-picker
            size="mini"
            v-model="searchTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          >
          </el-date-picker>
        </div>
      </div>
      <el-table :data="tableData" style="width: 100%" border>
        <el-table-column prop="title" label="消息内容" />
        <el-table-column prop="type" label="消息类型" />
        <el-table-column prop="details" label="消息时间" />
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "MessageManage",
  data() {
    return {
      searchMes: "",
      searchTime: "",
      tableData: [
        {
          title: "消息标题一",
          type: "告警消息",
          details: "2022-4-25 ",
        },
        {
          title: "消息标题二",
          type: "提示消息",
          details: "2022-4-25 ",
        },
        {
          title: "消息标题三",
          type: "通知消息",
          details: "2022-4-25 ",
        },
        {
          title: "消息标题四",
          type: "展示消息",
          details: "2022-4-25 ",
        },
      ],
    };
  },
  created() {},
  methods: {
    /** 搜索 */
    searchEnterRole() {
      if (this.searchMes) {
        console.log(
          "%c搜索条例：",
          "color:red;font-size:18px;font-weight:bold;",
          this.searchMes
        );
      } else {
        console.log("%c没有值：", "color:red;font-size:18px;font-weight:bold;");
      }
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.messagePage {
  .el-card {
    height: 93vh;
  }

  .InfoBar {
    width: 100%;
    display: flex;
    margin-bottom: 20px;
    .InfoTime {
      display: flex;
      align-items: center;
      span {
        white-space: nowrap;
        margin: 0 10px 0 30px;
      }
    }
  }
}
</style>