<template>
  <div v-loading="loading">
    <el-container class="gallery-container gallery">
      <el-container class="gallery-container">
        <!-- 左侧筛选 -->
        <el-aside width="15%"
                  class="gallery-container-aside">
          <el-menu default-active="0"
                   class="el-menu-vertical-demo"
                   @select='asideSelect'>
            <template v-for="filter in filters">
              <el-menu-item :key="filter.key"
                            :index="filter.key">
                <li slot="title">{{filter.label}}（{{filter.total}}）</li>
              </el-menu-item>
            </template>
          </el-menu>
        </el-aside>
        <!-- 内容列表 -->
        <el-main style="text-align:right">
          <div class="gallery-list-header">
            <div class="gallery-list-search">
              <el-input v-model="filterFormData.uploadName"
                        :placeholder="placeholder"
                        @keyup.native.enter="selectListByType()"
                        style="margin-right:5px"></el-input>
              <el-button icon="el-icon-search"
                         size="mini"
                         type="primary"
                         @click="selectListByType()"
                         plain>搜索
              </el-button>
              <el-button size="mini"
                         type="danger"
                         icon="el-icon-delete"
                         plain
                         @click="picsDelHandler"
                         style="margin-left:5px">删除</el-button>
            </div>
            <el-upload class="upload-demo"
                       accept=".jpg,.png,.bmp,jpge,"
                       multiple
                       action=""
                       :http-request="httpRequestHandler"
                       :limit=100
                       :on-exceed="handleExceed"
                       :before-upload="upload"
                       :show-file-list='false'
                       auto-upload
                       style="display:inline-block">
              <el-button size="mini"
                         type="success">本地上传</el-button>
            </el-upload>
          </div>
          <el-row :gutter="20"
                  class="gallery-list-row">
            <template v-for="(pic,index) in picList">
              <el-col :span="6"
                      :key="picList[index].value">
                <div class="gallery-list-col">
                  <div class="gallery-list-col-img"
                       ref="imgBox"
                       :style="imgBox"
                       @click="picList[index].select=!picList[index].select;picClickHander()">
                    <img :src="picList[index].uploadLocalUrl">
                    <div class="gallery-list-col-mask"
                         v-show="picList[index].select">
                      <i class="el-icon-check"></i>
                    </div>
                    <div class="gallery-list-col-glass">
                      <i class="el-icon-zoom-in"
                         @click.prevent.stop="picGlass(index)"></i>
                    </div>
                  </div>
                  <div class="gallery-list-col-edit">
                    <span v-show="!pic.edit"
                          class="gallery-list-col-edit-picName"
                          @click="pic.edit=!pic.edit">
                      <span>
                        {{pic.uploadName}}
                        <i class="el-icon-edit"
                           style="font-size:12px;color:#409EFF" />
                      </span>
                    </span>
                    <el-input v-show="pic.edit"
                              v-model="pic.uploadName"
                              @keyup.native.enter="picUpdate(index)"></el-input>
                    <el-button v-show="pic.edit"
                               icon="el-icon-check"
                               size="mini"
                               type="success"
                               class="gallery-list-button"
                               @click="pic.edit=!pic.edit;picUpdate(index)"></el-button>
                    <el-button v-show="pic.edit"
                               icon="el-icon-close"
                               size="mini"
                               type="warning"
                               class="gallery-list-button"
                               @click="pic.edit=!pic.edit"></el-button>
                  </div>
                  <div class="gallery-list-col-operation">
                    <!-- 收藏 -->
                    <el-tooltip v-show="pic.uploadIsfavorite"
                                content="取消收藏"
                                placement="top">
                      <el-button icon="el-icon-star-off"
                                 size="mini"
                                 type="warning"
                                 class="gallery-list-button"
                                 @click="deleteFavor(index)"></el-button>
                    </el-tooltip>
                    <el-tooltip v-show="!pic.uploadIsfavorite"
                                content="收藏"
                                placement="top">
                      <el-button plain
                                 icon="el-icon-star-off"
                                 size="mini"
                                 type="warning"
                                 class="gallery-list-button"
                                 @click="insertFavor(index)"></el-button>
                    </el-tooltip>

                    <el-tooltip content="重命名"
                                placement="top">
                      <el-button plain
                                 icon="el-icon-edit"
                                 size="mini"
                                 type="primary"
                                 class="gallery-list-button"
                                 @click="pic.edit=true"></el-button>
                    </el-tooltip>
                    <el-tooltip content="复制"
                                placement="top">
                      <!-- <el-button plain
                                 icon="el-icon-share"
                                 size="mini"
                                 type="success"
                                 class="gallery-list-button"
                                 v-clipboard:copy='picList[index].uploadLocalUrl'
                                 v-clipboard:success='clipboardSuccess'></el-button> -->
                    </el-tooltip>
                    <el-tooltip content="删除"
                                placement="top">
                      <el-button plain
                                 icon="el-icon-delete"
                                 size="mini"
                                 type="danger"
                                 class="gallery-list-button"
                                 @click="picDelHandler(index)"></el-button>
                    </el-tooltip>
                  </div>
                </div>
              </el-col>
            </template>
          </el-row>
          <el-pagination @current-change="handleCurrentChangeHandler"
                         :current-page.sync="pageNum"
                         :page-size="pageSize"
                         :total='total'
                         layout="prev, pager, next, jumper">
          </el-pagination>
          <!-- 图片放大 -->
          <div class="gallery-list-bigMask"
               v-if="picBigShow"
               @click.prevent.stop="picBigShow=!picBigShow"
               @mousewheel="picBigZoom">
            <img class="gallery-list-bigMask-img"
                 :src="picUrl"
                 @click.prevent.stop="picBigSelect">
          </div>
        </el-main>

      </el-container>
    </el-container>
  </div>
