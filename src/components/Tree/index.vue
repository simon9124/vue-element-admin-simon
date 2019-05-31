<template>
  <div :init-tree-url="initTreeUrl"
       :del-tree-url="delTreeUrl"
       :update-tree-url="updateTreeUrl"
       :insert-tree-url="insertTreeUrl"
       :is-edit="isEdit"
       :is-multiple="isMultiple"
       :style="styleClass">
    <!--
      https://github.com/zdy1988/vue-jstree/blob/master/README-CN.md
      data	Array		              设置树的数据源
      size	String		            设置树节点的大小, 可选值 : 'large' or '' or ''small'
      show-checkbox	    Boolean	false	设置是否显示选择框
      allow-transition	Boolean	true	设置是否允许使用过渡效果
      whole-row	        Boolean	false	设置是否整个树节点高亮
      no-dots	  Boolean	false	设置是否显示树节点前的虚线
      collapse	Boolean	false	设置节点全部展开或合并的初始值，不设置按节点自身的 opened 属性控制
      is-multiple	Boolean	false	设置是否可以多选
      allow-batch	Boolean	false	设置允许批量选择子节点
      treeName-field-name	String	'treeName'	设置 文字 的字段名称，默认为 treeName
      value-field-name	String	'value'	设置 值 的字段名称，默认为 value
      children-field-name	String	'children'	设置 子节点 的字段名称，默认为 children
      item-events	Object	{}	注册任意事件到每个数节点上, 例子
      async	Function		异步加载数据的回调函数 , 如果当前节点没有子项 ,设置树节点中的 'isLeaf: true' 可不现实 + 号
      loading-treeName	String	'Loading'	设置 Loading 文字
      draggable	Boolean	false	设置是否启用拖拽 , 默认全部节点可拖拽, 如自定义个别节点禁用拖拽或禁用拖放可设置 'dragDisabled: true' 和 'dropDisabled: true'
      drag-over-background-color	String	'#C9FDC9'	设置拖拽进入节点时的背景色
      klass	String		设置追加 class
      type-field:   节点类型 根节点:root/子节点:leaf
      parent-field: 父节点替换字段
      isEdit: 是否可编辑
    -->
    <div @contextmenu.prevent="isEdit?$refs.ctx.open($event):''"
         v-loading="treeLoading">
      <v-jstree :ref="id"
                :data="data"
                :show-checkbox="showCheckbox"
                :text-field-name="treeNameFieldName"
                :value-field-name="valueFieldName"
                :type-field="typeField"
                :parent-field="parentField"
                :root-code="rootCode"
                :multiple="isMultiple"
                @item-click="itemClick">
      </v-jstree>
    </div>

    <!--右键菜单-->
    <context-menu id="ctx"
                  ref="ctx"
                  v-if="isEdit">
      <li class="ctx-header"></li>
      <li class="ctx-item"
          @click="showDialog(true)">新增子目录</li>
      <li class="ctx-item"
          @click="showDialog(false)">重命名</li>
      <li class="ctx-sperator">
        <hr>
      </li>
      <li class="ctx-item"
          @click="deleteTreeNode">删除</li>
      <li class="ctx-sperator">
        <hr>
      </li>
      <li class="ctx-item"
          @click="refreshTree">刷新</li>
    </context-menu>

    <!--重命名-->
    <el-dialog :title="dialogTitle"
               :visible.sync="dialogVisible">
      <el-form :model="activeNode"
               @submit.native.prevent>
        <el-form-item label="名称">
          <el-input v-model="activeNode.treeName"
                    @keyup.enter.native="submit"></el-input>
          <!-- autocomplete="off" -->
        </el-form-item>
      </el-form>
      <div slot="footer"
           class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary"
                   @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { request, isEmpty } from '@/utils'
import contextMenu from 'vue-context-menu'
import VJstree from 'vue-jstree'

