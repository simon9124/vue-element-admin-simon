/**
 * @Author: jianglei
 * @Date:   2017-10-12 12:06:49
 */
'use strict'
import Vue from 'vue'
export default function treeToArray(data, expandAll, parent = null, level = null) {
  let tmp = []
  Array.from(data).forEach(function(record) {
    // 添加_expanded项，默认为false
    if (record._expanded === undefined) {
      Vue.set(record, '_expanded', expandAll)
    }

    // 添加_level项，即第几层级
    let _level = 1
    if (level !== undefined && level !== null) {
      _level = level + 1
    }
    Vue.set(record, '_level', _level)

    // 如果有父元素
    if (parent) {
      Vue.set(record, 'parent', parent)
    }

    tmp.push(record)

    // 如果有子元素，则再次执行treeToArray()方法，即在项里加入子元素
    if (record.children && record.children.length > 0) {
      const children = treeToArray(record.children, expandAll, record, _level)
      tmp = tmp.concat(children)
    }
    // console.log(record)
  })
  // console.log(tmp)
  return tmp
}
