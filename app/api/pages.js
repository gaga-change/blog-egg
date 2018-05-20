
const dataFile = require('../db/dataFile')
const blogConfig = require('../config/blog')
const post = require('../db/post')

module.exports = {
    /** 主页 */
    async home(ctx, next) {
        let u = !!ctx.session.user
        // let data = dataFile.getPostList()
        let ret = await post.findAll()
        let data = ret.data
        await ctx.render('index', { data, blog: blogConfig, admin: u})
    },
    /** 详情页 */
    async detail(ctx, next) {
        let u = !!ctx.session.user
        let id = ctx.params.id
        if (!id) return next()
        let ret = await post.findOne(id)
        let p = ret.post
        // post = post || {meta: {tags: []}}
        if (!p) {
            return ctx.response.redirect('/')
        }
        p.tags = p.tags || []
        p.tagsStr = p.tags.join('/')
        await ctx.render('detail', { post: p, blog: blogConfig, admin: u})
    },
    /** 登入页 */
    async login(ctx, next) {
        let user = ctx.session.user
        if (user) {
            ctx.response.redirect('/writer')
        } else {
            await ctx.render('login')
        }
    },
    /** 编辑页 */
    async writer(ctx, next) {
        let user = ctx.session.user
        if (!user) {
            ctx.response.redirect('/login')
        } else {
            await ctx.render('writer')
        }
    }
}