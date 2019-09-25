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

  /**
   * 创建新用户
   * @param {String} username 用户名
   * @param {String} password 密码
   */
  async userCreate(username, password) {
    let user = await this.User.findOne({ username });
    if (user) {
      return { err: '用户已存在' };
    }
    user = new this.User({ username, password }).save();
    return { user: this.ctx.only(user, 'username _id') };
  }

  /**
   * 登入校验
   * @param {String} username 用户名
   * @param {String} password 密码
   */
  async passwordCheck(username, password) {
    const user = await this.User.findOne({ username });
    this.ctx.assert(user, 400, '用户名不存在');
    this.ctx.assert(user.authenticate(password), 400, '密码错误');
    return { user: this.ctx.only(user, 'username _id') };
  }
}

module.exports = UserService;
