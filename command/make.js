'use strict'
const exec = require('child_process').exec
const co = require('co')
const prompt = require('co-prompt')
const chalk = require('chalk')
const fs = require('fs')
const axios = require('axios')


module.exports = () => {
  co(function *() {
    let url = 'https://raw.githubusercontent.com/Jsonlu/android/master/data.json';
    let d = yield axios.get(url)
    let data = d.data
    let proName = yield prompt('Input Project Name:')
    let json = data
    let typeList = '', versionList = ''
    for (let o in json.data) {
      typeList += '/' + o;
    }
    let proType = ''
    let typeData = []
    while (typeData.length < 1) {
      proType = yield prompt('Input Project Type (' + typeList + '):')
      if (json.data[proType]) {
        typeData = json.data[proType]
      }
    }
    for (let d in typeData) {
      versionList += '/' + typeData[d].version;
    }
    let index = -1;
    while (index < 0) {
      let version = yield prompt('Input Project Version(' + versionList + '):')
      for (let d in typeData) {
        if (typeData[d].version == version.trim()) {
          index = d
        }
      }
    }

    if (!proName)
      proName = 'a'
    let proVersion = typeData[index].version
    let gitUrl = typeData[index].repository
    fs.mkdir(proName, '0777', (err) => {
      if (err) console.log(err)
      let cmdStr = `git clone -b ${proVersion} ${gitUrl} ${proName}`
      console.log(chalk.white('\n init ing...'))

      exec(cmdStr, (error, stdout, stderr) => {
        if (error) {
          console.log(error)
          process.exit()
        }
        console.log(chalk.green('\n √ clone over!'))
        process.exit()
      })
    })


  })
}