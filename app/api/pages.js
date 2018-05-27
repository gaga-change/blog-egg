
const dataFile = require('../db/dataFile')
const blogConfig = require('../config/blog')
const post = require('../db/post')

module.exports = {
    /** 主页(列表页) */
    async home(ctx, next) {
        let page = ctx.params.page || 1
        let pageSize = 10
        let [ret, terms] = await Promise.all([
            post.findAll({
                page,
                pageSize
            }),
            post.terms()
        ])
        let data = ret.data
        await ctx.render('index', {
            data,
            blog: blogConfig,
            terms: terms.data, // 侧边栏
            admin: !!ctx.session.user, // 权限
            menus: ctx.state.menus // 菜单
        })
    },
    /** 归档 */
    async archives(ctx, next) {
        let criteria = {}
        let tag = ctx.params.tag
        let category = ctx.params.category
        if (tag) criteria.tags = decodeURI(tag)
        if (category) criteria.categories = decodeURI(category)
        let termName = criteria.tags || criteria.categories
        let [terms, archives] = await Promise.all([
            post.terms(),
            post.archives(criteria)
        ])
        // console.log()
        await ctx.render('archives', {
            data: archives.data,
            blog: blogConfig,
            termName, // 分类目录或标签 名称
            terms: terms.data, // 侧边栏
            menus: ctx.state.menus // 菜单
        })
    },
    /** 关于 */
    async about(ctx, next) {
        let [terms] = await Promise.all([
            post.terms()
        ])
        // console.log()
        await ctx.render('about', {
            blog: blogConfig,
            terms: terms.data, // 侧边栏
            menus: ctx.state.menus // 菜单
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