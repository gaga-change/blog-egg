'use strict';

const BaseController = require('../core/base-controller');

/**
 * @param {Egg.Application} app - egg application
 */
class PostController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'Post',
      populates: [
        { path: 'tags', select: '_id name' },
        { path: 'category', select: '_id name' },
        { path: 'logos' }],
      defaultIndexSelect: '-markdown -content -history',
    }, ...args);
  }

  /** 归档 */
  async archives() {
    const { ctx, service } = this;
    ctx.body = await service.post.archives();
  }

  /** 增加点击量 */
  async autoAddReadTime() {
    const { ctx } = this;
    const { Post } = ctx.model;
    const { id } = ctx.params;
    await Post.updateOne({ _id: id }, { $inc: { readTime: 1 } });
    this.success(null, 204);
  }
}

module.exports = PostController;
