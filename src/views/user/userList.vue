<template>
  <div class="container">

    <!-- 页内容 -->
    <div class="content">
      <!-- 表格 -->
      <div class="content-spe">
        <p class="content-spe-title">用户列表</p>
        <div class="content-spe-element">

          <!-- 表格筛选 -->
          <ComponentFilter>
            <el-form slot="filterForm"
                     :model="filterFormData"
                     ref="filterFormData"
                     label-width="70px"
                     label-position="left">
              <el-form-item label="用户名："
                            prop="userName">
                <el-input v-model="filterFormData.userName"
                          @keyup.enter.native="refreshTable"
                          placeholder="请输入用户名"></el-input>
              </el-form-item>
              <el-form-item label="用户手机："
                            prop="userMobile">
                <el-input v-model="filterFormData.userMobile"
                          @keyup.enter.native="refreshTable"
                          placeholder="请输入内容"></el-input>
              </el-form-item>
              <el-form-item label="用户状态："
                            prop="userStatus">
                <!-- <component-select type="enable"
                                  defaultSelected=""
                                  isAll=true
                                  model="center"></component-select> -->
                <!-- @selectChangeCallBack="handleParamsChange" -->
              </el-form-item>
            </el-form>
            <el-button slot="refreshTable"
                       icon="el-icon-search"
                       size="mini"
                       type="primary"
                       plain
                       @click="refreshTable">查询
            </el-button>
            <el-button slot="insert"
                       class="buttonNewTableData"
                       icon="el-icon-plus"
                       size="mini"
                       type="success"
                       plain>新增
              <!-- @click="insert" -->
            </el-button>
          </ComponentFilter>

          <!-- 表格内容 -->
          <div class="table-content">
            <div class="table-content-header">
              <i class="el-icon-d-arrow-right"
                 style="font-size:16px"></i>
              <span>用户列表</span>
              <div class="table-content-header-search">
              </div>
            </div>
            <div class="table-content-spe">
              <el-table stripe
                        fit
                        border
                        ref="multipleTable"
                        tooltip-effect="dark"
                        :data="userData"
                        v-loading="tableDataLoading"
                        element-loading-text="数据加载中"
                        element-loading-spinner="el-icon-loading"
                        @selection-change="handleSelectionChange">
                <!-- @sort-change="handleSortChange" -->
                <el-table-column width="50"
                                 type="selection"
                                 align="center">
                </el-table-column>
                <!-- <el-table-column label="id"
                                 align="center"
                                 prop="userId"
                                 width="50">
                </el-table-column> -->
                <el-table-column label="用户名"
                                 align="center"
                                 prop="userName"
                                 width="150"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="中文名"
                                 align="center"
                                 prop="userNickName"
                                 width="150"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="手机"
                                 align="center"
                                 prop="userMobile"
                                 width="150"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="邮箱"
                                 align="center"
                                 prop="userMail"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="地址"
                                 align="center"
                                 prop="userAddress"
                                 sortable="custom">
                </el-table-column>
                <el-table-column label="用户状态"
                                 align="center"
                                 width="80">
                  <template slot-scope="scope">
                    <el-switch v-model="scope.row.userStatus"
                               :active-value="1"
                               :inactive-value="0"
                               @change="handleSwitchChange(scope.row)">
                    </el-switch>
                  </template>
                </el-table-column>
                <el-table-column label="权限"
                                 align="center"
                                 min-width="150">
                  <template slot-scope="scope">
                    <el-tag v-for="item in scope.row.userRoles"
                            :key="item.value"
                            size="medium">{{item.roleName}}</el-tag>
                  </template>
                </el-table-column>
                <el-table-column label="头像"
                                 align="center"
                                 width="80">
                  <template slot-scope="scope">
                    <img v-if="scope.row.userAvatar!=='' && scope.row.userAvatar!==undefined"
                         :src="scope.row.userAvatar"
                         width="50"
                         height="50">
                  </template>
                </el-table-column>
                <el-table-column label="操作"
                                 align="center"
                                 fixed="right"
                                 width="150">
                  <template slot-scope="scope">
                    <!-- <el-tooltip content="编辑"
                                placement="left">
                      <el-button plain
                                 icon="el-icon-edit"
                                 size="mini"
                                 type="primary"
                                 @click="edit(scope.row)"></el-button>
                    </el-tooltip> -->
                    <el-tooltip content="删除"
                                placement="right">
                      <el-button plain
                                 icon="el-icon-delete"
                                 size="mini"
                                 type="danger"
                                 @click="del(scope.row)"></el-button>
                    </el-tooltip>
                  </template>
                </el-table-column>
              </el-table>
            </div>
            <div class="table-content-page">
              <!--批量操作-->
              <el-select v-model="batchFilterData"
                         placeholder="批量操作">
                <el-option label="批量删除"
                           key="delete"
                           value="delete">
                </el-option>

              </el-select>
              <el-button size="mini"
                         type="primary"
                         plain
                         class="table-content-page-search"
                         @click="batctExecute()">确定</el-button>
              <!--分页-->
              <el-pagination @size-change="handleSizeChange"
                             @current-change="handlePageChange"
                             layout="total, sizes, prev, pager, next, jumper"
                             :page-sizes="[10, 20, 30, 40, 50, 100]"
                             :page-size="10"
                             :total="tableData.length">
              </el-pagination>
            </div>
          </div>

        </div>
      </div>
    </div>

  </div>

