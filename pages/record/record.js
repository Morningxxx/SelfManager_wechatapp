//index.js
//获取应用实例
const app = getApp()
const requests = require('../../requests/requests.js')
const utils = require('../../utils/util.js')

const recordTypeMapping = {
  goal: "完成目标",
  wish: "兑换心愿",
}

var currentPage = 0
var needMore = true
var pageSize = 20

Page({
  data: {
    records:[],
  },
  refreshList: function() {
    console.log('refresh')
  },
  loadListMore: function () {
    console.log('load more')
    if (!needMore) {
      return
    }
    currentPage += 1
    this.getRecords(
      (records) => {
        for (var i in records) {
          var record = records[i]
          record.finishDate = utils.formatTime(new Date(record.finishTime * 1000))
          record.typeName = recordTypeMapping[record.stype]
          record.index = i
        }
        this.setData({
          records: this.data.records.concat(records)
        })
      },
    )
    
  },
  onLoad: function() { 
  },
  onShow: function () {
    currentPage = 0
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
    requests.getRecords(currentPage,
      (res) => { 
        if (res.data.records.length < pageSize) {
          needMore = false
        } else {
          needMore = true
        }
        suc(res.data.records) 
      },
      (res) => { utils.clogin() }
    )
  }
})