</template>

<script>
// import {
//   selectPhotoByPage,
//   // selectFavoritePhotoByPage,
//   insertFavoritePhoto,
//   deleteFavoritePhoto,
//   deletePhotoByCode,
//   deletePhotoByCodeArray,
//   updatePhoto,
//   uploadByType
// } from '../api/PhotoGallery'

export default {
  name: 'Gallery',
  props: {
    // 弹窗是否可见
    visible: {
      type: Boolean,
      default: false
    },
    // 类型
    type: {
      type: String,
      default: 'PhotoGallery'
    },
    // 数据列表
    picList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      // 选中列表
      selectList: [],
      // 左侧筛选栏
      filters: [
        { key: 'all', label: '全部', total: 0 },
        { key: 'favorites', label: '我的收藏', total: 0 }
      ],
      // 左侧筛选条件
      filter: 'total',
      // 按名称筛选
      filterFormData: {},
      // 一页显示12条
      pageSize: 12,
      // 图片数量
      total: 0,
      // 当前页
      pageNum: 1,
      // 标题搜索
      picSearch: '',
      // 查询提示
      placeholder: '图片标题',
      // 图片库loading
      loading: false,
      // 单张图片url（放大）
      picUrl: '',
      // 单张图片放大，默认隐藏
      picBigShow: false,
      // 动态图片style
      imgBox: {
        width: '100%',
        height: ''
      },
      // 记录屏幕宽度默认值
      screenWidth: document.body.clientWidth
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.selectListByType()
      } else {
        this.pageNum = 1
        // this.picList = []
        this.filterFormData = {}
      }
    },
    // 监听屏幕缩放
    screenWidth(val) {
      if (!this.timer) {
        this.screenWidth = val
        this.timer = true
        const that = this
        setTimeout(function() {
          // that.screenWidth = that.$store.state.canvasWidth
          // console.log(that.screenWidth)
          that.timer = false
        }, 400)
      }
    }
  },
  mounted() {
    // 页面第一次加载
    this.selectListByType()
    if (this.type === 'PhotoGallery') {
      this.placeholder = '图片标题'
    }
    // 挂在reisze 事件
    const that = this
    window.onresize = () => {
      return (() => {
        window.screenWidth = document.body.clientWidth
        that.screenWidth = window.screenWidth
        this.$nextTick(() => {
          const imgBox = this.$refs.imgBox
          if (this.visible) {
            const wImgbox = imgBox[0].getBoundingClientRect().width
            this.imgBox.height = 0.6 * wImgbox + 'px'
          }
        })
      })()
    }
  },
  methods: {
    openHandler(isVisable) {
      // 弹出窗口加载图片
    },
    selectListByType() {
      // this.loading = true
      // 根据业务类型查询结果列表
      if (this.type === 'PhotoGallery') {
        // 获取缓存页码
        if (localStorage.getItem('pageNum')) {
          this.pageNum = parseInt(localStorage.getItem('pageNum'))
        }
        // 图片库类型 -> 根据左侧边栏选择要调用的方法
        // selectPhotoByPage(this, this.filter, this.pageNum)
        //   .then(result => {
        //     // console.debug('selectListByType: %s' + JSON.stringify(result))
        //     this.picList = result.data.tableData.list
        //     // 图片名称去后缀
        //     for (const i in this.picList) {
        //       const picName = this.picList[i].uploadName
        //       const picSuffix = picName.lastIndexOf('.')
        //       if (picSuffix !== -1) {
        //         this.picList[i].uploadName = picName.substring(0, picSuffix)
        //       }
        //     }
        //     this.pageNum = result.data.tableData.pageNum
        //     this.total = result.data.tableData.total
        //     this.filters[0].total = result.data.countTotal
        //     this.filters[1].total = result.data.countFavorite
        //     this.loading = false
        // 数据加载完后，获取imgBox的宽度，并设置其高度
        this.$nextTick(() => {
          const imgBox = this.$refs.imgBox
          // console.log(imgBox)
          if (this.visible) {
            const wImgbox = imgBox[0].getBoundingClientRect().width
            // console.log(wImgbox)
            this.imgBox.height = 0.6 * wImgbox + 'px'
          }
        })
        //   })
        //   .catch(error => {
        //     console.error(error)
        //     this.loading = false
        //   })
      }
    },
    asideSelect(key) {
      // 根据左侧边栏调用数据
      switch (key) {
        case 'all':
          this.filter = 'total'
          this.pageNum = 1
          this.selectListByType()
          break
        case 'favorites':
          this.filter = 'favorite'
          this.pageNum = 1
          this.selectListByType()
          break
      }
    },
    upload(files) {
      // 批量上传
      this.loading = true
      if (this.type === 'PhotoGallery') {
        // 图片库类型
        const form = new FormData()
        form.append('file', files)
        // uploadByType(form, this.type)
        //   .then(res => {
        //     this.loading = false
        //     this.selectListByType()
        //   })
        //   .catch(error => {
        //     this.loading = false
        //     console.error(error)
        //   })
      }
    },
    httpRequestHandler() {
      // 覆盖默认上传行为
    },
    clipboardSuccess() {
      // 复制图片链接
      this.$message({
        message: '图片链接复制成功',
        type: 'success',
        duration: 1500
      })
    },
    picDelHandler(index) {
      // 删除单张图片
      // console.log(this.picList[index].uploadCode)
      // deletePhotoByCode(this.picList[index].uploadCode, this)
    },
    picsDelHandler() {
      // 批量删除图片
      // const delCodes = []
      // this.picList.map(pic => {
      //   if (pic.select === true) {
      //     delCodes.push(pic.uploadCode)
      //   }
      // })
      // console.debug('picsDelHandler: %s' + delCodes.join(','))
      // deletePhotoByCodeArray(delCodes, this)
    },
    picClickHander() {
      // 改变图片选中状态
      // this.selectList = []
      // this.picList.map(pic => {
      //   if (pic.select === true) {
      //     this.selectList.push(pic.uploadLocalUrl)
      //   }
      // })
      // this.$emit('picClickHander', this.selectList)
    },
    picGlass(index) {
      // 点击放大图片
      // this.picUrl = this.picList[index].uploadLocalUrl
      // this.picBigShow = true
    },
    picBigSelect() {
      // 点击放大后的图片
      // console.log('图片被选中')
    },
    picBigZoom() {
      // 放大后滚动鼠标滚轴
      // console.log('1')
    },
    picUpdate(index) {
      // 重命名图片
      // const uploadPic = {
      //   uploadCode: this.picList[index].uploadCode,
      //   uploadName: this.picList[index].uploadName
      // }
      // updatePhoto(uploadPic).then(result => {
      //   this.selectListByType()
      // })
    },
    handleCurrentChangeHandler(pageNum) {
      // 翻页
      this.pageNum = pageNum
      // 页码缓存
      localStorage.setItem('pageNum', this.pageNum)
      this.selectListByType()
    },
    handleExceed(files, fileList) {
      this.$message.warning(`最多选择 100 个文件`)
    },
    insertFavor(index) {
      // 用户收藏
      // const favorPhoto = {
      //   uploadCode: this.picList[index].uploadCode
      // }
      // insertFavoritePhoto(favorPhoto).then(result => {
      //   // console.log(result)
      //   this.selectListByType()
      // })
    },
    deleteFavor(index) {
      // 用户取消收藏
      // deleteFavoritePhoto(this.picList[index].uploadCode, this).then(result => {
      //   // console.log(result)
      //   this.selectListByType()
      // })
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../styles/gallery.scss';
</style>
