const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const pages = require('./pages')
const user = require('./user')
const post = require('./post')
const tools = require('./tools')

const admin = tools.admin // 权限校验
const page = tools.page // 展示页面中间件

router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
})

router.get('/', page, pages.home) // 主页
router.get('/page/:page', page, pages.home) // 主页
router.get('/archives', page, pages.archives) // 归档
router.get('/about', page, pages.about) // 关于
router.get('/archives/:id', page, pages.detail) // 详情页
router.get('/categories/:category', page, pages.archives) // 按分类搜索
router.get('/tags/:tag', page, pages.archives) // 按标签搜索
router.get('/login', pages.login) // 登入页
router.get('/writer', pages.writer) // 编辑页

// ## 用户
router.get('/api/users', user.findUser) // 获取用户
router.post('/api/user', user.userSave) // 注册用户
router.get('/api/user', user.user) // 获取当前登入用户
router.post('/api/user/login', user.login) // 用户登入
router.get('/api/user/logout', user.logout) // 用户退出登入

// ## 文章
router.post('/api/posts', admin, tools.params, post.create) // 创建
router.get('/api/posts/:id',post.bind, post.find) // 获取 
router.get('/api/posts', post.findAll) // 获取所有
router.delete('/api/clear', admin, post.delete) // 清空垃圾箱
router.put('/api/post', admin, post.modify) // 修改
router.get('/api/terms', post.terms) // 标签、分类，附加最近文章
router.get('/api/archives', post.archives) // 标签、分类，附加最近文章

// #工具
router.get('/api/restore', admin, tools.turnPost) // 文件转存到数据库

// 重定向到首页
router.use(async ctx => {
    return ctx.response.redirect('/')
})
module.exports = router.routes()