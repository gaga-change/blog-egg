'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class UserController extends Controller {
  /**
   * 获取所有用户
   */
  async findUser() {
    const { ctx, service } = this;
    const users = await service.user.findALl();
    ctx.body = { data: users };
  }

  /**
   * 存储用户
   */
  async userSave() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!body.username) ctx.throw(400, 'username required');
    if (!body.password) ctx.throw(400, 'password required');
    const users = await service.user.findALl();
    if (users.length > 0) {
      ctx.body = { err: '已存在管理员，暂未开放多用户模式' };
    } else {
      const ret = await service.user.userCreate(body.username, body.password);
      ctx.session.user = ret.user;
      ctx.body = { data: ret.user, err: ret.err };
    }
  }

  /**
   * 登入
   */
  async login() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    if (!body.username) ctx.throw(400, 'username required');
    if (!body.password) ctx.throw(400, 'password required');
    const ret = await service.user.passwordCheck(body.username, body.password);
    ctx.session.user = ret.user;
    ctx.body = { data: ret.user, err: ret.err };
  }

  /**
   * 获取当前登入用户
   */
  async user() {
    const { ctx } = this;
    const user = ctx.session.user;
    ctx.body = { data: user };
  }

  /**
   * 退出登入
   */
  async logout() {
    const { ctx } = this;
    ctx.session = null;
    ctx.body = {};
  }
}

module.exports = UserController;
