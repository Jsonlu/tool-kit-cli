/**
 * Created by jsonlu on 17/4/25.
 */
'use strict'
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
var os = require('os')

module.exports = () => {
  co(function *() {
    let platform = os.platform()
    let type = os.type()
    if (type == 'Darwin') {
      type = 'OS X'
    }
    let release = os.release()
    let arch = os.arch()
    let net = os.networkInterfaces()
    for (let key in net) {
      for (let k in net[key]) {
        let json = net[key][k]
        if (json.family == 'IPv4' && json.address != '127.0.0.1') {
          json.platform = platform
          json.arch = arch
          json.type = type
          json.release = release
          console.log(chalk.green('\n'+JSON.stringify(json)+'\n'))
        }
      }
    }
  })
}