'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PostSchema = new Schema({
    content: { type: String, default: '', trim: true }, // 主要内容
    title: { type: String, default: '', trim: true }, // 标题
    tags: { type: Array, default: [] }, // 标签
    category: { type: Schema.Types.ObjectId, ref: 'Category' }, // 目录
    id: { type: Number, default: 0 }, // 文档ID值
    date: { type: Date, default: Date.now }, // 创建时间
    type: { type: Number, default: 0 }, // 状态 [草稿：0，发布：1，历史：2， 废弃：3]
    history: { type: Array, default: [] }, // 历史版本
    intro: { type: String, default: '', trim: true }, // 描述
    markdown: { type: String, default: '' }, // 源文件内容
  }, {
    timestamps: true,
  });

  return mongoose.model('Post', PostSchema, 'blog_post');
};

