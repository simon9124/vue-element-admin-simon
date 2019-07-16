/**
 */
'use strict'
export function computedCheckTree(obj) {
  // 常量：所有的选项
  const canOperatePages = {
    '权限': ['用户管理', '文章管理', '角色管理', '代码管理'],
    '系统': ['菜单管理', '按钮管理', '图标管理']
  }

  const tmp = []
  var id = 0

  Object.keys(canOperatePages).forEach(key => {

    var idIn = id + 1
    var idInIn = 1
    // 根据obj与canOperatePages的差别 -> 筛选出不可操作的页面
    const notIncludePages = canOperatePages[key].filter(el => !obj[key].includes(el));

    const children = []
    Array.from(canOperatePages[key]).forEach(item => {
      children.push({
        id: idIn + '-' + idInIn,
        label: item,
        children: [{
          id: idIn + '-' + idInIn + '-1',
          label: '新增',
          check: notIncludePages.indexOf(item) === -1,
          parent: item
        }, {
          id: idIn + '-' + idInIn + '-2',
          label: '查看',
          check: true,
          parent: item
        }, {
          id: idIn + '-' + idInIn + '-3',
          label: '修改',
          check: notIncludePages.indexOf(item) === -1,
          parent: item
        }, {
          id: idIn + '-' + idInIn + '-4',
          label: '删除',
          check: notIncludePages.indexOf(item) === -1,
          parent: item
        }]
      })
      idInIn++
    })
    idIn++

    tmp.push({
      id: ++id,
      label: key,
      children: children
    })
  })

  // console.log(tmp);

  return tmp
}
