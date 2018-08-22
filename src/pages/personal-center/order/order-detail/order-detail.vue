<template>
  <div class="order_detail">
     <header-wrap></header-wrap>
     <div class="order_container" v-if="showData">
         <div class="header">
            <p class="title">您的位置：<a>个人中心</a>&gt;<a>订单详情</a></p>
            <div class="order_state">
                <div class="state_left">
                    <div class="state">
                        <img src="~@/assets/img/order/warn.png"/>
                        <p class="col-lg-12 col-md-12 col-sm-12 col-xs-12">当前订单状态：等待买家收货</p>
                    </div>
                    <button>确认收货</button>
                </div>
                <div class="state_right">
                    <img src="~@/assets/img/order/1.png"/>
                </div>
            </div>
         </div>
         <div class="content">
            <div class="nav_content">
                <ul>
                    <li>
                        <span :class="{ active: navActive == 0   }" @click="choiseNav">订单信息</span>
                    </li>
                    <li>
                        <span :class="{ active: navActive == 1 }" @click="choiseNav">物流信息</span>
                    </li>
                </ul>
                <div class="order_info">
                    <p>订单号：{{orderDetail._id}}</p>
                    <p>下单时间：{{orderDetail.createdAt}}</p>
                </div>
            </div>
            <collect-goods v-if="navActive == 0" :data="orderDetail"></collect-goods>
            <flow-info v-if="navActive == 1"></flow-info>
         </div>
         <div class="shop_info">
             <ul class="caption">
                <li>
                    <p>商品信息</p>
                </li>
                <li>
                    <p>单价</p>
                </li>
                <li>
                    <p>数量</p>
                </li>
                <li>
                    <p>支付方式</p>
                </li>
             </ul>
             <ul class="detail">
                <li>
                    <div class="shop_photo"></div>
                </li>
                <li>
                    <p class="shop_title">{{orderDetail.product.name}}</p>
                </li>
                <li>
                    <p class="single">{{orderDetail.product.price}}</p>
                </li>
                <li>
                    <p class="single">{{orderDetail.product.discount}}</p>
                </li>
                <li>
                    <p class="single mode" v-if="orderDetail.pay == 0">兑换码</p>
                    <p class="single mode" v-if="orderDetail.pay == 1">ETH</p>
                </li>
             </ul>
             <div class="cost">
                 <p class="remark">订单备注：我是备注我是备注我是备注我是备注我是备注我是备注</p>
                 <ul>
                     <li>运费：0.00元</li>
                     <li>商品总金额：{{orderDetail.product.price * orderDetail.product.discount}}元</li>
                     <li>应付总额：<span>{{orderDetail.product.price * orderDetail.product.discount}}</span>元</li>
                 </ul>
             </div>
             <div class="handle">
                 <button>确认收货</button>
             </div>
         </div>
     </div>
  </div>
</template>

<script>
import OrderService from '@/service/order/OrderService'
import HeaderWrap from '@/components/header/header'
import CollectGoods from './collect-goods/collect-goods'
import FlowInfo from './flow-info/flow-info'
export default {
  name: 'OrderDetail',
  components: {
    CollectGoods,
    FlowInfo,
    HeaderWrap
  },
  data () {
    return {
      orderService: OrderService,
      navActive: 0,
      orderDetail: [],
      showData: false
    }
  },
  created () {
    this.getOrderInfo()
  },
  methods: {
    choiseNav () {
      if (this.navActive === 0) {
        this.navActive = 1
      } else {
        this.navActive = 0
      }
    },
    // 根据id查询订单信息
    getOrderInfo () {
      this.orderService.queryOrderInfo(this.$route.query.orderid).then((results) => {
        if (results.data.success) {
          results.data.data.createdAt = this.formatDate(results.data.data.createdAt)
          this.orderDetail = results.data.data
          this.showData = true
          console.log(this.orderDetail)
        } else {
          this.$toaster.error(results.data.msg)
        }
      })
    },
    // 时间戳转化为日期
    formatDate (now) {
      let time = new Date(now)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hour = time.getHours()
      let minute = time.getMinutes()
      let second = time.getSeconds()
      return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/public";
  @import './order-detail.scss';
</style>
