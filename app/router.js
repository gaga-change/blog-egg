'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  const page = app.middleware.page(app.config.site, app.config.menus);
  const admin = app.middleware.admin();

  router.get('/', page, controller.home.index);
  router.get('/page/:page', page, controller.home.index); // 主页
  router.get('/archives', page, controller.home.archives); // 归档
  router.get('/about', page, controller.home.about); // 关于
  router.get('/archives/:id', page, controller.home.detail); // 详情页
  router.get('/categories/:category', page, controller.home.archives); // 按分类搜索
  router.get('/tags/:tag', page, controller.home.archives); // 按标签搜索

  // ## 用户
  router.get('/api/users', controller.user.findUser); // 获取用户
  router.post('/api/user', controller.user.userSave); // 注册用户
  router.get('/api/user', controller.user.user); // 获取当前登入用户
  router.post('/api/user/login', controller.user.login); // 用户登录
  router.get('/api/user/logout', controller.user.logout); // 用户退出登录

  // ## 文章
  router.get('/api/posts/:id', controller.post.find); // 获取指定ID文章
  router.get('/api/posts', controller.post.findAll); // 获取所有
  router.post('/api/posts', admin, controller.post.create); // 创建
  router.delete('/api/posts/:id', admin, controller.post.delete); // 删除文章
  router.put('/api/posts/:id', admin, controller.post.modify); // 修改

  // ## 站点信息
  router.get('/api/site', controller.params.getSite); // 获取站点信息
  router.post('/api/site', controller.params.setSite); // 配置站点信息

  // ## 其它
  router.get('/api/terms', controller.post.terms); // 标签、分类，附加最近文章
  router.get('/api/archives', controller.post.archives); // 归档
};
