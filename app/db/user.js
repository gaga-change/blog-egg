const User = require('../models/user_schema')

/**
 * 获取所有用户
 */
exports.findALl = () => {
    return User.findAll()
}