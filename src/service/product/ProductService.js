import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const ProductService = {
  // 查找所有的产品信息
  fetchAllProduct: (info) => {
    return axios.get(CurrentInterface + 'product', info)
  }
}
export default ProductService
