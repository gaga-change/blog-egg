'use strict';

const BaseController = require('../core/base-controller');

/**
 * @param {Egg.Application} app - egg application
 */
class PostController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'Post',
      populates: [ 'tags', 'category', 'logos' ],
    }, ...args);
  }

  /** 归档 */
  async archives() {
    const { ctx, service } = this;
    ctx.body = await service.post.archives();
  }
}

module.exports = PostController;
