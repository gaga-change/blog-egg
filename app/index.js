
const Koa = require('koa')
const logger = require('koa-logger')
const router = require('koa-router')()
const views = require('koa-views')
const koaBody = require('koa-body')
const path = require('path')
const staticCache = require('koa-static-cache')

const parse = require('./parse')

parse() // 解析post目录下的md文件

const app = module.exports = new Koa()

app.use(koaBody())
app.use(logger())
app.use(staticCache(path.resolve(__dirname, '../publish'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
}))
app.use(views(path.resolve(__dirname, '../page'), {
    map: { html: 'ejs' }
}))

router.get('/', home)
app.use(router.routes())

async function home(ctx) {
    await ctx.render('index')
}

if (!module.parent) app.listen(8080, () => {
    console.log(8080)
})
