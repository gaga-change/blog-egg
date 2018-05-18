// router.post('/api/post', post.create) // 创建
// router.get('/api/post', post.find) // 获取 
// router.get('/api/posts', post.findAll) // 获取所有
// router.put('/api/remove', post.remove ) // 移动到垃圾箱
// router.delete('/api/clear', post.delete) // 清空垃圾箱
// router.put('/api/modify', post.modify) // 修改

const post = require('../db/post')

module.exports = {
    /** 创建 */
    async create(ctx) {
        let body = ctx.request.body
        if (!body.content) ctx.throw(400, 'content required')
        let ret = await post.createPost(body.content)
        ctx.body = { data: ret.post, err: ret.err }
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
        let ret = await post.findAll()
        ctx.body = { data: ret.posts }
    },
    /** 移动到垃圾箱 */
    async remove(ctx) {

    },
    /** 永久删除 */
    async delete() {

    },
    /** 修改 */
    async modify() {

    }
}