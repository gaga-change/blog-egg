'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class HomeController extends Controller {
  async index() {
    const { ctx, service } = this;
    const page = ctx.params.page || 1;
    const pageSize = 10;
    const [ ret, terms ] = await Promise.all([
      service.post.findAll({
        page,
        pageSize,
      }),
      service.post.terms(),
    ]);
    const data = ret.data;
    await ctx.render('index', {
      data,
      blog: ctx.state.site,
      terms: terms.data, // 侧边栏
      admin: !!ctx.session.user, // 权限
      menus: ctx.state.menus, // 菜单
    });
  }
  /** 归档 */
  async archives() {
    const { ctx, service } = this;

    let title = '归档';
    const criteria = {};
    const tag = ctx.params.tag;
    const category = ctx.params.category;
    if (tag) criteria.tags = decodeURI(tag);
    if (category) criteria.categories = decodeURI(category);
    if (tag || category) title = tag || category;
    const termName = criteria.tags || criteria.categories;
    const [ terms, archives ] = await Promise.all([
      service.post.terms(),
      service.post.archives(criteria),
    ]);
    await ctx.render('archives', {
      title, // 标题
      data: archives.data,
      blog: ctx.state.site,
      termName, // 分类目录或标签 名称
      terms: terms.data, // 侧边栏
      menus: ctx.state.menus, // 菜单
    });
  }
  /** 关于 */
  async about() {
    const { ctx, service } = this;

    const title = '关于';
    const [ terms ] = await Promise.all([
      service.post.terms(),
    ]);
    await ctx.render('about', {
      title,
      blog: ctx.state.site,
      terms: terms.data, // 侧边栏
      menus: ctx.state.menus, // 菜单
    });
  }
  /** 详情页 */
  async detail() {
    const { ctx, service } = this;
    const u = !!ctx.session.user;
    const id = ctx.params.id;
    const [ ret, terms ] = await Promise.all([
      service.post.findOne(id),
      service.post.terms(),
    ]);
    const p = ret.post;
    if (!p) {
      return ctx.response.redirect('/');
    }
    const title = p.title;
    return await ctx.render('detail', {
      title,
      post: p,
      terms: terms.data,
      blog: ctx.state.site,
      admin: u,
    });
  }
}

module.exports = HomeController;
