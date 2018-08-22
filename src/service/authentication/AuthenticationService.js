import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const AuthenticationService = {
  // 登录 name password
  login: (info) => {
    return axios.post(CurrentInterface + 'login', info)
  },
  // 注销
  logout: (info) => {
    return axios.get(CurrentInterface + 'logout', info)
  }
}
export default AuthenticationService
