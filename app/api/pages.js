
const dataFile = require('../db/dataFile')

/**
 * 主页
 */
exports.home = async (ctx, next) => {
    let data = dataFile.getPostList()
    await ctx.render('index', {data})
}

/**
 * 详情页
 * @
 * params
 *   id | 文章ID
 */
exports.detail = async (ctx, next) => {
    let id = ctx.params.id
    if (!id) return next()
    let post = dataFile.getPostDetail(id)
    post.meta.tagsStr = post.meta.tags.join('/')
    await ctx.render('detail', {post})
}