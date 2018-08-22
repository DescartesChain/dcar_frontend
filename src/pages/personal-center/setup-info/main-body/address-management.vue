// 收货地址管理
<template>
  <div class="address_main">
    <p style="display: none;">{{this.$store.state.language}}</p>
    <!-- 上半部分--我的地址 -->
    <div class="address_top">
      <div class="address_title">
        {{infoData.addressTitle}}
        <span>（共{{addressList.length}}条）</span>
      </div>
      <!-- 新增收货地址 -->
      <div class="add_address" @click="operateAddress('add')">{{infoData.addAddress}}</div>
      <!-- 地址列表 -->
      <div v-if="addressList.length >0">
        <ul class="each_address" @mouseenter="mouseIn(addressInfo._id)"  @mouseleave="mouseOut" :class="{'activeAddress':addressState == addressInfo._id}" v-for="addressInfo in addressList" :key="addressInfo._id">
          <li>{{addressInfo.province}}{{addressInfo.city}}{{addressInfo.district}}{{addressInfo.street}} &nbsp;&nbsp;&nbsp;收货人：{{addressInfo.receiver}} &nbsp;&nbsp;&nbsp;{{addressInfo.phone.toString().substring(0,3)}}****{{addressInfo.phone.toString().substring(7)}}</li>
          <li v-if="addressState == addressInfo._id" style="cursor:pointer">设置为默认</li>
          <li v-if="addressState !== addressInfo._id">
            <span class="default_address">默认地址</span>
          </li>
          <li v-if="addressState == addressInfo._id">
            <span @click="operateAddress('alter',addressInfo)">修改</span>
            |
            <span @click="deleteAddress(addressInfo._id)">删除</span>
          </li>
        </ul>
      </div>
      <div v-if="addressList.length == 0" class="no_data">暂无收货地址</div>
    </div>
    <!-- 下半部分--新增收货地址 -->
    <div class="address_bottom" v-if="showAddressBox == true">
      <div class="bottom_title">新增收货地址</div>
      <!-- 收货人姓名 -->
      <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.addressName}}：
        </span>
        <input type="text" class="address_input middle_input" v-model="addressDetail.receiver">
        <span class="input_error">
          <img src="~@/assets/img/cdKey/input-error.png" alt="">
          {{infoData.nameAlert}}
        </span>
      </div>
      <!-- 手机号码 -->
      <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.addressMobile}}：
        </span>
        <input type="text" class="address_input middle_input" v-model="addressDetail.phone">
        <span class="input_error">
          <img src="~@/assets/img/cdKey/input-error.png" alt="">
          {{infoData.mobileAlert}}
        </span>
      </div>
      <!-- 电话号码 -->
      <!-- <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.addressPhone}}：
        </span>
        <div class="middle_input">
          <input type="text" class="address_input" :placeholder="infoData.phoneOne">
          <span>-</span>
          <input type="text" class="address_input" :placeholder="infoData.phoneTwo">
          <span>-</span>
          <input type="text" class="address_input" :placeholder="infoData.phoneThree">
        </div>
        <span class="input_error">
          <img src="~@/assets/img/cdKey/input-error.png" alt="">
          {{infoData.phoneAlert}}
        </span>
      </div> -->
      <!-- 所在地区 -->
      <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.addressArea}}：
        </span>
        <div class="area_box middle_input">
          <input type="text" class="address_input middle_input" placeholder="请选择收货地址" id="city" @click="shooseCity">
        </div>
        <span class="input_error">
          <img src="~@/assets/img/cdKey/input-error.png" alt="">
          {{infoData.areaAlert}}
        </span>
      </div>
      <!-- 详细地址 -->
      <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.detailAddress}}：
        </span>
        <textarea rows="3" class="address_detail middle_textarea" :placeholder="infoData.addressPrompt" v-model="addressDetail.street"></textarea>
        <span class="input_error">
          <img src="~@/assets/img/cdKey/input-error.png" alt="">
            {{infoData.addressAlert}}
        </span>
      </div>
      <!-- 设置默认地址 -->
      <div class="set_default_address">
        <b-form-checkbox id="checkbox1"
                  v-model="status"
                  value="accepted"
                  unchecked-value="not_accepted">
          {{infoData.setDefault}}
        </b-form-checkbox>
        <span class="required">
          {{infoData.defaultAlert}}
        </span>
      </div>
      <!-- 保存 新增/修改-->
      <div class="save_address">
        <button class="save_btn" @click="saveAddress">{{infoData.save}}</button>
      </div>
    </div>
    <!-- 模态框 删除收货地址-->
    <b-modal ref="myModalRef" title="删除">
      <delete-address :message="data"></delete-address>
      <div slot="modal-footer" class="w-100 modal_footer">
        <button class="btn modal_sure" @click="confirm">{{infoData.sure}}</button>
        <button class="btn modal_cancel"  @click="cancel">{{infoData.cancel}}</button>
      </div>
    </b-modal>
    <!-- 模态框end -->
  </div>
