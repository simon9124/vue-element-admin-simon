<!--
  树形组件 - checkBox
-->
<template>
  <div class="checkbox-tree-container">
    <el-tree :data="checkBoxItems"
             show-checkbox
             node-key="id"
             :indent="25"
             :default-expanded-keys="defaultExpandedKeys"
             :default-checked-keys="defaultCheckedKeys"
             empty-text=""
             @check="nodeCheck"
             @check-change="nodeCheckChange">
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
      </span>
    </el-tree>
  </div>
</template>
<script>
export default {
  name: "CheckboxTree",
  props: {
    // 选项
    checkBoxItems: {
      type: Array,
      default: () => []
    },
    // 默认展开项
    defaultExpandedKeys: {
      type: Array,
      default: () => []
    },
    // 被选中的项
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {};
  },
  methods: {
    // 当有选项被选中/被取消选中 -> 将数据传递给父组件
    nodeCheck(data, check) {
      this.$emit("checkNodes", check.checkedNodes);
    },
    // 被选中/取消选中的选项 -> 将数据传递给父组件
    nodeCheckChange(data, check, child) {
      if (child === false && check === true) {
        this.$emit("addCheckNodes", data);
      } else if (child === false && check === false) {
        this.$emit("minCheckNodes", data);
      }
    }
  }
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
        padding-left: 50px;
        .el-tree-node {
          display: inline-block;
          width: 80px;
          .el-tree-node__content {
            padding-left: 0 !important;
          }
        }
      }
    }
  }
}
</style>

