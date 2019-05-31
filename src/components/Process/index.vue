<template>
  <div class="containers"
       ref="content"
       v-loading="loading">
    <!-- 画布 -->
    <div class="canvas"
         ref="canvas">
      <div class="buttons">
        <a ref="saveDiagram"
           href="javascript:;"
           title="请先“保存流程”">下载bpmn</a>
        <a ref="saveSvg"
           href="javascript:;"
           title="请先“保存流程”">下载svg</a>
        <!-- <a ref="saveSvg"
             href="javascript:;"
             title="请先“保存流程”">下载json</a> -->
        <el-button size="mini"
                   type="success"
                   @click="save"
                   :disabled="saveLoading === true">保存流程</el-button>
        <el-button size="mini"
                   type="danger"
                   @click="reset">重置流程</el-button>
        <el-select style="margin:0 10px"
                   placeholder="100%"
                   v-model="displaySize"
                   :disabled="true"
                   @change="displaySizeChange">
          <el-option label="200%"
                     value="200%">
          </el-option>
          <el-option label="150%"
                     value="150%">
          </el-option>
          <el-option label="100%"
                     value="100%">
          </el-option>
          <el-option label="75%"
                     value="75%">
          </el-option>
          <el-option label="50%"
                     value="50%">
          </el-option>
        </el-select>
        <!-- 选项卡 -->
        <el-radio v-model="processData.modelStatusIfSub"
                  label="0">主流程</el-radio>
        <el-radio v-model="processData.modelStatusIfSub"
                  label="1">子流程</el-radio>
        <!--<el-radio v-model="processData.exerciseType"
                  label="0">真实演练</el-radio>
        <el-radio v-model="processData.exerciseType"
                  label="1">模拟演练</el-radio>-->
      </div>
    </div>
    <!-- 原属性面盘：隐藏 -->
    <div id="js-properties-panel"
         class="panel">
    </div>
    <!-- 属性面盘 -->
    <el-form ref="form"
             :model="form"
             label-position="top"
             label-width="80px">
      <!-- 流程 -->
      <div class="el-form-block">
        <!-- <span class="el-form-title first">流程</span> -->
        <el-form-item label="流程名称：">
          <el-input v-model="processData.name"
                    placeholder="请输入流程名称"></el-input>
        </el-form-item>
        <el-form-item label="部署情况：">
          <el-tag v-if="processData.deploymentId!==''"
                  v-loading="saveLoading"
                  type="success">已部署</el-tag>
          <el-tag v-else
                  v-loading="saveLoading"
                  type="danger">未部署</el-tag>
        </el-form-item>
        <!-- <el-form-item label="流程id：">
          <el-input v-model="processData.id"
                    :disabled="true"></el-input>
        </el-form-item> -->
        <el-form-item v-if="elementType && elementType.indexOf('Process')===-1"
                      label="节点名称：">
          <el-input v-model="processNodeName"
                    :disabled="true">
          </el-input>
        </el-form-item>
        <!-- <el-form-item v-if="elementType.indexOf('CallActivity')>-1"
                      label="预估完成时间：">
          <span v-if="!EstimatedTimeEdit"
                v-loading="estimatedTimeLoading">
            {{estimatedTime}}分钟
            <el-button type="primary"
                       icon="el-icon-edit"
                       style="width:30px;height:25px;padding:5px;vertical-align:baseline;margin-left:5px"
                       @click="EstimatedTimeEdit=!EstimatedTimeEdit"></el-button>
          </span>
          <span v-if="EstimatedTimeEdit">
            <el-input v-model="estimatedTime"
                      style="width:50px"></el-input> 分钟
            <el-button type="success"
                       icon="el-icon-check"
                       style="width:30px;height:25px;padding:5px;vertical-align:baseline;margin-left:5px"
                       @click="EstimatedTimeEdit=!EstimatedTimeEdit;saveEstimatedTime()"></el-button>
            <el-button type="danger"
                       icon="el-icon-close"
                       style="width:30px;height:25px;padding:5px;vertical-align:baseline;margin-left:0"
                       @click="EstimatedTimeEdit=!EstimatedTimeEdit"></el-button>
          </span>
        </el-form-item> -->
      </div>
      <!-- 节点 -->
      <!-- <div class="el-form-block">
        <span class="el-form-title">节点</span>
        <span class="el-form-title"></span>
        <el-form-item label="节点名称：">
          <el-input v-model="processNodeName"></el-input>
        </el-form-item>
      </div> -->
      <!-- 网关 -->
      <!-- <div v-if="elementType.indexOf('Gateway')>-1"
           class="el-form-block">
        <span class="el-form-title">网关</span>
        <el-form-item label="选择网关：">
          <el-select v-model="form.region"
                     placeholder="请选择">
            <el-option label="并行"
                       value="parallel"></el-option>
            <el-option label="顺行"
                       value="inclusive"></el-option>
          </el-select>
        </el-form-item>
      </div> -->
      <!-- 网关细节 -->
      <!-- <div v-if="SequenceFlowFromGateway"
           class="el-form-block">
        <span class="el-form-title">网关细节</span>
        <el-form-item label="网关细节：">
          <el-select v-model="form.region"
                     placeholder="请选择">
            <el-option label="expression"
                       value="expression"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="expression：">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </div> -->
      <!-- 工作组/用户/组织绑定 -->
      <div v-if="elementType.indexOf('UserTask')>-1"
           class="el-form-block">
        <span class="el-form-title">
          <el-button type="success"
                     @click="dialogShowJobs">绑定工作组</el-button>
        </span>
        <el-form-item v-loading="tagsLoading"
                      label="已绑定的工作组：">
          <el-tag v-for="label in labelChildJobs"
                  :key="label">{{label}}</el-tag>
        </el-form-item>
        <span class="el-form-title">
          <el-button type="success"
                     @click="dialogShowUser">绑定用户</el-button>
        </span>
        <el-form-item v-loading="tagsLoading"
                      label="已绑定的用户：">
          <el-tag v-for="label in labelChildUsers"
                  :key="label">{{label}}</el-tag>
        </el-form-item>
        <span class="el-form-title">
          <el-button type="success"
                     @click="dialogShowOrgan">绑定组织</el-button>
        </span>
        <el-form-item v-loading="tagsLoading"
                      label="已绑定的组织：">
          <el-tag v-for="label in labelChildOrgan"
                  :key="label">{{label}}</el-tag>
        </el-form-item>
      </div>
      <!-- 子流程绑定 -->
      <div v-if="elementType.indexOf('CallActivity')>-1"
           class="el-form-block">
        <span class="el-form-title">
          <el-button size="mini" @click="dialogShowProcess">绑定子流程</el-button>
        </span>
        <el-form-item v-loading="tagsLoading"
                      label="已绑定的子流程：">
          <el-tag v-for="label in labelChildProcess"
                  :key="label">{{label}}</el-tag>
        </el-form-item>
      </div>

      <!-- dialogTransfer -->
      <dialog-transfer ref="dialogTransfer"
                       :queryParam='queryParam'
                       :initUrl="initUrl"
                       :titles="titles"
                       :type="type"
                       :filterPlaceholder="filterPlaceholder"
                       :nodeId="nodeId"
                       @sendSelectedChild="sendSelectedChild"
                       @submit="dialogSubmit"
                       @change="changeHandler">
      </dialog-transfer>

    </el-form>
  </div>
