### 1.参考项目

- [gitee vue-element-admin](https://gitee.com/mirrors/vue-element-admin)
- [文档](https://panjiachen.github.io/vue-element-admin-site/#/zh-cn/README)

### 2.目录结构

```shell
├── build                    // 构建相关
├── config                   // 配置相关
├── src                      // 源代码
│ ├── api                    // 所有请求
│ ├── assets                 // 主题 字体等静态资源
│ ├── components             // 全局公用组件
│ ├── directive              // 全局指令
│ ├── filtres                // 全局filter
│ ├── mock                   // mock数据
│ ├── router                 // 路由
│ ├── store                  // 全局store管理
│ ├── styles                 // 全局样式
│ ├── utils                  // 全局公用方法
│ ├── view                   // view
│ ├── App.vue                // 入口页面
│ └── main.js                // 入口 加载组件 初始化等
├── static                   // 第三方不打包资源
│ ├── jquery
│ └── Tinymce                // 富文本
├── .babelrc                 // babel-loader 配置
├── .editorconfig            // editorconfig 配置
├── eslintrc.js              // eslint 配置项
├── .gitignore               // git 忽略项
├── favicon.ico              // favicon图标
├── index.html               // html模板
└── package.json             // package.json
```

- views 和 api 两个模块一一对应，方便维护
- components 放置的都是全局公用的一些组件，如上传组件，富文本等等。一些页面级的组件建议还是放在各自 views 文件下，方便管理

### 3.配置文件

.editorconfig: 用于统一代码风格 https://github.com/editorconfig/editorconfig
.gitignore: 用于版本控制

### 4.利用 Store 登录后获取用户信息

- 登录后，存储用户信息（详见文件：src/store/modules/user.js）
  .getUserInfo ().then(response => {commit('mutation1', data1)...})
  .const user = { state: { data1,data2...}, mutations: { mutation1, mutation2...}}

- 登录后，在任意页面获取用户信息（import store from ...）
  store.state.user

### 5.Vue 组件

https://cn.vuejs.org/v2/guide/components.html  
组件开发步骤：

- git 服务器上建立组件项目
- 通过 vue cli 建立项目
  \$ vue init webpack vue-upload
- 参考标准覆盖项目的
  .gitignore
  .editorconfig
  .eslintignore
  .eslintrc.js

- 按需修改 package.json
  .version 版本号不能和上 1 个版本相同
  .必须添加 main，否则无法被引用

- 在 src 目录下添加 index.js
  .单组件参考 ctsi-vue-tinymce
  .组件库参考 ctsi-vue-dialog
  .复杂组件库参考 element-ui

- 发布到 npm
  npm publish

### 7.npm 注册

npm 新用户，需先注册方能发布组件

- 添加用户
  .npm adduser
- 注册后登录
  .npm login

未保存 npm 账户（如新电脑）没有发布权限，同样需先登录 npm 账号保存用户名和密码:

- 用户登录
  .npm login user
- 后依次输入用户名、密码（密码在界面不显示，正常输入即可）、邮箱
  .公共账号 & 密码 & 邮箱：ctsidr ctsidr123!@# ctsidr@qq.com

### 8.Styles & scss

- Styles
  .npm install stylus --save-dev
  .npm install stylus-loader --save-dev

- scss
  .npm install node-sass --save-dev
  .npm install sass-loader --save-dev

### 9.解决 axios 不支持 finally

- npm i promise.prototype.finally
- 在 main.js 添加：require('promise.prototype.finally').shim()

### 10.ssh 免密登录

#### windows:

- 步骤 1:本地生成密钥
  打开 powerShell,(在任意路径下输入)ssh-keygen,
  在 Overwrite (y/n) 输入 yes

- 步骤 2:打开 xshell,连接相应的服务器
  在 xshell 中打开 xftp,把 C:\Users\用户名\.ssh\id_rsa.pub 文件拷贝到 xftp
  (语句：cat ~/id_rsa.pub >> ~/.ssh/authorized_keys)

- 步骤 3:方法 2(若 xftp 无法安装)
  复制.ssh\id_rsa.pub 文件内容
  打开 xshell, 输入 vim ~/.ssh/authorized_keys
  (语句:cd ~/.ssh, vim authorized_keys)
  输入 i 后,将.ssh\id_rsa.pub 文件内容粘贴到文件末尾
  按 esc 后,输入:wq 保存

- 验证免密登录
  在任意路径下输入: ssh root@192.168.11.167,无输入密码提示并连接到该服务器,即可

#### mac/linux:

- ssh-copy-id -i ~/.ssh/id_rsa.pub root@192.168.11.167

### 11.发布版本到服务器

- 打开 deploy.sh 脚本文件
  若有内容更新，则选择“编译”
  检查要发布到的服务器，确认即可

### 12.BPMN-JS 流程编辑器组件相关

- 官网: https://demo.bpmn.io/
- git: https://github.com/bpmn-io
- 自定义插件: smart-ui/src/views/processManager/bpmn-js/plugins
- 中文化: translationsZH.js
- 左侧工具面板控制: PaletteProvider.js
- 中央工具面板控制: ContextPadProvider.js
- 中央弹出工具面板控制: ReplaceMenuProvider.js
- 中央弹出工具面板内容控制: ReplaceOptions.js
