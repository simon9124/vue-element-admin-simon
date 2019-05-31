<template>
  <div class="script-filter">
    <div class="script-div">

      <!-- 执行结果 -->
      <div class="operate-div"
           v-loading="operateLoading"
           element-loading-text="拼命加载中">
        <p style="font-weight:bold;font-size:18px">执行结果：</p>
        <p class="operate-content">返回报文为：
          <br/><br/>{{execMsg}}
          <br/><br/>
          该脚本执行结果经检查，判定为：{{conclusion}}
        </p>
      </div>

      <!-- 表单 -->
      <Tabs v-model="activeName"
            v-loading="tabLoading"
            class="tabs"
            name="tabFilter"
            @tab-click="handleClick">
        <!-- 选择检查条件 -->
        <TabPane label="选择检查条件"
                 name="first"
                 tab="tabFilter">
          <el-form v-model="scriptResultCheckForm">
            <el-form-item label="检查条件名称："
                          prop="scriptResultCheckName"
                          class="filter-check-name"
                          label-position="left"
                          label-width="110px"
                          style="display:inline-block">
              <el-select v-model="scriptResultCheckForm.scriptResultCheckName"
                         filterable
                         @change="handleChange">
                <el-option v-for="item in checkOptions"
                           :key="item.value"
                           :label="item.label"
                           :value="item.value">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="超时设定："
                          label-position="left"
                          label-width="130px">
              <el-input style="width:80px"
                        v-model="expectTime"
                        @focus="executeTimeShow=false"></el-input> s
              <span v-if="executeTimeShow && executeTime<=expectTime"
                    style="color:#67C23A"
                    v-loading="operateLoading"
                    element-loading-spinner="el-icon-loading">执行结果正常</span>
              <span v-if="executeTimeShow && executeTime>expectTime"
                    style="color:#F56C6C"
                    v-loading="divLoading"
                    element-loading-spinner="el-icon-loading">
                执行结果异常，超时{{executeTime-expectTime}}s</span>
            </el-form-item>

            <el-form-item label="执行条件："
                          class="filter-check-result"
                          label-position="left"
                          label-width="130px">
              <el-radio v-model="radio"
                        class="first-radio"
                        @change="handleRadioChange"
                        label="0">满足以下所有条件</el-radio>
              <el-radio v-model="radio"
                        class="other-radio"
                        @change="handleRadioChange"
                        label="1">满足以下任一条件</el-radio>
              <el-radio v-model="radio"
                        class="other-radio"
                        @change="handleRadioChange"
                        label="2">无条件限制</el-radio>
            </el-form-item>

            <el-form-item label="接收结果："
                          class="filter-check-condition"
                          label-position="left"
                          label-width="100px">

              <el-row v-for="(add, index) in receiveResultForm.list"
                      :key="add.key">
                <el-col :xs="12" :sm="12" :md="12" :lg="6"
                        class="result">
                  <el-form-item :prop="'list.' + index + '.receiveResult'">
                    <el-select v-model="receiveResultForm.list[index].receiveResult || '接收结果'"
                               placeholder="接收结果"
                               :disabled="selConditionDisabled">
                      <el-option label="接收结果"
                                 value="receiveResult">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="6"
                        class="col">
                  <el-form-item :prop="'list.' + index + '.include'">
                    <el-select placeholder="包含"
                               v-model="receiveResultForm.list[index].include"
                               :disabled="selConditionDisabled">
                      <el-option label="包含"
                                 value="include">
                      </el-option>
                      <el-option label="不包含"
                                 value="exclude">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="7"
                        class="col">
                  <el-form-item :prop="'list.' + index + '.content'">
                    <el-input placeholder="内容："
                              v-model="receiveResultForm.list[index].content"
                              :disabled="selConditionDisabled"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5"
                        class="col">
                  <el-form-item>
                    <el-button type="success"
                               @click.prevent="addDomain"
                               icon="el-icon-plus"
                               size="mini"
                               :disabled="selConditionDisabled"></el-button>
                    <el-button class="col-button"
                               v-if="receiveCount===1"
                               disabled
                               type="danger"
                               @click.prevent="removeDomain(add)"
                               icon="el-icon-minus"
                               size="mini"
                               :disabled="selConditionDisabled"></el-button>
                    <el-button v-else
                               type="danger"
                               @click.prevent="removeDomain(add)"
                               icon="el-icon-minus"
                               size="mini"
                               :disabled="selConditionDisabled"></el-button>
                  </el-form-item>
                </el-col>

              </el-row>

            </el-form-item>
          </el-form>
        </TabPane>

        <!-- 新增检查条件 -->
        <TabPane label="新增检查条件"
                 name="second"
                 tab="tabFilter">
          <el-form v-model="insertCheckForm">
            <el-form-item label="检查条件名称："
                          prop="scriptResultCheckName"
                          class="filter-check-name"
                          label-position="left"
                          label-width="110px"
                          style="display:inline-block">
              <el-input placeholder="请输入内容"
                        v-model="insertCheckForm.scriptResultCheckName"
                        clearable></el-input>
            </el-form-item>

            <el-form-item label="超时设定："
                          label-position="left"
                          label-width="130px">
              <el-input style="width:80px"
                        v-model="expectTime"
                        @focus="executeTimeShow=false"></el-input> s
              <span v-if="executeTimeShow && executeTime<=expectTime"
                    style="color:#67C23A"
                    v-loading="operateLoading"
                    element-loading-spinner="el-icon-loading">执行结果正常</span>
              <span v-if="executeTimeShow && executeTime>expectTime"
                    style="color:#F56C6C"
                    v-loading="divLoading"
                    element-loading-spinner="el-icon-loading">
                执行结果异常，超时{{executeTime-expectTime}}s</span>
            </el-form-item>

            <el-form-item label="执行条件："
                          class="filter-check-result"
                          label-position="left"
                          label-width="130px">
              <el-radio v-model="radio"
                        class="first-radio"
                        @change="handleRadioChange"
                        label="0">满足以下所有条件</el-radio>
              <el-radio v-model="radio"
                        class="other-radio"
                        @change="handleRadioChange"
                        label="1">满足以下任一条件</el-radio>
              <el-radio v-model="radio"
                        class="other-radio"
                        @change="handleRadioChange"
                        label="2">无条件限制</el-radio>
            </el-form-item>

            <el-form-item label="接收结果："
                          class="filter-check-condition"
                          label-position="left"
                          label-width="100px">

              <el-row v-for="(add, index) in receiveResultForm.list"
                      :key="add.key">
                <el-col :xs="12" :sm="12" :md="12" :lg="6"
                        class="result">
                  <el-form-item :prop="'list.' + index + '.receiveResult'">
                    <el-select v-model="receiveResultForm.list[index].receiveResult || '接收结果'"
                               placeholder="接收结果"
                               :disabled="insertConditionDisabled">
                      <el-option label="接收结果"
                                 value="receiveResult">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="6"
                        class="col">
                  <el-form-item :prop="'list.' + index + '.include'">
                    <el-select placeholder="包含"
                               v-model="receiveResultForm.list[index].include"
                               :disabled="insertConditionDisabled">
                      <el-option label="包含"
                                 value="include">
                      </el-option>
                      <el-option label="不包含"
                                 value="exclude">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="7"
                        class="col">
                  <el-form-item :prop="'list.' + index + '.content'">
                    <el-input placeholder="内容："
                              v-model="receiveResultForm.list[index].content"
                              :disabled="insertConditionDisabled"></el-input>
                  </el-form-item>
                </el-col>

                <el-col :xs="12" :sm="12" :md="12" :lg="5"
                        class="col">
                  <el-form-item>
                    <el-button type="success"
                               @click.prevent="addDomain"
                               icon="el-icon-plus"
                               size="mini"
                               :disabled="insertConditionDisabled"></el-button>
                    <el-button class="col-button"
                               v-if="receiveCount===1"
                               disabled
                               type="danger"
                               @click.prevent="removeDomain(add)"
                               icon="el-icon-minus"
                               size="mini"
                               :disabled="insertConditionDisabled"></el-button>
                    <el-button style="margin:0"
                               v-else
                               type="danger"
                               @click.prevent="removeDomain(add)"
                               icon="el-icon-minus"
                               size="mini"
                               :disabled="insertConditionDisabled"></el-button>
                  </el-form-item>
                </el-col>
              </el-row>

            </el-form-item>
          </el-form>
        </TabPane>
      </Tabs>

      <!-- 按钮 -->
      <div class="buttons-div">
        <el-button type="warning"
                   size="medium"
                   @click="testScript">脚本测试</el-button>
        <el-button type="success"
                   size="medium"
                   @click="bindingScriptCheckResult">绑定检查条件</el-button>
      </div>

    </div>
  </div>