</template>

<script>
import cityMethod from '@/assets/js/citySet'
import axios from 'axios'
import DeleteAddress from './form/delete-address'
import AddressService from '@/service/address/AddressService'
import UserService from '@/service/user/UserService'
export default {
  name: 'AddressManagement',
  data () {
    return {
      infoData: {},
      url: '',
      selected: null,
      status: 'not_accepted',
      addressState: '',
      modalTitle: '',
      data: {},
      language: this.$store.state.language,
      addressService: AddressService,
      userService: UserService,
      addressList: [],
      showAddressBox: false,
      area: '',
      addressDetail: {
        receiver: '',
        phone: '',
        province: '',
        city: '',
        district: '',
        street: '',
        creator: localStorage.getItem('userid')
      },
      addressId: ''
    }
  },
  components: {
    DeleteAddress
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
  created () {
    this.loadUserAddress() // 根据用户 id 获取收货地址
  },
  methods: {
    // 选择省市区
    shooseCity (e) {
      cityMethod.SelCity(e.target, e)
    },
    // 根据用户 id 获取收货地址
    loadUserAddress () {
      this.userService.fetchAddress(
        localStorage.getItem('userid')
      ).then((results) => {
        if (results.data.success) {
          this.addressList = results.data.data
          if (this.addressList == null) {
            this.addressList = []
          }
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    // 显示新增收货地址 / 修改收货地址
    operateAddress (state, info) {
      this.operateState = state
      this.showAddressBox = true
      if (state == 'alter') {
        this.addressId = info._id
        this.addressDetail = info
        this.area = info.province + '-' + info.city + '-' + info.district
        $('#city').val(this.area)
        console.log(this.area)
      }
    },
    // 保存地址
    saveAddress () {
      if (this.operateState == 'add') {
        this.area = $('#city').val()
        this.area = this.area.split('-')
        this.addressDetail.province = this.area[0]
        this.addressDetail.city = this.area[1]
        this.addressDetail.district = this.area[2]
        this.createAddress() // 新建收货地址
      } else {
        this.updateAddress() // 根据 id 更新收货地址
      }
    },
    // 新建收货地址
    createAddress () {
      this.addressService.createAddress(
        this.addressDetail
      ).then((results) => {
        if (results.data.success) {
          this.addressList.push(results.data.data)
          this.showAddressBox = false
          this.$toaster.success('新增地址成功')
          this.addressDetail = {
            receiver: '',
            phone: '',
            province: '',
            city: '',
            district: '',
            street: '',
            creator: localStorage.getItem('userid')
          }
        } else {
          this.$toaster.error(results.data.success)
        }
      })
    },
    // 根据 id 更新收货地址
    updateAddress () {
      this.addressService.updateAddress(
        this.addressId,
        this.addressDetail
      ).then((results) => {
        if (results.data.success) {
          this.$toaster.success('地址修改成功')
          this.showAddressBox = false
          for (var i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i]._id == this.addressId) {
              this.addressList.splice(i, 1, results.data.data)
            }
          }
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    // 删除地址
    deleteAddress (id) {
      this.addressService.deleteAddress(id).then((results) => {
        if (results.data.success) {
          this.$toaster.success('地址删除成功')
          this.showAddressBox = false
          for (var i = 0; i < this.addressList.length; i++) {
            if (this.addressList[i]._id == id) {
              this.addressList.splice(i, 1)
            }
          }
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    getData () {
      var that = this
      axios.get(this.$store.state.url + '/pages/personal-center/setup-info/' + this.$store.state.jsonUrl).then(function (data) {
        that.infoData = data.data.data
      })
    },
    mouseIn (item) {
      this.addressState = item
    },
    mouseOut () {
      this.addressState = ''
    },
    // 模态框确定
    confirm () {
      this.$refs.myModalRef.hide()
    },
    // 模态框关闭
    cancel () {
      this.$refs.myModalRef.hide()
    },
    // 模态框
    showModal () {
      this.$refs.myModalRef.show()
      this.data = {
      }
    }
  }
}
</script>

<style scoped lang='scss'>
@import "~@/assets/styles/public";
// 模态框样式
.modal_footer {
  @include modal_footer;
}
//end
.address_main {
  font-size: $font_sm;
}
.bottom_title {
  @include little_title;
}
.address_title {
  @include little_title;
  padding: 0 40px;
}
.address_title > span {
  font-size: $font_xs;
  color: #6b6b6b;
}
.address_top {
  padding-bottom: 15px;
}
.add_address {
  color: #686ad0;
  font-size: $font_sm;
  text-align: right;
  cursor: pointer;
  padding: 0 40px;
}
.each_address {
  overflow: hidden;
  margin: 10px 20px;
  color: #515256;
  padding: 7px 20px;
}
.each_address > li {
  float: left;
}
.each_address > li:nth-child(1) {
  width: 70%;
}
.each_address > li:nth-child(2) {
  width: 15%;
  text-align: right;
}
.each_address > li:nth-child(3) {
  width: 15%;
  text-align: right;
  color: #686ad0;
}
.each_address > li:nth-child(3) > span {
  cursor: pointer;
}
.default_address {
  color: #999ca1;
  background: #eaedf2;
  padding: 5px 10px;
  font-size: $font_xs;
}
.activeAddress {
  background: #f2f5fa;
  border: 1px solid #fdab97;
}
.set_default {
  cursor: pointer;
}
.address_bottom {
  border-top: 10px solid #f4f4f4;
  padding: 30px 40px;
}
.required {
  color: #f05116;
}
.input_title {
  color: #8c8c8c;
  display: inline-block;
  float: left;
  width: 15%;
}
.address_input {
  @include input_box;
}
.input_error {
  margin-left: 10px;
  float: left;
  width: 30%;
}
.each_line {
  margin: 10px 0;
  overflow: hidden;
  line-height: 34px;
}
.area_input {
  width: 100% !important;
  font-size: $font_sm;
}
.area_box {
  display: inline-block;
  height: 34px;
}
.address_detail {
  @include textarea_box;
  width: 50%;
}
.middle_input {
  float: left;
  width: 30%;
}
.middle_input > input {
  width: 100%;
  float: left;
}
.middle_input > span {
  width: 5%;
  float: left;
  text-align: center;
}
.middle_textarea {
  width: 50%;
  float: left;
}
.set_default_address {
  float: right;
  width: 85%;
  margin-top: 10px;
}
.save_address {
  float: right;
  width: 85%;
  padding-top: 20px;
  padding-bottom: 30px;
}
.save_btn {
  @include yellow_btn;
}
.no_data{
  text-align: center;
  padding:15px 0;
}
</style>
