'use strict';

module.exports = () => {
  return async function admin(ctx, next) {
    const admin = ctx.session.user;
    if (admin) {
      return next();
    }
    ctx.body = { login: true };
    return;
  };
};
