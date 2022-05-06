<template>
  <div class="userPage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <el-button type="primary" size="small" @click="addUser()" plain
          >新增用户</el-button
        >
        <el-input
          style="width: 320px"
          placeholder="搜索用户"
          suffix-icon="el-icon-search"
          v-model.trim="queryParams.message"
          @keyup.enter.native="searchEnterUser"
          @click.native="searchEnterUser"
          size="small"
          clearable
        >
        </el-input>
      </div>
      <el-table :data="userData" style="width: 100%" border>
        <el-table-column prop="name" label="用户名称" />
        <el-table-column prop="roleName" label="角色" />
        <el-table-column prop="username" label="用户账号" />
        <el-table-column prop="status" label="用户状态">
          <template slot-scope="scope">
            {{ scope.row.status === "NORMAL" ? "正常" : "禁用" }}
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="注册时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="amendUser(scope.row)" type="text">
              编辑
            </el-button>
            <el-button @click="deleteUser(scope.row)" type="text">
              删除
            </el-button>
            <el-button
              @click="enable(scope.row, 'NORMAL')"
              type="text"
              v-if="scope.row.status === 'PROHIBIT'"
            >
              启用
            </el-button>
            <el-button
              @click="deactivate(scope.row, 'PROHIBIT')"
              type="text"
              v-if="scope.row.status === 'NORMAL'"
            >
              停用
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        style="margin-top: 25px; text-align: center"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.size"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
  </div>
</template>
 
<script>
import {
  userList,
  deleteUserGet,
  updateUserState,
} from "@/api/user";
export default {
  name: "UserManage",
  data() {
    return {
      queryParams: {
        page: 1,
        size: 10,
        message: "",
      },
      total: 0,
      userData: [],
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
      this.getUserList();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getUserList();
    },
    /** 获取用户列表 */
    getUserList() {
      userList(this.queryParams, window.sessionStorage.getItem("token")).then(
        (res) => {
          if (res.data.code === 200) {
            this.userData = res.data.result.data;
            this.total = res.data.result.total;
          }
        }
      );
    },
    /** 搜索 */
    searchEnterUser() {
      if (this.queryParams.message) {
        this.getUserList();
      } else {
        this.queryParams.message = "";
        this.getUserList();
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
        "此操作将永久删除名为" + row.name + " 的用户，是否继续?",
        "提示",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          deleteUserGet(
            row.userId,
            window.sessionStorage.getItem("token")
          ).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "已删除！",
                type: "success",
              });
              this.getUserList();
            }
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
    enable(row, sate) {
      let userState = {
        userId: row.userId,
        status: sate.toString(),
      };
      this.$confirm('确认启用"' + row.name + '"的用户账号?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateUserState(
            userState,
            window.sessionStorage.getItem("token")
          ).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "已启用！",
                type: "success",
              });
              this.getUserList();
            }
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
    deactivate(row, sate) {
      let userState = {
        userId: row.userId,
        status: sate.toString(),
      };
      this.$confirm('确认停用"' + row.name + '"的用户账号?', "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          updateUserState(
            userState,
            window.sessionStorage.getItem("token")
          ).then((res) => {
            if (res.data.code === 200) {
              this.$message({
                message: "已停用！",
                type: "success",
              });
              this.getUserList();
            }
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