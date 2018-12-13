import request from '@/utils/request'

// 获取用户数据（全部）
export function getUserList(_this) {
  _this.tableDataLoading = true
  return request({
    url: '/user/list',
    method: 'get'
  })
}

// 更新用户数据
export function updateUsers(data) {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

// 删除1行数据
export function deleteUser() {
  return request({
    url: '/user/delete',
    method: 'delete'
  })
}

// 批量操作数据
export function batctExecute(_this) {
  if (typeof _this.multipleSelection === 'undefined') {
    _this.$message({
      type: 'warning',
      message: '请选择数据！'
    })
    return
  }
  if (_this.batchFilterData === '') {
    _this.$message({
      type: 'warning',
      message: '请选择批处理操作！'
    })
    return
  }
  if (_this.batchFilterData === 'delete') {
    _this
      .$confirm('确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
      .then(() => {
        const codes = []
        _this.multipleSelection.forEach(row => {
          codes.push(row.dictCode)
        })
        // deleteArrayCode(codes, _this)
      }).catch(() => {})
  }
}
