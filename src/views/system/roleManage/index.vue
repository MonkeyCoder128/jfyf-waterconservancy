<template>
  <div class="rolePage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <el-button type="primary" size="mini" @click="addRole()" plain
          >新增角色</el-button
        >
        <el-input
          style="width: 320px"
          placeholder="搜索已创建的角色"
          suffix-icon="el-icon-search"
          v-model="searchRole"
          @keyup.enter.native="searchEnterRole"
          @click.native="searchEnterRole"
          size="mini"
          clearable
        >
        </el-input>
      </div>
      <el-table :data="roleList" style="width: 100%" border>
        <el-table-column prop="userName" label="角色名称" />
        <el-table-column prop="nickName" label="角色描述" />
        <el-table-column prop="time" label="注册时间" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button @click="amendRole(scope.row)" type="text">
              编辑
            </el-button>
            <el-button @click="lookRole(scope.row)" type="text">
              查看
            </el-button>
            <el-button @click="deleteRole(scope.row)" type="text">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
    <!-- 新增角色弹窗 -->
    <el-dialog
      :title="roleTitle"
      :before-close="closeRoleForm"
      :close-on-click-modal="false"
      :visible.sync="dialogFormVisible"
    >
      <el-form
        :model="roleForm"
        :rules="rules"
        ref="roleForm"
        label-width="120px"
      >
        <el-form-item label="角色名称" prop="name">
          <el-input
            v-model="roleForm.name"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="describe">
          <el-input
            v-model="roleForm.describe"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="功能权限" prop="permission">
          <div
            :class="this.roleTitle !== '查看角色' ? 'treeBox' : 'dis_treeBox'"
          >
            <div>
              <el-tree
                :data="treeData"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="[5]"
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRoleForm()" size="mini">取 消</el-button>
        <el-button type="primary" size="mini" @click="submitForm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  name: "UserManage",
  data() {
    return {
      searchRole: "",
      roleList: [
        {
          userName: "巡检员",
          nickName: "水坝巡检员",
          time: "2022-04-24",
        },
        {
          userName: "站长",
          nickName: "水坝站长",
          time: "2022-04-24",
        },
      ],
      dialogFormVisible: false,
      roleTitle: "新增角色",
      roleForm: {
        name: "",
        describe: "",
        permission: [1, 2],
      },
      treeData: [
        {
          id: 1,
          label: "一级 1",
          children: [
            {
              id: 4,
              label: "二级 1-1",
              children: [
                {
                  id: 9,
                  label: "三级 1-1-1",
                },
                {
                  id: 10,
                  label: "三级 1-1-2",
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: "一级 2",
          children: [
            {
              id: 5,
              label: "二级 2-1",
            },
            {
              id: 6,
              label: "二级 2-2",
            },
          ],
        },
        {
          id: 3,
          label: "一级 3",
          children: [
            {
              id: 7,
              label: "二级 3-1",
            },
            {
              id: 8,
              label: "二级 3-2",
            },
          ],
        },
      ],
      defaultProps: {
        children: "children",
        label: "label",
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        describe: [
          { required: true, message: "请填写角色描述", trigger: "blur" },
        ],
        permission: [
          { required: true, message: "请选择功能权限", trigger: "change" },
        ],
      },
      formDisable: false,
    };
  },
  methods: {
    /** 搜索 */
    searchEnterRole() {
      if (this.searchRole) {
        console.log(
          "%c搜索角色：",
          "color:red;font-size:18px;font-weight:bold;",
          this.searchRole
        );
      } else {
        console.log("%c没有值：", "color:red;font-size:18px;font-weight:bold;");
      }
    },

    /** 删除角色操作 */
    deleteRole(row) {
      this.$confirm(
        '此操作将永久删除名为"' + row.userName + '"的角色，是否继续?',
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
    /** 修改角色操作 */
    amendRole() {
      this.dialogFormVisible = true;
      this.formDisable = false;
      this.roleTitle = "编辑角色";
      console.log("%c修改角色：", "color:red;font-size:18px;font-weight:bold;");
    },
    /** 查看角色操作 */
    lookRole() {
      this.dialogFormVisible = true;
      this.formDisable = true;
      this.roleTitle = "查看角色";
      console.log("%c查看角色：", "color:red;font-size:18px;font-weight:bold;");
    },

    /** 新增角色操作 */
    addRole() {
      this.dialogFormVisible = true;
      this.formDisable = false;
      this.roleTitle = "新增角色";
    },
    /** 弹窗操作 */
    closeRoleForm() {
      this.$refs.roleForm.resetFields();
      this.dialogFormVisible = false;
      console.log(
        "%c清空：",
        "color:red;font-size:18px;font-weight:bold;",
        this.roleForm
      );
    },
    submitForm() {
      this.$refs["roleForm"].validate((valid) => {
        if (valid) {
          if (this.roleTitle === "新增角色") {
            console.log(
              "%c提交新增：",
              "color:red;font-size:18px;font-weight:bold;",
              this.roleForm
            );
          } else if (this.roleTitle === "编辑角色") {
            console.log(
              "%c提交编辑：",
              "color:red;font-size:18px;font-weight:bold;",
              this.roleForm
            );
          }
        } else {
          return false;
        }
      });
    },
  },
};
</script>
 
<style  lang="scss" scoped>
.rolePage {
  .el-card {
    height: 93vh;
  }
  .InfoBar {
    display: flex;
    justify-content: space-between;
    margin-bottom: 20px;
  }
  .treeBox {
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    div {
      padding: 5px 0px;
    }
  }
  .dis_treeBox {
    cursor: not-allowed;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    div {
      padding: 5px 0px;
      pointer-events: none;
      background-color: #f5f7fa;
      .el-tree {
        position: relative;
        cursor: default;
        color: #606266;
        background-color: #f5f7fa;
      }
    }
  }
}
</style>