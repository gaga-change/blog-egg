'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const UserSchema = new Schema({
    name: { type: String, default: '', trim: true }, // 名称
    alias: { type: String, default: '', trim: true }, // 别名【全字母、小写，用户url】
    remark: { type: String, default: '', trim: true }, // 备注
  }, {
    timestamps: true,
  });

  return mongoose.model('Category', UserSchema, 'blog_category');
};
