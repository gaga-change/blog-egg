const User = require('../models/user_schema')

/**
 * 获取所有用户
 */
exports.findALl = () => {
    return User._findAll()
}

/**
 * 创建新用户
 */
exports.userSave = async (username, password) => {
    let user = await User.findOne({ username })
    if (user) {
        return { err: '用户已存在' }
    } else {
        return { user: await new User({ username, password }).save() }
    }
}