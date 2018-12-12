const configs = require("../configs/configs.js")

const clogin = function(code, userInfo) {
  var gender = ''
  switch (userInfo) {
    case 0: gender = 'U';
    case 1: gender = 'M';
    case 2: gender = 'F';
  }
  wx.request({
    url: configs.baseUrl + '/api/login',
    method: "POST",
    data: {
      'code': code,
      'u_name': userInfo.nickName,
      'avatar': userInfo.avatarUrl,
      'gender': gender,
    },
    success: function (resp) {
      resp = resp.data
      console.log(resp.data)
      wx.setStorage({
        key: 'sessionKey',
        data: resp.data.sessionKey,
      })
      wx.setStorage({
        key: 'uid',
        data: resp.data.uid,
      })
    }
  })
}

const sessionLogin = function(sessionKey, suc, error) {
  if(!sessionKey) {
    error()
  }
  wx.request({
    url: configs.baseUrl + '/api/session?sessionKey=' + sessionKey,
    method: 'GET',
    dataType: 'json',
    success: function(res) {
      res = res.data
      if (res.success == true){
        console.log('session login success!')
        wx.setStorage({
          key: 'uid',
          data: res.data.uid,
        })
        suc(res)
      } else {
        console.log(res)
        error(res)
      } 
    },
    fail: function(res) {
      console.log(res)
      error(res)
    }
  })
}

module.exports = {
  clogin: clogin,
  sessionLogin: sessionLogin
}