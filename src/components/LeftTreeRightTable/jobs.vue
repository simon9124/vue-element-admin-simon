<template>
  <div class="table-tree-container">

    <el-container>

      <!--左 · 树-->
      <el-aside class="left-panel">
        <div class="left-panel-title">配置脚本</div>
        <vue-tree class="left-panel-tree"
                  :init-tree-url="initTreeUrl"
                  :insert-tree-url="insertTreeUrl"
                  :update-tree-url="updateTreeUrl"
                  :del-tree-url="delTreeUrl"
                  @click-node="treeClickNodeHandler"
                  @checked-nodes="selectionChange">
        </vue-tree>
      </el-aside>

      <!--右 · 表-->
      <el-container class="right-panel is-vertical">
        <!-- 表头操作 -->
        <div class="header-container">
          <el-form :inline="true"
                   :model="searchForm"
                   label-width="100px"
                   class="demo-form-inline repository"
                   @submit.native.prevent>
            <el-form-item label="脚本名称：">
              <el-input placeholder="请输入搜索内容"
                        v-model="searchForm.searchName"
                        @keyup.enter.native="searchClickHandler">
              </el-input>
            </el-form-item>
            <el-form-item class="el-form-button">
              <el-button plain
                         type="primary"
                         @click.enter.native="searchClickHandler">搜索</el-button>
              <el-button plain
                         type="success"
                         @click="openJobClickHandler(false)"
                         v-if="isShowInsert"> 新增脚本
              </el-button>
            </el-form-item>
          </el-form>
        </div>

        <!--表内容-->
        <el-main class="right-panel-main">
          <table-grid ref="organTable"
                      :is-show-border='false'
                      :is-show-footer='false'
                      :is-show-index='false'
                      :is-show-checkbox='false'
                      select-url=''
                      :table-list='jobsList'
                      :headers='jobsHeaders'>
            <!--追加排序列-->
            <el-table-column min-width="100"
                             label="排序"
                             align="center"
                             prop="jobSort"
                             sortable="custom"
                             fixed="left"
                             slot="option-slot">
              <template slot-scope="scope">
                <el-input class="jobSort-input"
                          v-model="scope.row.jobSort"
                          @focus="focusJobForm(scope.row)"
                          @change="jobSortChange"
                          @keyup.enter.native="submitJobFormInline(scope.row)"
                          @blur="submitJobFormInline"></el-input>
              </template>
            </el-table-column>
            <!--末尾追加操作列-->
            <el-table-column slot="option-slot"
                             width="150"
                             label="执行结果"
                             align="center">
              <template slot-scope="scope">
                <el-progress :stroke-width="18"
                             :show-text="false"
                             :percentage="scope.row.percentage"
                             v-loading="scope.row.progressLoading"
                             element-loading-text="执行中"
                             element-loading-spinner="el-icon-loading"
                             v-show="!scope.row.executeLoading"></el-progress>
                <el-tag :type="scope.row.flag ? 'success' : 'danger'"
                        v-show="scope.row.executeLoading">
                  {{scope.row.flag ? '正常': '异常'}}
                </el-tag>
                <el-button type="text"
                           v-show="scope.row.executeLoading"
                           @click="showResult(scope.row)">查看结果</el-button>
              </template>
            </el-table-column>
            <el-table-column label="预估时间"
                             width="150"
                             align="center"
                             slot="option-slot">
              <template slot-scope="scope">
                <div @click="timeRow(scope.row)">
                  <time-picker :fatherEmitShow='false'
                               :propMinute="parseInt(scope.row.expectTimeLength/ 60).toString()"
                               :propSecond="(scope.row.expectTimeLength % 60).toString()"
                               @timeSubmit="timeSubmit"></time-picker>
                </div>
              </template>
            </el-table-column>
            <el-table-column v-if="isShowOptions"
                             slot="option-slot"
                             label="操作"
                             min-width="220"
                             align="center">
              <template slot-scope="scope">
                <div class="buttons">
                  <el-tooltip content="执行"
                              placement="left">
                    <el-button plain
                               icon="el-icon-caret-right"
                               size="mini"
                               type="success"
                               :disabled="scope.row.execLoading"
                               @click="executeJob(scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="编辑"
                              placement="top">
                    <el-button plain
                               icon="el-icon-edit"
                               size="mini"
                               type="primary"
                               @click="openJobClickHandler(true, scope.row)"></el-button>
                  </el-tooltip>
                  <el-tooltip content="删除"
                              placement="right">
                    <el-button plain
                               icon="el-icon-delete"
                               size="mini"
                               type="danger"
                               @click="del(scope.row)"></el-button>
                  </el-tooltip>
                </div>
              </template>
            </el-table-column>
          </table-grid>
        </el-main>
      </el-container>

    </el-container>

    <!--dialog：编辑工作-->
    <el-dialog class="dialog-transfer"
               :title="dialogTitle"
               :visible.sync="dialogVisible">
      <el-form ref="jobForm"
               :model="form"
               :rules="formRules"
               label-width="100px"
               @submit.native.prevent
               v-loading="dialogJobLoading"
               element-loading-text="数据加载中"
               element-loading-spinner="el-icon-loading">
        <!--<el-form-item label="工作名称"
                      prop="jobName">
          <el-input v-model="form.jobName"
                    placeholder="请输入工作名称"></el-input>
        </el-form-item>-->
        <el-form-item label="排序"
                      prop="jobSort">
          <el-input-number v-model="form.jobSort"
                           :step="10"></el-input-number>
        </el-form-item>
        <!--<el-form-item label="工作描述"
                      prop="jobRemark">
          <el-input type="textarea"
                    :autosize="{ minRows: 8, maxRows: 10}"
                    placeholder="请输入内容"
                    v-model="form.jobRemark">
          </el-input>
        </el-form-item>-->
        <el-form-item label="绑定脚本"
                      prop="bindScript">
          <el-button plain
                     icon="el-icon-circle-plus-outline"
                     size="mini"
                     type="warning"
                     @click="bindScript(form.jobCode)">
          </el-button>
          <el-tag v-for="label in labelScript"
                  :key="label"
                  :disable-transitions="true">{{label}}
          </el-tag>
        </el-form-item>
        <el-form-item label="绑定服务器"
                      prop="bindServer">
          <el-button plain
                     icon="el-icon-circle-plus-outline"
                     size="mini"
                     type="warning"
                     @click="bindServer(form.jobCode)">
          </el-button>
          <el-tag v-for="label in labelServer"
                  :key="label"
                  :disable-transitions="true">{{label}}
          </el-tag>
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submitJobForm">确 定</el-button>
      </div>
    </el-dialog>

    <!--dialog：查看结果-->
    <el-dialog title="查看结果"
               :visible.sync="showResultDialogVisible"
               width="60%">
      <div v-html="showResultContent"
           class="dialog"></div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   @click="showResultDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

    <!--穿梭框保存绑定-->
    <dialog-transfer ref="dialogTransfer"
                     :init-url="transferInitUrl"
                     :titles="titles"
                     :filterPlaceholder="filterPlaceholder"
                     @submit="dialogSave">
    </dialog-transfer>

  </div>