</template>

<script>
// import ComponentSelect from '@/components/ComponentSelect'
import ComponentFilter from '@/components/ComponentFilter'
// import { select } from '@/api/components/component'
import { getUserList, updateUsers, deleteUser } from '@/api/user.js'

export default {
  name: 'user-list',
  components: {
    // ComponentSelect,
    ComponentFilter
  },
  data() {
    return {
      // 默认排序
      defaultSort:
        "[{'prop':'userName', 'order':'asc' },{ 'prop': 'userMobile', 'order': 'asc'}]",
      // 原始数据
      tableData: [],
      // 要渲染的数据
      userData: [],
      // 初始化页码
      pageNum: 1,
      // 初始化每页显示数量
      pageSize: 10,
      // 筛选
      filterFormData: {},
      // 批量操作筛选
      batchFilterData: '',
      // 下拉列表选项
      statusOptions: [],
      // loading
      tableDataLoading: false,
      // 选项发生改变
      multipleSelection: []
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    // 页面初始化
    this.init()
  },
  methods: {
    init() {
      // 下拉列表选项
      // select('enable', '', true).then(result => {
      //   this.statusOptions = result.data.options
      // })
      // 获取 & 加工表格数据
      getUserList(this).then(result => {
        // console.log(result)
        // 全部数据
        this.tableData = result.data.tableData.map(row => {
          this.$set(row, 'userId', row.userId - 100)
          return row
        })
        this.refreshTable()
      }).finally(() => {
        this.tableDataLoading = false
      })
    },
    // 根据条件渲染页面数据
    refreshTable() {
      getUserList(this).then(result => {
        this.userData =
          this.tableData.slice((this.pageNum - 1) * this.pageSize, this.pageNum * this.pageSize)
      }).finally(() => {
        this.tableDataLoading = false
      })
    },
    // 页码变化
    handlePageChange(pageNum) {
      this.pageNum = pageNum
      this.refreshTable()
    },
    // 每页显示数量变化
    handleSizeChange(pageSize) {
      this.pageSize = pageSize
      this.refreshTable()
    },
    // 更新用户状态
    handleSwitchChange(row) {
      this.tableDataLoading = true
      updateUsers(row).then(result => {
        // 给该行row的userStatus项更新为重新获得的row.userStatus
        this.$set(row, 'userStatus', row.userStatus)
        this.$message({
          message: result.data.message,
          type: 'success'
        })
      }).finally(() => {
        this.tableDataLoading = false
      })
    },
    // 删除1个用户
    del(row) {
      this.$confirm('确认删除该用户吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.tableDataLoading = true
        deleteUser().then(result => {
          const index = this.tableData.indexOf(row)
          this.tableData.splice(index, 1)
          this.refreshTable()
          this.$message({
            message: result.data.message,
            type: 'success'
          })
        }).finally(() => {
          this.tableDataLoading = false
        })
      }).catch(() => { })
    },
    // 选项发生变化
    handleSelectionChange(value) {
      this.multipleSelection = value
    },
    // 批量操作数据
    batctExecute() {
      // 批量操作
      const delCodes = []
      for (const select of this.multipleSelection) {
        delCodes.push(select.userCode)
      }
      // 如果没有选择数据
      if (this.multipleSelection.length === 0) {
        this.$message({
          type: 'warning',
          message: '请选择数据！'
        })
        return
      }
      // 如果没有选择操作
      else if (this.batchFilterData === '') {
        this.$message({
          type: 'warning',
          message: '请选择批处理操作！'
        })
        return
      }
      // 如果选择“批量删除”
      else if (this.batchFilterData === 'delete') {
        this
          .$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.tableDataLoading = true
            this.multipleSelection.forEach(row => {
              deleteUser().then(result => {
                const index = this.tableData.indexOf(row)
                this.tableData.splice(index, 1)
                this.refreshTable()
              })
              this.$message({
                message: '删除成功！',
                type: 'success'
              })
            })
          }).catch(() => {
          })
          .finally(() => {
            this.tableDataLoading = false
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
.el-table /deep/ {
  .el-table__row {
    .el-tag:not(:first-child) {
      margin-left: 5px;
    }
  }
}
</style>
