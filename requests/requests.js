const configs = require("../configs/configs.js")

const clogin = function(code, userInfo) {
  userInfo = userInfo || {}
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

const getBalance = function(suc, error) {
  wx.request({
    url: configs.baseUrl + '/api/my/balances',
    header: {'Authorization': wx.getStorageSync('sessionKey')},
    method: 'GET',
    success: function(res) {
      res = res.data
      console.log(res)
      if(!res.success) {
        error(res)
      } else {
        suc(res)
      }
    },
    fail: function(res) {
      res = res.data
      console.log(res)
      error(res)
    }
  })
}

const getGoals = function (suc, error) {
  wx.request({
    url: configs.baseUrl + '/api/my/goals',
    header: { 'Authorization': wx.getStorageSync('sessionKey') },
    method: 'GET',
    success: function (res) {
      wx.hideLoading()
      res = res.data
      if (res.success) {
        if (suc) { suc(res) }
      } else {
        wx.showToast({
          title: '请求失败，错误信息为：' + res.err_msg,
          duration: 1000
        })
        if (error) { error() }
      }
    },
    fail: function (res) {
      wx.hideLoading()
      wx.showToast({
        title: '服务器开小差，请重试',
        duration: 1000
      })
      if (error) { error() }
    },
    complete: function (res) { },
  })
}

const createGoal = function(goal, suc, error) {
  wx.request({
    url: configs.baseUrl + '/api/my/goals',
    data: goal,
    header: { 'Authorization': wx.getStorageSync('sessionKey') },
    method: 'POST',
    success: function(res) {
      wx.hideLoading()
      res = res.data
      if(res.success){
        wx.navigateBack({})
        wx.showToast({
          title: '创建成功！' + res.err_msg,
          duration: 700
        })
        if (suc) {suc(res)}
      } else {
        wx.showToast({
          title: '创建失败，错误信息为：' + res.err_msg,
          duration: 1000
        })
        if (error) {error()}
      }
    },
    fail: function(res) {
      wx.hideLoading()
      wx.showToast({
        title: '服务器开小差，请重试',
        duration: 3000
      })
      if (error) {
        error()
      }
    },
    complete: function(res) {},
  })
}

const finishGoal = function(gid, suc, error) {
  wx.request({
    url: configs.baseUrl + '/api/my/goals/finish',
    header: { 'Authorization': wx.getStorageSync('sessionKey') },
    method: 'POST',
    data: {
      gid: gid,
    },
    success: function(res) {
      res = res.data
      if (res.success) {
        if (suc) { suc(res) }
      }else if (error) { error(res) }
    },
    fail: function(res) {
      if (error) { error(res) }
    },
    complete: function(res) {
      wx.hideLoading()
    }
  })
  
}

const getWishes = function (suc, error) {
  wx.request({
    url: configs.baseUrl + '/api/my/wishes',
    header: { 'Authorization': wx.getStorageSync('sessionKey') },
    method: 'GET',
    success: function (res) {
      console.log(res)
      wx.hideLoading()
      res = res.data
      if (res.success) {
        if (suc) { suc(res) }
      } else {
        wx.showToast({
          title: '请求失败，错误信息为：' + res.err_msg,
          duration: 1000
        })
        if (error) { error() }
      }
    },
    fail: function (res) {
      wx.hideLoading()
      wx.showToast({
        title: '服务器开小差，请重试',
        duration: 1000
      })
      if (error) { error() }
    },
    complete: function (res) { },
  })
}

const createWish = function (wish, suc, error) {
  wx.request({
    url: configs.baseUrl + '/api/my/wishes',
    data: wish,
    header: { 'Authorization': wx.getStorageSync('sessionKey') },
    method: 'POST',
    success: function (res) {
      wx.hideLoading()
      res = res.data
      if (res.success) {
        wx.navigateBack({})
        wx.showToast({
          title: '创建成功！' + res.err_msg,
          duration: 700
        })
        if (suc){suc()}
      } else {
        wx.showToast({
          title: '创建失败，错误信息为：' + res.err_msg,
          duration: 3000
        })
        if (error){error()}
      }
    },
    fail: function (res) {
      wx.hideLoading()
      wx.showToast({
        title: '服务器开小差，请重试',
        duration: 3000
      })
      if (error){error()} 
    },
    complete: function (res) { },
  })
}

module.exports = {
  clogin: clogin,
  sessionLogin: sessionLogin,
  getBalance: getBalance,
  getGoals: getGoals,
  finishGoal: finishGoal,
  createGoal: createGoal,
  getWishes: getWishes,
  createWish: createWish,
}
