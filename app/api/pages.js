
const dataFile = require('../db/dataFile')
const blogConfig = require('../config/blog')
const post = require('../db/post')

module.exports = {
    /** 主页(列表页) */
    async home(ctx, next) {
        let page = ctx.params.page || 1
        let pageSize = 1
        let [ret, terms] = await Promise.all([
            post.findAll({
                page,
                pageSize
            }),
            post.terms()
        ])
        let data = ret.data
        console.log(data)
        await ctx.render('index', {
            data,
            blog: blogConfig,
            terms: terms.data, //
            admin: !!ctx.session.user, // 权限
            menus: ctx.state.menus
        })
    },
    /** 详情页 */
    async detail(ctx, next) {
        let u = !!ctx.session.user
        let id = ctx.params.id
        if (!Number(id)) return next()
        let ret = await post.findOne(id)
        let p = ret.post
        // post = post || {meta: {tags: []}}
        if (!p) {
            return ctx.response.redirect('/')
        }
        p.tags = p.tags || []
        p.tagsStr = p.tags.join('/')
        return await ctx.render('detail', { post: p, blog: blogConfig, admin: u })
    },
    /** 登入页 */
    async login(ctx, next) {
        let user = ctx.session.user
        if (user) {
            ctx.response.redirect('/writer')
        } else {
            await ctx.render('login', { blog: blogConfig })
        }
    },
    /** 编辑页 */
    async writer(ctx, next) {
        let user = ctx.session.user
        if (!user) {
            ctx.response.redirect('/login')
        } else {
            await ctx.render('writer', { blog: blogConfig })
        }
    }
}