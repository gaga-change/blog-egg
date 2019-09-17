'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class ParamsController extends Controller {
  /**
   * 获取站点信息
   */
  async getSite() {
    const { ctx, service } = this;
    ctx.body = await service.params.getParamsSite();
  }
  /**
   * 存储站点信息
   */
  async setSite() {
    const { ctx, service } = this;
    const site = ctx.only(ctx.request.body, 'header subhead description keywords');
    for (const key in site) {
      if (site[key].length > 100) {
        ctx.body = { err: '长度过长' };
        return;
      }
    }
    ctx.body = await service.params.setParamsSite(site);
  }
}

module.exports = ParamsController;
