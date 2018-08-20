// 账号安全
<template>
  <div class="account_main">
    <!-- 上半部分 -->
    <div class="account_top">
      <p class="account_title">{{infoData.keyTitle}}</p>
      <div class="key_alert">
        <img src="~@/assets/img/setup-info/alert.png" alt="">
        <span>
          {{infoData.passwordAlert}}
        </span>
      </div>
      <div class="btn_box" v-if="keyBtn == true">
          <button class="change_key" @click="changeKey">{{infoData.changePassword}}</button>
      </div>
    </div>
    <!-- 下半部分 -->
    <div class="accout_bottom" v-if="keyBtn == false">
      <p class="account_title">{{infoData.changePassword}}</p>
      <div class="alter_key">
        <span>{{infoData.oldPassword}}</span>
        <input type="password" class="old_key" :placeholder="infoData.oldPasswordAlert">
      </div>
      <div class="alter_key">
        <span>{{infoData.newPassword}}</span>
        <input type="password" class="old_key" :placeholder="infoData.newPasswordAlert">
      </div>
      <div class="alter_key">
        <span>{{infoData.confirmPassword}}</span>
        <input type="password" class="old_key" :placeholder="infoData.confirmPasswordAlert">
      </div>
      <div class="sure_box">
        <button class="sure_btn">{{infoData.sure}}</button>
        <button class="back_btn" @click="back">{{infoData.return}}</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'AccountSecurity',
  data () {
    return {
      keyBtn: true,
      infoData: {},
      url: '',
      language: this.$store.state.language
    }
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
    changeKey () {
      this.keyBtn = false
    },
    back () {
      this.keyBtn = true
    }
  }
}
</script>

<style scoped lang='scss'>
@import '~@/assets/styles/public';
.account_top {
  padding: 0 40px;
}
.account_title {
  @include little_title;
}
.account_top {
  padding-bottom: 0;
}
.key_alert {
  font-size: $font_sm;
  color: #858585;
  background: #f2f5fa;
  padding: 10px 0;
  text-align: center;
  margin: 15px 0;
}
.key_alert>img{
  vertical-align: top;
  margin-right:10px;
}
.btn_box {
  text-align: center;
}
.change_key {
  @include yellow_btn;
  letter-spacing: 1px !important;
  text-indent: 1px !important;
}
.accout_bottom {
  margin-top: 10px;
  border-top: 10px solid #f4f4f4;
  padding: 30px 40px 0 40px;
}
.old_key {
  @include input_box;
  width:25%;
}
.alter_key {
  font-size: $font_sm;
  margin: 10px 0;
}
.alter_key > span {
  color: #898989;
  width: 16%;
  display: inline-block;
}
.sure_btn {
  @include yellow_btn;
  margin-right: 15px;
}
.back_btn {
  @include grey_btn;
}
.sure_box {
  margin-top: 10px;
  text-align: right;
}
</style>
