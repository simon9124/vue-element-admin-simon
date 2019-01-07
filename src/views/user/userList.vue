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
                     ref="filterFormData"
                     :model="filterFormData"
                     label-width="70px"
                     label-position="left">
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
              <el-table v-loading="tableDataLoading"
                        ref="multipleTable"
                        :data="userData"
                        stripe
                        fit
                        border
                        highlight-current-row
                        tooltip-effect="dark"
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
                <el-table-column label="姓名"
                                 align="center"
                                 prop="userNickName"
                                 width="120"
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
                                 width="350"
                                 sortable="custom">
                  <!-- 地址栏添加行内编辑功能 -->
                  <template slot-scope="scope">
                    <!-- 非编辑状态 -->
                    <span v-if="scope.row.edit === false">
                      {{ scope.row.userAddress }}
                      <i class="el-icon-edit edit"
                         @click="scope.row.edit = !scope.row.edit"></i>
                    </span>
                    <!-- 编辑状态 -->
                    <span v-else>
                      <el-input v-model="scope.row.userAddress"
                                style="width:280px"></el-input>
                      <i class="el-icon-check check"
                         @click="editInline(scope.row)"></i>
                      <i class="el-icon-close close"
                         @click="scope.row.edit = !scope.row.edit"></i>
                    </span>
                  </template>
                </el-table-column>
                <el-table-column label="状态"
                                 align="center"
                                 width="50">
                  <!-- 状态栏添加行内修改功能 -->
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
                            size="medium">{{ item.roleName }}</el-tag>
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
                    <el-tooltip content="编辑"
                                placement="left">
                      <el-button plain
                                 icon="el-icon-edit"
                                 size="mini"
                                 type="primary"
                                 @click="update(scope.row)"></el-button>
                    </el-tooltip>
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
                <el-option key="delete"
                           label="批量删除"
                           value="delete">
                </el-option>

              </el-select>
              <el-button size="mini"
                         type="primary"
                         plain
                         class="table-content-page-search"
                         @click="batctExecute()">确定</el-button>
              <!--分页-->
              <el-pagination :page-sizes="[10, 20, 30, 40, 50, 100]"
                             :page-size="10"
                             :total="tableData.length"
                             layout="total, sizes, prev, pager, next, jumper"
                             @size-change="handleSizeChange"
                             @current-change="handlePageChange">
              </el-pagination>
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
// import ComponentSelect from '@/components/ComponentSelect'
import ComponentFilter from '@/components/ComponentFilter'
import { getUserList, updateUsers, deleteUser } from '@/api/user.js'
import Sortable from 'sortablejs'

export default {
  name: 'UserList',
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
      multipleSelection: [],
      // dialog显示与否
      dialogVisible: false,
      userForm: {}
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  },
  created() {
    this.init()
  },
  methods: {
    // 页面初始化
    init() {
      // 获取 & 加工表格数据
      getUserList(this).then(result => {
        // 全部数据
        this.tableData = result.data.tableData.map(row => {
          this.$set(row, 'userId', row.userId - 100)
          return row
        })
        this.tableData = result.data.tableData.map(row => {
          this.$set(row, 'edit', false)
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
        console.log(this.userData)
        // 拖拽排序功能
        this.$nextTick(() => {
          this.setSort()
        })
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
        // 前端虚拟更新操作 -> 将选中row的userStatus更新为新的row.userStatus
        this.$set(row, 'userStatus', row.userStatus)
        this.$message({
          message: result.data.message,
          type: 'success'
        })
      }).finally(() => {
        this.tableDataLoading = false
      })
    },
    // 行内更新用户信息
    editInline(row) {
      this.tableDataLoading = true
      updateUsers(row).then(result => {
        // 前端虚拟更新操作 -> 将选中row的userAddress更新为新的row.userAddress
        this.$set(row, 'userAddress', row.userAddress)
        this.$message({
          message: result.data.message,
          type: 'success'
        })
        row.edit = !row.edit
      }).finally(() => {
        this.tableDataLoading = false
      })
    },
    // 打开dialog更新用户信息
    update(row) {
      this.dialogVisible = true
      this.userForm = row
    },
    // 删除1个用户
    del(row) {
      this.$confirm('确认删除该用户吗?', '提示', {
        type: 'warning'
      }).then(() => {
        this.tableDataLoading = true
        deleteUser().then(result => {
          // 前端虚拟删除操作 -> 根据row的下标删除该row
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
      // 将选择的数据放在delCodes数组中
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
      } else if (this.batchFilterData === '') {
        // 如果没有选择操作
        this.$message({
          type: 'warning',
          message: '请选择批处理操作！'
        })
        return
      } else if (this.batchFilterData === 'delete') {
        // 如果选择“批量删除”
        this
          .$confirm('确定删除?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          .then(() => {
            this.tableDataLoading = true
            // 前端虚拟批量删除操作 -> 给multipleSelection里的每个row做单独删除
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
    },
    // 拖拽排序
    setSort() {
      const el = document.querySelectorAll('.el-table__body-wrapper > table > tbody')[0]
      this.sortable = Sortable.create(el, {
        ghostClass: 'sortable-ghost',
        // 解决Firefox bug，详见https://github.com/RubaXa/Sortable/issues/1012
        setData: function(dataTransfer) {
          dataTransfer.setData('Text', '')
        },
        onEnd: evt => {
          // const array = [{ user: 1 }, { user: 2 }, { user: 3 }, { user: 4 }, { user: 5 }]
          console.log(this.userData)
          // const array = this.userData
          // const targetRow = array.splice(evt.oldIndex, 1)[0]
          // array.splice(evt.newIndex, 0, targetRow)
          // console.log(array)

          this.$message({
            message: '重新排序成功!',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
.sortable-ghost {
  opacity: 0.8;
  color: #fff !important;
  background: #42b983 !important;
}
.el-table /deep/ {
  .el-table__row {
    .cell {
      padding: 0;
      .edit,
      .check,
      .close {
        font-size: 16px;
      }
      .edit {
        color: #409eff;
        text-decoration: underline;
      }
      .check {
        border: 1px solid #67c23a;
        color: #67c23a;
      }
      .close {
        border: 1px solid #f56c6c;
        color: #f56c6c;
      }
    }
    .el-tag:not(:first-child) {
      margin-left: 5px;
    }
  }
}
</style>
