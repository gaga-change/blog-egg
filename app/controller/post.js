'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class PostController extends Controller {
  /** 创建 */
  async create() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!body.title) ctx.throw(400, 'title required');

    ctx.body = await service.post.createPost(service.post.turnPost(body));
  }
  /** 查询指定文章 */
  async find() {
    const { ctx } = this;
    const post = await this.service.post.bind();
    ctx.body = { data: post };
  }
  /** 查询所有 */
  async findAll() {
    const { ctx, service } = this;
    const ret = await service.post.findAll(ctx.only(ctx.query, 'page pageSize tag category'));
    ctx.body = ret;
  }
  /** 归档 */
  async archives() {
    const { ctx, service } = this;
    ctx.body = await service.post.archives();
  }
  /** 删除文章 */
  async delete() {
    const { ctx } = this;
    const post = await this.service.post.bind();
    const msg = await post.remove();
    ctx.body = { data: msg };
  }
  /** 修改 */
  async modify() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!body.title) ctx.throw(400, 'title required');
    const post = await this.service.post.bind();
    const newPost = service.post.turnPost(body);
    Object.keys(newPost).forEach(key => { // 替换参数
      post[key] = newPost[key];
    });
    const msg = await post.save(); // 保存修改
    ctx.body = { data: msg };
  }
  /** 获取标签 */
  async terms() {
    const { ctx, service } = this;
    const ret = await service.post.terms();
    ctx.body = ret;
  }
}

module.exports = PostController;
