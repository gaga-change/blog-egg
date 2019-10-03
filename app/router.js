'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const admin = app.middleware.admin(app);

  router.get('/', controller.home.index); // 首页

  // ## 用户
  router.get('/api/users/total', controller.user.userTotal); // 获取用户数量

  // ## auth
  router.post('/api/auth/login', controller.auth.login); // 登录 | 注册
  router.get('/api/auth/current', controller.auth.current); // 当前用户
  router.get('/api/auth/logout', controller.auth.logout); // 退出登录

  // ## 标签
  router.get('/api/tags', controller.tag.index);
  router.get('/api/tags/:id', controller.tag.show);
  router.post('/api/tags', admin, controller.tag.create);
  router.put('/api/tags/:id', admin, controller.tag.update);
  router.delete('/api/tags/:id', admin, controller.tag.destroy);

  // ## 分类
  router.get('/api/categories', controller.category.index);
  router.get('/api/categories/:id', controller.tcategoryag.show);
  router.post('/api/categories', admin, controller.category.create);
  router.put('/api/categories/:id', admin, controller.category.update);
  router.delete('/api/categories/:id', admin, controller.category.destroy);

  // ## 文章
  router.get('/api/posts', controller.post.index);
  router.get('/api/posts/archives', controller.post.archives); // 归档
  router.get('/api/posts/:id', controller.post.show);
  router.post('/api/posts', admin, controller.post.create);
  router.put('/api/posts/:id', admin, controller.post.update);
  router.delete('/api/posts/:id', admin, controller.post.destroy);

};
