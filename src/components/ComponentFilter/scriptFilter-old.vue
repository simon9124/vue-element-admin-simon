<template>
  <div>
    <el-container class="filter-container filter"
                  v-loading="loading">
      <el-form v-model="scriptResultFormData"
               ref="scriptResultFormData">
        <!-- 服务器器名称 -->
        <!--<el-form-item label="服务器："
                      prop="server"
                      class="filter-container-name"
                      label-position="left"
                      label-width="90px">
          <el-input></el-input>
        </el-form-item>-->
        <el-form-item label="检查结果："
                      prop="scriptResultCheckName"
                      class="filter-container-name"
                      label-position="left"
                      label-width="90px"
                      style="display:inline-block">
          <el-select @change="resultCheckChange"
                     v-model="scriptResultFormData.scriptResultCheckName"
                     filterable>
            <el-option v-for="item in resultOptions"
                       :key="item.value"
                       :label="item.label"
                       :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <!-- 按钮 -->
        <div style="width:250px;display:inline-block">
          <el-button type="success"
                     style="display:inline-block;width:auto;padding:7px 15px;height:36px;margin-left:5px"
                     @click="resultCheckUpdate">保存检查条件</el-button>
          <el-button type="warning"
                     style="display:inline-block;width:auto;padding:7px 15px;height:36px;margin-left:5px"
                     @click="resultCheckInsert">新增检查条件</el-button>
        </div>

        <!-- 执行条件 -->
        <div class="filter-container-title">执行条件</div>
        <el-row>
          <el-radio v-model="radio"
                    @change="handleRadioChange"
                    label="0">满足以下所有条件</el-radio>
          <el-radio v-model="radio"
                    @change="handleRadioChange"
                    label="1">满足以下任一条件</el-radio>
          <el-radio v-model="radio"
                    @change="handleRadioChange"
                    label="2">无条件限制</el-radio>
        </el-row>

        <!-- 超时设定 -->
        <div class="filter-container-title">超时设定</div>
        <el-input style="width:80px"
                  v-model="expectTime"
                  @focus="executeTimeShow=false"></el-input> s&nbsp;&nbsp;
        <span v-if="executeTimeShow && executeTime<=expectTime"
              style="color:#67C23A"
              v-loading="divLoading"
              element-loading-spinner="el-icon-loading">
          执行结果正常
        </span>
        <span v-if="executeTimeShow && executeTime>expectTime"
              style="color:#F56C6C"
              v-loading="divLoading"
              element-loading-spinner="el-icon-loading">
          执行结果异常，超时{{executeTime-expectTime}}s
        </span>

        <!-- 接收结果 -->
        <div class="filter-container-title">接收结果</div>
        <el-row v-for="(add, index) in receiveResultFormData.list"
                :key="add.key"
                :gutter="10">
          <el-col :span="6">
            <el-form-item :prop="'list.' + index + '.receiveResult'">
              <el-select class="noCondition"
                         placeholder="接收结果"
                         v-model="receiveResultFormData.list[index].receiveResult || '接收结果'">
                <el-option label="接收结果"
                           value="receiveResult">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :prop="'list.' + index + '.include'">
              <el-select class="noCondition"
                         placeholder="包含"
                         v-model="receiveResultFormData.list[index].include">
                <el-option label="包含"
                           value="include">
                </el-option>
                <el-option label="不包含"
                           value="exclude">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="10">
            <el-form-item :prop="'list.' + index + '.content'">
              <el-input class="noCondition"
                        placeholder="内容："
                        v-model="receiveResultFormData.list[index].content"></el-input>

            </el-form-item>
          </el-col>
          <el-col :span="2">
            <el-form-item>
              <el-button class="noCondition"
                         type="success"
                         @click.prevent="addDomain"
                         icon="el-icon-plus"
                         size="mini"></el-button>
              <el-button v-if="receiveCount===1"
                         disabled
                         class="noCondition"
                         type="danger"
                         @click.prevent="removeDomain(add)"
                         icon="el-icon-minus"
                         size="mini"></el-button>
              <el-button v-else
                         class="noCondition"
                         type="danger"
                         @click.prevent="removeDomain(add)"
                         icon="el-icon-minus"
                         size="mini"></el-button>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 执行结果 -->
        <div class="filter-container-title">执行结果</div>
        <el-row v-for="(add, index) in operateResultFormData.list"
                :key="add.key"
                :gutter="10">
          <el-col :span="6">
            <el-form-item :prop="'list.' + index + '.operateResult'">
              <el-select class="noCondition"
                         placeholder="编译结果"
                         v-model="operateResultFormData.list[index].operateResult || '编译结果'">
                <el-option label="编译结果"
                           value="operateResult">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item :prop="'list.' + index + '.normal'">
              <el-select class="noCondition"
                         placeholder="正常"
                         v-model="operateResultFormData.list[index].normal || '正常'">
                <el-option label="正常"
                           value="normal">
                </el-option>
                <!-- <el-option label="异常"
                           value="abnormal">
                </el-option> -->
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20"
                style="padding-top:20px;border-top:1px solid #d6d6db">
          <el-col :span="2">
            <el-button type="primary"
                       style="width:100%;height:40px"
                       @click="handleExecute">执行脚本</el-button>
          </el-col>
          <el-col :span="22"
                  v-loading="divLoading">
            <div class="operate-result">
              <p style="font-weight:bold;font-size:18px">执行结果：</p>
              <p class="operate-result-content">
                返回报文为：<br/> {{execMsg}}
                <br/> 该脚本执行结果经检查，判定为： {{conclusion}}
              </p>
            </div>
          </el-col>
        </el-row>

      </el-form>
    </el-container>
  </div>
