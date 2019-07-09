<template>
  <div class="container">
    <!-- 页内容 -->
    <div class="content">
      <div class="content-spe">
        <p class="content-spe-title">菜单管理</p>
        <div class="content-spe-element">
          <div class="leftPart">
            <el-input placeholder="输入关键字进行过滤"
                      v-model="filterText"
                      class="searchInput"></el-input>
            <el-tree class="filter-tree"
                     :data="data"
                     :props="defaultProps"
                     :show-checkbox="false"
                     node-key="id"
                     :expand-on-click-node="false"
                     :highlight-current="true"
                     :filter-node-method="filterNode"
                     ref="menuTree"
                     @node-click="handleNodeClick"
                     draggable>
              <span class="custom-tree-node"
                    slot-scope="{ node, data }">
                <span>{{ node.label }}</span>
                <span>
                  <el-button type="text"
                             size="mini"
                             @click="() => append(data)">
                    <i class="el-icon-circle-plus-outline" />
                  </el-button>
                  <el-button type="text"
                             size="mini"
                             @click="() => remove(node, data)">
                    <i class="el-icon-remove-outline" />
                  </el-button>
                </span>
              </span>
            </el-tree>
          </div>
          <div class="rightPart">
            <el-form label-position="right"
                     label-width="150px"
                     :model="menuEditForm"
                     ref="menuEditForm">
              <el-form-item label="菜单路由"
                            prop="path">
                <el-input v-model="menuEditForm.path"
                          :disabled="formDisable"></el-input>
              </el-form-item>
              <el-form-item label="页面组件"
                            prop="component">
                <el-input v-model="menuEditForm.component"
                          :disabled="formDisable"></el-input>
              </el-form-item>
              <el-form-item label="重定向路径"
                            v-if="isRoot"
                            prop="redirect">
                <el-input v-model="menuEditForm.redirect"
                          :disabled="formDisable"></el-input>
              </el-form-item>
              <el-form-item label="菜单名称(中文)"
                            prop="label">
                <el-input v-model="menuEditForm.label"
                          :disabled="formDisable"></el-input>
              </el-form-item>
              <el-form-item label="唯一标识(英文)"
                            v-if="isSub"
                            prop="name">
                <el-input v-model="menuEditForm.name"></el-input>
              </el-form-item>
              <el-form-item label="页面标题"
                            prop="meta.title">
                <el-input v-model="menuEditForm.meta.title"
                          :disabled="formDisable"></el-input>
              </el-form-item>
              <el-form-item label="是否总是显示"
                            v-if="isRoot"
                            prop="alwaysShow">
                <el-switch v-model="menuEditForm.alwaysShow"></el-switch>
              </el-form-item>
              <el-form-item label="访问权限"
                            v-if="isRoot"
                            prop="meta.roles">
                <el-input v-model="menuEditForm.meta.roles"
                          @focus="showTransferHandler"></el-input>
              </el-form-item>
              <el-form-item label="是否隐藏"
                            v-if="isSub"
                            prop="hidden">
                <el-switch v-model="menuEditForm.hidden"></el-switch>
              </el-form-item>
              <el-form-item>
                <el-button type="primary"
                           @click="onSubmit">保存</el-button>
                <el-button @click="reset()">重置</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </div>

      <!--绑定访问权限-->
      <dialog-transfer ref="dialogTransfer"
                       :init-url="transfer.url"
                       :titles="transfer.titles"
                       :filter-placeholder="transfer.filterPlaceholder"
                       :is-multiple="transfer.isMultiple"
                       @submit="dialogSubmit">
      </dialog-transfer>
    </div>
  </div>
</template>

<script>
import { selectSettingByKey, update } from '@/api/settings/settings';
import { DialogTransfer } from 'ctsi-vue-dialog';
import { isEmpty } from '@/utils';

