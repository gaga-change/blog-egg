'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class AuthController extends Controller {

  /**
   * 登录/注册
   */
  async login() {
    const { ctx, service } = this;
    const body = ctx.request.body;
    ctx.assert(body.username, '用户名不能为空', 400);
    ctx.assert(body.password, '密码不能为空', 400);
    const users = await service.user.findAll();
    if (users.length) {
      ctx.body = ctx.session.user = await service.user.login();
    } else { // 不存在用户则进行注册操作
      const user = await service.user.registry();
      ctx.body = ctx.session.user = user;
    }
  }

  /**
   * 获取当前用户
   */
  async current() {
    this.ctx.body = this.ctx.session.user;
  }

  /**
   * 退出登录
   */
  async logout() {
    this.ctx.session.user = null;
    this.ctx.body = null;
  }
}

module.exports = AuthController;
