import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const AddressService = {
  // 新建收货地址
  createAddress: (info) => {
    return axios.post(CurrentInterface + 'address', info)
  },

  // 查找所有收货地址
  loadAddressList: (info) => {
    return axios.get(CurrentInterface + 'address', info)
  },

  // 根据 id 查找收货地址
  seekAddress: (id) => {
    return axios.get(CurrentInterface + 'address/' + id)
  },

  // 根据 id 删除收货地址
  deleteAddress: (id) => {
    return axios.delete(CurrentInterface + 'address/' + id)
  },

  // 根据 id 更新收货地址
  updateAddress: (id, info) => {
    return axios.put(CurrentInterface + 'address/' + id, info)
  }

}
export default AddressService
