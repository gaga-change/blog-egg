'use strict';

const BaseController = require('../core/base-controller');

class TagController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'Tag',
      populates: [ 'logos' ],
    }, ...args);
  }
}

module.exports = TagController;
