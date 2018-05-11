const path = require('path')
const fs = require('fs')

const postDir = path.resolve(__dirname, '../../post')
const jsonDir = path.resolve(__dirname, '../../json')
const dataPath = {fileName: jsonDir + '/files.json'}

{
    // 存储目录
    let mdFile = fs.readdirSync(postDir)
    fs.writeFileSync(dataPath.fileName, JSON.stringify(mdFile))
}
