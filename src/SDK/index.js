require('dotenv').config()

// Depends on tencentcloud-sdk-nodejs version 4.0.3 or higher
const tencentcloud = require('tencentcloud-sdk-nodejs')

const ScfClient = tencentcloud.scf.v20180416.Client

// 实例化一个认证对象，入参需要传入腾讯云账户secretId，secretKey,此处还需注意密钥对的保密
// 密钥可前往https://console.cloud.tencent.com/cam/capi网站进行获取
const clientConfig = {
  credential: {
    secretId: process.env.SecretId,
    secretKey: process.env.SecretKey
  },
  region: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  profile: {
    httpProfile: {
      endpoint: 'scf.tencentcloudapi.com'
    }
  }
}

// 实例化要请求产品的client对象,clientProfile是可选的
const client = new ScfClient(clientConfig)
const BaseParams = {
  FunctionName: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  Namespace: 'xxxxxxxxxxxxxxxxxxxxxxxxxx',
  Qualifier: 'xxxxxxxxxxxxxxxxxxxxxxxxxx'
}

const listTrigger = (params) => {
  console.log('listTrigger', params)
  return new Promise((resolve, reject) => {
    client.ListTriggers(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

const createTrigger = (params) => {
  console.log('createTrigger', params)
  return new Promise((resolve, reject) => {
    client.CreateTrigger(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

const deleteTrigger = (params) => {
  console.log('deleteTrigger', params)
  return new Promise((resolve, reject) => {
    client.DeleteTrigger(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

const invokeFunc = (params) => {
  console.log('invokeFunc', params)
  return new Promise((resolve, reject) => {
    client.Invoke(params, (err, response) => {
      if (err) {
        reject(err)
      } else {
        resolve(response)
      }
    })
  })
}

module.exports = {
  BaseParams,
  listTrigger,
  createTrigger,
  deleteTrigger,
  invokeFunc
}
