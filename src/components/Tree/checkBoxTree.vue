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
             :default-expanded-keys="[1,1.1]"
             empty-text=""
             @check="nodeCheck">
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
    };
  },
  created() {
    console.log(this.checkBoxItems);
  },
  methods: {
    nodeCheck(data, check) {
      console.log(check);
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

