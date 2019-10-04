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
   * 登录
   */
  async login() {
    const { ctx, User } = this;
    const { body } = ctx.request;
    const findUser = await User.findOne({ username: body.username });

    ctx.assert(findUser, '用户名不存在', 400);
    ctx.assert(findUser.authenticate(body.password), '密码错误', 400);
    return findUser;
  }

  /**
   * 注册
   */
  async registry() {
    const { ctx, User } = this;
    const { body } = ctx.request;
    const user = new User(body);

    return await user.save();
  }
}

module.exports = UserService;
