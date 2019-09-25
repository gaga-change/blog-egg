'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const admin = app.middleware.admin(app);

  // ## 用户
  router.get('/api/users', admin, controller.user.findUser); // 获取用户
  router.post('/api/user', controller.user.userSave); // 注册用户
  router.get('/api/user', controller.user.user); // 获取当前登入用户
  router.post('/api/user/login', controller.user.login); // 用户登录
  router.get('/api/user/logout', controller.user.logout); // 用户退出登录
  router.post('/api/login/account', controller.user.login); // 用户登录

  // ## 文章
  router.get('/api/posts/:id', controller.post.find); // 获取指定ID文章
  router.get('/api/posts', controller.post.findAll); // 获取所有
  router.post('/api/posts', admin, controller.post.create); // 创建
  router.delete('/api/posts/:id', admin, controller.post.delete); // 删除文章
  router.put('/api/posts/:id', admin, controller.post.modify); // 修改

  // ## 其它
  router.get('/api/terms', controller.post.terms); // 标签、分类，附加最近文章
  router.get('/api/archives', controller.post.archives); // 归档
};
