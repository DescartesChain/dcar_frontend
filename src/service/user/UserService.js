import axios from 'axios'
import serviceBase from '../serviceBase'
const CurrentInterface = serviceBase.url
const UserService = {
  // 创建新用户
  foundNewUser: (info) => {
    return axios.post(CurrentInterface + 'user', info)
  },
  //根据用户名查找用户信息
  fetchUserInfo: (info) => {
    return axios.get(CurrentInterface + 'user/' + info)
  },
  // 上传用户头像
  uploadHeadImage: (name, info) => {
    let form = new FormData()
    form.append('file', info)
    return axios.post(CurrentInterface + 'user/' + name + '/upload_img', form)
  },
  // 根据用户id修改用户信息
  alterUserInfo: (info) => {
    return axios.put(CurrentInterface + 'user/' + info)
  },
  // 根据用户id删除用户
  deleteUserInfo: (info) => {
    return axios.delete(CurrentInterface + 'user/' + info)
  }
}
export default UserService
