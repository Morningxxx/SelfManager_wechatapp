const createRecord = function () {
  console.log("Creating record...")
  wx.navigateTo({
    url: '/pages/record/crecord/crecord',
  })
}

module.exports = {
  createRecord: createRecord
}
