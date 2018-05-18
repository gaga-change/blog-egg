const User = require('../models/user_schema')
const only = require('only')

const SHOW_KEY = 'username _id'

/**
 * 获取所有用户
 */
exports.findALl = () => {
    return User._findAll()
}

/**
 * 创建新用户
 * @param {String} username 用户名
 * @param {String} password 密码
 */
exports.userCreate= async (username, password) => {
    let user = await User.findOne({ username })
    if (user) {
        return { err: '用户已存在' }
    } else {
        let user = await new User({ username, password }).save()
        return { user: only(user, SHOW_KEY) }
    }
}

/**
 * 登入
 * @param {String} username 用户名
 * @param {String} password 密码
 */
exports.passwordCheck = async (username, password) => {
    let user = await User.findOne({ username })
    if (user && user.authenticate(password)) {
        return { user: only(user, SHOW_KEY) }
    } else if (user) {
        return { err: '密码错误' }
    } else {
        return { err: '用户名不存在' }
    }

}
