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
      defaultIndexSort: { releaseDate: -1 },
      defaultIndexSelect: '-markdown -content -history',
    }, ...args);
  }

  /** 增加点击量 */
  async autoAddReadTime() {
    const { ctx } = this;
    const { Post } = ctx.model;
    const { id } = ctx.params;
    await Post.updateOne({ _id: id }, { $inc: { readTime: 1 } });
    this.success(null, 204);
  }

  /** 推送seo */
  async pushBaiduSearch() {
    const { ctx, app, config } = this;
    const { id } = ctx.params;
    ctx.assert(config.baiduSearchPushUrl, '百度主动提交地址未配置！');
    const result = await app.curl(config.baiduSearchPushUrl, {
      method: 'post',
      dataType: 'json',
      contentType: 'text',
      data: `https://www.yanjd.top/archives/${id}`,
    });
    ctx.body = result;
  }
}

module.exports = PostController;
