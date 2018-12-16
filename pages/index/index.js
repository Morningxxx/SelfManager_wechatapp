//index.js
//获取应用实例
const app = getApp()
const utils = require("../../utils/util.js")
const requests = require("../../requests/requests.js")
const records = require("../record/records.js")
const goals = require("../goal/goals.js")
const wishes = require("../wish/wishes.js")

Page({
  data: {
    motto: 'Hello',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    buttonName: '刷新余额',
    balance: 0
  },
  //事件处理函数
  bindViewTap: function() {
    // wx.navigateTo({
    //   url: '../logs/logs'
    // })
  },
  createRecord: function() {
    records.createRecord()
  },
  createWish: function () {
    wishes.createWish()
  },
  createGoal: function () {
    goals.createGoal()
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
      utils.clogin(this.data.userInfo)
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        utils.clogin(this.data.userInfo)
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
          utils.clogin(this.data.userInfo)
        }
      })
    }
  },
  onShow: function() {
    this.getBalance()
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  getBalance: function() {
    requests.getBalance((res) => {
      var data = res.data
      this.setData({
        balance: data.balance
      })
    }, (res)=>{
      console.log('retry get balance...')
      utils.clogin()
      setTimeout(()=>{this.getBalance()}, 1000)
    })
  }
})
