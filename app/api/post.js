const post = require('../db/post')
const only = require('only')
module.exports = {
    /** 根据url参数中的ID获取文章 */
    async bind(ctx, next) {
        let id = ctx.params.id
        ctx.state.post = await post.findById(id)
        await next()
    },
    /** 创建 */
    async create(ctx) {
        let body = ctx.request.body
        if (!body.title) ctx.throw(400, 'title required')
        ctx.body = await post.createPost(
            only(body, 'title categories tags date markdown intro'),
            ctx.state.postParams
        )
    },
    /** 查询指定文章 */
    async find(ctx) {
        let post = ctx.state.post
        if (post) {
            ctx.body = { data: post }
        } else {
            ctx.body = { err: '没有该文章' }
        }
    },
    /** 查询所有 */
    async findAll(ctx) {
        let ret = await post.findAll(only(ctx.query, 'page pageSize tag category'))
        ctx.body = ret
    },
    /** 归档 */
    async archives(ctx) {
        ctx.body = await post.archives()
    },
    /** 删除文章 */
    async delete(ctx) {
        let post = ctx.state.post
        if (post) {
            let msg = await post.remove()
            ctx.body = {msg}
        } else {
            ctx.body = { err: '没有该文章' }
        }
    },
    /** 修改 */
    async modify(ctx) {
        let query = ctx.query
        let body = ctx.request.body
        if (!body.content) ctx.throw(400, 'content required')
        let ret = await post.mondify(body.content)
        ctx.body = { data: ret.post, err: ret.err }
    },
    /** 获取标签 */
    async terms(ctx) {
        let ret = await post.terms()
        ctx.body = ret
    }
}