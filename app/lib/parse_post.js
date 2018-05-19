const yaml = require('js-yaml')
const md = require('markdown-it')()

module.exports = (content) => {
    let err, meta // 错误信息
    let bloks = content.split('---')
    if (bloks.length < 3) {
        return { err: '文件格式异常' }
    }
    let metaYaml = bloks[1] // 元信息
    let postContent = md.render((bloks.splice(2).join(''))) // 文章主体内容
    try {
        meta = yaml.load(metaYaml) // 文章媒体信息
    } catch (e) {
        return { err: '元信息格式异常' }
    }
    if (!meta) {
        return { err: '文件格式异常' }
    }
    // meta.id = meta.id || basename // 如果没有id，默认为文件名
    meta.intro = postContent.replace(/(\s|<[^>]+>)+/ig, ' ').substr(0, 56).trim() // 简介
    return { err, post: { ...meta, content: postContent } }
}