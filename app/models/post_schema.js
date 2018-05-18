
const mongoose = require('mongoose')
const only = require('only')

const Schema = mongoose.Schema

/**
 * Post Schema
 */
const PostSchema = new Schema({
    content: { type: String, default: '', trim: true }, // 主要内容
    title: { type: String, default: '', trim: true }, // 标题
    tags: { type: Array, default: [] }, // 标签
    categories: { type: Array, default: [] }, // 目录 
    id: { type: Number, default: 0 }, // 文档ID值
    date: { type: Date, default: Date.now }, // 创建时间
    intro: { type: String, default: '', trim: true } // 描述
})

// 验证是否存在
const validatePresenceOf = value => value && value.length

/** 参数验证 */
PostSchema.path('title').validate(v => v.length, '标题不能为空')

/** 实例方法 */
PostSchema.methods = {

}

/** 静态方法 */
PostSchema.statics = {

}

module.exports = mongoose.model('Post', PostSchema)
