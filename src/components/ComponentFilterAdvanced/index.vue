 <!--
 * 封装高级筛选组件
 -->
<template>
  <transition name="fade-filterAdvanced">
    <div class="table-filter-advanced"
         v-show="filterAdvancedShow">
      <div class="table-filter-advanced-header">
        <span>高级检索</span>
        <i class="el-icon-close table-filter-advanced-header-close"
           style="font-size:20px"
           @click="closeFilterAdvanced($event)"></i>
      </div>
      <div class="table-filter-advanced-content">

        <el-row>
          <el-col :span="8"
                  :offset="2">
            <div>索引：</div>
            <el-input v-model="dictKey"
                      placeholder="请输入索引"></el-input>
          </el-col>
          <el-col :span="8"
                  :offset="4">
            <div>搜索条件：</div>
            <el-select v-model="filterAdvancedResult"
                       placeholder="请选择">
              <el-option v-for="item in filterAdvancedOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8"
                  :offset="2">
            <div>搜索条件：</div>
            <el-input v-model="filterAdvancedDictKey"
                      placeholder="请输入索引"></el-input>
          </el-col>
          <el-col :span="8"
                  :offset="4">
            <div>搜索条件：</div>
            <el-select v-model="filterAdvancedResult"
                       placeholder="请选择">
              <el-option v-for="item in filterAdvancedOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>

        <el-row>
          <el-col :span="8"
                  :offset="2">
            <div>搜索条件：</div>
            <el-input v-model="filterAdvancedDictKey"
                      placeholder="请输入索引"></el-input>
          </el-col>
          <el-col :span="8"
                  :offset="4">
            <div>搜索条件：</div>
            <el-select v-model="filterAdvancedResult"
                       placeholder="请选择">
              <el-option v-for="item in filterAdvancedOptions"
                         :key="item.value"
                         :label="item.label"
                         :value="item.value"></el-option>
            </el-select>
          </el-col>
        </el-row>

      </div>
      <div class="table-filter-advanced-search">
        <el-row>
          <el-col :span="22">
            <el-button type="primary"
                       size="mini"
                       plain>重置</el-button>
            <el-button type="primary"
                       size="mini">搜索</el-button>
          </el-col>
        </el-row>

      </div>
    </div>
  </transition>
</template>
<script>
import Bus from '@/utils/bus.js'
export default {
  name: 'ComponentFilterAdvanced',
  data() {
    return {
      // 是否显示“高级筛选”，默认显示：false
      filterAdvancedShow: false,
      // 其他临时数据
      dictKey: '',
      filterAdvancedOptions: [],
      filterAdvancedDictKey: '',
      filterAdvancedResult: {}
    }
  },
  created() {
    // 接收ComponentFilter组件传递的事件
    Bus.$on('openFilterAdvanced', () => {
      this.filterAdvancedShow = true
    })
  },
  props: {},
  methods: {
    closeFilterAdvanced(event) {
      // 关闭高级筛选
      this.filterAdvancedShow = false
      // 事件巴士，传递给ComponentMask组件 → 关闭蒙层
      Bus.$emit('maskUnShow', event.target)
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
