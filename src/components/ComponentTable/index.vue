 <!--
 * 封装表格组件
 -->
<template>
  <!-- <div class="container"> -->
  <!-- 页内容 -->
  <div class="content">
    <!-- 表格 -->
    <div class="content-spe"
         v-if="tableContentSpe">
      <p class="content-spe-title">{{tableTitle}}</p>
      <!-- 2个插槽：按钮 & 其他内容 -->
      <slot name="iconOpen"></slot>
      <slot name="content"></slot>

      <div class="content-spe-element"
           v-if="tableShow">

        <!-- 表格筛选 -->
        <ComponentFilter v-if="filterShow">
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
              <component-select type="enable"
                                defaultSelected=""
                                isAll=true
                                model="center"
                                @selectChangeCallBack="handleParamsChange"></component-select>
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
                     plain
                     @click="insert">新增
          </el-button>
        </ComponentFilter>

        <!-- 表格内容 -->
        <div class="table-content"
             v-if="tableContentShow">
          <div class="table-content-header">
            <i class="el-icon-d-arrow-right"
               style="font-size:16px"></i>
            <span>{{tableContent}}</span>
            <!-- 插槽：radio选项卡 -->
            <slot name="radios"></slot>
          </div>
          <div class="table-content-spe">
            <slot name="tableIn"></slot>
          </div>
        </div>

        <!-- 2个插槽：外层table和button组 -->
        <slot name="tableOut"></slot>
        <slot name="buttons"></slot>

      </div>

    </div>
  </div>
  <!-- </div> -->

  </div>

</template>

<script>
import ComponentSelect from '@/components/ComponentSelect'
import ComponentFilter from '@/components/ComponentFilter'
import { select } from '@/api/components/component'
import {
  selectByPage,
  deleteByCode,
  deleteArrayCode,
  update
} from '@/api/user/user'
import { clearParam } from '@/utils'

export default {
  name: 'users',
  components: {
    ComponentSelect,
    ComponentFilter
  },
  data() {
    return {
      // 默认排序
      defaultSort:
        "[{'prop':'userName', 'order':'asc' },{ 'prop': 'userMobile', 'order': 'asc'}]",
      // 数据
      tableData: {},
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
  created() {
    // 页面初始化
    this.init()
  },
  props: {
    tableContentSpe: {
      Boolean,
      default: true
    },
    tableTitle: {
      type: String,
      default: '用户管理'
    },
    tableContent: {
      type: String,
      default: '用户列表'
    },
    filterShow: {
      Boolean,
      default: true
    },
    tableContentShow: {
      Boolean,
      default: true
    },
    tableShow: {
      Boolean,
      default: true
    }
  },
  methods: {
    init() {
      // 下拉列表选项
      select('enable', '', true).then(result => {
        this.statusOptions = result.data.options
      })
      // 表格数据初始化
      this.refreshTable()
    },
    refreshTable() {
      selectByPage(this)
        .then(result => {
          this.tableData = result.data.tableData
          // console.log(this.tableData)
          this.tableDataLoading = false
        })
        .catch(() => {
          this.tableDataLoading = false
        })
    },
    handleSizeChange(pageSize) {
      // 分页-改变页显示数
      this.tableData.pageSize = pageSize
      this.refreshTable()
    },
    handlePageChange(pageNum) {
      // 分页-跳页
      this.tableData.pageNum = pageNum
      this.refreshTable()
    },
    handleSortChange(column, prop, order) {
      // 排序
      this.tableData.sort = JSON.stringify({
        prop: column.prop,
        order: column.order
      })
      this.refreshTable()
    },
    handleParamsChange(userStatus) {
      // 筛选查询
      this.filterFormData.userStatus = userStatus
      this.refreshTable()
    },
    updateData(row) {
      // 行内更新状态
      update(row)
    },
    handleSwitchChange(row) {
      // 开关-改变行内状态
      this.updateData(row)
    },
    del(row) {
      // 删除
      deleteByCode(row.userCode, this)
    },
    insert() {
      // 新增
      clearParam('userName')
      this.$router.push({
        path: '/settings/user-edit',
        name: 'user-edit'
      })
    },
    edit(row) {
      // 编辑
      this.$router.push({
        path: '/settings/user-edit',
        name: 'user-edit',
        params: {
          userName: row.userName
        }
      })
    },
    audit(row) {
      // 编辑
      this.$router.push({
        path: '/settings/user-audit',
        name: 'user-audit',
        params: {
          userName: row.userName
        }
      })
    },
    handleSelectionChange(value) {
      // 选项发生变化
      this.multipleSelection = value
    },
    batctExecute() {
      // 批量操作
      const delCodes = []
      for (const select of this.multipleSelection) {
        delCodes.push(select.userCode)
      }
      deleteArrayCode(delCodes, this)
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
