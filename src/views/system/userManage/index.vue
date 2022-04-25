<template>
  <div class="userPage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <el-button type="primary" size="mini" @click="addUser()" plain
          >新增用户</el-button
        >
        <el-input
          style="width: 320px"
          placeholder="搜索用户"
          suffix-icon="el-icon-search"
          v-model="searchUser"
          @keyup.enter.native="searchEnterUser"
          @click.native="searchEnterUser"
          size="mini"
          clearable
        >
        </el-input>
      </div>
      <el-table :data="userList" style="width: 100%" border>
        <el-table-column prop="userName" label="用户名称" />
        <el-table-column prop="roleName" label="角色" />
        <el-table-column prop="area" label="地区" />
        <el-table-column prop="account" label="用户账号" />
        <el-table-column prop="state" label="用户状态" />
        <el-table-column prop="time" label="注册时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="amendUser(scope.row)" type="text">
              编辑
            </el-button>
            <el-button @click="deleteUser(scope.row)" type="text">
              删除
            </el-button>
            <el-button @click="enable(scope.row)" type="text"> 启用 </el-button>
            <el-button @click="deactivate(scope.row)" type="text">
              停用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
 
<script>
export default {
  name: "UserManage",
  data() {
    return {
      searchUser: "",
      userList: [
        {
          userId: "001",
          userName: "用户一",
          roleName: "昵称一",
          area: "男",
          account: "15896741523",
          state: "启用",
          time: true,
          time: "2022-04-24",
        },
      ],
    };
  },
  methods: {
    /** 搜索 */
    searchEnterUser() {
      if (this.searchUser) {
        console.log(
          "%c搜索用户：",
          "color:red;font-size:18px;font-weight:bold;",
          this.searchUser
        );
      } else {
        console.log("%c没有值：", "color:red;font-size:18px;font-weight:bold;");
      }
    },
    /** 编辑用户操作 */
    amendUser(row) {
      this.$router.push({
        path: "/system/userInfo",
        query: {
          type: "edit",
          id: row.userId,
        },
      });
    },
    /** 删除用户操作 */
    deleteUser(row) {
      this.$confirm(
        '此操作将永久删除名为"' + row.userName + '"的用户，是否继续?',
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$message({
            type: "success",
            message: "删除成功!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    /** 启用用户操作 */
    enable(row) {
      this.$confirm('确认启用"' + row.userName + '"的用户账号?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已启用!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消启用",
          });
        });
    },
    /** 停用用户权限操作 */
    deactivate(row) {
      this.$confirm('确认停用"' + row.userName + '"的用户账号?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          this.$message({
            type: "success",
            message: "已停用!",
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消停用",
          });
        });
    },
    /** 新增用户操作 */
    addUser() {
      this.$router.push({
        path: "/system/userInfo",
        query: {
          type: "add",
        },
      });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.userPage {
  .el-card {
    height: 93vh;
  }
  .InfoBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
}
</style>