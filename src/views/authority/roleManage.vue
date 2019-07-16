<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.roleManage') }}</p>
        <div class="content-spe-element">

          <!-- table-filter -->
          <ComponentFilter>
            <el-form slot="filterForm"
                     ref="filterFormData"
                     :model="filterFormData"
                     :inline="true"
                     label-width="90px"
                     class="demo-form-inline"
                     @submit.native.prevent>
              <el-form-item label="角色名："
                            prop="roleName">
                <el-input v-model="filterFormData.roleName"
                          placeholder="请输入角色名"
                          @keyup.enter.native="refreshTable"></el-input>
              </el-form-item>
              <el-form-item label="角色状态："
                            prop="roleStatus">
                <CustomSelect ref="roleStatusSelect"
                              :options="roleStatusOptions"
                              type="roleStatus"
                              default-selected=""
                              :is-all="true"
                              @selectChangeCallBack="handleParamsChange"></CustomSelect>
              </el-form-item>
              <el-form-item class="el-form-button">
                <el-button icon="el-icon-search"
                           size="mini"
                           type="primary"
                           plain
                           @click="refreshTable">查询
                </el-button>
                <el-button icon="el-icon-plus"
                           size="mini"
                           type="success"
                           plain>新增
                  <!-- @click="insert" -->
                </el-button>
                <el-button icon="el-icon-refresh"
                           size="mini"
                           type="warning"
                           plain
                           @click="clear">清空
                </el-button>
              </el-form-item>
            </el-form>
          </ComponentFilter>

          <!-- table-content -->
          <div class="table-content">

            <!-- header -->
            <div class="table-content-header">
              <i class="el-icon-d-arrow-right"
                 style="font-size:16px"></i>
              <span>角色列表</span>
              <div class="table-content-header-search">
              </div>
            </div>

            <!-- content -->
            <div class="table-content-spe">
              <el-table v-loading="tableDataLoading"
                        stripe
                        fit
                        border
                        highlight-current-row
                        :data="roleList"
                        tooltip-effect="dark"
                        element-loading-text="数据加载中"
                        element-loading-spinner="el-icon-loading"
                        @selection-change="handleSelectionChange">
                <el-table-column width="40"
                                 type="selection"
                                 align="center">
                </el-table-column>

                <!-- treeColumns -->
                <el-table-column v-for="(column, index) in treeColumns"
                                 :key="index"
                                 :prop="column.prop"
                                 :label="column.label"
                                 :width="column.width?column.width:''"
                                 :min-width="column.minWidth?column.minWidth:''"
                                 :sortable="column.sortable"
                                 align="center">
                </el-table-column>

                <!-- 状态：edit & update -->
                <el-table-column label="状态"
                                 align="center"
                                 min-width="60">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.roleStatus"
                               active-value="1"
                               inactive-value="0"
                               @change="handleSwitchChange(scope.row)">
                    </el-switch>
                  </template>
                </el-table-column>

                <!-- 角色 -->
                <el-table-column label="权限"
                                 align="center"
                                 min-width="350">
                  <template slot-scope="scope">
                    <el-tag v-for="item in scope.row.canOperatePage['权限']"
                            :key="item.value"
                            :disable-transitions="true">{{ item }}
                    </el-tag>
                  </template>
                </el-table-column>

                <!-- 操作 -->
                <el-table-column label="操作"
                                 align="center"
                                 fixed="right"
                                 min-width="150">
                  <template slot-scope="scope">
                    <el-tooltip content="编辑"
                                placement="left">
                      <el-button plain
                                 icon="el-icon-edit"
                                 size="mini"
                                 type="primary"
                                 @click="update(scope.row)"></el-button>
                    </el-tooltip>
                    <Button style="marginLeft:10px"
                            plain
                            tooltip
                            icon="el-icon-delete"
                            size="mini"
                            type="danger"
                            placement="right"
                            content="删除"
                            @click="del(scope.row)"></Button>

                  </template>
                </el-table-column>
              </el-table>
            </div>

            <!-- page -->
            <div class="table-content-page">
              <el-row>
                <!-- 批量操作 -->
                <el-col :sm="24"
                        :md="12"
                        :lg="8">
                  <el-select v-model="batchFilterData"
                             class="table-content-page-batch"
                             placeholder="批量操作">
                    <el-option key="delete"
                               label="批量删除"
                               value="delete">
                    </el-option>
                  </el-select>
                  <el-button size="mini"
                             type="primary"
                             plain
                             class="table-content-page-search"
                             @click="batcthExecute()">确定</el-button>
                </el-col>

                <!--分页-->
                <el-col :lg="16"
                        class="table-content-page-pagination hidden-md-and-down">
                  <el-pagination @size-change="handleSizeChange"
                                 @current-change="handlePageChange"
                                 :page-sizes="[10, 20, 30, 40, 50, 100]"
                                 :page-size="10"
                                 :pager-count="5"
                                 layout="total, sizes, prev, pager, next, jumper"
                                 :total="roleListAll.length">
                  </el-pagination>
                </el-col>
                <el-col :md="12"
                        class="table-content-page-pagination hidden-lg-and-up hidden-sm-and-down">
                  <el-pagination @size-change="handleSizeChange"
                                 @current-change="handlePageChange"
                                 :page-size="10"
                                 :pager-count="5"
                                 layout="prev, pager, next"
                                 :total="roleListAll.length">
                  </el-pagination>
                </el-col>
                <el-col :sm="24"
                        class="table-content-page-pagination hidden-md-and-up">
                  <el-pagination @size-change="handleSizeChange"
                                 @current-change="handlePageChange"
                                 :page-size="10"
                                 :pager-count="5"
                                 layout="prev, pager, next"
                                 :total="roleListAll.length">
                  </el-pagination>
                </el-col>
              </el-row>

            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 角色编辑dialog -->
    <el-dialog :visible.sync="dialogVisible"
               :title="dialogTitle">
      <el-form v-model="roleForm"
               label-width="80px"
               @submit.native.prevent>
        <el-form-item label="角色名">
          <el-input v-model="roleForm.roleName"></el-input>
        </el-form-item>
        <el-form-item label="角色标识">
          <el-input v-model="roleForm.roleKey"></el-input>
        </el-form-item>
        <el-form-item label="角色权限">
          <CheckBoxTree :check-box-items="checkBoxItems"
                        :default-checked-keys="defaultCheckedKeys"
                        :defaultExpandedKeys="defaultExpandedKeys"
                        ref="CheckBoxTree"
                        @checkNodes="checkNodesChange"
                        @addCheckNodes="addCheckNodes"
                        @minCheckNodes="minCheckNodes"></CheckBoxTree>
        </el-form-item>
      </el-form>
      <span slot="footer"
            class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="dialogSubmit">确 定</el-button>
      </span>
    </el-dialog>

  </div>

