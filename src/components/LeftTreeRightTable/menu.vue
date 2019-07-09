<template>
  <div class="table-tree-container">
    <el-container>

      <!--左 · 树-->
      <el-aside class="left-panel">
        <div class="left-panel-title">菜单配置</div>
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

      <!--右 · 表单-->
      <el-container class="right-panel is-vertical">
        <div class="right-panel-main">
          <div class="right-panel-title">基础信息</div>

          <el-form slot="form"
                   :model="formData"
                   :rules="formRules"
                   ref="formData"
                   label-width="120px"
                   label-position="right">
            <el-row>
              <el-col class="el-form-col-block"
                      :xs="2"
                      :sm="3"
                      :lg="6"
                      :xl="7"></el-col>
              <el-col :xs="20"
                      :sm="18"
                      :lg="12"
                      :xl="10">
                <el-form-item label="菜单名称"
                              prop="roleKey">
                  <el-input v-model="formData.roleKey"
                            placeholder="请输入菜单名称"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row>
              <el-col class="el-form-col-block"
                      :xs="2"
                      :sm="3"
                      :lg="6"
                      :xl="7"></el-col>
              <el-col :xs="20"
                      :sm="18"
                      :lg="12"
                      :xl="10">
                <el-form-item label="入口页面url"
                              prop="roleName">
                  <el-input v-model="formData.roleName"
                            placeholder="请输入入口页面url"></el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-dialog title="选择图标"
                       :visible.sync="dialogIconsVisible">
              <el-table>
                <el-table-column property="date"
                                 label="日期"
                                 width="150"></el-table-column>
                <el-table-column property="name"
                                 label="姓名"
                                 width="200"></el-table-column>
                <el-table-column property="address"
                                 label="地址"></el-table-column>
              </el-table>
            </el-dialog>
            <el-row>
              <el-col class="el-form-col-block"
                      :xs="2"
                      :sm="3"
                      :lg="6"
                      :xl="7"></el-col>
              <el-col :xs="20"
                      :sm="18"
                      :lg="12"
                      :xl="10">
                <el-form-item label="图标"
                              prop="iconSet">
                  <el-button size="mini"
                             type="primary"
                             @click="dialogIconsVisible = true">选择图标</el-button>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row v-if="isLeaf">
              <el-col class="el-form-col-block"
                      :xs="2"
                      :sm="3"
                      :lg="6"
                      :xl="7"></el-col>
              <el-col :xs="20"
                      :sm="18"
                      :lg="12"
                      :xl="10">
                <el-form-item label="按钮">
                  <el-select v-model="value">
                    <el-option label="区域一"
                               value="shanghai"></el-option>
                    <el-option label="区域二"
                               value="beijing"></el-option>
                  </el-select>
                </el-form-item>
              </el-col>
            </el-row>

            <el-row class="editor-container">
              <el-col class="el-form-col-block"
                      :xs="2"
                      :sm="3"
                      :lg="6"
                      :xl="7"></el-col>
              <el-col :xs="20"
                      :sm="18"
                      :lg="12"
                      :xl="10">
                <el-form-item label="备注"
                              prop="remark">
                  <el-input class="input-textarea"
                            maxlength="500"
                            :autosize="{ minRows: 6, maxRows: 16}"
                            placeholder="请输入备注"
                            v-model="formData.remark"
                            show-word-limit
                            type="textarea">
                  </el-input>
                </el-form-item>
              </el-col>
            </el-row>
            <el-row class="form-content-submit">
              <el-col class="el-form-col-block"
                      :xs="2"
                      :sm="3"
                      :lg="6"
                      :xl="7"></el-col>
              <el-col :xs="20"
                      :sm="18"
                      :lg="12"
                      :xl="10">
                <el-form-item>
                  <el-button type="warning"
                             icon="el-icon-close"
                             @click=""> 清 空 </el-button>
                  <el-button type="success"
                             icon="el-icon-tickets"
                             @click=""> 确 定 </el-button>
                </el-form-item>
              </el-col>
            </el-row>
          </el-form>
        </div>
      </el-container>

    </el-container>
  </div>
</template>

<script>
// function
// import { isEmpty } from '@/utils'
// components
import TableGrid from '@/components/TableGrid'
import VueTree from '@/components/Tree/menuTree.vue'
import DialogTransfer from '@/components/DialogTransfer'
// api

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
      formData: {
        // 默认状态
        roleStatus: 1
      },
      formRules: {},
      dialogIconsVisible: false,
      // 表格url
      organUrl: '',
      // 配置人员关联
      transferInitUrl: '',
      // 测试
      value: '',
      // 是否是叶子节点
      isLeaf: false
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
      if (param.organizationType === 'root') {
        this.isLeaf = false
      } else {
        this.isLeaf = true
      }
      // 根据节点的organizationCode -> 更新dialogTransfer的用户绑定情况
      const transferInitUrl = '/user/selectOrganizationUserTransfer'
      this.transferInitUrl = transferInitUrl + '/' + this.param.organizationCode
      this.refreshTable()
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
.right-panel-title {
  height: 30px;
  line-height: 30px;
  background: #8cc5ff;
  color: white;
  font-size: 16px;
  font-weight: 700;
  width: 100%;
  text-align: center;
  margin-bottom: 15px;
}
[class*='el-col-'] {
  margin: 0 auto;
}
</style>
