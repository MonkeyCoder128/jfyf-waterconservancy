<template>
  <el-row :gutter="12">
    <el-col :span="24">
      <el-card shadow="always" class="el-card">
        <div class="userPage">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="用户管理" name="first">
              <el-table :data="userList" style="width: 100%">
                <el-table-column prop="userName" label="用户姓名" />
                <el-table-column prop="nickName" label="用户昵称" />
                <el-table-column prop="gender" label="性别" />
                <el-table-column prop="mobile" label="手机号码" />
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.omit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="amendUser(scope.row)" type="text">
                      修改
                    </el-button>
                    <el-button @click="deleteUser(scope.row)" type="text">
                      删除
                    </el-button>
                    <el-button @click="resetUser(scope.row)" type="text">
                      重置
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="权限管理" name="second">
              <el-table :data="powerList" style="width: 100%">
                <el-table-column prop="name" label="角色名称" />
                <el-table-column prop="code" label="角色标识" />
                <el-table-column label="状态">
                  <template slot-scope="scope">
                    <el-switch
                      v-model="scope.row.omit"
                      active-color="#13ce66"
                      inactive-color="#ff4949"
                    >
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column prop="createdAt" label="创建时间" />
                <el-table-column label="操作">
                  <template slot-scope="scope">
                    <el-button @click="amendPower(scope.row)" type="text">
                      修改
                    </el-button>
                    <el-button @click="deletePower(scope.row)" type="text">
                      删除
                    </el-button>
                    <el-button @click="resetPower(scope.row)" type="text">
                      添加用户
                    </el-button>
                    <el-button @click="regulatePower(scope.row)" type="text">
                      功能权限
                    </el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-tab-pane>
            <el-tab-pane label="水库管理" name="third">水库管理</el-tab-pane>
          </el-tabs>
        </div>
      </el-card>
    </el-col>
  </el-row>
</template>
 
<script>
export default {
  name: "UserManage",
  data() {
    return {
      activeName: "first",
      userList: [
        {
          userName: "用户一",
          nickName: "昵称一",
          gender: "男",
          mobile: "15896741523",
          omit: true,
        },
        {
          userName: "用户一",
          nickName: "昵称一",
          gender: "男",
          mobile: "15896741523",
          omit: true,
        },
        {
          userName: "用户一",
          nickName: "昵称一",
          gender: "男",
          mobile: "15896741523",
          omit: true,
        },
      ],
      powerList: [
        {
          name: "角色名称",
          code: "角色标识",
          omit: true,
          createdAt: "2020-06-11 11:54:47",
        },
        {
          name: "角色名称",
          code: "角色标识",
          omit: true,
          createdAt: "2020-06-11 11:54:47",
        },
        {
          name: "角色名称",
          code: "角色标识",
          omit: true,
          createdAt: "2020-06-11 11:54:47",
        },
        {
          name: "角色名称",
          code: "角色标识",
          omit: true,
          createdAt: "2020-06-11 11:54:47",
        },
      ],
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    /** 修改用户操作 */
    amendUser() {
      console.log("%c修改用户：", "color:red;font-size:18px;font-weight:bold;");
    },
    /** 删除用户操作 */
    deleteUser(row) {
      this.$confirm(
        '是否确认删除用户名为"' + row.userName + '"的数据项?',
        "警告",
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
    /** 重置用户操作 */
    resetUser() {
      console.log("%c重置用户：", "color:red;font-size:18px;font-weight:bold;");
    },

    /** 修改权限操作 */
    amendPower() {
      console.log("%c修改用户：", "color:red;font-size:18px;font-weight:bold;");
    },
    /** 删除权限操作 */
    deletePower(row) {
      this.$confirm('是否确认删除用户名为"' + row.name + '"的数据项?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
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
    /** 添加权限操作 */
    resetPower() {
      console.log("%c添加权限：", "color:red;font-size:18px;font-weight:bold;");
    },
    /** 功能权限操作 */
    regulatePower() {
      console.log(
        "%c功能权限控制：",
        "color:red;font-size:18px;font-weight:bold;"
      );
    },
  },
};
</script>
 
<style  lang="scss" scoped>
  .el-card{
    height: 93vh;
  }
.userPage {
}
</style>