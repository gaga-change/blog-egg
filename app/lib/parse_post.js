const yaml = require('js-yaml')
const md = require('markdown-it')()

module.exports = (content) => {
    let post = content
    let bloks = post.split('---')
    let metaYaml = bloks[1] // 元信息
    let postContent = md.render((bloks.splice(2).join(''))) // 文章主体内容
    let meta = yaml.load(metaYaml) // 文章媒体信息
    // meta.id = meta.id || basename // 如果没有id，默认为文件名
    meta.intro = postContent.replace(/(\s|<[^>]+>)+/ig, ' ').substr(0, 56).trim() // 简介
    let detail = { ...meta, content: postContent }
    return detail
}