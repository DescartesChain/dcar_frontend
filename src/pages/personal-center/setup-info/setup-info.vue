// 信息设置
<template>
  <div class="hello">
      <ul class="info_list">
        <li>
          <span v-bind:class="{'activeItem':infoState=='{{infoData.optionOne}}'}" @click="chooseInfo('{{infoData.optionOne}}')">{{infoData.optionOne}}</span>
        </li>
        <li>
          <span v-bind:class="{'activeItem':infoState=='{{infoData.optionTwo}}'}" @click="chooseInfo('{{infoData.optionTwo}}')">{{infoData.optionTwo}}</span>
        </li>
        <li>
          <span v-bind:class="{'activeItem':infoState=='{{infoData.optionThree}}'}" @click="chooseInfo('{{infoData.optionThree}}')">{{infoData.optionThree}}</span>
        </li>
      </ul>
      <div class="info_main">
          <personal-data v-if="infoState=='{{infoData.optionOne}}'"></personal-data>
          <account-security v-if="infoState=='{{infoData.optionTwo}}'"></account-security>
          <address-management v-if="infoState=='{{infoData.optionThree}}'"></address-management>
      </div>
  </div>
</template>

<script>
import axios from 'axios'
// 个人资料
import PersonalData from '@/pages/personal-center/setup-info/main-body/personal-data'
// 账号安全
import AccountSecurity from '@/pages/personal-center/setup-info/main-body/account-security'
// 收货地址管理
import AddressManagement from '@/pages/personal-center/setup-info/main-body/address-management'

export default {
  name: 'SetupInfo',
  components: {
    PersonalData,
    AccountSecurity,
    AddressManagement
  },
  data () {
    return {
      url: '',
      infoState: '{{infoData.optionOne}}',
      infoData: {},
      language: this.$store.state.language
    }
  },
  created () {
    this.getData()
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
    chooseInfo (item) {
      this.infoState = item
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/styles/public";
.info_list {
  overflow: hidden;
  padding-left: 40px;
  border-bottom: 2px solid #f4f4f4;
  margin-bottom: 0;
}
.info_list > li {
  float: left;
  font-size: $font_sm;
  color: #666;
}
.info_list > li > span {
  height: 68px;
  line-height: 68px;
  display: inline-block;
  cursor: pointer;
}
.info_list > li:nth-child(2) {
  padding: 0 80px;
}
.activeItem {
  color: #161616 !important;
  border-bottom: 2px solid #666666;
}
.info_main {
  background: #fff;
  padding: 30px 0;
}
</style>
