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
