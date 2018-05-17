
const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const koaBody = require('koa-body')
const mount = require('koa-mount')
const path = require('path')
const staticCache = require('koa-static-cache')
const mongoose = require('mongoose')
const api = require('./api')
const render = require('./lib/render')
const parse = require('./parse')

mongoose.connect('mongodb://localhost/test')
const db = mongoose.connection;

parse() // 解析post目录下的md文件

const app = module.exports = new Koa()

app.use(koaBody()) // body解析
app.use(logger()) // 日志
// 静态资源
app.use(staticCache(path.resolve(__dirname, '../publish'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
}))
// json资源
app.use(mount('/json', staticCache(path.resolve(__dirname, '../json'), {
    maxAge: 365 * 24 * 60 * 60,
    gzip: true,
})))
// 模板引擎
app.use(render)

app.use(api)

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
    // we're connected!
    console.log('connect')
    app.listen(9876, () => {
        console.log(9876)
    })
})