</template>


<script>
import BpmnModeler from 'bpmn-js/lib/Modeler'
import Modeling from 'bpmn-js/lib/features/modeling/Modeling'
import { insertProcessModel, insertDeployedProcessModel, getByModelId } from '@/api/process/process'
import { params } from '@/utils/params'
import { DialogTransfer } from 'ctsi-vue-dialog'
import { request } from '@/utils'
import keysGetLabels from './keysGetLabels'

export default {
  name: 'bpmn',
  components: { DialogTransfer },
  props: {},
  data() {
    return {
      // 主键
      id: '',
      // bpmn建模器
      bpmnModeler: null,
      container: null,
      canvas: null,
      xmlStr: '',
      // 流程图名称
      processName: '流程测试',
      // 点击节点获取的数据
      nodeCode: '',
      nodeName: '',
      // 显示大小
      displaySize: '100%',
      // 被点击元素的属性
      elementType: '',
      // 网关节点后的SequenceFlow
      SequenceFlowFromGateway: false,
      newDiagramXML:
        '<?xml version="1.0" encoding="UTF-8"?>\r\n<bpmn2:definitions xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns:bpmn2="http://www.omg.org/spec/BPMN/20100524/MODEL" xmlns:bpmndi="http://www.omg.org/spec/BPMN/20100524/DI" xmlns:dc="http://www.omg.org/spec/DD/20100524/DC" xmlns:di="http://www.omg.org/spec/DD/20100524/DI" xsi:schemaLocation="http://www.omg.org/spec/BPMN/20100524/MODEL BPMN20.xsd" id="sample-diagram" targetNamespace="http://bpmn.io/schema/bpmn">\r\n  <bpmn2:process id="Process_1" name="' +
        this.processName +
        '" isExecutable="true">\r\n    <bpmn2:startEvent id="StartEvent_1"/>\r\n  </bpmn2:process>\r\n  <bpmndi:BPMNDiagram id="BPMNDiagram_1">\r\n    <bpmndi:BPMNPlane id="BPMNPlane_1" bpmnElement="Process_1">\r\n      <bpmndi:BPMNShape id="_BPMNShape_StartEvent_2" bpmnElement="StartEvent_1">\r\n        <dc:Bounds height="36.0" width="36.0" x="412.0" y="240.0"/>\r\n      </bpmndi:BPMNShape>\r\n    </bpmndi:BPMNPlane>\r\n  </bpmndi:BPMNDiagram>\r\n</bpmn2:definitions>',
      // 保存数据表单
      processData: {
        id: '',
        name: '新建流程',
        key: 'key',
        description: 'des',
        modelxml: '',
        imgstr: '',
        modelStatusIfSub: '0',
        exerciseType: '0',
        deploymentId: ''
      },
      // 节点名称
      processNodeName: '',
      // 节点预估完成时间
      estimatedTime: 0,
      // 节点预估完成loading
      estimatedTimeLoading: false,
      // 预估完成时间编辑
      EstimatedTimeEdit: false,
      // 属性表单
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      // 绑定相关
      loading: false,
      queryParam: {},
      // 标题
      titles: ['可绑定', '已绑定'],
      // 是否多选
      isMultiple: false,
      // 被选中的子流程(key)
      selectedChildProcess: [],
      // 要回显的value(子流程/工作组/用户/组织)
      labelChildProcess: [],
      labelChildJobs: [],
      labelChildUsers: [],
      labelChildOrgan: [],
      // tagsLoading
      tagsLoading: false,
      // 全部子流程
      wholeChildProcess: [],
      // 提示文字
      filterPlaceholder: '选择绑定子流程',
      // 穿梭框初始化
      initUrl: '/process/actremodel/selectChildModelToModelTransfer/',
      // 流程图节点id
      nodeId: '',
      // dialog类型
      type: 'process',
      submitData: {},
      // 保存流程loading
      saveLoading: false
    }
  },
  mounted() {
    this.id = params(this, 'id')
    // console.log(this.id)
    if (this.id !== null) {
      getByModelId(this.id)
        .then(result => {
          this.loading = true
          // console.log(result)
          this.processData.id = this.id
          this.processData.name = result.data.model.name
          this.processData.key = result.data.model.key
          this.processData.modelStatusIfSub = result.data.isSub.toString()
          // 如果已部署
          if (result.data.model.deploymentId !== undefined) {
            this.processData.deploymentId = result.data.model.deploymentId
          }
          // console.log(this.processData.exerciseType)
          this.processData.exerciseType = result.data.exerciseType.toString()
          this.xmlStr = result.data.xml
          this.initDiagram()
        })
        .finally(() => {
          this.loading = false
        })
    } else {
      this.initDiagram()
    }

    /*
      缩放流程图
    */
    // const viewPort = document.getElementsByClassName('viewport')
    // console.log(viewPort[0])
    // const st = window.getComputedStyle(viewPort[0], null)
    // console.log(st)
    // const tr =
    //   st.getPropertyValue('-webkit-transform') ||
    //   st.getPropertyValue('-moz-transform') ||
    //   st.getPropertyValue('-ms-transform') ||
    //   st.getPropertyValue('-o-transform') ||
    //   st.getPropertyValue('transform-origin')
    // ;('FAIL')
    // console.log(st.getPropertyValue('transform'))
    // console.log(st.getPropertyValue('transform-origin'))
    // // With rotate(30deg)...
    // // matrix(0.866025, 0.5, -0.5, 0.866025, 0px, 0px)
    // console.log('Matrix: ' + tr)
  },
  created() {},
  methods: {
    // 引入流程图
    initDiagram() {
      // 1、引入相关的依赖
      const propertiesPanelModule = require('bpmn-js-properties-panel')
      const propertiesProviderModule = require('bpmn-js-properties-panel/lib/provider/camunda')
      const camundaModdleDescriptor = require('camunda-bpmn-moddle/resources/camunda')
      // 2、分别获取到属性ref为“content”和“canvas”的dom节点
      this.container = this.$refs.content
      const canvas = this.$refs.canvas
      // 3、建模配置
      this.bpmnModeler = new BpmnModeler({
        container: canvas,
        // 控制板
        propertiesPanel: {
          parent: '#js-properties-panel'
        },
        additionalModules: [propertiesPanelModule, propertiesProviderModule],
        moddleExtensions: {
          camunda: camundaModdleDescriptor
        }
      })
      // 4、获取图的内容
      this.createNewDiagram()
    },
    // 定义模型
    createNewDiagram() {
      this.$nextTick(() => {
        if (this.xmlStr === '') {
          this.xmlStr = this.newDiagramXML
        }
        const that = this
        this.bpmnModeler.importXML(this.xmlStr, function(err) {
          if (err) {
            console.error(err)
          } else {
            // 字符串转换成图成功后执行的函数
            that.success()
          }
          // 流程图自适应画布
          var canvas = that.bpmnModeler.get('canvas')
          canvas.zoom('fit-viewport')
        })
      })
    },
    // 保存流程（解锁下载按钮）
    save() {
      // 如果是已部署的流程
      if (this.processData.deploymentId !== '') {
        this.$confirm('流程已部署, 保存将删除已部署的流程及相关信息', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveLoading = true
          const _this = this
          const downloadLink = this.$refs.saveDiagram
          const downloadSvgLink = this.$refs.saveSvg
          const fileName = this.processName
          downloadLink.title = ''
          downloadSvgLink.title = ''

          // 绑定事件，页面加载触发
          _this.saveSVG(function(err, svg) {
            _this.setEncoded(downloadSvgLink, fileName + '.svg', err ? null : svg)
          })
          _this.saveDiagram(function(err, xml) {
            _this.setEncoded(downloadLink, fileName + '.bpmn', err ? null : xml)
          })

          // 调用方法，新增/保存已部署流程
          insertDeployedProcessModel(this.processData).then(result => {
            this.processData.id = result.data.id
            this.processData.deploymentId = ''
          })
          this.saveLoading = false
        }).catch(() => {})
      } else {
        // 如果是未部署的流程
        this.saveLoading = true
        const _this = this
        const downloadLink = this.$refs.saveDiagram
        const downloadSvgLink = this.$refs.saveSvg
        const fileName = this.processName
        downloadLink.title = ''
        downloadSvgLink.title = ''

        // 绑定事件，页面加载触发
        _this.saveSVG(function(err, svg) {
          _this.setEncoded(downloadSvgLink, fileName + '.svg', err ? null : svg)
        })
        _this.saveDiagram(function(err, xml) {
          _this.setEncoded(downloadLink, fileName + '.bpmn', err ? null : xml)
        })

        // 调用方法，新增/保存未部署流程
        insertProcessModel(this.processData).then(result => {
          this.processData.id = result.data.id
        })
        this.saveLoading = false
      }
    },
    saveJSON(done) {},
    // 下载流程：SVG文件
    saveSVG(done) {
      this.bpmnModeler.saveSVG(done)
    },
    // 下载流程：bpmn文件
    saveDiagram(done) {
      this.bpmnModeler.saveXML({ format: true }, function(err, xml) {
        done(err, xml)
      })
    },
    // 流程图转码
    setEncoded(link, name, data) {
      // 获取modelxml <= data
      this.processData.modelxml = data
      // 重新编码：xml -> URI，获取imgstr <= encodedData
      var encodedData = encodeURIComponent(data)
      this.processData.imgstr = encodedData
      this.xmlStr = data
      // console.log(this.processData)
      // 改变a的属性：className令a标签可点击，href令能下载，download是下载的文件的名字
      link.className = 'active'
      link.href = 'data:application/bpmn20-xml;charset=UTF-8,' + encodedData
      link.download = name
    },
    // 重置流程
    reset() {
      this.$confirm('未保存的流程将被清空！', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.bpmnModeler.importXML(this.newDiagramXML, function(err) {
            if (err) {
              console.error(err)
            }
          })
        })
        .catch(() => {})
    },
    // 缩放流程图
    displaySizeChange(value) {
      const layerBase = document.getElementsByClassName('viewport')
      console.log(layerBase[0])
    },
    // 增加事件监听器在Modeling里
    success() {
      const bpmnjs = this.bpmnModeler
      const eventBus = bpmnjs.get('eventBus')
      const elementFactory = bpmnjs.get('elementFactory')
      const modeling = new Modeling(eventBus, elementFactory)
      this.addBpmnListener(this, modeling)
    },
    // 获取相关节点信息
    addBpmnListener(_self, modeling) {
      const bpmnjs = this.bpmnModeler
      const eventBus = bpmnjs.get('eventBus')
      const events = ['element.click', 'element.dblclick']
      events.forEach(event => {
        eventBus.on(event, e => {
          // 重置流程线节点为false
          this.SequenceFlowFromGateway = false
          this.elementType = e.element.type
          console.log(this.elementType)
          if (
            e.element.type === 'bpmn:Process' ||
            e.element.type === 'bpmn:Lane'
          ) {
            return
          }
          var elementRegistry = bpmnjs.get('elementRegistry')
          var shape = elementRegistry.get(e.element.id)
          console.log(shape)
          // 判断流程线节点是否紧跟网关节点
          if (shape.source !== undefined) {
            if (shape.source.type.indexOf('Gateway') > -1) {
              this.SequenceFlowFromGateway = true
            }
          }
          // 获取节点具体信息
          _self.nodeCode = shape.businessObject.id
          _self.nodeName = shape.businessObject.name
          // console.log(_self.nodeCode)
          // console.log(_self.nodeName)
          this.processNodeName = _self.nodeName
          this.nodeId = _self.nodeCode
          // 更新url
          this.initUrl =
            '/process/actremodel/selectChildModelToModelTransfer/' +
            this.id +
            '/' +
            this.nodeId
          // 如果节点是CallActivity -> 获取节点绑定信息(回显时间+绑定关系)
          // if (this.elementType.indexOf('CallActivity') > -1) {
          //   this.estimatedTimeLoading = true
          //   request({
          //     url:
          //       '/process/actnodesub/selectEstimatedTime/' +
          //       this.id +
          //       '/' +
          //       this.nodeId,
          //     method: 'get'
          //   })
          //     .then(result => {
          //       this.estimatedTime = result.data.estimatedTime
          //     })
          //     .finally(() => {
          //       this.estimatedTimeLoading = false
          //     })
          // }
          // 无论节点是否CallActivity -> 获取节点绑定信息(绑定关系)
          this.tagsLoading = true
          request({
            url:
              '/process/actnodesub/selectBindingInfo/' +
              this.id +
              '/' +
              this.nodeId,
            method: 'get'
          })
            .then(result => {
              // console.log(result)
              this.labelChildProcess = result.data.subList
              this.labelChildJobs = result.data.jobsList
              this.labelChildUsers = result.data.userList
              this.labelChildOrgan = result.data.orgList
            })
            .finally(() => {
              this.tagsLoading = false
            })
        })
      })
    },
    // 保存预估时间
    saveEstimatedTime() {
      const data = {
        modelId: this.id,
        nodeId: this.nodeId,
        estimatedTime: this.estimatedTime
      }
      request({
        url: '/process/actnodesub/saveEstimatedTime',
        method: 'put',
        data
      }).then(result => {
        console.log(result)
      })
    },
    // 控制dialog显示与否 -> process
    dialogShowProcess() {
      this.type = 'process'
      this.titles = ['全部子流程', '已绑定子流程']
      this.filterPlaceholder = '选择绑定子流程'
      this.isMultiple = false
      this.initUrl =
        '/process/actremodel/selectChildModelToModelTransfer/' +
        this.id +
        '/' +
        this.nodeId
      this.submitData = {
        modelId: this.id,
        nodeId: this.nodeId,
        childModelIdList: this.selectedChildProcess
      }
      this.$refs.dialogTransfer.showDialog()
    },
    // 控制dialog显示与否 -> jobs
    dialogShowJobs() {
      this.type = 'jobs'
      this.titles = ['全部工作组', '已绑定工作组']
      this.filterPlaceholder = '选择绑定工作组'
      this.isMultiple = false
      this.initUrl =
        '/general/tree/selectActNodeJobsTransfer/' +
        this.id +
        '/' +
        this.nodeId
      this.$refs.dialogTransfer.showDialog()
    },
    // 控制dialog显示与否 -> user
    dialogShowUser() {
      this.type = 'user'
      this.titles = ['全部用户', '已绑定用户']
      this.filterPlaceholder = '选择绑定用户'
      this.isMultiple = true
      this.initUrl =
        '/process/actnodeuser/selectActNodeUserTransfer/' +
        this.id +
        '/' +
        this.nodeId
      this.$refs.dialogTransfer.showDialog()
    },
    // 控制dialog显示与否 -> organization
    dialogShowOrgan() {
      this.type = 'organization'
      this.titles = ['全部组织', '已绑定组织']
      this.filterPlaceholder = '选择绑定组织'
      this.isMultiple = true
      this.initUrl =
        '/user/organization/selectNodeOrganizatioinTransfer/' +
        this.id +
        '/' +
        this.nodeId
      this.$refs.dialogTransfer.showDialog()
    },
    // 接收子组件传来的selectedChildProcess -> 赋给selectedChildProcess
    sendSelectedChild(data) {
      this.wholeChildProcess = data.left
      this.selectedChildProcess = data.right
    },
    // 提交列表（绑定子流程/工作组/用户）
    dialogSubmit(params) {
      // console.debug(params)
      if (!this.isMultiple && params.value.length > 1) {
        // 单选检查
        this.$alert('只允许选择一条数据')
      } else {
        this.loading = true
        const url =
          this.type === 'process'
            ? '/process/actremodel/saveChildModelToModel'
            : this.type === 'jobs'
              ? 'process/actnodejobs/saveActNodeJobs'
              : this.type === 'user'
                ? 'process/actnodeuser/saveActNodeUser'
                : 'process/actnodeorg/saveActNodeOrg'
        const data =
          this.type === 'process'
            ? {
              modelId: this.id,
              nodeId: this.nodeId,
              childModelIdList: this.selectedChildProcess
            }
            : this.type === 'jobs'
              ? {
                modelId: this.id,
                nodeId: this.nodeId,
                jobCodeList: this.selectedChildProcess
              }
              : this.type === 'user'
                ? {
                  modelId: this.id,
                  nodeId: this.nodeId,
                  userCodeList: this.selectedChildProcess
                }
                : {
                  modelId: this.id,
                  nodeId: this.nodeId,
                  organizationCodeList: this.selectedChildProcess
                }
        // console.log(data.childModelIdList)
        request({
          url,
          method: 'post',
          data
        })
          .then(() => {
            // 根据key列表 -> 获取value列表
            switch (this.type) {
              case 'process':
                this.labelChildProcess = keysGetLabels(
                  this.wholeChildProcess,
                  this.selectedChildProcess
                )
                break
              case 'jobs':
                this.labelChildJobs = keysGetLabels(
                  this.wholeChildProcess,
                  this.selectedChildProcess
                )
                break
              case 'user':
                this.labelChildUsers = keysGetLabels(
                  this.wholeChildProcess,
                  this.selectedChildProcess
                )
                break
              case 'organization':
                this.labelChildOrgan = keysGetLabels(
                  this.wholeChildProcess,
                  this.selectedChildProcess
                )
                break
            }
          })
          .finally(() => {
            this.loading = false
            this.$refs.dialogTransfer.closeDialog()
          })
      }
    },
    // 列表元素变化
    changeHandler(params) {
      if (params.direction === 'right') {
        // 如果是右移添加项
        this.selectedChildProcess = this.selectedChildProcess.concat(
          params.movedKeys
        )
      } else {
        // 如果是左移减少项
        var a = this.selectedChildProcess
        var b = params.movedKeys
        for (var i = 0; i < b.length; i++) {
          for (var j = 0; j < a.length; j++) {
            if (a[j] === b[i]) {
              a.splice(j, 1)
              j = j - 1
            }
          }
        }
        // console.log(a)
        this.selectedChildProcess = a
      }
    }
  }
}
</script>

