//index.js
//获取应用实例
const app = getApp()
const requests = require('../../requests/requests.js')
const utils = require('../../utils/util.js')

const wishStatusMapping = {
  100: "可兑换",
  200: "已兑换"
}

Page({
  data: {
    wishes: [],
  },
  buyWish: function(event) {
    if(!event.target.id) {
      return
    }
    var wish = this.data.wishes[event.target.id]
    console.log(wish)
    wx.showModal({
      title: '确认兑换',
      content: '兑换“'+wish.title+'”将消耗您'+wish.costs+'积分.',
      confirmColor: 'rgb(19, 34 ,122)',
      success: (res) => {
        if(res.confirm) {
          console.log('confirmed')
        }
      }
    })
  },
  onShow: function() {
    wx.showLoading({
      title: 'Loading...',
    })
    this.getWishes((wishes)=>{
      console.log(wishes)
      for (var i in wishes) {
        var wish = wishes[i]
        wish.ctime = utils.formatTime(new Date(wish.ctime * 1000))
        wish.statusName = wishStatusMapping[wish.status]
        wish.index = i
      }
      this.setData({
        wishes: wishes
      })
      wx.hideLoading()
    })
  },
  getWishes: function(suc) {
    requests.getWishes(
      (res)=>{suc(res.data.wishes)},
      (res)=>{utils.clogin()}
    )
  }
})