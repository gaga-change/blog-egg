
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ParamsSchema = new Schema({
    name: String, // 变量名唯一
    value: Schema.Types.Mixed
})


module.exports = mongoose.model('Params', ParamsSchema)
