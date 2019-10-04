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
    categories: { type: Array, default: [] }, // 目录
    id: { type: Number, default: 0 }, // 文档ID值
    date: { type: Date, default: Date.now }, // 创建时间
    // state: { type: Number, default: TYPE.PUBLISH }, // 状态 [发布,草稿,私密,移除]
    intro: { type: String, default: '', trim: true }, // 描述
    markdown: { type: String, default: '' }, // 源文件内容
  }, {
    timestamps: true,
  });

  return mongoose.model('Post', PostSchema, 'blog_post');
};

