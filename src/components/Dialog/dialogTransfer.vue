<template>
  <div class="dialog-user-container">
    <el-dialog class="el-dialog-transfer"
               title=""
               width="60%"
               :visible.sync="visable"
               :btn-text="btnText"
               ref="elDialog">
      <div class="transfer-panel"
           v-loading="loading"
           element-loading-text="数据加载中"
           element-loading-spinner="el-icon-loading">
        <el-transfer class="el-transfer"
                     filterable
                     :titles="titles"
                     :filter-method="filterMethod"
                     :filter-placeholder="filterPlaceholder"
                     :left-default-checked="[]"
                     @change="changeHandler"
                     v-model="value"
                     :data="data">
        </el-transfer>
      </div>
      <span slot="footer"
            class="dialog-footer">
        <el-button type="primary"
                   :disabled="loading"
                   @click="submitDialog">{{btnText}}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { request, isNotEmpty } from '@/utils'

export default {
  name: 'DialogTransfer',
  components: {},
  props: {
    filterPlaceholder: {
      String,
      default: '选择绑定用户'
    },
    titles: {
      Array,
      default: function() {
        return ['全部用户', '已绑定用户']
      }
    },
    initUrl: {
      String,
      default: '/user/selectOrganizationUserTransfer'
    },
    queryParam: {
      Object,
      default: ''
    },
    btnText: {
      String,
      default: '确 定'
    }
  },
  data() {
    return {
      loading: false,
      visable: false,
      params: {},
      data: [],
      value: [],
      filterMethod(query, item) {
        return item.label.indexOf(query) > -1
      }
    }
  },
  watch: {
    queryParam(val) {
      this.queryParam = val
    }
  },
  mounted() {
    // 挂在reisze 事件
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        // 屏幕缩放 -> 动态获取elDialog高度 -> 设置elDialogBody高度 -> 设置elCheckboxGroupHeiht高度
        this.$nextTick(() => {
          /*
            多个dialog同时引用时，样式会冲突
          */
          // const elDialog = document.getElementsByClassName('el-dialog')
          // const elDialogBody = document.getElementsByClassName(
          //   'el-dialog__body'
          // )
          // console.log(elDialogBody)

          if (this.visable) {
            /*
              支持多个dialog同时引用
            */
            const elDialogTransfer = document.getElementsByClassName(
              'el-dialog-transfer'
            )
            const elDialog = elDialogTransfer[0].childNodes[0]
            const elDialogBody = elDialogTransfer[0].childNodes[0].childNodes[1]
            const elCheckboxGroup = document.getElementsByClassName(
              'el-checkbox-group'
            )
            // const elDialogHeight = elDialog[0]
            const elDialogHeight = elDialog.offsetHeight
            const elDialogBodyHeight = elDialogHeight - 30 - 70
            const elCheckboxGroupHeiht = elDialogBodyHeight - 40 - 70
            // console.log(elDialogBodyHeight)
            // console.log(elCheckboxGroupHeiht)
            // elDialogBody[0].style.height = elDialogBodyHeight + 'px'
            elDialogBody.style.height = elDialogBodyHeight + 'px'
            elCheckboxGroup[0].style.height = elCheckboxGroupHeiht + 'px'
            elCheckboxGroup[1].style.height = elCheckboxGroupHeiht + 'px'
          }
        })
      })()
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.refreshTable()
    },
    refreshTable() {
      if (isNotEmpty(this.initUrl)) {
        this.loading = true
        request({
          url: this.initUrl,
          method: 'get'
        })
          .then(result => {
            this.data = result.data.left
            this.value = result.data.right
            const params = {
              left: this.data,
              right: this.value
            }
            this.$emit('sendSelectedChild', params)
            // 数据加载完 -> 根据elDialog的高度 -> 设置elDialogBody高度 -> 设置elCheckboxGroupHeiht高度
            this.$nextTick(() => {
              if (this.visable) {
                const elDialogTransfer = document.getElementsByClassName(
                  'el-dialog-transfer'
                )
                const elDialog = elDialogTransfer[0].childNodes[0]
                const elDialogBody =
                  elDialogTransfer[0].childNodes[0].childNodes[1]
                const elCheckboxGroup = document.getElementsByClassName(
                  'el-checkbox-group'
                )
                const elDialogHeight = elDialog.offsetHeight
                const elDialogBodyHeight = elDialogHeight - 30 - 70
                const elCheckboxGroupHeiht = elDialogBodyHeight - 40 - 70
                elDialogBody.style.height = elDialogBodyHeight + 'px'
                elCheckboxGroup[0].style.height = elCheckboxGroupHeiht + 'px'
                elCheckboxGroup[1].style.height = elCheckboxGroupHeiht + 'px'
              }
            })
          })
          .finally(() => {
            this.loading = false
          })
      }
    },
    changeHandler(value, direction, movedKeys) {
      this.value = value
      this.$emit('change', {
        value: value,
        direction: direction,
        movedKeys: movedKeys
      })
    },
    showDialog() {
      this.$nextTick(() => {
        // console.log(this.initUrl)
        this.visable = true
        this.refreshTable()
      })
    },
    closeDialog() {
      this.visable = false
    },
    showLoading(flg) {
      this.loading = flg
    },
    submitDialog() {
      this.$emit('submit', {
        value: this.value
      })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.dialog-user-container /deep/ {
  .transfer-panel {
    text-align: center;
  }
  .el-dialog {
    height: 70%;
    position: relative;
    &__body {
      box-sizing: content-box;
      .transfer-panel {
        height: 100%;
        .el-transfer {
          text-align: left;
          display: inline-block;
          width: 90%;
          height: 100%;
          .el-transfer-panel {
            width: 40%;
            height: 100%;
            &__body {
              .el-checkbox-group::-webkit-scrollbar-track {
                box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
                border-radius: 5px;
              }
              .el-checkbox-group::-webkit-scrollbar-thumb {
                background-color: rgba(64, 158, 255, 0.5);
                outline: 1px solid slategrey;
                border-radius: 5px;
              }
              .el-checkbox-group::-webkit-scrollbar {
                width: 10px;
              }
            }
          }
          .el-transfer__buttons {
            max-width: 10%;
            padding: 5%;
          }
        }
      }
    }
    &__footer {
      position: absolute;
      bottom: 0;
      right: 0;
    }
  }
}
</style>
