<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">{{ $t('route.userManage') }}</p>
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
              <el-form-item label="用户名："
                            prop="userName">
                <el-input v-model="filterFormData.userName"
                          placeholder="请输入用户名"
                          @keyup.enter.native="refreshTable"></el-input>
              </el-form-item>
              <el-form-item label="用户手机："
                            prop="userMobile">
                <el-input v-model="filterFormData.userMobile"
                          placeholder="请输入内容"
                          @keyup.enter.native="refreshTable"></el-input>
              </el-form-item>
              <el-form-item label="用户状态："
                            prop="userStatus">
                <CustomSelect ref="userStatusSelect"
                              :options="userStatusOptions"
                              type="userStatus"
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
              <span>用户列表</span>
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
                        :data="userList"
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

                <!-- 地址：edit & update -->
                <el-table-column label="地址"
                                 align="center"
                                 min-width="350">

                  <template slot-scope="scope">
                    <!-- 非编辑状态 -->
                    <span v-if="scope.row.edit === false">
                      {{ scope.row.userAddress }}
                      <i class="el-icon-edit edit"
                         @click="scope.row.edit = !scope.row.edit"></i>
                    </span>
                    <!-- 编辑状态 -->
                    <span v-else>
                      <el-input class="address-input-inline"
                                v-model="scope.row.userAddress"></el-input>
                      <i class="el-icon-check check"
                         @click="editInline(scope.row)"></i>
                      <i class="el-icon-close close"
                         @click="scope.row.edit = !scope.row.edit"></i>
                    </span>
                  </template>
                </el-table-column>

                <!-- 状态：edit & update -->
                <el-table-column label="状态"
                                 align="center"
                                 min-width="60">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.userStatus"
                               active-value="1"
                               inactive-value="0"
                               @change="handleSwitchChange(scope.row)">
                    </el-switch>
                  </template>
                </el-table-column>

                <!-- 角色 -->
                <el-table-column label="角色"
                                 align="center"
                                 min-width="360">
                  <template slot-scope="scope">
                    <el-tag v-for="item in scope.row.userRoles"
                            :key="item.value"
                            :disable-transitions="true">{{ item.roleName }}
                    </el-tag>
                  </template>
                </el-table-column>

                <!-- 头像 -->
                <el-table-column label="头像"
                                 align="center"
                                 width="50">
                  <template slot-scope="scope">
                    <img v-if="scope.row.userAvatar!=='' && scope.row.userAvatar!==undefined"
                         :src="scope.row.userAvatar"
                         width="30"
                         height="30">
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
                                 :total="userListAll.length">
                  </el-pagination>
                </el-col>
                <el-col :md="12"
                        class="table-content-page-pagination hidden-lg-and-up hidden-sm-and-down">
                  <el-pagination @size-change="handleSizeChange"
                                 @current-change="handlePageChange"
                                 :page-size="10"
                                 :pager-count="5"
                                 layout="prev, pager, next"
                                 :total="userListAll.length">
                  </el-pagination>
                </el-col>
                <el-col :sm="24"
                        class="table-content-page-pagination hidden-md-and-up">
                  <el-pagination @size-change="handleSizeChange"
                                 @current-change="handlePageChange"
                                 :page-size="10"
                                 :pager-count="5"
                                 layout="prev, pager, next"
                                 :total="userListAll.length">
                  </el-pagination>
                </el-col>
              </el-row>

            </div>
          </div>

        </div>
      </div>
    </div>

    <!-- 用户编辑dialog -->
    <el-dialog :visible.sync="dialogVisible"
               title="编辑用户">
      <el-form v-model="userForm">
        <el-form-item label="用户名"
                      label-width="200px">
          <el-input v-model="userForm.userName"></el-input>
        </el-form-item>
        <el-form-item label="活动区域"
                      label-width="200px">
          <el-select v-model="userForm.userName"
                     placeholder="请选择活动区域">
            <el-option label="区域一"
                       value="shanghai"></el-option>
            <el-option label="区域二"
                       value="beijing"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
    </el-dialog>

  </div>

</template>

<script>
// components
import ComponentFilter from '@/components/ComponentFilter';
import CustomSelect from '@/components/ComponentSelect/select';
import Button from '@/components/Authority/authorityButton';
// api
import { getUserList, updateUser, deleteUser } from '@/api/authority/user.js';

