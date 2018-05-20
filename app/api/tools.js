
const path = require('path')
const fs = require('fs')
const post = require('../db/post')

/** 工具 */
module.exports = {
    /** 把md文件转移到数据库 */
    async turnPost(ctx, next) {
        const postDir = path.resolve(__dirname, '../../post')
        let mdFile = fs.readdirSync(postDir)
        mdFile = mdFile.filter(item => path.extname(item) == '.md') // 过滤非md文件
        let message = [] // 错误信息
        let length = mdFile.length // 总长度
        await new Promise(r => {
            mdFile.map(async (item) => {
                let content = fs.readFileSync(path.join(postDir, item)).toString()
                let ret = await post.createPost(content)
                message.push(ret)
                if (message.length == length) {
                    r()
                }
            })
        })
        ctx.body = { data: message }
    }
}