export default {
  name: 'MenuEdit',
  components: {
    DialogTransfer
  },
  watch: {
    filterText(val) {
      this.$refs.menuTree.filter(val);
    }
  },
  created() {
    this.init();
  },
  data() {
    return {
      // 筛选条件
      filterText: '',
      // 树
      data: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      // 菜单编辑表单
      menuEditForm: {
        id: '',
        path: '',
        component: '',
        redirect: '',
        label: '',
        name: '',
        alwaysShow: true,
        meta: {
          title: '',
          icon: '',
          roles: ''
        },
        hidden: false
      },
      // 是否为子节点(二级菜单)
      isSub: false,
      // 是否为根节点(一级菜单)
      isRoot: false,
      // 路由数据
      routeData: '',
      // 表单数据
      formData: {
        settingId: '',
        settingCode: '',
        settingKey: 'menu',
        settingValue: ''
      },
      // 节点ID
      nodeId: 1,
      // 表单是否禁用
      formDisable: false,
      // 是否通过校验
      flag: true,
      // 穿梭框参数
      transfer: {
        url: '',
        titles: ['全部角色', '已绑定角色'],
        filterPlaceholder: '选择绑定角色',
        isMultiple: true
      }
    };
  },
  methods: {
    init() {
      // 初始化树结构
      selectSettingByKey('menu').then(result => {
        if (result.data.settingValue) {
          this.routeData = JSON.parse(result.data.settingValue);
          if (this.routeData) {
            let treeDataArr = [];
            treeDataArr = this.recursionTree(this.routeData, null, 0);
            this.data = JSON.parse(JSON.stringify(treeDataArr));
          }
        }
        this.formData.settingId = result.data.settingId;
        this.formData.settingCode = result.data.settingCode;
        this.formData.settingValue = result.data.settingValue;
      });
    },
    recursionTree(nodeData, treeNode, fId) {
      // 递归树
      if (!isEmpty(nodeData)) {
        const currentTreeData = [];
        nodeData.forEach(n => {
          const treeObj = {
            meta: {
              title: '',
              icon: '',
              roles: ''
            }
          };
          // console.log(n)
          treeObj.id = this.nodeId.toString();
          treeObj.path = n.path;
          treeObj.component = n.component;
          if (n.redirect) {
            treeObj.redirect = n.redirect;
          }
          treeObj.label = n.label;
          if (n.name) {
            treeObj.name = n.name;
          }
          treeObj.alwaysShow = n.alwaysShow;
          if (n.meta.title) {
            treeObj.meta.title = n.meta.title;
          }
          if (n.meta.icon) {
            treeObj.meta.icon = n.meta.icon;
          }
          if (n.meta.roles) {
            treeObj.meta.roles = n.meta.roles;
          }
          treeObj.hidden = n.hidden;
          currentTreeData.push(treeObj);
          this.nodeId++;
          if (n.children && n.children.length > 0) {
            this.recursionTree(n.children, currentTreeData, treeObj.id);
          }
        });
        if (treeNode) {
          treeNode.forEach(e => {
            if (e.id === fId) {
              e.children = currentTreeData;
            }
          });
        }
        return currentTreeData;
      }
    },
    append(data) {
      // 树结构增加子节点
      if (data.hasOwnProperty('children')) {
        const newChild = {
          id: this.nodeId++,
          path: '',
          component: 'Layout',
          label: 'new menu',
          name: '',
          meta: {
            title: ''
          },
          hidden: false
        };
        data.children.push(newChild);
      } else {
        this.$alert('不允许创建三级及三级以上子菜单');
        return false;
      }
    },
    remove(node, data) {
      // 树结构移除子节点
      this.$confirm('此操作将永久删除该菜单, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          const parent = node.parent;
          const children = parent.data.children || parent.data;
          const index = children.findIndex(d => d.id === data.id);
          children.splice(index, 1);
          const submitTreeData = '[' + JSON.stringify(parent.data) + ']';
          this.formData.settingValue = submitTreeData;
          update(this.formData).then(result => {
            this.init();
          });
        })
        .catch(() => {
          this.$message({
            type: 'warning',
            message: '已取消'
          });
        });
    },
    filterNode(value, data) {
      // 筛选查询
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      // 点击节点时，显示节点信息
      this.reset();
      if (data.hasOwnProperty('children')) {
        this.isRoot = true;
        this.isSub = false;
      } else {
        this.isRoot = false;
        this.isSub = true;
      }
      this.menuEditForm.id = data.id;
      this.menuEditForm.path = data.path;
      this.menuEditForm.component = data.component;
      if (data.redirect) {
        this.menuEditForm.redirect = data.redirect;
      }
      this.menuEditForm.label = data.label;
      this.menuEditForm.name = data.name;
      this.menuEditForm.alwaysShow = data.alwaysShow;
      if (!isEmpty(data.meta.title)) {
        this.menuEditForm.meta.title = data.meta.title;
      }
      this.menuEditForm.meta.icon = data.meta.icon;
      this.menuEditForm.meta.roles = data.meta.roles;
      this.menuEditForm.hidden = data.hidden;
      if (data.label === '用户菜单') {
        this.formDisable = true;
      } else {
        this.formDisable = false;
      }
      if (data.label === 'new menu') {
        this.isRoot = false;
        this.isSub = true;
        this.menuEditForm.component = '';
        this.menuEditForm.label = 'new Menu';
        this.menuEditForm.meta.title = '';
      }
    },
    onSubmit() {
      // 保存
      this.menuEditForm2Data(this.menuEditForm.id, this.data);
      if (this.flag) {
        const submitTreeData = JSON.stringify(this.data);
        this.formData.settingValue = submitTreeData;
        update(this.formData).then(() => {
          this.init();
        });
      }
    },
    reset() {
      // 重置
      this.$refs['menuEditForm'].resetFields();
    },
    menuEditForm2Data(id, data) {
      // 拼接json
      var bingo = false;
      data.forEach(n => {
        if (n.id === id) {
          n.path = this.menuEditForm.path;
          n.component = this.menuEditForm.component;
          n.alwaysShow = this.menuEditForm.alwaysShow;
          n.label = this.menuEditForm.label;
          n.name = this.menuEditForm.name;
          n.meta.title = this.menuEditForm.meta.title;
          n.meta.roles = this.menuEditForm.meta.roles;
          n.hidden = this.menuEditForm.hidden;
          bingo = true;
        } else if (!isEmpty(n.name) && n.name === this.menuEditForm.name) {
          this.init();
          this.$alert('相同的自定义菜单名称已存在');
          this.flag = false;
          return false;
        } else if (!bingo && n.children) {
          this.menuEditForm2Data(id, n.children);
        } else {
          this.flag = true;
          return;
        }
      });
    },
    showTransferHandler() {
      // 显示穿梭框
      this.transfer.url = '/user/role/selectMenuRolesTransfer';
      this.$refs.dialogTransfer.showDialog();
    },
    dialogSubmit(params) {
      // 提交穿梭框
      var roles = '';
      var rolesArray = params.value.join(',').split(',');
      for (var i in rolesArray) {
        roles += "'" + rolesArray[i] + "'" + ',';
      }
      if (roles.length > 0) {
        roles = roles.substring(0, roles.length - 1);
      }
      this.menuEditForm.meta.roles = '[' + roles + ']';
      this.$refs.dialogTransfer.closeDialog();
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import "~@/styles/smart-ui/smart-ui.scss";
.container /deep/ {
  .content-spe {
    min-height: 820px !important;
  }
  .leftPart {
    width: 30%;
    float: left;
  }
  .searchInput {
    margin-bottom: 10px;
  }
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .rightPart {
    margin-left: 30%;
  }
  .el-form-item--medium {
    height: 30px;
    width: 70%;
    margin-left: 80px;
  }
  .transfer-panel {
    height: 400px !important;
  }
  .el-transfer-panel__body {
    height: 360px;
    .el-transfer-panel__list {
      height: 328px;
    }
  }
}
</style>
