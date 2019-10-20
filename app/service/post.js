'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  constructor(...args) {
    super(...args);
    this.Post = this.ctx.model.Post;
  }
}

module.exports = PostService;
