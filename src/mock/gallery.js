import Mock from 'mockjs'

const list = []
const count = 45

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    // 自增id
    // 'photoId|+1': 1,
    photoId: '@increment',
    // 随机生成英文人名
    photoName: '@name()',
    // 随机生成中文人名
    photoNickName: '@cname()',
    // 随机生成手机号（1开头11位数字）
    photoMobile: /^1[0-9]{10}$/,
    // 随机生成邮件
    photoMail: '@email()',
    // 随机生成地址
    photoAddress: '@province' + '@city' + '@county()',
    // 在其中随机找1-n个 -> photoRoles:[{roleName:'系统管理员'},{roleName:'开发'}...]
    // Random.dataImage( size, text ) 生成一段随机的 Base64 图片编码
    // photoAvatar: +Mock.Random.dataImage('50x50', '#FF6600'),
    uploadLocalUrl: "@dataImage('50x50', '图片')",
    // 'photoStatus|1': ['0', '1']
    'photoStatus|1': ['1']
  }))
}

const galleryData = {
  list: list,
  total: list.length
}

export default {
  getPhotoList: () => {
    return {
      galleryData
    }
  },
  updatePhoto: () => {
    return {
      message: '更新成功！'
    }
  },
  deletePhoto: () => {
    return {
      message: '删除成功！'
    }
  }
}
