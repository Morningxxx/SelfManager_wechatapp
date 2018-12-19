
const requests = require('../../../requests/requests.js')

var typeSelected = false
var newGoal = {
  title: "",
  gtype: -1,
  rewards: 0
}

const createGoal = function(goal) {
  wx.showLoading({
    title: 'loading...',
  })
  requests.createGoal(goal, undefined, () => { utils.clogin() })
}

Page({
  initData: {
    name: "create goal",
    items: [
      {
        title: '一次性目标',
        key: 1
      },
      {
        title: '每日目标',
        key: 2
      },
      {
        title: '每周目标',
        key: 3
      },
      {
        title: '每月目标',
        key: 4
      },
      {
        title: '每年目标',
        key: 5
      },
      {
        title: '常驻目标',
        key: 6
      }
    ],
    selected: '请选择...',
    selectedStatus: false,
    canAutoDone: false,
    autoDone: false,
    newable: false
  },
  data: {},
  selected: function(event) {
    var value = event.detail.value
    typeSelected = true
    var selectedItem = this.data.items[value]
    newGoal.gtype = selectedItem.key
    var dataToSet = {
      selected: selectedItem.title,
      selectedStatus: true
    }
    if (selectedItem.key < 6 && selectedItem.key > 1) {
      dataToSet.canAutoDone = true
    } else {
      dataToSet.canAutoDone = false
    }
    this.setData(dataToSet)
    this.checkNewable()
  },
  titleDone: function(event) {
    newGoal.title = event.detail.value
    this.checkNewable()
  },
  rewardsDone: function (event) {
    newGoal.rewards = parseInt(event.detail.value)
    this.checkNewable()
  },
  noteDone: function (event) {
    newGoal.note = event.detail.value
  },
  autoDoneChecked: function(event) {
    if(event.detail.value.find(v => v === 'autoDone')) {
      newGoal.autoDone = true
    } else {
      newGoal.autoDone = false
    }
  },
  createGoal: function() {
    console.log(newGoal)
    createGoal(newGoal)
  },
  onShow: function() {
    this.init()
  },
  init: function() {
    typeSelected = false
    newGoal = {
      title: "",
      gtype: -1,
      rewards: 0
    }
    this.setData(JSON.parse(JSON.stringify(this.initData))) 
    console.log(this.data)
  },
  checkNewable: function() {
    var newable = false
    if (newGoal.title && newGoal.gtype > -1 && newGoal.rewards > 0) {
      newable = true
    }
    this.setData({newable: newable})
  }
})