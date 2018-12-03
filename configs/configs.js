const envName = 'dev'

const configs = {
  dev: {
    baseUrl: "http://127.0.0.1:5000"
  },
  test: {
    baseUrl: "http://sm-tst.spechles.com"
  },
  prod: {
    baseUrl: "http://sm.spechles.com"
  }
}

module.exports = configs[envName]
