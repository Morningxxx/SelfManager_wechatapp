const createWish = function () {
  console.log("Creating wish...")
  wx.navigateTo({
    url: '/pages/wish/cwish/cwish',
  })
}

module.exports = {
  createWish: createWish
}
