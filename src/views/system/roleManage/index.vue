<template>
  <div class="rolePage">
    <el-card shadow="always" class="el-card">
      <div class="InfoBar">
        <el-input
          style="width: 180px"
          placeholder="搜索已创建的角色"
          suffix-icon="el-icon-search"
          v-model.trim="queryParams.message"
          @keyup.enter.native="searchEnterRole"
          @click.native="searchEnterRole"
          size="mini"
          clearable
        >
        </el-input>
        <el-button
          class="addButtonGreen"
          type="primary"
          size="mini"
          @click="addRole()"
          plain
          >新增角色</el-button
        >
      </div>
      <el-table
        :data="roleData"
        style="width: 100%"
        :header-cell-style="{ background: '#EEEEEE' }"
      >
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleMsg" label="角色描述" />
        <el-table-column prop="createDate" label="注册时间" />
        <el-table-column label="操作" width="300">
          <template slot-scope="scope">
            <el-button @click="amendRole(scope.row)" type="text">
              编辑
            </el-button>
            <el-button @click="lookRole(scope.row)" type="text">
              <span style="color: #148f97"> 查看</span>
            </el-button>
            <el-button @click="deleteRole(scope.row)" type="text">
              <span style="color: #d72a13">删除</span>
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        style="margin-top: 25px; text-align: right"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="queryParams.page"
        :page-sizes="[5, 10, 15, 20]"
        :page-size="queryParams.size"
        layout="  prev, pager, next,sizes, jumper"
        :total="total"
      >
      </el-pagination>
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
            v-model.trim="roleForm.name"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleMsg">
          <el-input
            v-model.trim="roleForm.roleMsg"
            autocomplete="off"
            :disabled="formDisable"
          ></el-input>
        </el-form-item>
        <el-form-item label="功能权限" prop="authList">
          <div
            :class="this.roleTitle !== '查看角色' ? 'treeBox' : 'dis_treeBox'"
          >
            <div>
              <el-tree
                @check="checkBpxFn"
                :data="treeData"
                ref="asyncTree"
                show-checkbox
                node-key="id"
                :default-expanded-keys="[2, 3]"
                :default-checked-keys="roleForm.authList"
                :props="defaultProps"
              >
              </el-tree>
            </div>
          </div>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeRoleForm()" size="small">取 消</el-button>
        <el-button type="primary" size="small" @click="submitForm()"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
 
