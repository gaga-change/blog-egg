'use strict';

const Service = require('egg').Service;

class PostService extends Service {
  constructor(...args) {
    super(...args);
    this.Post = this.ctx.model.Post;
  }

  /**
   * 归档
   * @param {Object} criteria 筛选条件
   */
  async archives(criteria = {}) {
    const posts = await this.Post.find(criteria).select('title id date').sort({ date: -1 });
    const archives = {};
    posts.forEach(item => {
      const key = new Date(item.date).getFullYear() + ' ';
      archives[key] = archives[key] || [];
      archives[key].push(item);
    });
    return archives;
  }
}

module.exports = PostService;
