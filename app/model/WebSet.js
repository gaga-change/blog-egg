'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const WebSetSchema = new Schema({
    header: { type: String, default: '', trim: true }, // 标题
    subhead: { type: String, default: '', trim: true }, // 副标题
    description: { type: String, default: '', trim: true }, // 描述
    keywords: { type: String, default: '', trim: true }, // 关键词
    appendJsFileUrl: { type: String, default: '', trim: true }, // 额外的js文件url地址
  }, {
    timestamps: true,
  });

  return mongoose.model('WebSet', WebSetSchema, 'blog_web_set');
};
