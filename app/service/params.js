'use strict';

const Service = require('egg').Service;

class ParamsService extends Service {

  get Params() {
    return this.ctx.model.Params;
  }

  async params() {
    const { ctx } = this;
    let obj = await this.Params.findOne({ name: 'post' }); // 获取post相关信息
    if (!obj) {
      const postParams = new ctx.model.Params({ name: 'post', value: {} }); // 初始化配置信息
      let maxPost = await this.Params.find() // 获取最大id的文章
        .select('id')
        .sort({ id: -1 })
        .limit(1)
        .skip(0);
      maxPost = maxPost[0];
      postParams.value.set('id', maxPost ? maxPost.id : 0);
      obj = await postParams.save();
    }
    return obj;
  }

  /**
   * 站点配置信息
   */
  async siteInit() {
    const siteParams = new this.Params({
      name: 'site', value: {
        header: '严俊东', // 头部标题
        subhead: '严俊东个人博客', // 副标题
        description: '严俊东的个人博客。技术包括但不限于JavaScript、NodeJS、CSS3、HTML以及各类编程开发等相关内容。邮箱gaga_change@qq.com，微信号gaga_change。',
        keywords: '严俊东,严俊东个人博客,严俊东博客',
        version: process.env.MY_BLOG_STATIC_VERSION || '3.1.4',
      },
    });
    return await siteParams.save();
  }

  async getSite() {
    let siteParams = await this.Params.findOne({ name: 'site' }); // 获取站点相关信息
    if (!siteParams) {
      siteParams = await this.siteInit(); // 若无则初始化
    }
    return siteParams;
  }

  /**
   * 获取站点配置信息
   */
  async getParamsSite() {
    const siteParams = await this.getSite();
    const site = {};
    for (const [ k, v ] of siteParams.value) {
      site[k] = v;
    }
    return {
      data: site,
    };
  }
  /**
   * 存储站点信息
   * @param {Object} site 站点信息
   */
  async setParamsSite(site) {
    const siteParams = await this.getSite();
    for (const key in site) {
      siteParams.value.set(key, site[key]);
    }
    await siteParams.save();
    const newSite = {};
    for (const [ k, v ] of siteParams.value) {
      newSite[k] = v;
    }
    return { data: newSite };
  }

}

module.exports = ParamsService;
