'use strict';

const BaseController = require('../core/base_controller');

class CategoryController extends BaseController {
  constructor(...args) {
    super('Category', ...args);
  }
}

module.exports = CategoryController;
