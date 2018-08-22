<template>
  <div class="collect_goods">
      <div class="info">
          <p>收货信息</p>
          <ul>
              <li>订单号：{{data._id}}</li>
              <li>收货人：{{data.customer.name}}&nbsp;186****4140</li>
              <li>收货地址：{{data.shipAddress}}</li>
          </ul>
      </div>
      <div class="info">
          <p>发货信息</p>
          <ul>
              <li>生产商：DCAR</li>
              <li>手机号：15012345678&nbsp;&nbsp;&nbsp;&nbsp;电话：0379-12313541</li>
          </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: 'CollectGoods',
  props: ['data'],
  data () {
    return {
    }
  },
  created () {
  }
}
</script>

<style lang="scss" scoped>
  @import "~@/assets/styles/public";
  @import './collect-goods.scss';
</style>
