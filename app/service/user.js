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
  async findALl() {
    await this.User._findAll();
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
    console.log('...', username);
    if (user && user.authenticate(password)) {
      return { user: this.ctx.only(user, 'username _id') };
    } else if (user) {
      return { err: '密码错误' };
    }
    return { err: '用户名不存在' };

  }
}

module.exports = UserService;
