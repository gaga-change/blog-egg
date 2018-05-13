const router = require('koa-router')()
const fs = require('fs')
const path = require('path')

router.get('/test', async (ctx, next) => {
    ctx.body = 'test'
})

module.exports = router.routes()