<!--
  封装cascader组件
  type: 选择查询业务类型 mediaType/area等 需要与后台沟通
  defaultSelected: 默认选中值
  isAll: 是否显示不限 默认不显示:false
  @selectChangeCallBack="handleParamsChange" 父组件接收change事件回调
-->
<template>
  <el-cascader v-model="value"
               placeholder="请选择"
               :options="options"
               :type="type"
               :module="module"
               :defaultSelected="defaultSelected"
               :is-all="isAll"
               :key-word="keyWord"
               expand-trigger="hover"
               @change="handleCascaderChange">
  </el-cascader>
</template>
<script>
import { cascader, cascaderByKeyWord } from '@/api/components/component'
export default {
  name: 'ComponentCascader',
  data() {
    return {
      // 数据行
      options: [],
      // 默认选中
      value: []
    }
  },
  created() {
    // console.log('type:' + this.type)
    if (this.keyWord) {
      cascaderByKeyWord(this.type, this.module, this.keyWord).then(result => {
        this.options = result.data.options
        this.value = this.defaultSelected.split(',')
        // console.debug(this.options)
        // console.debug(this.value)
      })
    } else {
      cascader(this.type, this.module).then(result => {
        this.options = result.data.options
        this.value = this.defaultSelected.split(',')
        // console.debug(this.options)
        // console.debug(this.value)
      })
    }
  },
  props: {
    type: {
      // 选择查询业务类型 mediaType/area等 需要与后台沟通
      String,
      required: true,
      default: ''
    },
    defaultSelected: {
      // 默认选中值
      String,
      default: ''
    },
    keyWord: {
      // 查询条件
      String,
      default: '',
      required: false
    },
    module: {
      // 调用模块
      String,
      default: 'media',
      required: false
    },
    isAll: {
      // 是否显示不限 默认不显示
      Boolean,
      default: false
    }
  },
  methods: {
    handleCascaderChange(value) {
      // console.debug(value)
      this.$emit('cascaderChangeCallBack', value)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
.el-cascader__label {
  margin-top: 0px !important;
  margin-bottom: 0px !important;
}
</style>

