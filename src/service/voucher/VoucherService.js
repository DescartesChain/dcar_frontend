import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const VoucherService = {
  // 获取所有兑换码
  foundAllVoucher: (info) => {
    return axios.get(CurrentInterface + 'voucher', info)
  }
}
export default VoucherService
