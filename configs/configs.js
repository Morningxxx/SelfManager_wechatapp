const envName = 'prod'

const configs = {
  dev: {
    baseUrl: "http://127.0.0.1:5000"
  },
  test: {
    baseUrl: "http://sm-tst.write4self.com"
  },
  prod: {
    baseUrl: "http://sm.write4self.com"
  }
}

const config = configs[envName]
config.envName = envName

module.exports = config
