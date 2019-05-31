<!--
  封装Select组件
  type: 选择查询业务类型 enable/city/gender等 需要与后台沟通
  defaultSelected: 默认选中值
  showAllLabel: 自定义不限文本
  isAll: 是否显示不限 默认不显示:false
  @selectChangeCallBack="handleParamsChange" 父组件接收change事件回调
-->
<template>
  <el-select v-model="value"
             filterable
             placeholder="请选择"
             :type="type"
             :showAllLabel="showAllLabel"
             :defaultSelected="defaultSelected"
             :model="model"
             :loading="loading"
             :disabled="disabled"
             @change="handleSelectChange">
    <el-option :label="showAllLabel"
               value=""
               v-if="isAll">
    </el-option>
    <el-option v-for="item in options"
               :key="item.value"
               :label="item.label"
               :value="item.value"
               v-if="options.length > 0">
    </el-option>
  </el-select>
</template>
<script>
import { select } from '@/api/components/component'

export default {
  name: 'ComponentSelect',
  data() {
    return {
      // 数据行
      options: [],
      value: '',
      loading: false
    }
  },
  created() {
    // console.log('defaultSelected:' + this.defaultSelected)
    // console.log(this.showAllLabel)
    this.loading = true
    select(this.type, this.model)
      .then(result => {
        this.options = result.data.options
        this.value = this.defaultSelected
        this.loading = false
      })
      .catch(() => {
        this.loading = false
      })
  },
  props: {
    type: {
      // 选择查询业务类型 enable/city/gender等 需要与后台沟通
      String,
      required: true,
      default: 'enable'
    },
    defaultSelected: {
      // 默认选中值
      String,
      default: ''
    },
    showAllLabel: {
      // 自定义不限文本
      String,
      default: '不限'
    },
    model: {
      // 后台查询类型
      String,
      default: 'model'
    },
    isAll: {
      // 是否显示不限 默认不显示
      Boolean,
      default: false
    },
    disabled: {
      // 是否禁用
      Boolean,
      default: false
    }
  },
  methods: {
    handleSelectChange(value) {
      // console.debug(value)
      this.$emit('selectChangeCallBack', value)
    }
  }
}
</script>

