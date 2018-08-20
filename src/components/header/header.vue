<template>
  <div class="header_wrap">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <router-link to="/home">
        <a class="navbar-brand"><img src="../../assets/img/home/logo.png" /></a>
      </router-link>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span></button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <router-link to="/home">
              <a class="nav-link">主页<span class="sr-only">(current)</span></a>
            </router-link>
          </li>
          <router-link to="/home#applications" tag="li">
            <a class="nav-link">应用场景</a>
          </router-link>
          <router-link to="/home#technologys" tag="li">
            <a class="nav-link">技术资源</a>
          </router-link>
          <router-link to="/home#development" tag="li">
            <a class="nav-link">发展规划</a>
          </router-link>
          <router-link to="/home#team" tag="li">
            <a class="nav-link">团队</a>
          </router-link>
        </ul>
        <div class="navbar-nav ml-auto">
          <li class="nav-item">
            <a class="nav-link product" @click="$router.push('/product')">产品</a>
          </li>
        </div>
        <!--登录状态-->
        <div class="navbar-nav ml-auto" v-if="isLog">
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Lang
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" @click="en">EN</a>
              <a class="dropdown-item" @click="ch">CH</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link" @click="goRegister">
              <img class="cart" src="../../assets/img/home/cart.png" />
              <span class="badge badge-warning">99</span>
            </a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <img v-if="isFace" class="img-circle" src="../../assets/img/home/face.png" />
              <i v-else class="icon iconfont">&#xe611;</i>
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a class="dropdown-item" @click="$router.push('/personal-center/setup-info')">个人设置</a>
              <a class="dropdown-item">退出</a>
            </div>
          </li>

        </div>
        <!--未登录状态-->
        <div class="navbar-nav ml-auto" v-else>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle"  id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Lang
            </a>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
              <a class="dropdown-item"  @click="en">EN</a>
              <a class="dropdown-item"  @click="ch">CH</a>
            </div>
          </li>
          <li class="nav-item">
            <a class="nav-link"  @click="goRegister">
              <i class="icon iconfont">&#xe61a;</i>
              <span>注册</span>
            </a>
          </li>
          <li class="nav-item">
            <a class="nav-link"  @click="goLogin">
              <i class="icon iconfont">&#xe600;</i>
              <span>登录</span>
            </a>
          </li>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'HeaderWrap',
  data () {
    return {
      isLog: true,
      isFace: false
    }
  },
  methods: {
    goAnchor (selector) {
      let anchorElement = document.getElementById(selector)
      // 如果对应id的锚点存在，就跳转到锚点
      if (anchorElement) {
        anchorElement.scrollIntoView()
      }
    },
    goRegister () {
      this.$router.push({
        name: 'Register'
      })
    },
    goLogin () {
      this.$router.push({
        name: 'Login'
      })
    },
    en () {
      this.$store.commit('languageChange', 'english')
    },
    ch () {
      this.$store.commit('languageChange', 'chinese')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/assets/styles/public";
.bg-dark {
  background-color: $brunet !important;
}

.navbar-dark .navbar-nav .nav-link {
  color: #a3adc0;
}

.navbar-dark .navbar-nav .active > .nav-link {
  color: $bright;
}

.nav-link:hover {
  color: $bright !important;
}

.badge-warning {
  color: $bright;
}
/*以上是bootstrap重写*/

.header_wrap {
  font-size: $font_md;
  outline: none;
}

.cart {
  max-width: 20px;
}

.face {
  img {
    max-width: 30px;
  }
}
.product {
  border: 1px solid #a3adc0;
  @include w_h(122px, 48px);
  border-radius: 30px;
  text-align: center;
  &:hover {
    border-color: #ffffff;
  }
}
</style>
