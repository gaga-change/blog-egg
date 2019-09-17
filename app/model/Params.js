'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;

  const ParamsSchema = new Schema({
    name: { type: String, default: '', trim: true }, // 名称
    value: { type: Map, of: String }, // 键值对
  }, {
    timestamps: true,
  });

  return mongoose.model('Params', ParamsSchema, 'blog_params');
};
