const createGoal = function () {
  console.log("Creating goal...")
  wx.navigateTo({
    url: '/pages/goal/cgoal/cgoal',
  })
}

module.exports = {
  createGoal: createGoal
}
