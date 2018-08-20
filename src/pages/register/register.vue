<template>
   <div class="login_warp">
      <div class="login">
        <div class="login_logo_box">
          <img src="~@/assets/img/login/logo.png" class="logo" />
        </div>
        <div class="login_main">
          <div class="main">
             <div class="hello">
               <span></span>
               <img src="~@/assets/img/login/hello.png" />
             </div>
             <form>
               <input type="text" placeholder="请输入用户名" v-model="name">
               <input type="text" placeholder="请输入邮箱号" v-model="email">
               <side-ver @child-say="listenToMyBoy"></side-ver>
               <div class="v_code">
                  <input type="number" placeholder="请输入邮件验证码">
                  <a :class="{ mustNot: provState == 0 }" @click="getCode">获取验证码</a>
               </div>
               <input type="password" placeholder="请设置密码" v-model="password">
               <input type="password" placeholder="请再次确认密码" v-model="surePassword">
             </form>
             <div class="land">
               <button @click="found">注册</button>
             </div>
             <div class="quick_reg">
               <p>已有账号&nbsp;去<a @click="$router.push('/login')">登录</a></p>
             </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
import SideVer from './side-ver/side-ver'
import UserService from '@/service/user/UserService'
export default {
  name: 'Register',
  data () {
    return {
      userService: UserService,
      name: '',
      password: '',
      surePassword: '',
      email: '',
      provState: 0
    }
  },
  components: {
    SideVer
  },
  methods: {
    listenToMyBoy (somedata) {
      this.provState = somedata
    },
    // 获取验证码
    getCode () {
      if (this.provState === 0) {
        this.$toaster.error('先进行验证')
      } else {
        this.$toaster.success('验证码已发送至您的邮箱')
      }
    },
    found () {
      this.userService.foundNewUser({
        'name': this.name,
        'email': this.email,
        'password': this.password
      }).then((results) => {
        if (results.success) {
          this.$toaster.success('注册成功')
          let that = this
          setTimeout(() => {
            that.$router.push({
              name: 'login'
            })
          }, 1500)
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
   @import '~@/assets/styles/public';
   @import './register.scss';
</style>
