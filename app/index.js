
const Koa = require('koa')
const logger = require('koa-logger')
const views = require('koa-views')
const koaBody = require('koa-body')
const mount = require('koa-mount')
const path = require('path')
const staticCache = require('koa-static-cache')
const mongoose = require('mongoose')
const session = require('koa-session')
const api = require('./api')
const render = require('./lib/render')
const parse = require('./parse')

mongoose.connect('mongodb://dsh.junn.top:27017/test')
const db = mongoose.connection;
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}

// parse() // 解析post目录下的md文件
const app = module.exports = new Koa()
app.keys = ['junn secret 4']

app.use(koaBody({ jsonLimit: '10kb' })) // body解析
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

app.use(render) // 模板引擎
app.use(session(CONFIG, app)) // session
app.use(api) // api & 页面
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
    // we're connected!
    console.log('connect')
    app.listen(9876, () => {
        console.log(9876)
    })
})