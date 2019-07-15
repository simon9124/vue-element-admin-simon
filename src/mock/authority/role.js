const list = [

  {
    roleId: 1,
    roleName: '系统管理员',
    roleKey: 'admin',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '代码管理'],
      '菜单': []
    }
    // canOperatePages: [

    //   {
    //     id: '1',
    //     label: '权限',
    //     name: 'authority',
    //     children: [

    //       {
    //         id: '1.1',
    //         label: '用户管理',
    //         name: 'userManage',
    //         check: true,
    //         children: [

    //           {
    //             id: '1.1.1',
    //             label: '新增',
    //             check: true
    //           },
    //           {
    //             id: '1.1.2',
    //             label: '查看',
    //             check: true
    //           },
    //           {
    //             id: '1.1.3',
    //             label: '修改',
    //             check: true
    //           },
    //           {
    //             id: '1.1.4',
    //             label: '删除',
    //             check: true
    //           }
    //         ]
    //       },
    //       {
    //         id: '1.2',
    //         label: '文章管理',
    //         name: 'articleManage',
    //         check: true,
    //         children: [

    //           {
    //             label: '新增',
    //             check: true
    //           },
    //           {
    //             label: '查看',
    //             check: true
    //           },
    //           {
    //             label: '修改',
    //             check: true
    //           },
    //           {
    //             label: '删除',
    //             check: true
    //           }
    //         ]
    //       },
    //       {
    //         label: '代码管理',
    //         name: 'codeManage',
    //         check: true,
    //         children: [

    //           {
    //             label: '新增',
    //             check: true
    //           },
    //           {
    //             label: '查看',
    //             check: true
    //           },
    //           {
    //             label: '修改',
    //             check: true
    //           },
    //           {
    //             label: '删除',
    //             check: true
    //           }
    //         ]
    //       },
    //       {
    //         label: '角色管理',
    //         name: 'roleManage',
    //         check: true,
    //         children: [

    //           {
    //             label: '新增',
    //             check: true
    //           },
    //           {
    //             label: '查看',
    //             check: true
    //           },
    //           {
    //             label: '修改',
    //             check: true
    //           },
    //           {
    //             label: '删除',
    //             check: true
    //           }
    //         ]
    //       }
    //     ]
    //   }
    // ]
  },
  {
    roleId: 2,
    roleName: '超级管理员',
    roleKey: 'super',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '角色管理', '代码管理']
    },
    canOperatePages: []
  },
  {
    roleId: 3,
    roleName: '开发',
    roleKey: 'developer',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '角色管理', '代码管理']
    },
    canOperatePages: []
  },
  {
    roleId: 4,
    roleName: '编辑',
    roleKey: 'editor',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '角色管理', '代码管理']
    },
    canOperatePages: []
  },
  {
    roleId: 5,
    roleName: '访客',
    roleKey: 'vistor',
    roleStatus: '1',
    canOperatePage: {
      '权限': ['用户管理', '文章管理', '角色管理', '代码管理']
    },
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
