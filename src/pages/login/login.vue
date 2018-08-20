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
               <input type="text" :placeholder="loginData.email" v-model="username">
               <input type="password" :placeholder="loginData.pass" v-model="password">
             </form>
             <ul class="remember_pass">
                <li>
                  <img v-if="unMember == 1" src="~@/assets/img/login/5.png" @click="choiseRemember" />
                  <img v-if="unMember == 0" src="~@/assets/img/login/7.png" @click="choiseRemember" />
                  <p @click="choiseRemember">{{loginData.remember}}</p>
                </li>
                <li>
                  <p>{{loginData.forget}}</p>
                </li>
             </ul>
             <div class="land">
               <button :class="{ chinsesBtn: isActive, 'englishBtn': hasError }" @click="land">{{loginData.login}}</button>
             </div>
             <div class="quick_reg">
               <p>{{loginData.problem}}<a @click="$router.push('/register')">{{loginData.register}}</a></p>
             </div>
          </div>
        </div>
      </div>
   </div>
</template>

<script>
import axios from 'axios'
import AuthenticationService from '@/service/authentication/AuthenticationService'
export default {
  name: 'Login',
  data () {
    return {
      authenticationService: AuthenticationService,
      isActive: true,
      hasError: false,
      unMember: 1,
      loginData: {},
      url: '',
      username: '',
      password: '',
      language: this.$store.state.language,
      storage: {}
    }
  },
  created () {
    if (localStorage.getItem('name')) {
      this.username = localStorage.getItem('name')
      this.unMember = 1
    } else {
      this.unMember = 0
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
      if (this.$store.state.language === 'chinese') {
        this.isActive = true
        this.hasError = false
      } else {
        this.isActive = false
        this.hasError = true
      }
      var that = this
      axios.get(this.$store.state.url + '/pages/login/' + this.$store.state.jsonUrl).then(function (data) {
        that.loginData = data.data.data
      })
    },
    choiseRemember () {
      if (this.unMember === 1) {
        this.unMember = 0
      } else {
        this.unMember = 1
      }
    },
    land () {
      if (this.name == '') {
        this.$toaster.error('用户名不能为空')
      } else if (this.password == '') {
        this.$toaster.error('密码不能为空')
      } else {
        if (this.unMember === 1) {
          localStorage.setItem('name', this.username)
        } else {
          localStorage.removeItem('name')
        }
        this.authenticationService.login({
          'name': this.username,
          'password': this.password
        }).then((results) => {
          if (results.data.success) {
            this.$toaster.success('登录成功')
            localStorage.setItem('userid', results.data.data.id)
            localStorage.setItem('token', results.data.data.token)
            let that = this
            setTimeout(() => {
              that.$router.push({
                name: 'SetupInfo'
              })
            }, 1500)
          } else {
            this.$toaster.error(results.data.msg)
          }
        })
      }
    }
  }
}
</script>

<style lang='scss' scoped>
@import "~@/assets/styles/public";
@import "./login.scss";
</style>
