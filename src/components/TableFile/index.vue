<template>
  <div class="file-table"
       :selectUrl="selectUrl"
       :delUrl="delUrl"
       :updateUrl="updateUrl"
       :downloadUrl="downloadUrl"
       :queryParam="queryParam">
    <el-table :data="tableData.list"
              v-loading="tableDataLoading"
              border
              style="width: 100%">
      <el-table-column prop="uploadName"
                       label="文件名"
                       width="300">
        <template slot-scope="scope">
          <span v-if="!scope.row.isEdit"
                @click="scope.row.isEdit = !scope.row.isEdit"
                class="inline-edit">
            {{scope.row.uploadName}}
          </span>
          <span v-else>
            <el-input v-model="scope.row.uploadName"></el-input>
            <el-button class="buttonSort"
                       size="small"
                       type="success"
                       @click="update(scope.row)">确定</el-button>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="uploadSize"
                       label="大小">
      </el-table-column>
      <el-table-column prop="updateUser"
                       label="上传用户">
      </el-table-column>
      <el-table-column prop="createTime"
                       label="上传时间"
                       width="100">
      </el-table-column>
      <el-table-column width="300"
                       class="operation"
                       label="操作">
        <template slot-scope="scope">
          <el-button type="info"
                     @click="scope.row.isEdit = !scope.row.isEdit">重命名
          </el-button>
          <el-button type="danger"
                     @click="deleteByCode(scope.row.uploadCode)">删除
          </el-button>
          <el-button type="success"
                     @click="downloadByCode(scope.row.uploadCode)">下载
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination layout="prev, pager, next, jumper"
                   @current-change="pageChangeHandler"
                   v-show="tableData.total > 0"
                   :page-size="tableData.pageSize"
                   :total="tableData.total">
    </el-pagination>
  </div>
</template>

<script>
import { request, objectMerge } from '@/utils'

export default {
  name: 'TableFile',
  components: {},
  data() {
    return {
      tableDataLoading: false,
      params: {},
      tableData: {
        total: 0,
        pageNum: 1,
        pageSize: 20,
        list: []
      }
    }
  },
  props: {
    selectUrl: {
      String,
      default: '',
      required: true
    },
    delUrl: {
      String,
      default: '',
      required: true
    },
    updateUrl: {
      String,
      default: '',
      required: true
    },
    downloadUrl: {
      String,
      default: '',
      required: true
    },
    queryParam: {
      Object,
      default: ''
    }
  },
  watch: {
    queryParam(val) {
      this.queryParam = val
    }
  },
  created() {
    this.refreshTable()
  },
  methods: {
    update(row) {
      this.tableDataLoading = true
      request({
        url: this.updateUrl,
        method: 'put',
        data: row
      })
        .then(reult => {
          row.isEdit = !row.isEdit
        })
        .finally(() => {
          this.tableDataLoading = false
        })
    },
    deleteByCode(code) {
      this.$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.tableDataLoading = true
          request({
            url: this.delUrl + code,
            method: 'delete'
          })
            .then(() => {
              this.refreshTable()
            })
            .finally(() => {
              this.tableDataLoading = false
            })
        })
        .catch(() => {})
    },
    refreshTable() {
      this.tableDataLoading = true
      this.params = objectMerge(
        {
          pageSize: this.tableData.pageSize,
          pageNum: this.tableData.pageNum
        },
        this.queryParam
      )
      request({
        url: this.selectUrl,
        method: 'get',
        params: this.params
      })
        .then(result => {
          this.tableData = result.data.tableData
          this.tableData.list = result.data.tableData.list.map(row => {
            this.$set(row, 'isEdit', false)
            return row
          })
        })
        .finally(() => {
          this.tableDataLoading = false
        })
    },
    downloadByCode(code) {
      window.open(this.downloadUrl + code)
    },
    pageChangeHandler(pageNum) {
      // 分页-跳页
      this.tableData.pageNum = pageNum
      this.refreshTable()
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.file-table {
  .el-input {
    width: 220px;
    margin-right: 20px;
  }
}
</style>