</template>

<script>
// function
import { computedCheckTree } from "@/components/Tree/computedCheckTree.js";
// components
import ComponentFilter from "@/components/ComponentFilter";
import CustomSelect from "@/components/ComponentSelect/select";
import Button from "@/components/Authority/authorityButton";
import CheckBoxTree from "@/components/Tree/checkBoxTree";
// api
import { getRoleList, updateRole, deleteRole } from "@/api/authority/role.js";

export default {
  name: "UserManage",
  components: {
    CustomSelect,
    ComponentFilter,
    Button,
    CheckBoxTree
  },
  data() {
    return {
      // loading
      tableDataLoading: false,
      // 表格原始数据
      tableData: {},
      // 角色list数据 - 筛选后所有
      roleListAll: [],
      // 角色list数据 - 当前页面
      roleList: [],
      // 表格列项
      treeColumns: [
        {
          prop: "roleName",
          label: "角色名",
          minWidth: 150,
          sortable: true
        },
        {
          prop: "roleKey",
          label: "角色标识",
          minWidth: 150,
          sortable: true
        }
      ],
      // 初始化页码
      pageNum: 1,
      // 初始化每页显示数量
      pageSize: 10,
      // 筛选
      filterFormData: {
        roleName: "",
        roleStatus: ""
      },
      // 顶部筛选项
      roleStatusOptions: [
        {
          label: "有效",
          value: 1
        },
        {
          label: "冻结",
          value: 0
        }
      ],
      // 批量操作筛选
      batchFilterData: "",
      // 选项发生改变
      multipleSelection: [],
      // dialog显示与否
      dialogVisible: false,
      // dialog标题
      dialogTitle: "",
      // row表单数据
      roleForm: {},
      // row表单checkBox数据 - 全部
      checkBoxItems: [],
      // row表单checkBox数据 - 默认选中项
      defaultCheckedKeys: [],
      // row表单checkBox数据 - 默认展开项
      defaultExpandedKeys: [
        "1-1-1",
        "1-1-2",
        "1-1-3",
        "1-1-4",
        "1-2-1",
        "1-2-2",
        "1-2-3",
        "1-2-4",
        "1-3-1",
        "1-3-2",
        "1-3-3",
        "1-3-4",
        "1-4-1",
        "1-4-2",
        "1-4-3",
        "1-4-4"
      ],
      // row表单checkBox数据 - 被选中的选项回调
      checkNodes: [],
      checkNodesAdd: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 表格数据初始化
    async init() {
      this.tableData = (await getRoleList(this)).data.tableData;
      this.tableData.list.forEach(row => {
        this.$set(
          row,
          "canOperatePages",
          computedCheckTree(row.canOperatePage)
        );
      });
      // console.log(this.tableData.list);
      this.refreshTable();
      this.tableDataLoading = false;
    },
    // 顶部筛选
    handleParamsChange(value) {
      switch (value.type) {
        case "roleStatus":
          this.filterFormData.roleStatus = value.value;
          break;
      }
      this.refreshTable();
    },
    // 根据条件渲染页面数据
    refreshTable() {
      // 全部符合筛选条件的角色 -> 计总数用
      this.roleListAll = this.tableData.list.filter(row => {
        if (
          row.roleName.indexOf(this.filterFormData.roleName) > -1 &&
          row.roleStatus.indexOf(this.filterFormData.roleStatus.toString()) > -1
        ) {
          return row;
        }
      });
      // 在页面要显示的角色
      this.roleList = this.roleListAll.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    // 清空筛选
    clear() {
      this.filterFormData = {
        roleName: "",
        roleStatus: ""
      };
      this.$refs.roleStatusSelect.handleSelectChange("");
      this.refreshTable();
    },
    // 分页-跳页
    handlePageChange(pageNum) {
      this.pageNum = pageNum;
      this.refreshTable();
    },
    // 分页-改变页显示数
    handleSizeChange(pageSize) {
      this.pageSize = pageSize;
      this.refreshTable();
    },
    // 行内更新角色状态
    async handleSwitchChange(row) {
      const resultMessage = (await updateRole(row)).data.message;
      // 前端虚拟更新操作 -> 将选中row的roleStatus更新为新的row.roleStatus
      this.$set(row, "roleStatus", row.roleStatus);
      this.getResultMessage(resultMessage);
    },
    // 打开dialog更新角色信息
    update(row) {
      this.roleForm = row;
      this.dialogTitle = row.roleName;
      this.checkBoxItems = row.canOperatePages;
      // console.log(this.checkBoxItems);
      this.defaultCheckedKey();
      this.dialogVisible = true;
    },
    // 预处理角色checkBox选项树 - 默认选中项
    defaultCheckedKey() {
      this.defaultCheckedKeys = [];
      this.checkBoxItems.forEach(item => {
        item.children.forEach(child => {
          child.children.forEach(child => {
            if (
              child.check === true &&
              this.defaultCheckedKeys.indexOf(child.id) === -1
            ) {
              this.defaultCheckedKeys.push(child.id);
            }
          });
        });
      });
    },
    // CheckBoxTree组件传递方法 - 选项被选中/取消选中
    checkNodesChange(data) {
      // 选出非祖父的父节点 -> 若该节点被选中则存入checkNodes数组
      const checkNodes = [];
      data.forEach((node, i) => {
        if (node.children !== undefined) {
          if (node.children[0].children === undefined) {
            checkNodes.push(node.label);
          }
        }
      });
      // console.log(checkNodes);
      this.checkNodes = checkNodes;
    },
    // CheckBoxTree组件传递方法 - 新增被选中的选项
    addCheckNodes(data) {
      this.checkNodesAdd.push(data);
    },
    // CheckBoxTree组件传递方法 - 从checkNodesAdd中删除被取消的选项
    minCheckNodes(data) {
      this.checkNodesAdd.forEach((node, i) => {
        if (node.id === data.id) {
          this.checkNodesAdd.splice(i, 1);
        }
      });
      // console.log(this.checkNodesAdd);
    },
    // 表单按钮 - 确认
    async dialogSubmit() {
      const resultMessage = (await updateRole(this.roleForm)).data.message;
      this.roleList.forEach(role => {
        // 1.设置被选中的非祖父父节点
        if (role.roleName === this.roleForm.roleName) {
          role.canOperatePage["权限"] = this.checkNodes;
          this.$set(
            role,
            "canOperatePages",
            computedCheckTree(role.canOperatePage)
          );
          // 2.根据checkNodesAdd - 找到相对应的选项 - 设置节点的check为true
          this.checkNodesAdd.forEach(node => {
            // console.log(node);
            role.canOperatePages.forEach(page => {
              page.children.forEach(item => {
                if (item.label === node.parent) {
                  // console.log(item);
                  item.children.forEach(el => {
                    if (el.label === node.label) {
                      el.check = true;
                    }
                  });
                }
              });
            });
          });
        }
      });
      this.getResultMessage(resultMessage);
      this.dialogVisible = false;
    },
    // 按钮 - 删除
    async del(row) {
      const res = await this.$confirm("确认删除该角色吗？", "提示", {
        type: "warning"
      }).catch(() => {});
      if (res === "confirm") {
        // 前端虚拟删除操作 -> 根据row的下标删除该row
        const resultMessage = (await deleteRole(row)).data.message;
        const index = this.tableData.list.indexOf(row);
        this.tableData.list.splice(index, 1);
        this.refreshTable();
        this.getResultMessage(resultMessage);
      }
    },
    // 选项发生变化 - 左下多选
    handleSelectionChange(value) {
      this.multipleSelection = value;
    },
    // 批量操作数据
    async batcthExecute() {
      // 将选择的数据放在delCodes数组中
      const delCodes = [];
      for (const select of this.multipleSelection) {
        delCodes.push(select.userCode);
      }
      // 如果没有选择数据
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: "warning",
          message: "请选择数据！"
        });
        return;
      } else if (this.batchFilterData === "") {
        // 如果没有选择操作
        this.$message({
          type: "warning",
          message: "请选择批处理操作！"
        });
        return;
      } else if (this.batchFilterData === "delete") {
        // 如果选择 "批量删除"
        const res = await this.$confirm("确认删除？", "提示", {
          type: "warning"
        }).catch(() => {});
        if (res === "confirm") {
          // 前端虚拟批量删除操作 -> 给multipleSelection里的每个row做单独删除
          this.multipleSelection.forEach(async row => {
            await deleteRole();
            const index = this.tableData.list.indexOf(row);
            this.tableData.list.splice(index, 1);
            this.refreshTable();
          });
          this.getResultMessage("删除成功！");
        }
      }
    },
    // 回显message数据
    getResultMessage(resultMessage) {
      this.$message({
        message: resultMessage,
        type: "success"
      });
    }
  },
  watch: {
    $route(to, from) {
      this.init();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "../../styles/smart-ui/smart-ui.scss";
.container /deep/ {
  .el-form {
    .el-form-item__content {
      overflow-x: auto;
      overflow-y: hidden;
    }
  }
}
</style>
