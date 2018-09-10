import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/pages/login/login' // 登录
import Register from '@/pages/register/register' // 注册
import Sidebar from '@/components/sidebar/sidebar'
import PersonalCenter from '@/pages/personal-center/personal-center'
import SetupInfo from '@/pages/personal-center/setup-info/setup-info'
import MyCDKey from '@/pages/personal-center/my-CDKey/my-CDKey'
import Order from '@/pages/personal-center/order/order-list/order'
import Home from '@/pages/home/home' // 首页
import Product from '@/pages/product/product' // 产品
import OrderDetail from '@/pages/personal-center/order/order-detail/order-detail'
import ShopCart from '@/pages/shop-cart/shop-cart'
import OrderPayment from '@/pages/shop-cart/order-payment/order-payment'
import CompletePayment from '@/pages/shop-cart/order-payment/subpage/complete-payment'
import BindBurse from '@/pages/shop-cart/order-payment/subpage/bind-burse'
import Trade from '@/pages/shop-cart/trade/trade'
import ChooseAddress from '@/pages/shop-cart/choose-address/choose-address'

Vue.use(Router)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

// 路由列表
export default new Router({
  mode: 'history',  // require service support
  scrollBehavior,
  routes: [{
    path: '/',
    redirect: 'register'
  }, {
    path: '/home',
    name: 'Home',
    component: Home,
    meta: {
      scrollToTop: true
    }
  }, {
    path: '/product',
    name: 'Product',
    component: Product
  }, {
    path: '/register',
    name: 'Register',
    component: Register
  }, {
    path: '/login',
    name: 'Login',
    component: Login
  }, {
    path: '/sidebar',
    name: 'Sidebar',
    component: Sidebar
  }, {
    path: '',
    name: 'PersonalCenter',
    component: PersonalCenter,
    children: [{
      path: '/personal-center/setup-info',
      name: 'SetupInfo',
      component: SetupInfo
    }, {
      path: '/personal-center/my-CDKey',
      name: 'MyCDKey',
      component: MyCDKey
    }, {
      path: '/personal-center/order',
      name: 'Order',
      component: Order
    }]
  }, {
    path: '/order-detail',
    name: 'OrderDetail',
    component: OrderDetail
  }, {
    path: '/shop-cart',
    name: 'ShopCart',
    component: ShopCart,
    children: [{
      path: '/shop-cart/order-payment',
      name: 'OrderPayment',
      component: OrderPayment
    }, {
      path: '/shop-cart/trade',
      name: 'Trade',
      component: Trade
    }, {
      path: '/shop-cart/choose-address',
      name: 'ChooseAddress',
      component: ChooseAddress
    }, {
      path: '/shop-cart/order-payment/subpage/complete-payment',
      name: 'CompletePayment',
      component: CompletePayment
    }, {
      path: '/shop-cart/order-payment/subpage/bind-burse',
      name: 'BindBurse',
      component: BindBurse
    }]
  }]
})
