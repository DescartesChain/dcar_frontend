const VueCookie = {
  // 获取cookie
  getCookie: (name) => {
    let arr
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie.match(reg)) {
      arr = document.cookie.match(reg)
      return (arr[2])
    } else {
      return null
    }
  },
  // 设置cookie,增加到vue实例方便全局调用
  setCookie: (name, value, expiredays) => {
    var exdate = new Date()
    exdate.setDate(exdate.getDate() + expiredays)
    document.cookie = name + '=' + escape(value) + ((expiredays == null) ? '' : ';expires=' + exdate.toGMTString())
  },
  // 删除cookie
  delCookie: () => {
    let arr
    let reg = new RegExp('(^| )' + name + '=([^;]*)(;|$)')
    if (document.cookie.match(reg)) {
      arr = document.cookie.match(reg)
      return (arr[2])
    } else {
      return null
    }
  }
}
export default VueCookie
