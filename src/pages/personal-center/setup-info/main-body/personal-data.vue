// 个人资料
<template>
  <div class="personal_main">
    <p style="display: none;">{{this.$store.state.language}}</p>
    <!-- 上半部分--基本信息 -->
    <div class="personal_top">
      <div class="personal_title">{{infoData.personalTitle}}</div>
      <!-- 用户名 -->
      <div class="info_main username_main">
        <span class="grey_title">{{infoData.userName}}</span>
        <span>{{this.username}}</span>
        <span class="alter_img">
          <img src="~@/assets/img/setup-info/alter-info.png" alt="" @click="showModal('username')">
        </span>
        <span class="grey_alert">{{infoData.showWay}}</span>
      </div>
      <!-- 邮箱 -->
      <div class="info_main">
        <span class="grey_title">{{infoData.email}}</span>
        <span class="orange_text" @click="showModal('email')">{{this.userInfo.email}}</span>
        <span class="grey_alert">{{infoData.showWay}}</span>
      </div>
      <!-- 性别 -->
      <div class="info_main sex_box">
        <span class="grey_title">{{infoData.sex}}</span>
        <span class="check_img">
          <img src="~@/assets/img/setup-info/no-checked.png" alt="" v-if="checkState == 'woman'" @click="chooseSex('woman')">
          <img src="~@/assets/img/setup-info/checked.png" alt="" v-if="checkState == 'man'">
        </span>
        <span>{{infoData.sexOne}}</span>
        <span class="check_img last_check">
          <img src="~@/assets/img/setup-info/no-checked.png" alt="" v-if="checkState == 'man'" @click="chooseSex('man')">
          <img src="~@/assets/img/setup-info/checked.png" alt="" v-if="checkState == 'woman'">
        </span>
        <span>{{infoData.sexTwo}}</span>
      </div>
      <div class="sure_box">
        <button class="sure_btn">{{infoData.save}}</button>
      </div>
    </div>
    <!-- 下半部分--联系方式 -->
    <div class="personal_bottom">
      <div class="personal_title">{{infoData.contactInfo}}</div>
      <div class="contact_box QQ_box">
        <span>QQ</span>
        <input type="password" class="contact_input">
      </div>
      <div class="contact_box">
        <span>{{infoData.wechat}}</span>
        <input type="password" class="contact_input">
      </div>
      <div class="contact_box">
        <span>{{infoData.mobile}}</span>
        <input type="password" class="contact_input">
      </div>
      <div class="sure_box">
        <button class="sure_btn">{{infoData.save}}</button>
      </div>
    </div>
    <!-- 模态框 修改用户名、绑定邮箱账号-->
    <b-modal ref="myModalRef" :title="modalTitle" hide-footer>
      <bind-info :message="data" @close-modal = 'closeModal'></bind-info>
    </b-modal>
    <!-- 模态框end -->
  </div>
</template>

<script>
import axios from 'axios'
import VueCookie from '@/util/util'
import BindInfo from './form/bind-info'
import UserService from '@/service/user/UserService'
export default {
  name: 'PersonalData',
  data () {
    return {
      userService: UserService,
      checkState: 'man',
      modalTitle: '',
      data: {},
      infoData: {},
      url: '',
      language: this.$store.state.language,
      username: '',
      userInfo: {
        'email': ''
      }
    }
  },
  created () {
    if (localStorage.getItem('name')) {
      this.username = localStorage.getItem('name')
    } else {
      this.username = VueCookie.getCookie('name')
    }
    this.getUserInfo()
  },
  components: {
    BindInfo
  },
  mounted () {
    this.getData()
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
      axios.get(this.$store.state.url + '/pages/personal-center/setup-info/' + this.$store.state.jsonUrl).then(function (data) {
        that.infoData = data.data.data
      })
    },
    // 性别选择
    chooseSex (state) {
      if (state === 'woman') {
        this.checkState = 'man'
      } else {
        this.checkState = 'woman'
      }
    },

    // 模态框
    showModal (state) {
      this.$refs.myModalRef.show()
      this.data = {
        state: state
      }
      if (state === 'username') {
        this.modalTitle = '修改用户名'
      } else {
        this.modalTitle = '修改邮箱账号'
      }
    },
    // 关闭模态框
    closeModal () {
      this.$refs.myModalRef.hide()
    },
    // 获取用户信息
    getUserInfo () {
      this.userService.fetchUserInfo(localStorage.getItem('userid')).then((results) => {
        if (results.data.success) {
          this.userInfo = results.data.data
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~@/assets/styles/public';
// 模态框样式
.modal_footer {
  @include modal_footer;
}
//end
.personal_main {
  font-size: $font_sm;
}
.personal_title {
  @include little_title;
}
.personal_top {
  padding: 0 40px 20px 40px;
}
.public_input {
  @include input_box;
}
.public_btn {
  @include yellow_btn;
}
.public_back_btn {
  @include grey_btn;
}
.personal_bottom {
  border-top: 3px solid #f6f6f6;
  padding: 30px 40px 0 40px;
}
.contact_box {
  font-size: $font_sm;
  margin: 10px 0;
}
.contact_box > span {
  color: #898989;
  width: 100px;
  display: inline-block;
}
.sure_box {
  text-align: right;
}
.sure_btn {
  @include yellow_btn;
  margin-right: 15px;
}
.contact_input {
  @include input_box;
}
.grey_title {
  color: #898989;
  width: 100px;
  display: inline-block;
}
.orange_text {
  color: #ed7b14;
  margin-right: 20px;
  cursor: pointer;
}
.grey_alert {
  color: #b8b8b8;
}
.info_main {
  margin: 25px 0;
  line-height: 21px;
}
.username_main {
  margin-top: 30px;
}
.QQ_box {
  margin-top: 20px;
}
.alter_img {
  margin-left: 22px;
  margin-right: 30px;
}
.alter_img > img {
  cursor: pointer;
}
.check_img > img {
  margin-top: 4px;
  margin-right: 5px;
  cursor: pointer;
}
.last_check {
  margin-left: 40px;
}
.sex_box {
  margin-bottom: 0;
}
img {
  vertical-align: top;
}
</style>
