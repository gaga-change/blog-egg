'use strict';

const BaseController = require('../core/base-controller');

class WebSetController extends BaseController {
  constructor(...args) {
    super({
      modelName: 'WebSet',
    }, ...args);
  }
}

module.exports = WebSetController;
