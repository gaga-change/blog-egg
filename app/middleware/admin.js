'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  return async function admin(ctx, next) {
    const { config } = app;
    const admin = ctx.session.user;
    if (admin) {
      return next();
    }
    ctx.status = config.statusCode.UNAUTHORIZED;
    ctx.body = { login: true, message: '用户未登录' };
    return;
  };
};
