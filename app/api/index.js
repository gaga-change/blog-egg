const router = require('koa-router')()
const fs = require('fs')
const path = require('path')
const pages = require('./pages')

router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
})
router.get('/', pages.home)
router.get('/archives/:id', pages.detail)

module.exports = router.routes()