<style src="./bpmn/bpmn-js-properties-panel.css"></style>
<style src="./bpmn/diagram-js.css"></style>
<style src="./bpmn/app.css"></style>
<style src="./bpmn/font-css/bpmn-embedded.css"></style>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
.containers /deep/ {
  position: relative;
  background-color: #ffffff;
  height: 800px;
  #js-properties-panel {
    display: none;
  }
  .el-form {
    // display: none;
    background: #f8f8f8;
    padding: 10px;
    width: 320px;
    position: absolute;
    right: 0;
    top: 0;
    &-block:not(:first-child) {
      margin-top: 20px;
    }
    &-title {
      font-size: 18px;
      font-weight: bold;
      color: #606266;
      display: block;
      padding: 20px 0 10px 0;
      border-top: 1px dotted #606266;
    }
    .first {
      padding-top: 0;
      border: 0;
    }
    &-item {
      margin-bottom: 0;
      label {
        font-size: 12px;
        font-weight: normal;
        padding: 0;
      }
    }
  }
  .bjs-powered-by img {
    display: none;
  }
  .buttons {
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 10;
    height: 32px;
    a {
      background: #e6a23c;
      color: #fff;
      display: inline-block;
      padding: 0 15px;
      height: 32px;
      line-height: 32px;
      border-radius: 4px;
      margin-right: 10px;
    }
  }
  .canvas {
    width: 100%;
    height: 100%;
    .djs-palette {
      top: 70px;
    }
  }
  .panel {
    position: absolute;
    right: 0;
    top: 0;
    width: 300px;
  }
  // 去除左侧冗余图标
  .djs-palette {
    .group {
      .bpmn-icon-subprocess-expanded,
      .bpmn-icon-data-object,
      .bpmn-icon-data-store,
      .bpmn-icon-participant {
        display: none;
      }
    }
  }
  // 去除Task冗余选项
  .djs-popup {
    .djs-popup-body {
      .bpmn-icon-send,
      .bpmn-icon-receive,
      .bpmn-icon-manual,
      .bpmn-icon-business-rule,
      .bpmn-icon-service,
      .bpmn-icon-script,
      .bpmn-icon-subprocess-collapsed,
      .bpmn-icon-subprocess-expanded {
        display: none;
      }
      .bpmn-icon-call-activity span,
      .bpmn-icon-user span,
      .bpmn-icon-task span {
        display: none;
      }
      // Task选项汉化
      .bpmn-icon-task:before {
        content: '\E821  非绑定';
        font-size: 14px;
      }
      .bpmn-icon-call-activity:before {
        content: '\E82A  绑定子流程';
        font-size: 14px;
      }
      .bpmn-icon-user:before {
        content: '\E844  用户任务';
        font-size: 14px;
      }
    }
  }
  // 自适应dialog(配合组件样式)
  .el-dialog__body {
    box-sizing: content-box;
  }
  .el-transfer__buttons {
    max-width: fit-content !important;
    padding: 5%;
  }
}
</style>
