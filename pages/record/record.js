//index.js
//获取应用实例
const app = getApp()
const requests = require('../../requests/requests.js')
const utils = require('../../utils/util.js')

const recordTypeMapping = {
  goal: "完成目标",
  wish: "兑换心愿",
}

Page({
  data: {
    records:[],
  },
  onLoad: function() { 
  },
  onShow: function () {
    wx.showLoading({
      title: 'Loading...',
    })
    this.getRecords((records) => {
      console.log(records)
      for (var i in records) {
        var record = records[i]
        record.finishDate = utils.formatTime(new Date(record.finishTime * 1000))
        record.typeName = recordTypeMapping[record.stype]
        record.index = i
      }
      this.setData({
        records: records
      })
      wx.hideLoading()
    })
  },
  getRecords: function (suc) {
    requests.getRecords(
      (res) => { suc(res.data.records) },
      (res) => { utils.clogin() }
    )
  }
})