</template>

<script>
import { getByResultCheckCode } from '@/api/script/script'
import Bus from '@/utils/bus.js'
import { isEmpty } from '@/utils'

export default {
  name: 'script-filter',

  data() {
    return {
      loading: false,
      radio: '0',
      // resultCheckValue: '',
      scriptResultFormData: {},
      scriptCompileFormData: {},
      // 接收结果
      receiveResult: 'receiveResult',
      include: 'include',
      content: '',
      receiveCount: 1,
      // 执行结果
      operateResult: 'operateResult',
      normal: 'normal',
      // 接受结果表
      receiveResultFormData: {
        list: [{}]
      },
      // 执行结果表
      operateResultFormData: {
        list: [{}]
      },
      // 预计执行时间
      expectTime: 0,
      executeTimeShow: false
    }
  },
  props: {
    // 结果检查下拉列表
    resultOptions: {
      type: Array
    },
    // 脚本对应检查结果code
    scriptResultCheckCode: {
      type: String,
      default: ''
    },
    // 执行结论
    conclusion: {
      type: String,
      default: ''
    },
    // 执行结果
    execMsg: {
      type: String,
      default: ''
    },
    // 执行结果框loading
    divLoading: {
      type: Boolean,
      default: false
    },
    // 绑定的服务器编号
    bindingScriptCode: {
      type: String,
      default: ''
    },
    // 脚本执行时间
    executeTime: {
      type: Number
    },
    // 执行结果显示与否
    executeShow: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.init()
    // this.$on('executeTime', data => {
    //   console.log(data)
    // })
  },
  methods: {
    // 页面加载
    init() {
      // console.log(this.scriptResultCheckCode)
      if (
        this.scriptResultCheckCode !== null &&
        this.scriptResultCheckCode !== ''
      ) {
        this.loading = true
        this.getByResultCheckCode(this.scriptResultCheckCode)
      }
    },
    // 根据getByResultCheckCode查询对应详情
    getByResultCheckCode(value) {
      getByResultCheckCode(value)
        .then(result => {
          this.scriptResultFormData = result.data
          this.receiveResultFormData.list = JSON.parse(
            this.scriptResultFormData.scriptResultCheckCondition
          )
          this.receiveCount = this.receiveResultFormData.list.length
          this.operateResultFormData.list = JSON.parse(
            this.scriptResultFormData.scriptResultCheckReturn
          )
          Bus.$emit('scriptResultCheckCode', value)
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 执行条件为“无条件限制” -> 后续选项禁用
    handleRadioChange(value) {
      this.radio = value
      const noConditions = document.getElementsByClassName('noCondition')
      for (var i in noConditions) {
        if (typeof noConditions[i] === 'object') {
          if (value === '2') {
            noConditions[i].classList.add('is-disabled')
            noConditions[i].children[0].classList.add('is-disabled')
          } else {
            noConditions[i].classList.remove('is-disabled')
            noConditions[i].children[0].classList.remove('is-disabled')
          }
        }
      }
    },
    // 执行条件发生改变
    resultCheckChange(value) {
      // console.log(value)
      this.loading = true
      const scriptResultCheckCode = value
      for (var i in this.resultOptions) {
        if (this.resultOptions[i].value.indexOf(value) === 0) {
          this.getByResultCheckCode(scriptResultCheckCode)
          return
        }
      }
    },
    // 参数转换
    paramsTransform() {
      // 接收结果表
      var receiveResultFormData = []
      for (var i in this.receiveResultFormData.list) {
        receiveResultFormData.push({
          receiveResult: this.receiveResultFormData.list[i].receiveResult,
          include: this.receiveResultFormData.list[i].include,
          content: this.receiveResultFormData.list[i].content
        })
      }
      this.receiveResultFormData.list = receiveResultFormData
      // 执行结果表
      var operateResultFormData = []
      for (var j in this.operateResultFormData.list) {
        operateResultFormData.push({
          operateResult: this.operateResultFormData.list[j].operateResult,
          normal: this.operateResultFormData.list[j].normal
        })
      }
      this.operateResultFormData.list = operateResultFormData
      // 提交总表
      this.scriptResultFormData.scriptResultCheckCondition = JSON.stringify(
        this.receiveResultFormData.list
      )
      this.scriptResultFormData.scriptResultCheckReturn = JSON.stringify(
        this.operateResultFormData.list
      )
    },
    // 更新结果检查
    resultCheckUpdate() {
      this.paramsTransform()
      this.$emit('scriptResultUpdate', this.scriptResultFormData)
    },
    // 新增结果检查
    resultCheckInsert() {
      this.$prompt('请输入检查表达式名称', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
        .then(data => {
          if (data.value !== null) {
            this.scriptResultFormData.scriptResultCheckName = data.value
            this.paramsTransform()
            this.$emit('scriptResultInsert', this.scriptResultFormData)
          }
        })
        .catch(() => { })
    },
    // 执行脚本
    handleExecute() {
      if (isEmpty(this.bindingScriptCode)) {
        this.$alert('请先绑定服务器')
      } else {
        if (this.scriptResultFormData.scriptResultCheckCode !== null &&
          this.scriptResultFormData.scriptResultCheckCode !== '') {
          this.paramsTransform()
          this.scriptCompileFormData = {
            scriptResultCheckCode: this.scriptResultFormData.scriptResultCheckCode,
            checkType: this.radio,
            scriptResultCheckCondition: this.scriptResultFormData.scriptResultCheckCondition,
            scriptResultCheckReturn: '1'
          }
          this.$emit('scriptCompile', this.scriptCompileFormData)
        } else {
          this.$message.error('无法执行，请先绑定脚本！')
        }
      }
    },
    // 新增1项接收结果
    addDomain() {
      this.receiveResultFormData.list.push({})
      this.receiveCount++
    },
    // 删除1项接收结果
    removeDomain(item) {
      var index = this.receiveResultFormData.list.indexOf(item)
      if (index !== -1) {
        this.receiveResultFormData.list.splice(index, 1)
      }
      this.receiveCount--
    },
    // 新增1项执行结果
    addDomain2() {
      this.operateResultFormData.list.push({})
    },
    // 删除1项执行结果
    removeDomain2(item) {
      var index = this.operateResultFormData.list.indexOf(item)
      if (index !== -1) {
        this.operateResultFormData.list.splice(index, 1)
      }
    }
  },
  watch: {
    $route(to, from) {
      this.init()
    },
    // 监听父组件executeTime变化
    executeTime(newValue, oldValue) {
      this.executeTime = newValue
      this.init()
    },
    // 监听父组件executeshow变化
    executeShow(newValue, oldValue) {
      this.executeShow = newValue
      this.executeTimeShow = this.executeShow
      this.init()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.filter-container {
  padding: 20px;
  // text-align: center;
  .el-form {
    width: 100%;
    .filter-container-name {
      width: 300px;
      margin-bottom: 30px;
      .el-input {
        width: 300px;
      }
      /deep/ .el-form-item__label {
        text-align: left;
      }
    }
    .filter-container-title {
      padding: 10px 0;
      margin-top: 20px;
      border-top: 1px solid #d6d6db;
    }
    .el-select {
      width: 100%;
    }
    .el-button {
      padding: 7px;
      width: 30%;
      min-width: 30px;
      display: inline-block;
      margin: 0;
    }
    .operate-result {
      background: #000;
      padding: 10px 20px;
      p {
        color: #fff;
        padding: 0;
      }
      // 执行结果的内容
      &-content {
        font-size: 16px;
      }
    }
  }
}
</style>
