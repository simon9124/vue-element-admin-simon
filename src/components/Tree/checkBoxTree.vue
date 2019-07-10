<!--
  树形组件 - checkBox
-->
<template>
  <div class="checkbox-tree-container">
    <el-tree :data="checkBoxItems"
             show-checkbox
             node-key="id"
             :indent="25"
             accordion
             :default-expanded-keys="[1.1]">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: 'CheckboxTree',
  props: {
    checkBoxItems: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isChecked: false
      // checkBoxItems: [
      //   {
      //     id: 1,
      //     label: '权限',
      //     children: [
      //       {
      //         id: 1.1,
      //         label: '用户管理',
      //         children: [
      //           {
      //             label: '新增'
      //           },
      //           {
      //             label: '查看'
      //           },
      //           {
      //             label: '修改'
      //           },
      //           {
      //             label: '删除'
      //           }
      //         ]
      //       },
      //       {
      //         label: '文章管理',
      //         children: [
      //           {
      //             label: '新增'
      //           },
      //           {
      //             label: '查看'
      //           },
      //           {
      //             label: '修改'
      //           },
      //           {
      //             label: '删除'
      //           }
      //         ]
      //       },
      //       {
      //         label: '代码管理',
      //         children: [
      //           {
      //             label: '新增'
      //           },
      //           {
      //             label: '查看'
      //           },
      //           {
      //             label: '修改'
      //           },
      //           {
      //             label: '删除'
      //           }
      //         ]
      //       },
      //       {
      //         label: '角色管理',
      //         children: [
      //           {
      //             label: '新增'
      //           },
      //           {
      //             label: '查看'
      //           },
      //           {
      //             label: '修改'
      //           },
      //           {
      //             label: '删除'
      //           }
      //         ]
      //       }
      //     ]
      //   }
      // ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style rel="stylesheet/scss" lang="scss">
.checkbox-tree-container /deep/ {
  .el-tree {
    min-width: 400px;
    .el-tree-node__content {
      height: 35px;
    }
    .el-tree-node__children {
      .el-tree-node__children {
        height: 35px;
        .el-tree-node {
          display: inline-block;
          width: 80px;
        }
      }
    }
  }
}
</style>