<script>
export default {
  //checkstate  1选中 0不选
  name: "UserManage",
  data() {
    return {
      queryParams: {
        page: 1,
        size: 10,
        message: "",
      },
      total: 0,
      roleData: [],
      dialogFormVisible: false,
      roleTitle: "新增角色",
      roleForm: {
        roleId: -1,
        name: "",
        roleMsg: "",
        authList: [],
      },
      treeData: [],
      defaultProps: {
        children: "ChildNodes",
        label: "name",
      },
      rules: {
        name: [
          { required: true, message: "请输入角色名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        roleMsg: [
          { required: true, message: "请填写角色描述", trigger: "blur" },
        ],
        // authList: [
        //   { required: true, message: "请选择功能权限", trigger: "change" },
        // ],
      },
      formDisable: false,
    };
  },
  created() {
    this.getRoleList();
    this.getTreeData();
  },
  watch: {
    dialogFormVisible(val) {
      if (!val) {
        this.$refs["roleForm"].clearValidate(["authList"]);
      }
    },
  },
  methods: {
    getTreeData() {
      this.$api.ROLE.roleMenu(this.roleForm.roleId).then((res) => {
        if (res.code === 200) {
          this.treeData = res.result;
        }
      });
    },
    /** 表格分页 */
    handleSizeChange(val) {
      this.queryParams.size = val;
      this.getRoleList();
    },
    handleCurrentChange(val) {
      this.queryParams.page = val;
      this.getRoleList();
    },
    /** 获取角色列表 */
    getRoleList() {
      this.$api.ROLE.roleList(this.queryParams).then((res) => {
        if (res.code === 200) {
          this.roleData = res.result.data;
          this.total = res.result.total;
        }
      });
    },
    /** 搜索 */
    searchEnterRole() {
      if (this.queryParams.message) {
        this.getRoleList();
      } else {
        this.queryParams.message = "";
        this.getRoleList();
      }
    },

    /** 删除角色操作 */
    deleteRole(row) {
      this.$confirm(
        "此操作将永久删除已创建角色，仍旧确定删除？",
        "确定要删除该角色？",
        {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        }
      )
        .then(() => {
          this.$api.ROLE.deleteRoleGet(row.roleId).then((res) => {
            if (res.code === 200) {
              this.$message({
                message: "已删除！",
                type: "success",
              });
              this.getRoleList();
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

    /** 修改角色操作 */
    amendRole(val) {
      this.dialogFormVisible = true;
      this.formDisable = false;
      this.roleTitle = "编辑角色";
      this.roleForm.name = val.roleName;
      this.roleForm.roleMsg = val.roleMsg;
      this.roleForm.roleId = val.roleId;
      //查看当前用户所拥有的菜单权限
      this.$api.ROLE.viewRoleInfo(this.roleForm.roleId).then((res) => {
        if (res.code === 200) {
          const recursive = (data, callback) => {
            data.forEach((v) => {
              callback(v);
              if (v.ChildNodes instanceof Array)
                recursive(v.ChildNodes, callback);
            });
          };
          const idArr = [];
          recursive(res.result, (d) => {
            if (d.checkstate == 1 && !idArr.includes(d.id)) idArr.push(d.id);
          });

          this.treeData = res.result;
          this.roleForm.authList = idArr;
        }
      });
    },
    /** 查看角色操作 */
    lookRole(val) {
      this.dialogFormVisible = true;
      // this.formDisable = true;
      this.roleTitle = "查看角色";
      this.roleForm.name = val.roleName;
      this.roleForm.roleMsg = val.roleMsg;
      this.roleForm.roleId = val.roleId;
      this.$api.ROLE.viewRoleInfo(this.roleForm.roleId).then((res) => {
        if (res.code === 200) {
          const recursiveLook = (data, callback) => {
            data.forEach((v) => {
              callback(v);
              if (v.ChildNodes instanceof Array)
                recursiveLook(v.ChildNodes, callback);
            });
          };
          const idArrLook = [];
          recursiveLook(res.result, (d) => {
            if (d.checkstate == 1 && !idArrLook.includes(d.id))
              idArrLook.push(d.id);
          });
          this.treeData = res.result;
          this.roleForm.authList = idArrLook;
        }
      });
    },

    /** 新增角色操作 */
    addRole() {
      this.getTreeData();
      this.roleForm.authList = [];
      this.dialogFormVisible = true;
      this.formDisable = false;
      this.roleTitle = "新增角色";
    },
    /** 弹窗操作 */
    closeRoleForm() {
      this.roleForm.roleId = -1;
      this.roleForm.name = "";
      this.roleForm.roleMsg = "";
      this.treeData = [];
      this.roleForm.authList = [];
      this.dialogFormVisible = false;
      this.$refs.roleForm.resetFields();
    },
    /** 拿到所有复选框选中的值 */
    checkBpxFn(val, num) {
      let checkdata = this.$refs.asyncTree.getCheckedNodes();
      let arr = [];
      for (var i = 0; i < checkdata.length; i++) {
        arr.push(checkdata[i].id);
      }
      this.removeByValue(arr, undefined);
      this.roleForm.authList = arr;
    },
    removeByValue(arr, val) {
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] == val) {
          arr.splice(i, 1);
          break;
        }
      }
    },
    submitForm() {
      this.$refs["roleForm"].validate((valid) => {
        if (valid) {
          if (this.roleTitle === "新增角色") {
            this.roleForm.roleId = "";
            this.$api.ROLE.addRole(this.roleForm).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: "角色新增成功！",
                  type: "success",
                });
                this.dialogFormVisible = false;
                this.getRoleList();
              }
            });
          } else if (this.roleTitle === "编辑角色") {
            this.$api.ROLE.updateRole(this.roleForm).then((res) => {
              if (res.code === 200) {
                this.$message({
                  message: "修改成功！",
                  type: "success",
                });
                this.dialogFormVisible = false;
                this.getRoleList();
              }
            });
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