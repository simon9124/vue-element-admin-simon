<template>
  <div class="table-grid-contain"
       :select-url="selectUrl"
       :is-has-child="isHasChild"
       :is-show-checkbox="isShowCheckbox"
       :is-show-footer="isShowFooter"
       :is-show-index="isShowIndex"
       :table-list="tableList"
       :query-param="queryParam">
    <div class="table-content-spe">
      <el-table fit
                :stripe="isShowStripe"
                :border="isShowBorder"
                :data="tableData.list"
                :height="height"
                v-loading="tableDataLoading"
                tooltip-effect="dark"
                element-loading-text="数据加载中"
                element-loading-spinner="el-icon-loading"
                :highlight-current-row="isHighlightCurrentow"
                @sort-change="handleSortChange"
                @selection-change="handleSelectionChange"
                @current-change="handleCurrentChange"
                @expand-change="expandedRow"
                style="width: 100%">
        <!--第一列checkbox-->
        <el-table-column v-if="isShowCheckbox"
                         width="50"
                         type="selection"
                         align="center">
        </el-table-column>
        <!--第二列显示展开-->
        <el-table-column type="expand"
                         v-if="isHasChild">
          <template slot-scope="scope">
            <el-form label-position="left"
                     inline
                     class="demo-table-expand">
              <!--显示子级-->
              <div :ref='scope.row.code'>
                <!-- 未绑定子流程 -->
                <div v-if="scope.row.childList.length===0">
                  该流程未绑定子流程
                </div>
                <!-- 绑定了子流程：循环childList -->
                <div v-else>
                  <template v-for="(child,i) in scope.row.childList">
                    <block-plus :child="child"
                                :selectChildUrl="selectChildUrl"></block-plus>
                  </template>
                </div>
              </div>
            </el-form>
          </template>
        </el-table-column>
        <!--内容列index-->
        <el-table-column v-if="isShowIndex"
                         label="序号"
                         header-align="center"
                         align="center"
                         type="index"
                         width="80">
        </el-table-column>
        <!--内容列-->
        <el-table-column v-for="(header, index) in headers"
                         :key="index"
                         :fixed="header.fixed"
                         :prop="header.prop"
                         :label="header.label"
                         :sortable="header.sortable"
                         :width="header.width"
                         :min-width="header.minWidth"
                         align="center">
          <template slot-scope="scope">
            {{getHeader(scope.row, header)}}
          </template>
        </el-table-column>
        <!--末尾追加操作列-->
        <slot name="option-slot"></slot>
      </el-table>

    </div>

    <div class="table-content-page table-footer-container"
         v-if="isShowFooter">
      <!--批量操作-->
      <div class="batch-contain">
        <slot name="batch-slot">
        </slot>
      </div>
      <!--分页-->
      <div class="page-contain">
        <el-pagination layout="total, sizes, prev, pager, next, jumper"
                       @current-change="pageChangeHandler"
                       @size-change="handleSizeChange"
                       v-show="tableData.total > 0"
                       :page-size="tableData.pageSize"
                       :total="tableData.total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { request, objectMerge, isNotEmpty } from '@/utils'
import BlockPlus from '@/components/BlockPlus'

export default {
  name: 'TableGrid',
  components: { BlockPlus },
  data() {
    return {
      tableDataLoading: false,
      params: {},
      tableData: {
        total: 0,
        pageNum: 1,
        pageSize: 10,
        list: [],
        sort: ''
      }
    }
  },
  props: {
    // 数据加载连接
    selectUrl: {
      String,
      default: '',
      required: true
    },
    // 表格数据
    tableList: {
      type: Array,
      required: false,
      default: () => []
    },
    // 查询模型的所有的子流程及子子流程（不分页）并根据是否含有此链接来判断是否含有展开子行内容
    selectChildUrl: {
      String,
      default: ''
    },
    height: {
      String,
      default: null,
      required: false
    },
    headers: {
      type: Array,
      required: true,
      default: () => []
    },
    queryParam: {
      Object,
      default: ''
    },
    isHasChild: {
      type: Boolean,
      required: false,
      default: false
    },
    isShowCheckbox: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowFooter: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowIndex: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowBorder: {
      type: Boolean,
      required: false,
      default: true
    },
    isShowStripe: {
      type: Boolean,
      required: false,
      default: true
    },
    isHighlightCurrentow: {
      type: Boolean,
      required: false,
      default: true
    }
  },
  watch: {
    queryParam(val) {
      this.queryParam = val
    },
    isHasChild(val) {
      this.isHasChild = val
    },
    isShowCheckbox(val) {
      this.isShowCheckbox = val
    },
    selectUrl(val) {
      this.selectUrl = val
      this.refreshTable()
    },
    tableList(val) {
      // console.log(val)
      this.tableList = val
      this.tableData.list = val
      this.tableData.total = val.length
    }
  },
  created() {
    this.refreshTable()
  },
  methods: {
    refreshTable() {
      if (isNotEmpty(this.selectUrl)) {
        this.tableDataLoading = true
        this.params = objectMerge(
          {
            pageSize: this.tableData.pageSize,
            pageNum: this.tableData.pageNum,
            sort: this.tableData.sort
          },
          this.queryParam
        )
        request({
          url: this.selectUrl,
          method: 'get',
          params: this.params
        })
          .then(result => {
            this.tableData = result.data.tableData
            this.tableData.list = result.data.tableData.list
            // 追加是否展开显示默认显示
            this.tableData.list = result.data.tableData.list.map(row => {
              this.$set(row, 'isExpanded', true)
              return row
            })
          })
          .finally(() => {
            this.tableDataLoading = false
          })
      }
    },
    handleSortChange(column) {
      let sortKey = ''
      for (const i in this.headers) {
        const header = this.headers[i]
        if (
          header.hasOwnProperty('prop') &&
          header.hasOwnProperty('sortKey') &&
          column.prop === header.prop
        ) {
          sortKey = header.sortKey
        }
      }
      this.tableData.sort = JSON.stringify({
        prop: column.prop,
        order: column.order,
        sortKey: sortKey
      })
      this.refreshTable()
    },
    handleSelectionChange(selection) {
      this.$emit('selection-change', {
        selection: selection
      })
    },
    // 选中一行
    handleCurrentChange(row) {
      this.$emit('current-change', {
        row: row
      })
    },
    // 分页-跳页
    pageChangeHandler(pageNum) {
      this.tableData.pageNum = pageNum
      this.refreshTable()
    },
    // 分页-改变页显示数
    handleSizeChange(pageSize) {
      this.tableData.pageSize = pageSize
      this.refreshTable()
    },
    // 解析表头属性
    getHeader(row, header) {
      const prop = header.prop
      const headers = prop.split('.')
      let headerProp = row
      for (let i = 0; i < headers.length; i++) {
        const key = headers[i]
        if (headerProp.hasOwnProperty(key)) {
          headerProp = headerProp[key]
        } else {
          headerProp = ''
          break
        }
      }
      return headerProp
    },
    // 第一行展开
    expandedRow(row, expandedRows) {
      // console.log(row.childList)
      request({
        url: this.selectChildUrl + row.id,
        method: 'get'
      })
        .then(result => {
          // console.log(result)
          // 根据result的值，子组件确定是否有+号
          for (var i in result.data.actReModelList) {
            // console.log(result.data.actReModelList[i].childList)
            if (
              result.data.actReModelList[i].childList[0] !== null &&
              result.data.actReModelList[i].childList.length !== 0
            ) {
              row.childList[i].hasChild = true
            } else {
              row.childList[i].hasChild = false
            }
          }
        })
        .finally(() => {
          // console.log(row.childList)
        })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
