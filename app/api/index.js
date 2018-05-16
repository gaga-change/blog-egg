const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const pages = require('./pages')
const user = require('./user')

router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
})
router.get('/', pages.home)
router.get('/post/:id', pages.detail)

router.get('/api/users', user.findUser)

module.exports = router.routes()