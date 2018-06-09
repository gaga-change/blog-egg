const post = require('../db/post')
const only = require('only')
module.exports = {
    /** 创建 */
    async create(ctx) {
        let body = ctx.request.body
        if (!body.title) ctx.throw(400, 'title required')
        console.log('--', Date.now())
        ctx.body = await post.createPost(
            only(body, 'title categories tags date markdown intro'), 
            ctx.state.postParams
        )
    },
    /** 查询 */
    async find(ctx) {
        let query = ctx.query
        if (!query.id) ctx.throw(400, 'id required') // id or _id
        let ret = await post.findOne(query.id)
        ctx.body = { data: ret.post, err: ret.err }
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
    /** 永久删除 */
    async delete(ctx) {
        let query = ctx.query
        if (!query.id) ctx.throw(400, 'id required') // id or _id
        let ret = await post.delete(query.id)
        ctx.body = { data: ret.msg, err: ret.err }
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