import Mock from 'mockjs'

const userList = []
const count = 45

for (let i = 0; i < count; i++) {
  userList.push(Mock.mock({
    // 自增id
    // 'userId|+1': 1,
    userId: '@increment',
    // 随机生成英文人名
    userName: '@name()',
    // 随机生成中文人名
    userNickName: '@cname()',
    // 随机生成手机号（1开头11位数字）
    userMobile: /^1[0-9]{10}$/,
    // 随机生成邮件
    userMail: '@email()',
    // 随机生成地址
    userAddress: '@province' + '@city' + '@county()',
    // 在其中随机找1-n个 -> userRoles:[{roleName:'系统管理员'},{roleName:'开发'}...]
    'userRoles|1-5': [{
      'roleName|+1': [
        '系统管理员', '超级管理员', '开发', '媒体主', '访客'
      ]
    }],
    // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    // userAvatar: +Mock.Random.dataImage('50x50', '#FF6600'),
    userAvatar: "@dataImage('50x50', '头像')",
    'userStatus|1': ['0', '1']
  }))
}

export default {
  getUserList: () => {
    return {
      total: userList.length,
      tableData: userList
    }
  },
  updateUsers: () => {
    return {
      message: '更新成功！'
    }
  },
  deleteUser: () => {
    return {
      message: '删除成功！'
    }
  }
}
