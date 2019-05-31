<template id="item-template">
  <div style="display:inline-block;margin:0 10px">
    <el-button v-if="!tooltip"
               @click="showModel()"
               icon="el-icon-search"
               plain
               size="mini"
               type="default">查看流程</el-button>
    <el-tooltip v-else
                content="查看流程"
                :placement="placement">
      <el-button @click="showModel()"
                 icon="el-icon-search"
                 plain
                 size="mini"
                 type="default"></el-button>
    </el-tooltip>
  </div>
</template>

<script>
import { request } from '@/utils'

export default {
  name: 'show-model',
  props: {
    modelId: {
      type: String,
      default: ''
    },
    taskId: {
      type: String,
      default: ''
    },
    placement: {
      type: String,
      default: 'top'
    },
    tooltip: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      bpmnModelId: ''
    }
  },
  created() {},
  methods: {
    // 显示全/近景
    showModel() {
      if (this.modelId !== '') {
        this.bpmnModelId = this.modelId
        this.$router.push({
          path: '/processManager/processModeler',
          name: 'process-modeler',
          params: {
            modelId: this.bpmnModelId
          }
        })
      } else {
        request({
          url: `process/model/front/permit/taskIdToModelId/${this.taskId}`,
          method: 'get'
        })
          .then(result => {
            this.bpmnModelId = result.data.modelId
            this.$router.push({
              path: '/processManager/processModeler',
              name: 'process-modeler',
              params: {
                modelId: this.bpmnModelId
              }
            })
          })
          .catch(error => {
            console.error(error)
          })
          .finally(() => {})
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '~@/styles/smart-ui/smart-ui.scss';
</style>
