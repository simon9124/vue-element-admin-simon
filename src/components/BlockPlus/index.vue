<!--递归组件
  * 需注意，props接收传值的同时，再给自身绑定1次
-->

<template>
  <div v-loading="blockLoading"
       class="block-plus">
    <el-form-item>
      <i :class="!child.isExpanded ? 'el-icon-plus' : 'el-icon-minus'"
         @click="toggleExpanded">
      </i>
    </el-form-item>
    <el-form-item label="子流程名称"
                  class="block-plus-form"
                  style="minWidth:150px">
      <span>{{ child.name }}</span>
    </el-form-item>
    <el-form-item label="最后更新时间"
                  class="block-plus-form">
      <span>{{ child.lastUpdateTime }}</span>
    </el-form-item>
    <el-form-item>
      <template slot-scope="scope">
        <el-tag type="danger"
                v-if="typeof child.deploymentId !== 'string'">未部署</el-tag>
        <el-tag type="success"
                v-else>已部署</el-tag>
      </template>
    </el-form-item>
    <el-form-item>
      <el-tooltip content="编辑"
                  placement="left">
        <el-button plain
                   icon="el-icon-edit"
                   size="mini"
                   type="primary"
                   @click="editHandler(child)"></el-button>
      </el-tooltip>
      <!-- 远近景视图按钮 -->
      <show-model :modelId="child.id"
                  :tooltip="true"
                  placement="right"></show-model>
      <!-- <el-tooltip content="解绑"
                  placement="right">
        <el-button plain
                   icon="el-icon-s-release"
                   size="mini"
                   type="info"
                   @click="delHandler(child)"></el-button>
      </el-tooltip> -->
    </el-form-item>

    <!-- 绑定了子流程：循环childList -->
    <template v-for="(child,i) in child.childList"
              v-if="child.childList && child.childList.length!=='0'">
      <BlockPlus :child="child"
                 :selectChildUrl="selectChildUrl"
                 v-if="blockShow"
                 style="margin-left:10px"></BlockPlus>
    </template>

  </div>
</template>

<script>
import { request, params } from '@/utils'
import BlockPlus from '@/components/BlockPlus'
import ShowModel from '@/components/ComponentButton/showModel'
// import {
//  unBindProcessModelById
// } from '@/api/process/process'

export default {
  name: 'BlockPlus',
  components: { BlockPlus, ShowModel },
  data() {
    return {
      // 节点id
      id: '',
      // loading
      blockLoading: false,
      // 控制树的展开与否
      blockShow: false,
      // 主流程id
      mainId: ''
    }
  },
  props: {
    child: {
      type: Object,
      default: {},
      required: true
    },
    // 接口：查询模型的所有的子流程及子子流程（不分页）
    selectChildUrl: {
      type: String,
      default: '/process/actremodel/selectChildModelByModelId/',
      required: false
    },
    // 是否显示编辑按钮 默认不显示
    isShowEdit: {
      type: Boolean,
      default: false,
      required: false
    },
    // 是否显示删除按钮 默认不显示
    isShowDel: {
      type: Boolean,
      default: false,
      required: false
    }
  },
  create() {
    // 接收流程参数 & 页面初始化
    this.mainId = params(this, 'mainId')
  },
  methods: {
    // 点击+号
    toggleExpanded() {
      this.blockLoading = true
      console.log(this.child)
      this.id = this.child.id
      request({
        url: this.selectChildUrl + this.id,
        method: 'get'
      })
        .then(result => {
          // console.log(result)
          // 根据result的值，为this.child添加childList项
          this.child['childList'] = result.data.actReModelList
        })
        .finally(() => {
          this.child.isExpanded = !this.child.isExpanded
          this.blockLoading = false
          this.blockShow = !this.blockShow
        })
    },
    editHandler(row) {
      this.$router.push({
        path: '/processManager/process-edit',
        name: 'process-edit',
        params: {
          modelId: row.id
        }
      })
    },
    delHandler(row) {
      // console.log(row)
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
