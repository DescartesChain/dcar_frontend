<template>
  <div class="entry">
      <ul class="nav">
          <li>
              <img src="~@/assets/img/order/all-order-logo.png" />
              <p>全部订单</p>
          </li>
          <li>数量</li>
          <li>支付方式</li>
          <li>订单状态</li>
          <li>交易操作</li>
      </ul>
      <div class="content" v-for="item in order" :key="item._id">
        <div class="title">
            <p>订单号：{{item._id}}</p>
            <p>下单时间：{{item.createdAt}}</p>
        </div>
        <div class="basic-info">
            <ul>
                <li class="photo"></li>
                <li class="present">
                    <p>{{item.product.describe}}</p>
                </li>
                <li class="number">
                    <p>{{item.quantity}}</p>
                </li>
                <li class="mode">
                    <p v-if="item.pay == 0">兑换码</p>
                    <p v-if="item.pay == 1">ETH</p>
                </li>
                <li>
                    <p>物流运输中</p>
                    <p id="order_detail" @click="jump(item._id)">订单详情</p>
                </li>
                <li class="handle">
                    <p>确认收货</p>
                </li>
            </ul>
        </div>
      </div>
      <b-tooltip target="order_detail" placement="bottom">
        <p>在北京分拨中心扫描，即将发往上海分拨中心</p>
      </b-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Entry',
  props: ['order'],
  data () {
    return {
      allUserOrder: []
    }
  },
  created () {
    for (let i = 0; i < this.order.length; i++) {
      this.order[i].createdAt = this.formatDate(this.order[i].createdAt)
    }
  },
  methods: {
    formatDate (now) {
      let time = new Date(now)
      let year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      let hour = time.getHours()
      let minute = time.getMinutes()
      let second = time.getSeconds()
      return year + '-' + month + '-' + date + '   ' + hour + ':' + minute + ':' + second
    },
    jump (id) {
      this.$router.push({
        path: '/order-detail',
        query: {orderid: id}
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/styles/public';
@import './entry.scss';
</style>
