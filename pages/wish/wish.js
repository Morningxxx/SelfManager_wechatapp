//index.js
//获取应用实例
const app = getApp()
const requests = require('../../requests/requests.js')
const utils = require('../../utils/util.js')

const wishStatusMapping = {
  100: "可兑换",
  900: "已兑换"
}

const wishTypeMapping = {
  1: '一次性心愿',
  2: '每日心愿',
  3: '每周心愿',
  4: '每月心愿',
  5: '每年心愿',
  6: '常驻心愿',
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
      confirmColor: '#13227a',
      success: (res) => {
        if(res.confirm) {
          console.log('confirmed')
          requests.buyWish(wish.wid, (res)=>{
            wx.showToast({
              title: "兑换成功！",
              duration: 700,
            })
          }, (res)=>{
            if(res.err_code === -1007) {
              wx.showToast({
                title: "余额不足！",
                icon: "loading",
                duration: 1000,
            })
            }
          })
        }
      }
    })
  },
  optionAction: function (event) {
    console.log(event)
    var wish = this.data.wishes[event.target.dataset.id]
    if (!wish) {
      return
    }
    wx.showActionSheet({
      itemList: ['删除'],
      success: (res) => {
        console.log(res)
        if (res.tapIndex === 0) {
          this.doDelete(wish)
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
        wish.typeName = wishTypeMapping[wish.wtype]
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
  },
  doDelete: function (wish) {
    console.log(wish)
  }
})