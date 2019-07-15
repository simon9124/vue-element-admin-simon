/**
 */
'use strict'
export function computedCheckTree(obj) {
  // 常量：所有的选项
  const canOperatePages = {
    '权限': ['用户管理', '文章管理', '角色管理', '代码管理'],
    '菜单': []
  }

  const tmp = []

  Object.keys(obj).forEach(key => {
    var id = 0

    // 循环对象的value，即可操作页面 -> 加工数据后放到children数组里
    const children = []
    Array.from(obj[key]).forEach(item => {
      children.push({
        id: ++id,
        label: item,
        children: [{
          id: id + '-1',
          label: '新增',
          check: true
        }, {
          id: id + '-2',
          label: '查看',
          check: true
        }, {
          id: id + '-3',
          label: '修改',
          check: true
        }, {
          id: id + '-4',
          label: '删除',
          check: true
        }]
      })
    })

    // 与canOperatePages筛选出不可操作的页面 -> 加工数据后同样放到children数组里
    const notIncludePages = canOperatePages[key].filter(el => !obj[key].includes(el));
    if (notIncludePages.length > 0) {
      notIncludePages.forEach(item => {
        children.push({
          id: ++id,
          label: item,
          children: [{
            id: id + '-1',
            label: '新增',
            check: false
          }, {
            id: id + '-2',
            label: '查看',
            check: true
          }, {
            id: id + '-3',
            label: '修改',
            check: false
          }, {
            id: id + '-4',
            label: '删除',
            check: false
          }]
        })
      })
    }

    tmp.push({
      label: key,
      children: children
    })

    console.log(tmp)
  })
  return tmp
}
