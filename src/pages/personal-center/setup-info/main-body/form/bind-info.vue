<template>
  <div class="bind_info">
    <div v-if="message.state == 'username'">
      <input type="text" class="user_input" placeholder="请输入新的用户名，2~8位字符" v-model="name">
    </div>
    <div v-if="message.state == 'email'">
      <input type="text" class="user_input" placeholder="请输入邮箱地址" v-model="email">
    </div>
    <div class="row auth_code">
      <div class="col-md-7">
        <input type="text" class="user_input yanzhengma_input" placeholder="请输入验证码" v-model="picLyanzhengma">
        <!-- <p class="code_error">请输入验证码</p> -->
      </div>
      <!-- <div class="col-md-4 code_box">
        <input type="button" id="code" @click="createCode"  class="verification1" v-model="checkCode"/>
      </div> -->
      <div class="col-md-5 code" @click="refreshCode">
        <s-identify :identifyCode="identifyCode"></s-identify>
      </div>
    </div>
    <div slot="modal-footer" class="w-100 modal_footer">
      <button class="btn modal_sure" @click="Login">确定</button>
      <button class="btn modal_cancel"  @click="cancel">取消</button>
    </div>
  </div>
</template>

<script>
import UserService from '@/service/user/UserService'
import SIdentify from '@/components/identify'
var code // 在全局定义验证码
export default {
  name: 'BindInfo',
  components: {
    SIdentify
  },
  props: {
    message: {}
  },
  data () {
    return {
      userService: UserService,
      dataMain: 'zizizi',
      picLyanzhengma: '',
      checkCode: '',
      identifyCodes: '1234567890abcdefghijklmnopqrstuvwxyz',
      identifyCode: '',
      name: '',
      email: ''
    }
  },
  mounted () {
    this.identifyCode = ''
    this.makeCode(this.identifyCodes, 4)
  },
  created () {
    this.name = ''
    this.email = ''
    this.picLyanzhengma = ''
  },
  methods: {
    randomNum (min, max) {
      return Math.floor(Math.random() * (max - min) + min)
    },
    refreshCode () {
      this.identifyCode = ''
      this.makeCode(this.identifyCodes, 4)
    },
    makeCode (o, l) {
      for (let i = 0; i < l; i++) {
        this.identifyCode += this.identifyCodes[this.randomNum(0, this.identifyCodes.length)]
      }
      console.log(this.identifyCode)
    },
    // 模态框确定
    confirm () {
      this.$refs.myModalRef.hide()
    },
    // 模态框关闭
    cancel () {
      this.$emit('close-modal')
      this.picLyanzhengma = ''
    },
    Login () {
      console.log()
      if (this.message.state == 'username') {
        if (this.name == '') {
          this.$toaster.error('用户名不能为空')
        } else {
          if (this.picLyanzhengma == this.identifyCode) {
            this.userService.alterUserInfo(localStorage.getItem('userid'), {
              'name': this.name
            }).then((results) => {
              if (results.data.success) {
                this.$toaster.success('修改用户名成功')
                this.picLyanzhengma = ''
              } else {
                this.$toaster.error(results.data.msg)
              }
            })
          } else {
            this.$toaster.error('验证码错误')
          }
        }
      } else if (this.message.state == 'email') {
        if (this.email == '') {
          this.$toaster.error('邮箱不能为空')
        } else {
          if (this.picLyanzhengma == this.identifyCode) {
            this.userService.alterUserInfo(localStorage.getItem('userid'), {
              'email': this.email
            }).then((results) => {
              if (results.data.success) {
                this.$toaster.success('修改邮箱成功')
                this.picLyanzhengma = ''
              } else {
                this.$toaster.error(results.data.msg)
              }
            })
          } else {
            this.$toaster.error('验证码错误')
          }
        }
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
  margin-top: 20px;
}
//end
.bind_info {
  width: 70%;
  margin: 0 auto;
}
.user_input {
  @include input_box;
  width: 100%;
}
/*登录模块*/
.login_content1 {
  width: 400px;
  background-color: #fff;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  position: absolute;
  right: 60px;
  top: 80px;
  padding-left: 30px;
  padding-bottom: 50px;
}
.user_login {
  display: block;
  width: 287px;
  height: 50px;
  font-size: 18px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  background-color: #a2be3c;
  border-radius: 5px;
  margin-left: 40px;
  /*margin-top: 30px;*/
  cursor: pointer;
}
.login_content1 p {
  margin-top: 30px;
  font-size: 25px;
  line-height: 18px;
  margin-bottom: 15px;
}
.login_content1 input {
  padding: 5px 0 5px 10px;
  margin-left: 30px;
  height: 30px;
  /*margin-top: 25px;*/
  border: 1px solid #e6e6e6;
}
.verification1 {
  vertical-align: middle;
  transform: translate(-15px, 0);
  width: 102px;
}
.forget {
  text-align: right;
  position: relative;
  top: -20px;
  cursor: pointer;
}
.forget a {
  font-size: 14px;
  color: #053d84;
  margin-right: 80px;
}
#code {
  font-size: 18px;
  letter-spacing: 3px;
  color: #053d84;
  background: #f2f2f5;
}
/*弹窗*/
.tanchuang {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.hiddenTanchuang {
  display: none;
}
.inTanchuang {
  position: absolute;
  text-align: center;
  width: 300px;
  height: 169px;
  padding-top: 10px;
  left: 50%;
  top: 50%;
  border-radius: 10px;
  -webkit-transform: translateX(-50%) translateY(-50%);
  -ms-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  background-color: #fff;
}
.errorIcon {
  width: 55px;
}
.register_content .cue {
  font-size: 14px;
  text-align: center;
  margin-top: 15px;
}
.sure {
  display: inline-block;
  color: #fff;
  width: 100px;
  height: 20px;
  padding: 6px 10px;
  background: #053d84;
  border-radius: 5px;
  font-size: 18px;
  line-height: 18px;
  margin-top: 10px;
  cursor: pointer;
}
.auth_code {
  padding-top: 20px;
}
.code_box{
  padding-right:0;
  text-align: right;
}
</style>
