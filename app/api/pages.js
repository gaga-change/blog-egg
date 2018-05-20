
const dataFile = require('../db/dataFile')
const blogConfig = require('../config/blog')

module.exports = {
    /** 主页 */
    async home(ctx, next) {
        let data = dataFile.getPostList()
        await ctx.render('index', { data, blog: blogConfig })
    },
    /** 详情页 */
    async detail(ctx, next) {
        let id = ctx.params.id
        if (!id) return next()
        let post = dataFile.getPostDetail(id)
        post.meta.tagsStr = post.meta.tags.join('/')
        await ctx.render('detail', { post, blog: blogConfig })
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