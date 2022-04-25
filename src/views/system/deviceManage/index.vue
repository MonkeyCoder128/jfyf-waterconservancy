<template>
  <div class="messagePage">
    <el-card shadow="always" class="el-card">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="title" label="标题" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="details" label="详情" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="seeRow(scope.row)" type="text"> 查看 </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "MessageManage",
  data() {
    return {
      tableData: [
        {
          title: "消息标题一",
          type: "告警消息",
          details: "包含消息类型及详情的通知 1518 ",
        },
        {
          title: "消息标题二",
          type: "提示消息",
          details: "包含消息类型及详情的通知 1517 ",
        },
        {
          title: "消息标题三",
          type: "通知消息",
          details: "包含消息类型及详情的通知 1519 ",
        },
        {
          title: "消息标题四",
          type: "展示消息",
          details: "包含消息类型及详情的通知 1516 ",
        },
      ],
    };
  },
  created() {},
  methods: {
    /** 查看详情 */
    seeRow() {
      console.log(
        "%c查看消息详情：",
        "color:red;font-size:18px;font-weight:bold;"
      );
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.messagePage {
  .el-card {
    height: 93vh;
  }
}
</style>