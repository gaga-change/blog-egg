const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const pages = require('./pages')
const user = require('./user')

router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
})
router.get('/', pages.home) // 主页
router.get('/archives/:id', pages.detail) // 详情页

router.get('/api/users', user.findUser) // 获取用户
router.post('/api/user', user.userSave) // 获取用户

module.exports = router.routes()