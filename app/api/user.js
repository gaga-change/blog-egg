
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
    if (!body.username) ctx.throw(400, 'username required');
    if (!body.password) ctx.throw(400, 'password required');
    let u = await user.userSave(body.username, body.password)
    ctx.body = { data: u.user, err: u.err }
}