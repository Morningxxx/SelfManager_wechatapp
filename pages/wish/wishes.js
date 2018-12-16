const createWish = function () {
  wx.navigateTo({
    url: '/pages/wish/cwish/cwish',
  })
}

module.exports = {
  createWish: createWish
}
