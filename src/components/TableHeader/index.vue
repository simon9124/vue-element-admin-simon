<template>
  <div class="header-container">

    <el-form :inline="true"
             :model="searchForm"
             label-width="100px"
             class="demo-form-inline">
      <el-form-item label="审批人："
                    v-if="showAuditor">
        <el-input v-model="searchForm.basicInfoAuditor"
                  @keyup.enter.native="searchClickHandler"
                  placeholder="审批人"></el-input>
      </el-form-item>
      <el-form-item label="编制人："
                    v-if="showCompile">
        <el-input v-model="searchForm.basicInfoCompile"
                  @keyup.enter.native="searchClickHandler"
                  placeholder="编制人"></el-input>
      </el-form-item>
      <el-form-item label="预案名称：">
        <el-input v-model="searchForm.basicInfoName"
                  @keyup.enter.native="searchClickHandler"
                  placeholder="预案名称"></el-input>
      </el-form-item>
      <el-form-item label="所属部门：">
        <el-input v-model="searchForm.basicInfoOrganization"
                  @keyup.enter.native="searchClickHandler"
                  placeholder="所属部门"></el-input>
      </el-form-item>
      <el-form-item label="涉及业务：">
        <CustomSelect ref="planImpactOnBusinessSelect"
                      url='maintenance/business/select/all'
                      type='business'
                      defaultSelected=""
                      isAll='true'
                      @selectChangeCallBack="handleParamsChange"></CustomSelect>
      </el-form-item>
      <el-form-item label="状态：">
        <CustomSelect ref="planReviewSelect"
                      url='center/component/select/planReview'
                      type='planReview'
                      defaultSelected=""
                      isAll='true'
                      @selectChangeCallBack="handleParamsChange"></CustomSelect>
      </el-form-item>
      <el-form-item label="创建时间：">
        <el-date-picker v-model="searchForm.createTime"
                        align="right"
                        type="date"
                        placeholder="请选择"
                        format="yyyy-MM-dd"
                        value-format="yyyy-MM-dd"
                        :picker-options="pickerOptions"
                        @change="handleTimerChange">
        </el-date-picker>
      </el-form-item>
      <el-form-item class="el-form-button">
        <el-button plain
                   type="primary"
                   @click.enter.native="searchClickHandler">查询</el-button>
        <el-button plain
                   type="primary"
                   @click.enter.native="cleanClickHandler">清空</el-button>
        <el-button v-if="showCreateButton"
                   plain
                   type="primary"
                   @click.enter.native="createClickHandler">创建</el-button>
      </el-form-item>
    </el-form>

  </div>
</template>

<script>
import { clearParam/*, params*/ } from '@/utils/params'
import CustomSelect from '@/components/ComponentSelect/select'

export default {
  name: 'TableHeader',
  components: { CustomSelect },
  props: {
    // 是否显示 - 编制人
    showCompile: {
      Boolean,
      default: true
    },
    // 是否显示 - 审批人
    showAuditor: {
      Boolean,
      default: true
    },
    // 是否显示 - 创建按钮
    showCreateButton: {
      Boolean,
      default: true
    }
  },
  data() {
    return {
      // 搜索表单项
      searchForm: {
        basicInfoCompile: '',
        basicInfoOrganization: '',
        basicInfoName: '',
        basicInfoBusinessScope: '',
        basicInfoAuditor: '',
        basicInfoPlanStatus: '',
        createTime: ''
      },
      // 添加时间选项：今天 & 昨天 & 一周前
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  methods: {
    // 按条件搜索查询
    searchClickHandler() {
      this.$emit('searchForm', this.searchForm)
    },
    // 点击清空
    cleanClickHandler() {
      this.searchForm = {
        basicInfoCompile: '',
        basicInfoOrganization: '',
        basicInfoName: '',
        basicInfoBusinessScope: '',
        basicInfoAuditor: '',
        basicInfoPlanStatus: '',
        createTime: ''
      }
      // 调用子组件componentSelect的handleSelectChange方法
      this.$refs.planReviewSelect.handleSelectChange('')
      this.$refs.planImpactOnBusinessSelect.handleSelectChange('')
      this.searchClickHandler()
    },
    // 创建预案
    createClickHandler() {
      /* 暂解除场景和预案的关联
      const treeCode = params(this, 'treeCode') || ''
      if (treeCode === '') {
        this.$message({
          message: '请勿选择根系统',
          type: 'warning'
        })
        return false
      }*/
      clearParam('row')
      this.$router.push({
        path: '/plan/edit',
        name: 'PlanEdit'
      })
    },
    // 搜索选项发生改变
    handleParamsChange(selectChange) {
      switch (selectChange.type) {
        case 'planReview':
          this.searchForm.basicInfoPlanStatus = selectChange.value
          break
        case 'business':
          this.searchForm.basicInfoBusinessScope = selectChange.value
          break
        default:
          break
      }
      this.searchClickHandler()
    },
    // 时间戳选项发生改变
    handleTimerChange(value) {
      this.searchForm.createTime = value
      this.searchClickHandler()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
</style>
