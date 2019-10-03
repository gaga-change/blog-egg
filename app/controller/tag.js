'use strict';

const BaseController = require('../core/base-controller');

class TagController extends BaseController {
  constructor(...args) {
    super('Tag', ...args);
  }
}

module.exports = TagController;
