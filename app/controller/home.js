'use strict';

const Controller = require('egg').Controller;

/**
 * @param {Egg.Application} app - egg application
 */
class HomeController extends Controller {
  async index() {
    this.ctx.body = 'blog api';
  }
}

module.exports = HomeController;
