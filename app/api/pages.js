
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
            blog: ctx.state.site,
            terms: terms.data, // 侧边栏
            admin: !!ctx.session.user, // 权限
            menus: ctx.state.menus // 菜单
        })
    },
    /** 归档 */
    async archives(ctx, next) {
        let title = '归档'
        let criteria = {}
        let tag = ctx.params.tag
        let category = ctx.params.category
        if (tag) criteria.tags = decodeURI(tag)
        if (category) criteria.categories = decodeURI(category)
        if (tag || category) title = tag || category
        let termName = criteria.tags || criteria.categories
        let [terms, archives] = await Promise.all([
            post.terms(),
            post.archives(criteria)
        ])
        await ctx.render('archives', {
            title, // 标题
            data: archives.data,
            blog: ctx.state.site,
            termName, // 分类目录或标签 名称
            terms: terms.data, // 侧边栏
            menus: ctx.state.menus // 菜单
        })
    },
    /** 关于 */
    async about(ctx, next) {
        let title = '关于'
        let [terms] = await Promise.all([
            post.terms()
        ])
        await ctx.render('about', {
            title,
            blog: ctx.state.site,
            terms: terms.data, // 侧边栏
            menus: ctx.state.menus // 菜单
        })
    },
    /** 详情页 */
    async detail(ctx, next) {
        let u = !!ctx.session.user
        let id = ctx.params.id
        if (!Number(id)) return next()
        let [ret, terms] = await Promise.all([
            post.findOne(id),
            post.terms()
        ])
        let p = ret.post
        if (!p) {
            return ctx.response.redirect('/')
        }
        let title = p.title
        return await ctx.render('detail', {
            title,
            post: p,
            terms: terms.data,
            blog: ctx.state.site,
            admin: u
        })
    }
}