const list = [

  {
    roleId: 1,
    roleName: '系统管理员',
    roleKey: 'admin',
    roleStatus: '1',
    // canOperatePages: ['userManage', 'articleManage', 'roleManage', 'codeManage']
    canOperatePages: [

      {
        id: 1,
        label: '权限',
        children: [

          {
            id: 1.1,
            label: '用户管理',
            check: true,
            children: [

              {
                label: '新增',
                check: true
              },
              {
                label: '查看',
                check: true
              },
              {
                label: '修改',
                check: true
              },
              {
                label: '删除',
                check: true
              }
            ]
          },
          {
            label: '文章管理',
            check: true,
            children: [{
              label: '新增',
              check: true
            },
            {
              label: '查看',
              check: true
            },
            {
              label: '修改',
              check: true
            },
            {
              label: '删除',
              check: true
            }
            ]
          },
          {
            label: '代码管理',
            check: true,
            children: [{
              label: '新增',
              check: true
            },
            {
              label: '查看',
              check: true
            },
            {
              label: '修改',
              check: true
            },
            {
              label: '删除',
              check: true
            }
            ]
          },
          {
            label: '角色管理',
            check: true,
            children: [{
              label: '新增',
              check: true
            },
            {
              label: '查看',
              check: true
            },
            {
              label: '修改',
              check: true
            },
            {
              label: '删除',
              check: true
            }
            ]
          }
        ]
      }
    ]
  },
  {
    roleId: 2,
    roleName: '超级管理员',
    roleKey: 'super',
    roleStatus: '1',
    // canOperatePages: ['/']
    canOperatePages: []
  },
  {
    roleId: 3,
    roleName: '开发',
    roleKey: 'developer',
    roleStatus: '1',
    // canOperatePages: ['codeManage']
    canOperatePages: []
  },
  {
    roleId: 4,
    roleName: '编辑',
    roleKey: 'editor',
    roleStatus: '1',
    // canOperatePages: ['articleManage']
    canOperatePages: []
  },
  {
    roleId: 5,
    roleName: '访客',
    roleKey: 'vistor',
    roleStatus: '1',
    canOperatePages: []
  }
]

const tableData = {
  list: list,
  total: list.length
}

export default {
  getRoleList: () => {
    return {
      tableData
    }
  },
  updateRole: () => {
    return {
      message: '更新成功！'
    }
  },
  deleteRole: () => {
    return {
      message: '删除成功！'
    }
  }
}