</template>

<script>
// function
import {
  // request,
  isNotEmpty
} from '@/utils'
// components
import TableGrid from '@/components/TableGrid'
import VueTree from '@/components/Tree'
import TimePicker from '@/components/TimePicker'
import DialogTransfer from '@/components/DialogTransfer'
// api
import {
  getJobByJobsCode,
  insert,
  update,
  deleteByCode,
  selectJobs,
  executeJob,
  showResult,
  selectJobScriptTransfer,
  selectJobServerTransfer,
  saveJobScript,
  saveServerToJob
} from '@/api/planManagement/jobs'
import {
  selectExpectTime,
  insertMainExpectTime,
  updateMainExpectTime
} from '@/api/process/expectTime'
import { getScriptByCode } from '@/api/script/script'
import keysGetLabels from '@/api/planManagement/keysGetLabels'

export default {
  // name: 'Jobs',
  components: {
    TableGrid,
    VueTree,
    TimePicker,
    DialogTransfer
  },
  props: {
    // 左侧树形结构url地址 - 显示树
    initTreeUrl: {
      String,
      default: '/general/tree/selectTreeListByRootCode/treeJobsRoot',
      required: false
    },
    // 是否显示options
    isShowOptions: {
      type: Boolean,
      default: true
    },
    // 是否显示"新增脚本"按钮
    isShowInsert: {
      type: Boolean,
      default: true
    },
    jobsSelectedCode: {
      type: String
    }
  },
  data() {
    return {
      // 左侧树形结构url地址 - 显示树
      // initTreeUrl: '/general/tree/selectTreeListByRootCode/treeJobsRoot',
      // 左侧树形结构url地址 - 树新增节点
      insertTreeUrl: '/general/tree/insert',
      // 左侧树形结构url地址 - 树更新节点
      updateTreeUrl: '/general/tree/',
      // 左侧树形结构url地址 - 树节点删除
      delTreeUrl: '/general/tree/',
      // 查询参数(当前激活的节点)
      param: {
        treeType: 'root',
        treeCode: ''
      },
      // 工作list
      jobsList: [],
      // 工作list表头
      jobsHeaders: [
        {
          prop: 'jobName',
          label: '脚本名称',
          minWidth: '200'
        },
        {
          prop: 'jobRemark',
          label: '脚本描述',
          minWidth: '200'
        }
      ],
      // 编辑工作 - dialog是否可见
      dialogVisible: false,
      // 编辑工作 - dialog的loading
      dialogJobLoading: false,
      // 编辑工作 - title标题（新增or编辑）
      dialogTitle: '',
      // 编辑工作 - 工作form
      form: { jobSort: 10 },
      // 编辑工作 - 工作form规则
      formRules: {
        jobName: [
          { required: true, message: '请输入工作名称', trigger: 'blur' }
        ],
        bindScript: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.labelScript.length === 0) {
                callback(new Error('请绑定脚本'))
              } else {
                callback()
              }
            }
          }
        ],
        bindServer: [
          {
            required: true,
            trigger: 'blur',
            validator: (rule, value, callback) => {
              if (this.labelServer.length === 0) {
                callback(new Error('请绑定服务器'))
              } else {
                callback()
              }
            }
          }
        ],
        jobSort: [
          { required: true, message: '请输入脚本排序', trigger: 'blur' }
        ]
      },
      // 查看结果 - dialog是否可见
      showResultDialogVisible: false,
      // 查看结果 - 返回结果
      showResultContent: '',
      // 返回结果集合
      showResultList: [],
      // 回显绑定的脚本
      labelScript: [],
      // 回显绑定的服务器
      labelServer: [],
      // 穿梭框类型
      type: '',
      // 穿梭框 - 配置url
      transferInitUrl: '',
      // 穿梭框 - 标题
      titles: ['可绑定', '已绑定'],
      // 穿梭框 - 提示文字
      filterPlaceholder: '选择绑定人员',
      // 绑定脚本列表 - 穿梭框
      scriptCodeList: [],
      // 绑定服务器列表- 穿梭框
      serverCodeList: [],
      // 搜索表单
      searchForm: {
        searchName: ''
      },
      // 绑定的脚本列表 - 已绑定
      jobScriptTransfer: [],
      // 绑定服务器 - 已绑定
      jobServerTransfer: [],
      // 是否多选
      isMultiple: false
    }
  },
  methods: {
    // 根据节点的treeCode -> 获取表格数据（调用tableGrid子组件的方法）
    async refreshTable(code) {
      this.jobsList = (await getJobByJobsCode(code)).data.tableData.list.map(
        row => {
          this.$set(row, 'percentage', 0)
          this.$set(row, 'flag', 0)
          this.$set(row, 'progressLoading', false)
          this.$set(row, 'executeLoading', false)
          return row
        }
      )
    },
    // 点击节点
    treeClickNodeHandler(param) {
      this.param = {
        treeCode: param.treeCode,
        treeType: param.treeType
      }
      this.refreshTable(this.param.treeCode)
    },
    // 删除工作
    del(row) {
      deleteByCode(row.jobCode, this, this.param.treeCode)
    },
    // 编辑工作：新增 & 更新
    openJobClickHandler(isEdit, row) {
      this.dialogTitle = isEdit ? '更新工作' : '新增工作'
      this.isEdit = isEdit
      if (this.param.treeType === 'root') {
        this.$message({
          message: '请勿选择根目录',
          type: 'warning'
        })
      } else {
        this.dialogVisible = true
        this.$nextTick(async() => {
          if (this.isEdit) {
            // 更新
            this.dialogJobLoading = true
            this.form = {
              jobName: row.jobName,
              jobRemark: row.jobRemark,
              jobCode: row.jobCode,
              jobType: 'shell',
              jobSort: row.jobSort,
              treeCode: this.param.treeCode
            }
            // 1.获取穿梭框数据
            const scriptTransferResult = await selectJobScriptTransfer(
              row.jobCode
            )
            const serverTransferResult = await selectJobServerTransfer(
              row.jobCode
            )
            this.jobScriptTransfer = scriptTransferResult.data.left
            this.jobServerTransfer = serverTransferResult.data.left
            // 2.将数据转换到code数组
            this.scriptCodeList = scriptTransferResult.data.right
            this.serverCodeList = serverTransferResult.data.right
            // 3.将数据转换到tag(label)
            this.labelScript = keysGetLabels(
              scriptTransferResult.data.left,
              scriptTransferResult.data.right
            )
            this.labelServer = keysGetLabels(
              serverTransferResult.data.left,
              serverTransferResult.data.right
            )
            this.dialogJobLoading = false
          } else {
            // 新增
            this.form = {
              jobName: '',
              jobRemark: '',
              jobType: 'shell',
              jobSort: 10,
              treeCode: this.param.treeCode
            }
            this.labelServer = []
            this.labelScript = []
            this.jobScriptTransfer = (await selectJobScriptTransfer()).data.left
            this.jobServerTransfer = (await selectJobServerTransfer()).data.left
          }
        })
      }
    },
    // 弹出穿梭框 - 绑定脚本
    bindScript(jobCode) {
      this.type = 'script'
      this.titles = ['全部脚本', '已绑定脚本']
      this.filterPlaceholder = '选择绑定脚本'
      this.isMultiple = false
      this.transferInitUrl = `/maintenance/script/selectJobScriptTransfer/${jobCode}`
      this.$refs.dialogTransfer.showDialog()
    },
    // 弹出穿梭框 -绑定服务器
    bindServer(jobCode) {
      this.type = 'server'
      this.titles = ['全部服务器', '已绑定服务器']
      this.filterPlaceholder = '选择绑定服务器'
      this.isMultiple = true
      this.transferInitUrl = `/maintenance/server/selectJobServerTransfer/${jobCode}`
      this.$refs.dialogTransfer.showDialog()
    },
    // 提交穿梭框
    async dialogSave(params) {
      if (!this.isMultiple && params.value.length > 1) {
        this.$message({
          message: '只允许选择一条数据',
          type: 'warning'
        })
      } else {
        if (this.type === 'script') {
          this.scriptCodeList = params.value
          this.labelScript = keysGetLabels(this.jobScriptTransfer, params.value)
          const result = (await getScriptByCode(this.scriptCodeList[0])).data
          this.form.jobName = result.scriptName
          this.form.jobRemark = result.scriptContent
        } else if (this.type === 'server') {
          this.serverCodeList = params.value
          this.labelServer = keysGetLabels(this.jobServerTransfer, params.value)
        }
        this.$refs.dialogTransfer.closeDialog()
      }
    },
    // 提交绑定的脚本 & 服务器
    async submitTransferLabels() {
      const jobScriptdata = {
        jobCode: this.form.jobCode,
        scriptCodeList: this.scriptCodeList
      }
      await saveJobScript(jobScriptdata)
      const jobServerdata = {
        jobCode: this.form.jobCode,
        serverCodeList: this.serverCodeList
      }
      await saveServerToJob(jobServerdata)
      this.refreshTable(this.param.treeCode)
      this.dialogVisible = false
    },
    // 行内排序input框获取焦点
    focusJobForm(row) {
      this.form = {
        jobName: row.jobName,
        jobRemark: row.jobRemark,
        jobCode: row.jobCode,
        jobType: 'shell',
        jobSort: row.jobSort,
        treeCode: this.param.treeCode
      }
    },
    // 行内排序input框的值发生改变
    jobSortChange(value) {
      this.form.jobSort = value
    },
    // 行内提交工作（仅修改排序）
    async submitJobFormInline(row) {
      if (this.form.jobSort === undefined) {
        this.$message({
          message: '请输入脚本排序',
          type: 'warning'
        })
        return false
      }
      await update(this.form)
      this.refreshTable(this.param.treeCode)
    },
    // 提交工作
    submitJobForm() {
      this.$refs.jobForm.validate(async valid => {
        if (valid && this.isEdit) {
          // 更新
          await update(this.form)
          this.submitTransferLabels()
        } else if (valid && !this.isEdit) {
          // 新增
          this.form.jobCode = (await insert(this.form)).data.jobCode
          this.submitTransferLabels()
        }
      })
    },
    // 执行工作
    executeJob(row) {
      row.execLoading = true
      const interval = window.setInterval(() => {
        if (row.percentage++ >= 100) {
          row.percentage = 100
          row.progressLoading = true
          window.clearInterval(interval)
          row.execLoading = false
        }
      }, 8)
      const data = {
        jobCode: row.jobCode,
        jobType: row.jobType
      }
      executeJob(data).then(result => {
        row.progressLoading = false
        row.execLoading = false
        row.executeLoading = true
        // console.log(result.data.list)
        if (isNotEmpty(result.data.list[1][0])) {
          row.flag = result.data.list[1][0].flag
          this.showResultScriptCode = result.data.list[0][0].scriptCode
          this.showResultContentArray = result.data.list[0][0].result
          const m = new Map()
          m.set(this.showResultScriptCode, this.showResultContentArray)
          // console.log(m)
          this.showResultList.push(m)
          this.resultDiv =
            this.showResultContentArray +
            '\n ============================================= \n'
          this.resultMsg = this.resultMsg + this.resultDiv
        } else {
          row.flag = false
        }
      })
    },
    // 查看执行结果
    showResult(row) {
      this.showResultContent = ''
      this.showResultDialogVisible = true
      showResult(row.jobCode).then(result => {
        // console.log(this.showResultList)
        this.bindScriptCode = result.data.right[0]
        for (let i = 0; i < this.showResultList.length; i++) {
          const item = this.showResultList[i]
          if (item.has(this.bindScriptCode)) {
            this.showResultContent = item.get(this.bindScriptCode)
          }
        }
      })
    },
    // 预估时间获取焦点
    timeRow(row) {
      selectExpectTime({ expectTimeBusinessCode: row.jobCode }).then(result => {
        this.expectTime =
          result.data.expectTimeList.length === 0 ? 'insert' : 'update'
      })
      this.expectTimeRow = {
        expectTimeBusinessCode: row.jobCode,
        expectTimeLength: '',
        expectTimeIsActive: 1
      }
    },
    // 提交预计时间
    timeSubmit(time) {
      // console.log(time)
      this.expectTimeRow.expectTimeLength = time
      if (this.expectTime === 'insert') {
        insertMainExpectTime(this.expectTimeRow)
      } else {
        updateMainExpectTime(this.expectTimeRow)
      }
    },
    // 点击搜索
    async searchClickHandler() {
      this.searchForm = {
        searchName: this.searchForm.searchName,
        planTreeCode: this.param.treeCode
      }
      this.jobsList = (await selectJobs(this.searchForm)).data.tableData.list
    },
    // 获取多选
    selectionChange(params) {
      this.$emit('selection-change', {
        checkedNodes: params
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
@import '~@/styles/smart-plan.scss';
</style>