export default {
  name: 'VueTree',
  components: {
    VJstree,
    contextMenu
  },
  data() {
    return {
      treeLoading: false,
      dialogVisible: false,
      // 当前选中节点
      activeNode: {
        treeCode: '',
        treeName: '',
        treeType: ''
      },
      // 全部选中的节点
      checkedNodes: [],
      // request参数
      requestParam: {},
      // 是否为新增子文件夹
      isAdd: true,
      dialogTitle: '新增',
      // 树数据
      data: [
        // {
        //   'organizationLabel': '组织结构',
        //   'opened': true,
        //   'selected': true,
        //   'children': [{
        //     'organizationLabel': '1',
        //     'opened': true,
        //     'children': [{
        //       'organizationLabel': '2'
        //     }]
        //   }]
        // }
      ]
    }
  },
  props: {
    id: {
      String,
      default: 'tree',
      required: false
    },
    styleClass: {
      Object,
      default: function() {
        return {}
      },
      required: false
    },
    showCheckbox: {
      Boolean,
      default: true
    },
    treeNameFieldName: {
      String,
      default: 'treeName'
    },
    valueFieldName: {
      String,
      default: 'treeCode'
    },
    typeField: {
      String,
      default: 'treeType'
    },
    parentField: {
      String,
      default: 'treeParentCode'
    },
    rootCode: {
      String,
      default: 'treeRoot',
      required: false
    },
    initTreeUrl: {
      String,
      default: '',
      required: true
    },
    delTreeUrl: {
      String,
      default: '',
      required: false
    },
    updateTreeUrl: {
      String,
      default: '',
      required: false
    },
    insertTreeUrl: {
      String,
      default: '',
      required: false
    },
    isEdit: {
      Boolean,
      default: true,
      required: false
    },
    isMultiple: {
      Boolean,
      default: false,
      required: false
    }
  },
  watch: {
    isEdit: function(curVal) {
      this.isEdit = curVal
    },
    isMultiple: function(curVal) {
      this.isMultiple = curVal
    },
    initTreeUrl: function(curVal) {
      this.initTreeUrl = curVal
      this.refreshTree()
    }
  },
  created() {
    this.refreshTree()
  },
  methods: {
    itemClick(node, item) {
      this.activeNode.treeCode = item[this.valueFieldName]
      this.activeNode.treeName = item[this.treeNameFieldName]
      this.activeNode.treeType = item[this.typeField]
      this.activeNode.id = item.id
      const params = {}
      params[this.valueFieldName] = item[this.valueFieldName]
      params[this.treeNameFieldName] = item[this.treeNameFieldName]
      params[this.typeField] = item[this.typeField]
      params['treeLevel'] = item.treeLevel
      if (this.isMultiple) {
        // 多选对应
        if (item.selected) {
          // 追加元素
          this.checkedNodes.push(params)
        } else {
          // 删除元素
          for (let i = 0; i < this.checkedNodes.length; i++) {
            if (
              this.checkedNodes[i][this.valueFieldName] ===
              item[this.valueFieldName]
            ) {
              this.checkedNodes.splice(i, 1)
            }
          }
        }
      } else {
        // 单选
        this.checkedNodes = [params]
        // 清除其他节点选中
        const children = this.$refs[this.id].$children
        if (children && children.length > 0) {
          this.handleRecursionNodeChilds(children[0])
        }
      }
      // 当前选中的节点
      this.$emit('click-node', params)
      this.$emit('checked-nodes', this.checkedNodes)
    },
    handleRecursionNodeChilds(node) {
      if (node && node.$children && node.$children.length > 0) {
        for (const childNode of node.$children) {
          childNode.isHover = true
          childNode.isHover = false
          this.handleRecursionNodeChilds(childNode)
        }
      }
    },
    showDialog(isAdd) {
      this.isAdd = isAdd
      // 新增
      if (this.isAdd) {
        this.dialogTitle = `在【${this.activeNode.treeName}】下新增下级目录`
      } else {
        // if (this.isAvailableNode()) {
        //   return
        // }
        this.dialogTitle = `重命名【${this.activeNode.treeName}】目录名`
      }
      this.dialogVisible = true
    },
    deleteTreeNode() {
      if (this.isAvailableNode()) {
        return
      }
      this.$confirm(
        `确定删除 【${this.activeNode.treeName}】及下面所有内容?`,
        '提示',
        {
          confirmButtontreeName: '确定',
          cancelButtontreeName: '取消',
          type: 'warning'
        }
      )
        .then(() => {
          this.treeLoading = true
          const split =
            this.delTreeUrl.charAt(this.delTreeUrl.length - 1) === '/'
              ? ''
              : '/'
          request({
            url: this.delTreeUrl + split + this.activeNode.treeCode,
            method: 'delete'
          })
            .then(() => {
              this.refreshTree()
            })
            .finally(() => {
              this.treeLoading = false
            })
        })
        .catch(() => {})
    },
    isAvailableNode() {
      if (isEmpty(this.activeNode) || isEmpty(this.activeNode.treeCode)) {
        this.$alert('请选择需要操作的文件夹')
        return true
      } else {
        if (this.activeNode.treeType === 'root') {
          this.$message({
            message: '不可删除根目录',
            type: 'warning'
          })
          // this.$alert('请勿操作根目录')
          return true
        }
      }
      return false
    },
    // 获取树数据
    refreshTree() {
      this.treeLoading = true
      request({
        url: this.initTreeUrl,
        method: 'get'
      })
        .then(result => {
          this.data = result.data.tree
          // console.debug('refreshTree:' + JSON.stringify(result.data.tree))
          if (!isEmpty(result.data.tree) && result.data.tree.length > 0) {
            this.activeNode.treeCode = result.data.tree[0][this.valueFieldName]
            this.activeNode.treeName =
              result.data.tree[0][this.treeNameFieldName]
            this.activeNode.treeType = result.data.tree[0][this.typeField]
          }
        })
        .finally(() => {
          this.treeLoading = false
        })
    },
    submit() {
      this.treeLoading = true
      const param = {}
      param[this.treeNameFieldName] = this.activeNode.treeName
      if (this.isAdd) {
        // 新增
        param[this.parentField] = this.activeNode.treeCode
        param[this.typeField] = 'leaf'
        request({
          url: this.insertTreeUrl,
          method: 'post',
          data: param
        })
          .then(() => {
            this.refreshTree()
          })
          .finally(() => {
            this.treeLoading = true
            this.dialogVisible = false
          })
      } else {
        param[this.valueFieldName] = this.activeNode.treeCode
        // 更新
        request({
          url: this.updateTreeUrl,
          method: 'put',
          data: param
        })
          .then(() => {
            this.refreshTree()
          })
          .finally(() => {
            this.treeLoading = true
            this.dialogVisible = false
          })
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/context-menu.scss';

.tree /deep/ {
  .el-input {
    width: 500px;
  }
  .ctx-sperator {
    list-style-type: none;
    margin: 0 10px 0 10px;
  }
}
</style>
