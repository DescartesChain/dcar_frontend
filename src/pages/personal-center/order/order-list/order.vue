<template>
  <div class="order">
      <ul class="order_nav">
        <li class="active">全部订单<span>{{this.allUserOrder.length}}</span></li>
        <li>待发货<span>0</span></li>
        <li>待收货<span>0</span></li>
      </ul>
      <div class="search_box">
        <div class="search_left">
          <input type="text" placeholder="输入商品名称或订单号进行搜索" class="search">
          <i>
            <font-awesome-icon :icon="['fas', 'search']" color="#676ECA"/>
          </i>
        </div>
        <div class="select_right">
          <p>订单状态：</p>
          <div class="dropdown" @click="choiseSelect">
             <p>
               {{all}}
               <i>
                  <font-awesome-icon :icon="['fas', 'sort-down']" color="#676ECA" size="2x"/>
               </i>
             </p>
          </div>
          <ul v-if="downMain">
            <li @click="choiseState('全部')">全部</li>
            <li @click="choiseState('待发货')">待发货</li>
            <li @click="choiseState('待收货')">待收货</li>
          </ul>
        </div>
      </div>
      <not-order v-if="allUserOrder.length == 0"></not-order>
      <entry v-if="allUserOrder.length > 0" :order="allUserOrder"></entry>
  </div>
</template>

<script>
import UserService from '@/service/user/UserService'
import NotOrder from './not-order/not-order'
import Entry from './entry/entry'
export default {
  name: 'Order',
  data () {
    return {
      userService: UserService,
      all: '全部',
      downMain: false,
      allUserOrder: []
    }
  },
  components: {
    NotOrder,
    Entry
  },
  created () {
    this.getUserOrder()
  },
  methods: {
    choiseSelect () {
      if (this.downMain === false) {
        this.downMain = true
      } else {
        this.downMain = false
      }
    },
    choiseState (data) {
      this.all = data
      this.downMain = false
    },
    getUserOrder () {
      this.userService.fetchUserOrder(localStorage.getItem('userid')).then((results) => {
        if (results.data.success) {
          this.allUserOrder = results.data.data
        } else {
          this.allUserOrder = []
          this.$toaster.error(results.data.msg)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/public";
  @import './order.scss';
</style>
