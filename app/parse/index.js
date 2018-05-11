const path = require('path')
const fs = require('fs')

const postDir = path.resolve(__dirname, '../../post')
const jsonDir = path.resolve(__dirname, '../../json')
const dataPath = {list: jsonDir + '/list.json'}

{
    // 存储目录
    let mdFile = fs.readdirSync(postDir)
    mdFile.filter(item => path.extname(item) == '.md') // 过滤非md文件
    fs.writeFileSync(dataPath.list, JSON.stringify(mdFile))
}

{
    // 存储详情
    let mdFile = fs.readFileSync(dataPath.list).toString()
    mdFile = JSON.parse(mdFile)
    mdFile = mdFile.map(item => {
        if (typeof item == 'string') { // 文件名转对象
            let post = fs.readFileSync(path.join(postDir, item)).toString()
            let test = /---[\s\S]*?(?=---)/.exec(post)
            console.log(test[0])
        }
        // return item
    })
    // console.log(mdFile)
    // fs.writeFileSync(dataPath.list, JSON.stringify(mdFile))
}