export default {
  name: 'UserManage',
  components: {
    CustomSelect,
    ComponentFilter,
    Button
  },
  data() {
    return {
      // loading
      tableDataLoading: false,
      // 表格原始数据
      tableData: {},
      // 用户list数据 - 筛选后所有
      userListAll: [],
      // 用户list数据 - 当前页面
      userList: [],
      // 表格列项
      treeColumns: [
        {
          prop: 'userName',
          label: '用户名',
          minWidth: 150,
          sortable: true
        },
        {
          prop: 'userNickName',
          label: '姓名',
          minWidth: 100,
          sortable: true
        },
        {
          prop: 'userMobile',
          label: '手机号',
          minWidth: 120,
          sortable: true
        },
        {
          prop: 'userMail',
          label: '邮箱',
          minWidth: 180
        }
      ],
      // 初始化页码
      pageNum: 1,
      // 初始化每页显示数量
      pageSize: 10,
      // 筛选
      filterFormData: {
        userName: '',
        userMobile: '',
        userStatus: ''
      },
      // 顶部筛选项
      userStatusOptions: [
        {
          label: '有效',
          value: 1
        },
        {
          label: '冻结',
          value: 0
        }
      ],
      // 批量操作筛选
      batchFilterData: '',
      // 选项发生改变
      multipleSelection: [],
      // dialog显示与否
      dialogVisible: false,
      userForm: {}
    };
  },
  created() {
    this.init();
  },
  methods: {
    // 表格数据初始化
    async init() {
      this.tableData = (await getUserList(this)).data.tableData;
      this.tableData.list.map(row => {
        this.$set(row, 'edit', false);
        return row;
      });
      this.refreshTable();
      this.tableDataLoading = false;
    },
    // 顶部筛选
    handleParamsChange(value) {
      switch (value.type) {
        case 'userStatus':
          this.filterFormData.userStatus = value.value;
          break;
      }
      this.refreshTable();
    },
    // 根据条件渲染页面数据
    refreshTable() {
      // 全部符合筛选条件的用户 -> 计总数用
      this.userListAll = this.tableData.list.filter(row => {
        if (
          row.userName.indexOf(this.filterFormData.userName) > -1 &&
          row.userMobile.indexOf(this.filterFormData.userMobile) > -1 &&
          row.userStatus.indexOf(this.filterFormData.userStatus.toString()) > -1
        ) {
          return row;
        }
      });
      // 在页面要显示的用户
      this.userList = this.userListAll.slice(
        (this.pageNum - 1) * this.pageSize,
        this.pageNum * this.pageSize
      );
    },
    // 清空筛选
    clear() {
      this.filterFormData = {
        userName: '',
        userMobile: '',
        userStatus: ''
      };
      this.$refs.userStatusSelect.handleSelectChange('');
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
    // 行内更新用户状态
    async handleSwitchChange(row) {
      const resultMessage = (await updateUser(row)).data.message;
      // 前端虚拟更新操作 -> 将选中row的userStatus更新为新的row.userStatus
      this.$set(row, 'userStatus', row.userStatus);
      this.getResultMessage(resultMessage);
    },
    // 行内更新用户信息
    async editInline(row) {
      const resultMessage = (await updateUser(row)).data.message;
      // 前端虚拟更新操作 -> 将选中row的userAddress更新为新的row.userAddress
      this.$set(row, 'userAddress', row.userAddress);
      this.getResultMessage(resultMessage);
      row.edit = !row.edit;
    },
    // 打开dialog更新用户信息
    update(row) {
      this.dialogVisible = true;
      this.userForm = row;
    },
    // 按钮 - 删除
    async del(row) {
      const res = await this.$confirm('确认删除该用户吗？', '提示', {
        type: 'warning'
      }).catch(() => {});
      if (res === 'confirm') {
        // 前端虚拟删除操作 -> 根据row的下标删除该row
        const resultMessage = (await deleteUser(row)).data.message;
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
          type: 'warning',
          message: '请选择数据！'
        });
        return;
      } else if (this.batchFilterData === '') {
        // 如果没有选择操作
        this.$message({
          type: 'warning',
          message: '请选择批处理操作！'
        });
        return;
      } else if (this.batchFilterData === 'delete') {
        // 如果选择 "批量删除"
        const res = await this.$confirm('确认删除？', '提示', {
          type: 'warning'
        }).catch(() => {});
        if (res === 'confirm') {
          // 前端虚拟批量删除操作 -> 给multipleSelection里的每个row做单独删除
          this.multipleSelection.forEach(async row => {
            await deleteUser();
            const index = this.tableData.list.indexOf(row);
            this.tableData.list.splice(index, 1);
            this.refreshTable();
          });
          this.getResultMessage('删除成功！');
        }
      }
    },
    // 回显message数据
    getResultMessage(resultMessage) {
      this.$message({
        message: resultMessage,
        type: 'success'
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
</style>
