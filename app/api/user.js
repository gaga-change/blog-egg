
const user = require('../db/user')

/**
 * 获取所有用户
 */
exports.findUser = async (ctx, next) => {
    let users = await user.findALl()
    ctx.body = { data: users }
}