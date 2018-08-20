import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const OrderService = {
  // 查找所有的订单信息
  fetchAllOrder: (info) => {
    return axios.get(CurrentInterface + 'order', info)
  },
  // 根据用户名查找用户信息
  fetchUserInfo: (info) => {
    return axios.get(CurrentInterface + 'order/' + info)
  }
}
export default OrderService
