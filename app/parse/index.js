const path = require('path')
const fs = require('fs')
// const meta = require('meta')
const yaml = require('js-yaml')
const postDir = path.resolve(__dirname, '../../post')
const jsonDir = path.resolve(__dirname, '../../json')
const dataPath = { list: path.join(jsonDir, 'list'), post: path.join(jsonDir, 'post') }

if (!fs.existsSync(jsonDir)) fs.mkdirSync(jsonDir) // 如果json目录不存在则创建
Object.keys(dataPath).forEach(key => {
    if (!fs.existsSync(dataPath[key])) fs.mkdirSync(dataPath[key]) 
})
{
    // 获取post文件名
    let mdFile = fs.readdirSync(postDir)
    mdFile = mdFile.filter(item => path.extname(item) == '.md') // 过滤非md文件
    mdFile = mdFile.map(item => {
        if (typeof item == 'string') { // 文件名转对象
            const basename = path.basename(item, '.md')
            let post = fs.readFileSync(path.join(postDir, item)).toString()
            let bloks = post.split('---')
            let metaYaml = bloks[1]
            let postContent = bloks.splice(2).join('') // 文章主体内容
            let meta = yaml.load(metaYaml) // 文章媒体信息
            meta.basename = basename // 如果没有id，默认为文件名
            let detail = { meta, content: postContent }
            fs.writeFileSync(path.join(dataPath.post, basename + '.json'), JSON.stringify(detail))
            return meta
        } else {
            return item
        }
    })
    // 存储分页信息
    const totalNum = mdFile.length
    let page = 0
    const pageSize = 10
    while (mdFile.length) {
        page++
        let list = mdFile.splice(0, pageSize)
        let listObj = {totalNum, page, pageSize, list}
        fs.writeFileSync(path.join(dataPath.list, page + '.json'), JSON.stringify(listObj))
    }
    // 列表存储
}