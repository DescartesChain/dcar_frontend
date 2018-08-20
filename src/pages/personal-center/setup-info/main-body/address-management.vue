// 收货地址管理
<template>
  <div class="address_main">
    <!-- 上半部分--我的地址 -->
    <div class="address_top">
      <div class="address_title">
        {{infoData.addressTitle}}
        <span>（共3条）</span>
      </div>
      <div class="add_address">{{infoData.addAddress}}</div>
      <!-- 地址列表 -->
      <ul class="each_address" @mouseenter="mouseIn('1')"  @mouseleave="mouseOut" :class="{'activeAddress':addressState == '1'}">
        <li>河南省郑州市郑东新区XX路XX号XX大厦XX楼 &nbsp;&nbsp;&nbsp;收货人：啦啦啦 &nbsp;&nbsp;&nbsp;186****4455</li>
        <li v-if="addressState == '1'">设置为默认</li>
        <li v-if="addressState !== '1'">
          <span class="default_address">默认地址</span>
        </li>
        <li v-if="addressState == '1'">
          <span>修改</span>
          |
          <span>删除</span>
        </li>
      </ul>
      <ul class="each_address" @mouseenter="mouseIn('2')" @mouseleave="mouseOut" :class="{'activeAddress':addressState == '2'}">
        <li>河南省郑州市郑东新区XX路XX号XX大厦XX楼 &nbsp;&nbsp;&nbsp;收货人：啦啦啦 &nbsp;&nbsp;&nbsp;186****4455</li>
        <li v-if="addressState == '2'" class="set_default">设置为默认</li>
        <li v-if="addressState !== '2'">
          <span class="default_address">默认地址</span>
        </li>
        <li v-if="addressState == '2'">
          <span>修改</span>
          |
          <span @click="showModal">删除</span>
        </li>
      </ul>
    </div>
    <!-- 下半部分--新增收货地址 -->
    <div class="address_bottom">
      <div class="bottom_title">新增收货地址</div>
      <!-- 收货人姓名 -->
      <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.addressName}}：
        </span>
        <input type="text" class="address_input middle_input">
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
        <input type="text" class="address_input middle_input">
        <span class="input_error">
          <img src="~@/assets/img/cdKey/input-error.png" alt="">
          {{infoData.mobileAlert}}
        </span>
      </div>
      <!-- 电话号码 -->
      <div class="each_line">
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
      </div>
      <!-- 所在地区 -->
      <div class="each_line">
        <span class="input_title">
          <span class="required">*</span>
          {{infoData.addressArea}}：
        </span>
        <div class="area_box middle_input">
          <b-form-select v-model="selected" class="mb-3 area_input" size="sm">
            <option value="a">河南省/郑州市/金水区</option>
            <option value="b">Option B (disabled)</option>
          </b-form-select>
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
        <textarea rows="3" class="address_detail middle_textarea" :placeholder="infoData.addressPrompt"></textarea>
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
      <!-- 保存 -->
      <div class="save_address">
        <button class="save_btn">{{infoData.save}}</button>
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
import axios from 'axios'
import DeleteAddress from './form/delete-address'
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
      language: this.$store.state.language
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
  methods: {
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
  width: 30%;
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
</style>
