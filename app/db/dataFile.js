
const fs = require('fs')
const path = require('path')

/**
 * 获取文章目录
 */
exports.getPostList = () => {
    let buffer = fs.readFileSync(path.resolve(__dirname, '../../', 'json/list/1.json'))
    return JSON.parse(buffer.toString())
}
/**
 * 获取文章详情
 * @param {String} id 文章ID
 */
exports.getPostDetail = (id) => {
    let str = fs.readFileSync(path.resolve(__dirname, '../../', `json/post/${id}.json`)).toString()
    return JSON.parse(str)
}