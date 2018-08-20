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
      <div class="content">
        <div class="title">
            <p>订单号：123456789123456789</p>
            <p>下单时间：2018-03-11&nbsp;&nbsp;22:30:56</p>
        </div>
        <div class="basic-info">
            <ul>
                <li class="photo"></li>
                <li class="present">
                    <p>我是产品名称我是产品名称我是产品名称我是产品名称我是产品名称我是产品名称我是产品名称</p>
                </li>
                <li class="number">
                    <p>1</p>
                </li>
                <li class="mode">
                    <p>ETH</p>
                </li>
                <li>
                    <p>物流运输中</p>
                    <p id="order_detail" @click="$router.push('/order-detail')">订单详情</p>
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
import OrderService from '@/service/order/OrderService'
export default {
  name: 'Entry',
  data () {
    return {
      orderService: OrderService
    }
  },
  created () {
    this.getOrder()
  },
  methods: {
    getOrder () {
      this.orderService.fetchAllOrder({}).then((results) => {
        console.log(results)
      })
    }
  }
}
</script>

<style lang='scss' scoped>
@import '~@/assets/styles/public';
@import './entry.scss';
</style>
