<!--
  封装Select组件
  url: 选择查询url
  defaultSelected: 默认选中值
  showAllLabel: 自定义不限文本
  isAll: 是否显示不限 默认不显示:false
  @selectChangeCallBack="handleParamsChange" 父组件接收change事件回调
-->
<template>
  <el-select v-if="options.length > 0"
             v-model="value"
             filterable
             placeholder="请选择"
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
               :value="item.value">
    </el-option>
  </el-select>
</template>

<script>
// import { select } from '@/api/components/select.js'

export default {
  name: 'ComponentSelect',
  data() {
    return {
      loading: false,
      // 数据list
      // options: [],
      // 被选中项
      value: ''
    };
  },
  props: {
    // 数据list
    options: {
      type: Array,
      default: () => []
    },
    // 查询url
    url: {
      type: String,
      default: 'user/select/all'
    },
    // 查询类型
    type: {
      type: String,
      default: 'user'
    },
    // 默认选中值
    defaultSelected: {
      type: String,
      default: ''
    },
    // 自定义不限文本
    showAllLabel: {
      type: String,
      default: '不限'
    },
    // 是否显示不限 默认不显示
    isAll: {
      type: Boolean,
      default: false
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.init();
  },
  methods: {
    // 组件初始化
    init() {
      // this.loading = true
      // select(this.url)
      //   .then(result => {
      //     this.options = result.data.options
      //     this.value = this.defaultSelected
      //   })
      //   .finally(() => {
      //     this.loading = false
      //   })
    },
    // 选项发生变化 -> 传参给父组件
    handleSelectChange(value) {
      const selectChange = {
        value: value,
        type: this.type
      };
      this.value = value;
      this.$emit('selectChangeCallBack', selectChange);
    }
  }
};
</script>

