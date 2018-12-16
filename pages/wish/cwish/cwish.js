
const requests = require('../../../requests/requests.js')
const utils = require('../../../utils/util.js')

var dataLoaded = false
var typeSelected = false
var newWish = {
  title: "",
  wtype: -1,
  costs: 0
}

const createWish = function (wish) {
  requests.createWish(wish, undefined, () => { utils.clogin() })
}

Page({
  initData: {
    name: "create wish",
    items: [
      {
        title: '一次性心愿',
        key: 1
      },
      {
        title: '每日心愿',
        key: 2
      },
      {
        title: '每周心愿',
        key: 3
      },
      {
        title: '每月心愿',
        key: 4
      },
      {
        title: '每年心愿',
        key: 5
      },
      {
        title: '常驻心愿',
        key: 6
      }
    ],
    selected: '请选择...',
    selectedStatus: false,
  },
  data: {},
  selected: function (event) {
    var value = event.detail.value
    typeSelected = true
    var selectedItem = this.data.items[value]
    newWish.wtype = selectedItem.key
    var dataToSet = {
      selected: selectedItem.title,
      selectedStatus: true
    }
    this.setData(dataToSet)
    console.log(newWish)
  },
  titleDone: function (event) {
    newWish.title = event.detail.value
    console.log(newWish)
  },
  costsDone: function (event) {
    newWish.costs = parseInt(event.detail.value)
    console.log(newWish)
  },
  noteDone: function (event) {
    newWish.note = event.detail.value
    console.log(newWish)
  },
  createWish: function () {
    console.log(newWish)
    createWish(newWish)
  },
  onShow: function () {
    this.init()
  },
  init: function () {
    dataLoaded = false
    typeSelected = false
    newWish = {
      title: "",
      wtype: -1,
      costs: 0
    }
    this.setData(JSON.parse(JSON.stringify(this.initData)))
  }
})