</template>

<script>
  import { isEmpty, isNotEmpty } from '@/utils'
  import {
    getByResultCheckCode,
    executeScript,
    updateScriptByCode,
    updateResultCheck,
    insertResultCheck,
    getCheckByScriptCode
  } from '@/api/script/script'

  export default {
    name: 'script-filter',
    data() {
      return {
        // tab名
        activeName: 'first',
        // 执行结果loading
        operateLoading: false,
        // loading
        tabLoading: false,
        // 选择检查条件列表
        scriptResultCheckForm: {
          scriptResultCheckName: '',
          scriptResultCheckType: '0'
        },
        // 新增检查条件列表
        insertCheckForm: {
          scriptResultCheckName: '',
          scriptResultCheckType: '0'
        },
        // 执行条件
        radio: '0',
        // 接收结果列表
        receiveResultForm: {
          list: [{}]
        },
        // 接收结果个数
        receiveCount: 1,
        // 返回报文
        execMsg: '',
        // 判定结果
        conclusion: '',
        // 超时设定
        expectTime: 0,
        // 是否显示超时时间
        executeTimeShow: false,
        // 执行时间
        executeTime: 0,
        // 选择接收结果是否禁用
        selConditionDisabled: false,
        // 新增接收结果是否禁用
        insertConditionDisabled: false
      }
    },
    props: {
      // 下拉列表
      checkOptions: {
        type: Array
      },
      // 已绑定服务器编号
      bindingServerCode: {
        type: String,
        default: ''
      },
      // 脚本编号
      scriptCode: {
        type: String,
        default: ''
      }
    },
    created() {
      this.init()
    },
    methods: {
      // 初始化
      init() {
        if (isNotEmpty(this.scriptCode)) {
          getCheckByScriptCode(this.scriptCode).then(result => {
            if (isNotEmpty(result.data.checkInfo)) {
              this.scriptResultCheckForm = result.data.checkInfo
              this.showResultCheckTable()
            }
          })
        }
      },
      // 点击tab
      handleClick(tab, event) {
        this.radio = '0'
        this.receiveResultForm.list = [{}]
        this.expectTime = 0
        this.executeTimeShow = false
        this.executeTime = 0
        this.insertCheckForm.scriptResultCheckName = ''
        this.scriptResultCheckForm.scriptResultCheckName = ''
        this.handleRadioChange(this.radio)
      },
      // 下拉项变化
      handleChange(value) {
        this.tabLoading = true
        for (var i in this.checkOptions) {
          if (this.checkOptions[i].value === value) {
            getByResultCheckCode(value).then(result => {
              this.scriptResultCheckForm = result.data
              this.showResultCheckTable()
            }).finally(() => {
              this.tabLoading = false
            })
          }
        }
      },
      // 显示检查条件列表
      showResultCheckTable() {
        this.receiveResultForm.list = JSON.parse(
          this.scriptResultCheckForm.scriptResultCheckCondition
        )
        var checkType = this.scriptResultCheckForm.scriptResultCheckType.toString()
        this.handleRadioChange(checkType)
        this.receiveCount = this.receiveResultForm.list.length
      },
      // 执行条件变化
      handleRadioChange(value) {
        this.radio = value
        if (this.activeName === 'second') {
          this.radio = value
          if (this.radio === '2') {
            this.receiveResultForm.list = [{}]
            this.insertConditionDisabled = true
          } else {
            this.insertConditionDisabled = false
          }
        } else if (this.activeName === 'first') {
          this.selConditionDisabled = true
        }
      },
      // '+' 增加一行
      addDomain() {
        this.receiveResultForm.list.push({})
        this.receiveCount++
      },
      // '-' 删除一行
      removeDomain(item) {
        var index = this.receiveResultForm.list.indexOf(item)
        if (index !== 0) {
          this.receiveResultForm.list.splice(index, 1)
        }
        this.receiveCount--
      },
      // 脚本测试
      testScript() {
        if (isEmpty(this.bindingServerCode)) {
          this.$message({
            message: '请先绑定服务器！',
            type: 'warning'
          })
          return false
        } else if (this.activeName === 'first' &&
          isEmpty(this.scriptResultCheckForm.scriptResultCheckCode)) {
          this.$message({
            message: '请先选择检查条件！',
            type: 'warning'
          })
          return false
        } else {
          this.transForm()
          this.execute()
        }
      },
      // 执行测试
      execute() {
        this.operateLoading = true
        const execForm = {
          scriptCode: this.scriptCode,
          scriptResultCheck: {
            scriptResultCheckType: '0',
            scriptResultCheckCondition: ''
          }
        }
        if (this.activeName === 'first') {
          execForm.scriptResultCheck.scriptResultCheckType =
            this.scriptResultCheckForm.scriptResultCheckType
          execForm.scriptResultCheck.scriptResultCheckCondition =
            this.scriptResultCheckForm.scriptResultCheckCondition
        } else if (this.activeName === 'second') {
          execForm.scriptResultCheck.scriptResultCheckType =
            this.insertCheckForm.scriptResultCheckType
          execForm.scriptResultCheck.scriptResultCheckCondition =
            this.insertCheckForm.scriptResultCheckCondition
        }
        executeScript(execForm).then(result => {
          this.executeTimeShow = true
          this.executeTime = result.data.executeTime
          this.execMsg = result.data.resultMsg
          if (result.data.execFlag === true) {
            this.conclusion = '正常'
          } else {
            this.conclusion = '异常'
          }
        }).finally(() => {
          this.operateLoading = false
        })
      },
      // 转换格式
      transForm() {
        var receiveForm = []
        for (var i in this.receiveResultForm.list) {
          receiveForm.push({
            receiveResult: this.receiveResultForm.list[i].receiveResult,
            include: this.receiveResultForm.list[i].include,
            content: this.receiveResultForm.list[i].content
          })
        }
        this.receiveResultForm.list = receiveForm
        if (this.activeName === 'first') {
          this.scriptResultCheckForm.scriptResultCheckCondition = JSON.stringify(
            this.receiveResultForm.list
          )
          this.scriptResultCheckForm.scriptResultCheckType = this.radio
        } else if (this.activeName === 'second') {
          this.insertCheckForm.scriptResultCheckCondition = JSON.stringify(
            this.receiveResultForm.list
          )
          this.insertCheckForm.scriptResultCheckType = this.radio
        }
      },
      // 绑定检查条件
      bindingScriptCheckResult() {
        this.transForm()
        const bindingForm = {
          scriptCode: this.scriptCode,
          scriptResultCheckCode: ''
        }
        if (isEmpty(this.scriptResultCheckForm.scriptResultCheckName)) {
          this.$message({
            message: '请确认检查条件存在！',
            type: 'warning'
          })
        } else {
          if (this.activeName === 'first') {
            updateResultCheck(this.scriptResultCheckForm)
            bindingForm.scriptResultCheckCode = this.scriptResultCheckForm.scriptResultCheckCode
            updateScriptByCode(bindingForm)
          } else if (this.activeName === 'second') {
            insertResultCheck(this.insertCheckForm).then(result => {
              this.insertCheckForm.scriptResultCheckCode = result.data.scriptResultCheckCode
            }).then(() => {
              bindingForm.scriptResultCheckCode = this.insertCheckForm.scriptResultCheckCode
              updateScriptByCode(bindingForm)
              this.$emit('refreshOptions', true)
            })
          }
        }
      }
    },
    watch: {
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .script-filter /deep/ {
    padding: 20px;

    .script-div {
      position: relative;

      .operate-div {
        background: #000;
        padding: 20px;
        height: 180px;

        p {
          color: #fff;
          padding: 0;
        }

        .operate-content {
          font-size: 14px;
        }

        .el-loading-text {
          color: steelblue;
        }
      }

      .tabs {
        padding-top: 20px;
        border: none;

        .ivu-tabs-tabpane {
          border: none;

          .el-form {
            width: 100%;

            .filter-check-name {
              padding-left: 20px;
              width: 300px;
            }

            .filter-check-result {
              .first-radio {
                padding-left: 0px;
              }

              .other-radio {
                padding-left: 30px;
              }
            }

            .filter-check-condition {
              padding-left: 30px;

              .result {
                padding: 5px 5px 5px 0px;
              }

              .col {
                padding: 5px;

                &-button {
                  margin: 0px;
                }
              }
            }

          }
        }
      }

      .buttons-div {
        position: absolute;
        top: 198px;
        right: 0px;
      }
    }
  }
</style>
