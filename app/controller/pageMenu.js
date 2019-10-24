'use strict';

const BaseController = require('../core/base-controller');

class PageMenuController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'PageMenu',
      defaultIndexSort: { order: -1, createdAt: -1 },
    }, ...args);
  }
}

module.exports = PageMenuController;
