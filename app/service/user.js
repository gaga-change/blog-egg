'use strict';

const Service = require('egg').Service;

class UserService extends Service {
  constructor(...args) {
    super(...args);
    this.User = this.ctx.model.User;
  }

  /**
   * 查询所有用户
   */
  async findAll() {
    return await this.User.find({});
  }
}

module.exports = UserService;
