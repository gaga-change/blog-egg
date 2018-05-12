
const Koa = require('koa')
const logger = require('koa-logger')
const router = require('koa-router')()
const koaBody = require('koa-body')
const views = require('koa-views')
const path = require('path')
const parse = require('./parse')

parse() // 解析post目录下的md文件

const app = module.exports = new Koa()

app.use(logger())

app.use(views(path.join(__dirname, '../src'), {
    map: { html: 'ejs' }
}))

app.use(koaBody)
router.get('/', home)
app.use(router.routes())

async function home(ctx) {
    console.log('---')
    await ctx.render('index')
}

if (!module.parent) app.listen(3000, () => {
    console.log(3000)
})
