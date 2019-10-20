'use strict';

const Controller = require('egg').Controller;

class BaseController extends Controller {

  constructor(options, ...args) {
    super(...args);
    let modelName;
    if (typeof options === 'string') {
      modelName = options;
      this._options = {};
    } else {
      modelName = options.modelName;
      this._options = options;
    }
    this.Model = this.ctx.model[modelName];
  }

  /**
   * 返回内容包装
   * @param {Object} data 数据
   * @param {String} errMsg 异常消息
   * @param {Number} code 状态码
   */
  res(data, errMsg, code) {
    this.ctx.status = code;
    if (errMsg) {
      this.ctx.body = errMsg;
    } else {
      this.ctx.body = data;
    }
  }

  error(errMsg, code) {
    this.res(null, errMsg, code || this.config.statusCode.BAD_REQUEST);
  }

  success(data, code) {
    this.res(data, null, code || this.config.statusCode.SUCCESS);
  }

  async index() {
    const { ctx } = this;
    const { populates = [], defaultIndexSelect, defaultIndexSort = { createdAt: -1 } } = this._options;
    const query = ctx.query;
    const pageSize = Number(ctx.query.pageSize) || 20;
    const page = Number(ctx.query.pageNum) || 1;
    const params = { ...query };
    const { select } = params;
    delete params.select;
    delete params.pageSize;
    delete params.pageNum;
    const mongoQuery = this.Model.find(params)
      .sort(defaultIndexSort)
      .limit(pageSize)
      .skip((page - 1) * pageSize);

    if (defaultIndexSelect || select) {
      mongoQuery.select(select || defaultIndexSelect);
    }
    populates.forEach(v => mongoQuery.populate(v));
    const list = await mongoQuery;
    this.success({
      total: await this.Model.countDocuments(params),
      list,
    });
  }

  async show() {
    const { ctx, config } = this;
    const { id } = ctx.params;
    const { select } = ctx.query;
    const mongoQuery = this.Model.findById(id);
    if (select) {
      mongoQuery.select(select);
    }
    const item = await mongoQuery;
    ctx.assert(item, config.statusCode.NO_FOUND, '资源不存在');
    this.success(item);
  }

  async create() {
    const { ctx, config } = this;
    let item = ctx.request.body;

    item = new this.Model(item);
    this.success(await item.save(), config.statusCode.CREATE);
  }

  async destroy() {
    const { ctx, config } = this;
    const { id } = ctx.params;

    const temp = await this.Model.deleteOne({ _id: id });
    ctx.assert(temp.deletedCount === 1, config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, config.statusCode.NO_CONENT);
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.params;
    const item = ctx.request.body;

    const temp = await this.Model.updateOne({ _id: id }, item);
    ctx.assert(temp.nModified === 1, this.config.statusCode.NO_FOUND, '资源不存在');
    this.success(null, this.config.statusCode.NO_CONENT);
  }
}

module.exports = BaseController;
