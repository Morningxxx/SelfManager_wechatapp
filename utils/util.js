const requests = require("../requests/requests.js")

const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

const clogin = function(userInfo) {
  requests.sessionLogin(
    wx.getStorageSync('sessionKey'), 
    function(res) {}, function() {
      wx.login({
        success(res) {
          console.log(res)
          if (res.code) {
            requests.clogin(res.code, userInfo)
          } else {
            console.log(res.errMsg)
          }
        }
      })
    })  
}

module.exports = {
  formatTime: formatTime,
  clogin: clogin
}
