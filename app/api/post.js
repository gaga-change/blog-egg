const dbPost = require('../db/post')
const only = require('only')

/**
 * 从请求体中提取并处理合适字段
 */
function _turnPost(body) {
    let post = only(body, 'title categories tags date markdown intro')
    if (post.tags) post.tags = post.tags.split(',')
    if (post.categories) post.categories = post.categories.split(',')
    return post        
}   

module.exports = {
    /** 根据url参数中的ID获取文章 */
    async bind(ctx, next) {
        let id = ctx.params.id
        let post = await dbPost.findById(id)
        if (!post) {
            ctx.body = { err: '没有该文章' }
        } else {
            ctx.state.post = post
            await next()
        }
    },
    /** 创建 */
    async create(ctx) {
        let body = ctx.request.body
        if (!body.title) ctx.throw(400, 'title required')
        ctx.body = await dbPost.createPost(_turnPost(body), ctx.state.postParams)
    },
    /** 查询指定文章 */
    async find(ctx) {
        let post = ctx.state.post
        ctx.body = { data: post }
    },
    /** 查询所有 */
    async findAll(ctx) {
        let ret = await dbPost.findAll(only(ctx.query, 'page pageSize tag category'))
        ctx.body = ret
    },
    /** 归档 */
    async archives(ctx) {
        ctx.body = await dbPost.archives()
    },
    /** 删除文章 */
    async delete(ctx) {
        let post = ctx.state.post
        let msg = await post.remove()
        ctx.body = { data: msg }
    },
    /** 修改 */
    async modify(ctx) {
        let body = ctx.request.body
        if (!body.title) ctx.throw(400, 'title required')
        let post = ctx.state.post
        let newPost = _turnPost(body)
        Object.keys(newPost).forEach(key => { // 替换参数
            post[key] = newPost[key]
        })
        let msg = await post.save() // 保存修改
        ctx.body = { data: msg }
    },
    /** 获取标签 */
    async terms(ctx) {
        let ret = await dbPost.terms()
        ctx.body = ret
    }
}