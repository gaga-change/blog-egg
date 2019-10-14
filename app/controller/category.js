'use strict';

const BaseController = require('../core/base-controller');

class CategoryController extends BaseController {
  constructor(...args) {
    super(
      {
        modelName: 'Category',
        populates: [ 'logos' ],
      }, ...args);
  }
}

module.exports = CategoryController;
