'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class UserController extends Controller {
  /**
   * 查询用户数量
   */
  async userTotal() {
    const { ctx } = this;
    const users = await ctx.service.user.findAll();
    this.ctx.body = { total: users.length };
  }
}

module.exports = UserController;
