
const mongoose = require('mongoose')
const only = require('only')

const Schema = mongoose.Schema

const TYPE = {
    PUBLISH: 'publist', // 发布状态
    DRAFT: 'draft', // 草稿
    PRIVATE: 'private', // 私密状态
    REMOVE: 'remove', // 移除状态
}

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
    // state: { type: Number, default: TYPE.PUBLISH }, // 状态 [发布,草稿,私密,移除]
    intro: { type: String, default: '', trim: true }, // 描述
    markdown: { type: String, default: '' }, // 源文件内容
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
    _findOne(opt) {
        return this._findOne(opt.query).select('-markdown')
    },
    /** 获取所有文章 */
    _findAll() {
        return this.find({}).select('-content -markdown').sort({date: -1})
    },
}

module.exports = mongoose.model('Post', PostSchema)
