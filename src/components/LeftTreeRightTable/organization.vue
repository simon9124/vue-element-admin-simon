<template>
  <div class="table-tree-container">
    <el-container>

      <!--左 · 树-->
      <el-aside class="left-panel">
        <div class="left-panel-title">配置应急组织</div>
        <vue-tree class="left-panel-tree"
                  :init-tree-url="initTreeUrl"
                  :insert-tree-url="insertTreeUrl"
                  :update-tree-url="updateTreeUrl"
                  :del-tree-url="delTreeUrl"
                  :is-multiple='isMultiple'
                  value-field-name="organizationCode"
                  tree-name-field-name="organizationLabel"
                  type-field="organizationType"
                  parent-field="organizationParent"
                  @click-node="treeClickNodeHandler"
                  @checked-nodes="selectionChange">
        </vue-tree>
      </el-aside>

      <!--右 · 表-->
      <el-container class="right-panel is-vertical">
        <!-- 表头操作 -->
        <div class="addPerson">
          <el-button plain
                     type="primary"
                     @click="dialogShow">添加人员</el-button>
        </div>
        <!--表内容-->
        <el-main class="right-panel-main">
          <table-grid ref="organTable"
                      :is-show-border='false'
                      :is-show-index='false'
                      :is-show-checkbox='false'
                      :select-url='organUrl'
                      :headers='organHeaders'>
          </table-grid>
        </el-main>
        <dialog-transfer ref="dialogTransfer"
                         :init-url="transferInitUrl"
                         :titles="titles"
                         :filterPlaceholder="filterPlaceholder"
                         @submit="dialogSubmit">
        </dialog-transfer>
      </el-container>

    </el-container>
  </div>
</template>

<script>
// function
import { isEmpty } from '@/utils'
// components
import TableGrid from '@/components/TableGrid'
import VueTree from '@/components/Tree'
import DialogTransfer from '@/components/DialogTransfer'
// api
import { saveOrganization } from '@/api/organization'

export default {
  name: 'organization',
  components: {
    TableGrid,
    VueTree,
    DialogTransfer
  },
  props: {
    // 是否多选
    isMultiple: {
      Boolean,
      default: false,
      required: false
    },
    // 左侧树形结构url地址 - 显示树
    initTreeUrl: {
      String,
      default: '/user/organization/selectOrganizationByRootCode/orgRoot',
      required: false
    }
  },
  data() {
    return {
      title: '',
      // 左侧树形结构url地址 - 显示树
      // initTreeUrl: '/user/organization/selectOrganizationByRootCode/orgRoot',
      // 左侧树形结构url地址 - 树新增节点
      insertTreeUrl: '/user/organization/insert',
      // 左侧树形结构url地址 - 树更新节点
      updateTreeUrl: '/user/organization',
      // 左侧树形结构url地址 - 树节点删除
      delTreeUrl: '/user/organization',
      // 查询参数(当前激活的节点)
      param: {
        organizationCode: '',
        organizationType: 'root'
      },
      // 表格url
      organUrl: '',
      // 表头 - 应急组织
      organHeaders: [
        {
          prop: 'user.userName',
          label: '用户名',
          minWidth: 150
        },
        {
          prop: 'user.userEmail',
          label: '邮箱',
          minWidth: 200
        },
        {
          prop: 'user.userMobile',
          label: '手机',
          minWidth: 150
        }
      ],
      // dialog标题
      titles: ['全部用户', '已绑定用户'],
      filterPlaceholder: '选择绑定人员',
      // 配置人员关联
      transferInitUrl: ''
    }
  },
  created() {
    // 页面初始化
    this.init()
  },
  methods: {
    init() {
      if (this.$route.meta.title === 'emergencyGroup') {
        this.title = '应急分组管理'
      } else {
        this.title = '组织管理'
      }
      // this.refreshTable()
    },
    // 表格刷新 - 调用tableGrid子组件的方法
    refreshTable() {
      this.refreshOrganTable()
    },
    // 表格数据初始化 - 应急组织
    refreshOrganTable() {
      const organUrl = '/user/organization/selectOrganizationUserList'
      this.organUrl =
        organUrl + '?organizationCode=' + this.param.organizationCode
    },
    // 点击节点
    treeClickNodeHandler(param) {
      this.param.organizationCode = param.organizationCode
      this.param.organizationType = param.organizationType
      // if (param.organizationType === 'root') {
      //   this.param.organizationCode = ''
      // }
      // 根据节点的organizationCode -> 更新dialogTransfer的用户绑定情况
      const transferInitUrl = '/user/selectOrganizationUserTransfer'
      this.transferInitUrl = transferInitUrl + '/' + this.param.organizationCode
      this.refreshTable()
    },
    // 弹出添加人员dialog框
    dialogShow() {
      if (isEmpty(this.param.organizationCode)) {
        this.$message({
          message: '请勿选择根组织',
          type: 'warning'
        })
      } else {
        this.$refs.dialogTransfer.showDialog()
      }
    },
    // 提交添加人员dialog框
    dialogSubmit(params) {
      const data = {
        organizationCode: this.param.organizationCode,
        userNameList: params.value
      }
      saveOrganization(data)
        .then(() => {
          this.$refs.dialogTransfer.closeDialog()
        })
        .finally(() => {
          // 提交dialog框的refreshTable不写在refreshTable()里，否则会造成2次刷新
          this.$refs.organTable.refreshTable()
          this.refreshTable()
        })
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
