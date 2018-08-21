import axios from 'axios'
if (localStorage.getItem('token')) {
  axios.defaults.headers.common['token'] = localStorage.getItem('token')
} else {
  axios.defaults.headers.common['token'] = ''
}
const serviceBase = {
  url: 'http://192.168.1.235:3000/',
  headers: new Headers({ 'Content-Type': 'application/json' })
}
export default serviceBase
