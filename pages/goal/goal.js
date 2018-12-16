//index.js
//获取应用实例
const app = getApp()
const requests = require('../../requests/requests.js')
const utils = require('../../utils/util.js')

const goalStatusMapping = {
  100: "可兑换",
  900: "已兑换"
}

const goalTypeMapping = {
  1: '一次性目标',
  2: '每日目标',
  3: '每周目标',
  4: '每月目标',
  5: '每年目标',
  6: '常驻目标',
}

Page({
  data: {
    goals: []
  },
  finishGoal: function(event) {
    if (!event.target.id) {
      return
    }
    var goal = this.data.goals[event.target.id]
    console.log(goal)
    wx.showModal({
      title: '确认完成',
      content: '您将获得' + goal.rewards + '积分.',
      confirmColor: 'rgb(19, 34 ,122)',
      success: (res) => {
        if (res.confirm) {
          console.log('confirmed')
          requests.finishGoal(goal.gid, (res)=>{
            this.onShow()
            wx.showToast({
              title: '记录成功！',
              duration: 1000,
            })
          }, (res)=>{
            wx.showToast({
              title: res.err_msg? res.err_msg: '服务器开小差了',
              duration: 1000,
            })
            utils.clogin()
          })
        }
      }
    })
  },
  onShow: function () {
    wx.showLoading({
      title: 'Loading...',
    })
    this.getGoals((goals) => {
      console.log(goals)
      for (var i in goals) {
        var goal = goals[i]
        goal.ctime = utils.formatTime(new Date(goal.ctime * 1000))
        goal.statusName = goalStatusMapping[goal.status]
        goal.typeName = goalTypeMapping[goal.gtype]
        goal.index = i
      }
      this.setData({
        goals: goals
      })
      wx.hideLoading()
    })
  },
  getGoals: function (suc) {
    requests.getGoals(
      (res) => { suc(res.data.goals) },
      (res) => { utils.clogin() }
    )
  }
})