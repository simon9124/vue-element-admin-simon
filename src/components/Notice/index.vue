<template>
  <div v-if="noticeList.length!==0"
       class="nav-container">
    <div class="title">公告：</div>
    <slider ref="slider"
            :options="options">
      <slideritem v-for="(item,index) in noticeList"
                  :key="index">
        <div @click="showNotice(index)"
             v-html="item.noticeContent"></div>
      </slideritem>
      <div slot="loading">暂无公告</div>
      <!-- <div slot="loading">loading...</div> -->
    </slider>

    <el-dialog title="公告"
               :visible.sync="visible"
               width="60%">
      <div v-html="noticeContent"></div>
    </el-dialog>
  </div>
</template>

<script>
import { getNoticeList } from '@/api/settings/notice'
import { slider, slideritem } from 'vue-concise-slider'

export default {
  name: 'Notice',
  components: {
    slider,
    slideritem
  },
  data() {
    return {
      // 公告列表
      noticeList: [],
      // 初始化参数
      options: {
        pagination: false, // 底部小圆点是否隐藏（true显示，false隐藏）
        currentPage: 0, // 当前页码
        thresholdDistance: 500, // 滑动判定距离
        thresholdTime: 100, // 滑动判定时间
        autoplay: 2000, // 自动滚动[ms]
        loop: true, // 是否循环滚动
        direction: 'vertical', // 滚动方向
        infinite: 1, // 无限滚动前后遍历数
        slidesToScroll: 1, // 滚动行数
        timingFunction: 'ease',
        duration: 300
      },
      // 公告内容
      noticeContent: '',
      // 是否显示dialog
      visible: false
    }
  },
  mounted() {
    this.init()
    // 3分钟刷新一次
    window.setInterval(() => {
      this.init()
    }, 1000 * 60 * 3)
  },
  methods: {
    init() {
      getNoticeList().then(result => {
        // if (result.data.list.length === 0) {
        //   result.data.list.push({ noticeContent: '暂无新公告' })
        //   this.options.autoplay = 0
        //   this.options.loop = false
        // }
        this.noticeList = result.data.list
        this.$emit('noticeList', this.noticeList)
      })
    },
    showNotice(index) {
      this.visible = true
      // alert(index)
      this.noticeContent = this.noticeList[index].noticeContent
    }
  },
  watch: {}
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.nav-container /deep/ {
  display: inline;
  .title {
    margin-top: 4px;
    float: left;
  }
  .slider-item {
    color: #4d4d4d;
    text-align: left !important;
    justify-content: left !important;
    font-size: 10px !important;
    margin: 5px 0px 1px 0px;
    div {
      height: 50px;
      width: 350px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .slider-container {
    width: 350px;
    margin: 0;
    float: right;
  }
}
</style>
