
const user = require('../db/user')

/**
 * 获取所有用户
 */
exports.findUser = async (ctx, next) => {
    let users = await user.findALl()
    ctx.body = { data: users }
}

/**
 * 存储用户
 */
exports.userSave = async (ctx, next) => {
    let body = ctx.request.body
    if (!body.username) ctx.throw(400, 'username required')
    if (!body.password) ctx.throw(400, 'password required')
    let users = await user.findALl()
    if (users.length > 0) {
        return ctx.body = {err: '已存在管理员，暂未开放多用户模式'}
    }    
    let ret = await user.userCreate(body.username, body.password)
    ctx.session.user = ret.user
    ctx.body = { data: ret.user, err: ret.err }
}

/**
 * 登入
 */
exports.login = async (ctx, next) => {
    let body = ctx.request.body
    if (!body.username) ctx.throw(400, 'username required')
    if (!body.password) ctx.throw(400, 'password required')
    let ret = await user.passwordCheck(body.username, body.password)
    ctx.session.user = ret.user
    ctx.body = { data: ret.user, err: ret.err }
}

/**
 * 获取当前登入用户
 */
exports.user = async (ctx, next) => {
    let user = ctx.session.user
    ctx.body = { data: user }
}

/**
 * 退出登入
 */
exports.logout = async (ctx) => {
    ctx.session = null
    ctx.body = {}
}