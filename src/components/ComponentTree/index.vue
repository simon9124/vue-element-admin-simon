<template>
  <div class="container">
    <el-tree :data="treeData"
             show-checkbox
             node-key="id"
             default-expand-all
             auto-expand-parent:false>
      <span class="custom-tree-node"
            slot-scope="{ node, data }">
        <span>{{ node.label }}</span>
        <span class="tree-node-operation">
          <el-button type="text"
                     size="mini"
                     @click.stop="() => append(data)">
            添加子分支
          </el-button>
          <el-button type="text"
                     size="mini"
                     @click.stop="() => remove(node, data)">
            删除
          </el-button>
        </span>
      </span>
    </el-tree>
  </div>

</template>

<script>
let id = 1000

export default {
  data() {
    const data = [
      {
        id: 1,
        label: '一级 1',
        children: [
          {
            id: 4,
            label: '二级 1-1',
            children: [
              {
                id: 9,
                label: '三级 1-1-1'
              },
              {
                id: 10,
                label: '三级 1-1-2'
              }
            ]
          }
        ]
      },
      {
        id: 2,
        label: '一级 2',
        children: [
          {
            id: 5,
            label: '二级 2-1'
          },
          {
            id: 6,
            label: '二级 2-2'
          }
        ]
      },
      {
        id: 3,
        label: '一级 3',
        children: [
          {
            id: 7,
            label: '二级 3-1'
          },
          {
            id: 8,
            label: '二级 3-2'
          }
        ]
      }
    ]
    return {
      treeData: JSON.parse(JSON.stringify(data))
    }
  },
  created() {
    // console.log(this.treeData)
  },
  methods: {
    append(data) {
      const newChild = { id: id++, label: '新增节点', children: [] }
      if (!data.children) {
        this.$set(data, 'children', [])
      }
      data.children.push(newChild)
    },

    remove(node, data) {
      const parent = node.parent
      const children = parent.data.children || parent.data
      const index = children.findIndex(d => d.id === data.id)
      children.splice(index, 1)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
.el-tree {
  padding: 20px;
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
    &-operation {
      display: none;
    }
  }
}
</style>
