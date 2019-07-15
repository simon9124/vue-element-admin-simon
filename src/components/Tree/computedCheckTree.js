/**
 */
'use strict'
export function computedCheckTree(obj) {
  // 常量：所有的选项
  const canOperatePages = {
    '权限': ['用户管理', '文章管理', '角色管理', '代码管理']
    // '菜单': []
  }

  const tmp = []

  Object.keys(canOperatePages).forEach(key => {
    var id = 0
    // 根据obj与canOperatePages的差别 -> 筛选出不可操作的页面
    const notIncludePages = canOperatePages[key].filter(el => !obj[key].includes(el));

    const children = []
    Array.from(canOperatePages[key]).forEach(item => {
      children.push({
        id: ++id,
        label: item,
        children: [{
          id: id + '-1',
          label: '新增',
          check: notIncludePages.indexOf(item) === -1
        }, {
          id: id + '-2',
          label: '查看',
          check: true
        }, {
          id: id + '-3',
          label: '修改',
          check: notIncludePages.indexOf(item) === -1
        }, {
          id: id + '-4',
          label: '删除',
          check: notIncludePages.indexOf(item) === -1
        }]
      })
    })

    tmp.push({
      label: key,
      children: children
    })
  })

  // console.log(tmp);

  return tmp
}
