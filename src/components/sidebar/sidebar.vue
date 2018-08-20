<template>
   <div class="sidebar">
       <!-- 个人信息部分 -->
       <div class="sidebar_top">
         <div class="head_box"  @mouseenter="mouseIn" @mouseleave="mouseOut">
          <img src="~@/assets/img/setup-info/big-head.png" alt="">
          <span class="change_head" v-if="showHead == true"  @click.prevent="updateImg">{{sidebarData.changeHeader}}</span>
         </div>
         <p class="user_name">用户名</p>
         <p class="time_alert">hi! 下午好!</p>
       </div>
       <!-- 导航部分 -->
       <div class="sidebar_bottom">
         <p class="center_title">{{sidebarData.sidebarTitle}}</p>
         <div class="out_box">
          <ul class="center_list">
            <router-link :to="{name:'SetupInfo'}" tag="li" exact>
              <li :class="{'active':activeItem == 0}" @click="changeState(0)">{{sidebarData.navOne}}</li>
            </router-link>
            <router-link :to="{name:'MyCDKey'}" tag="li" exact>
              <li :class="{'active':activeItem == 1}" @click="changeState(1)">{{sidebarData.navTwo}}</li>
            </router-link>
            <router-link :to="{name:'Order'}" tag="li" exact>
              <li :class="{'active':activeItem == 2}" @click="changeState(2)">{{sidebarData.navThree}}</li>
            </router-link>
          </ul>
         </div>
       </div>
        <!-- 模态框 上传头像-->
        <b-modal ref="myModalRef" title="上传头像">
          <change-head :message="data"></change-head>
          <div slot="modal-footer" class="w-100 modal_footer">
            <button class="btn modal_sure" @click="confirm">确定</button>
            <button class="btn modal_cancel"  @click="cancel">取消</button>
          </div>
        </b-modal>
        <!-- 模态框end -->
   </div>
</template>

<script>
import ChangeHead from './form/change-head'
import axios from 'axios'
export default {
  name: 'LeftSidebar',
  components: {
    ChangeHead
  },
  data () {
    return {
      activeItem: 0,
      showHead: false,
      data: {},
      sidebarData: {},
      url: '',
      currentUrl: window.location.href,
      language: this.$store.state.language
    }
  },
  mounted () {
    this.getData()
    this.jump()
  },
  beforeUpdate () {
    this.language = this.$store.state.language
  },
  watch: {
    language: function () {
      this.getData()
    }
  },
  methods: {
    getData () {
      var that = this
      axios.get(this.$store.state.url + '/components/sidebar/' + this.$store.state.jsonUrl).then(function (data) {
        that.sidebarData = data.data.data
      })
    },
    jump () {
      if (this.currentUrl.indexOf('/setup-info') > -1) {
        this.activeItem = 0
      } else if (this.currentUrl.indexOf('/my-CDKey') > -1) {
        this.activeItem = 1
      } else if (this.currentUrl.indexOf('/order') > -1) {
        this.activeItem = 2
      }
    },
    changeState: function (item) {
      this.activeItem = item
    },
    // 显示修改头像
    mouseIn () {
      console.log(this.$store.state.language)
      this.showHead = true
    },
    // 隐藏修改头像
    mouseOut () {
      this.showHead = false
    },
    // 模态框确定
    confirm () {
      this.$refs.myModalRef.hide()
    },
    // 模态框关闭
    cancel () {
      this.$refs.myModalRef.hide()
    },
    // 模态框-上传头像
    updateImg () {
      this.$refs.myModalRef.show()
      this.data = {}
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
// 模态框样式
.modal_footer {
  @include modal_footer;
}
.sidebar_top {
  background-color: #fff;
  text-align: center;
  width: 200px;
  padding-bottom: 20px;
}
.sidebar_top > img {
  height: 94px;
  margin-top: 34px;
}
.user_name {
  font-size: $font_sm;
  color: #131313;
  font-weight: bold;
  padding: 8px 0;
}
.time_alert {
  color: #666;
  font-size: 12px;
}
.sidebar_bottom {
  background-color: #fff;
  text-align: center;
  margin-top: 10px;
  overflow: hidden;
  width: 200px;
}
.center_title {
  font-size: $font_md;
  font-weight: bold;
  color: #212121;
  height: 58px;
  line-height: 58px;
  border-bottom: 1px solid #f5f5f5;
  text-align: left;
  padding-left: 48px;
}
.center_list {
  text-align: left;
  padding: 20px 0;
}
.center_list > li {
  color: #626262;
  font-size: $font_sm;
  cursor: pointer;
  margin-left: 35px;
}
.center_list > li > li {
  padding-left: 12px;
}
.center_list > li:nth-child(2) {
  margin: 26px 0 26px 35px;
}
.active {
  color: #455ecd !important;
  border-left: 4px solid #455ecd;
  padding-left: 8px !important;
}
.out_box {
  width: 97%;
  float: right;
}
.head_box {
  text-align: center;
  position: relative;
  padding-top: 34px;
}
.change_head {
  position: absolute;
  top: 66px;
  left: 72px;
  color: #fff;
  font-size: $font_sm;
  cursor: pointer;
}
</style>