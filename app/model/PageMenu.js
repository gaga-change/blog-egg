'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const PageMenuSchema = new Schema({
    path: { type: String, default: '', trim: true }, // 路径
    name: { type: String, default: '', trim: true }, // 名称
    icon: { type: String, default: '', trim: true }, // 图标
    sons: [{ type: Schema.Types.ObjectId, ref: 'PageMenu' }], // 子菜单列表
    type: { type: Number, default: 0 }, // 类型： 0是内链，1是外链
    show: { type: Boolean, default: true }, // 是否显示
    order: { type: Number, default: 0, trim: true }, // 优先级
    remark: { type: String, default: '', trim: true }, // 备注
  }, {
    timestamps: true,
  });

  return mongoose.model('PageMenu', PageMenuSchema, 'blog_page_menu');
};
