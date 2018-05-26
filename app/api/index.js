const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const pages = require('./pages')
const user = require('./user')
const post = require('./post')
const tools = require('./tools')
const admin = tools.admin
router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
})
router.get('/', pages.home) // 主页
router.get('/archives/:id', pages.detail) // 详情页
router.get('/login', pages.login) // 登入页
router.get('/writer', pages.writer) // 编辑页

// ## 用户
router.get('/api/users', user.findUser) // 获取用户
router.post('/api/user', user.userSave) // 注册用户
router.get('/api/user', user.user) // 获取当前登入用户
router.post('/api/user/login', user.login) // 用户登入
router.get('/api/user/logout', user.logout) // 用户退出登入

// ## 文章
router.post('/api/post', admin, post.create) // 创建
router.get('/api/post', post.find) // 获取 
router.get('/api/posts', post.findAll) // 获取所有
router.put('/api/remove',admin, post.remove) // 移动到垃圾箱
router.delete('/api/clear',admin, post.delete) // 清空垃圾箱
router.put('/api/post', admin, post.modify) // 修改
router.get('/api/tags', post.tags) // 修改

// #工具
router.get('/api/restore',admin, tools.turnPost) // 文件转存到数据库

// 重定向到首页
router.use(async ctx => {
    return ctx.response.redirect('/')
})
module.exports = router.routes()