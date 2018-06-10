
const mongoose = require('mongoose')
const Schema = mongoose.Schema

// 存储相关参数信息
const ParamsSchema = new Schema({
    name: String, // 变量名唯一
    value: { // 键值对
        type: Map,
        of: String
    }

})


module.exports = mongoose.model('Params', ParamsSchema)
