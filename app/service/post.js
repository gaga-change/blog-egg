'use strict';

const md = require('markdown-it')();
const Service = require('egg').Service;

class PostService extends Service {
  constructor(...args) {
    super(...args);
    this.Post = this.ctx.model.Post;
  }

  async bind() {
    const { ctx, service } = this;
    const id = ctx.params.id;
    const post = await service.post.findById(id);
    ctx.assert(post, 404, '没有该文章');
    return post;
  }

  /**
   * 从请求体中提取并处理合适字段
   * @param {Object} body 请求体
   */
  turnPost(body) {
    const post = this.ctx.only(body, 'title categories tags date markdown intro');
    if (post.tags) post.tags = post.tags.split(',');
    if (post.categories) post.categories = post.categories.split(',');
    return post;
  }

  /**
   * 根据ID获取文章
   * @param {String} id 文章ID
   */
  async findById(id) {
    return await this.Post.findOne({ id });
  }
  /** 获取标签&分类目录，附加最近文章 */
  async terms() {
    return Promise.all([
      this.Post.distinct('tags'),
      this.Post.distinct('categories'),
      this.Post._findAll({ page: 1, pageSize: 5, select: 'title id' }),
    ]).then(rets => ({
      data: {
        tags: rets[0],
        categories: rets[1],
        posts: rets[2],
      },
    }));
  }
  /**
   * 存储新文章
   * @param {Object} obj MD文档文本
   */
  async createPost(obj) {
    const params = await this.service.params.params();
    let postObj = new this.Post(obj);
    postObj.id = Number(params.value.get('id')) + 1; // 手动附上ID值
    postObj.content = md.render(postObj.markdown); // 解析 markdown
    if (!postObj.intro && postObj.content) { // 自动附加简介
      postObj.intro = postObj.content.replace(/(\s|<[^>]+>)+/ig, ' ').substr(0, 56).trim(); // 简介
    }
    postObj = await postObj.save();
    params.value.set('id', postObj.id); // 更新配置信息
    return { data: postObj };
  }
  /**
   * 根据ID删除文章
   * @param {String} id 文章ID
   */
  async delete(id) {
    const key = (id + '').length === 24 ? '_id' : 'id';
    const obj = {};
    obj[key] = id;
    const msg = await this.Post.deleteOne(obj);
    return { msg };
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
    return { data: archives };
  }
  /**
   * 获取所有文章
   * @param {Object} params 筛选条件
   */
  async findAll({ page, pageSize, tag, category } = {}) {
    page = Number(page);
    const criteria = {};
    if (tag) criteria.tags = tag;
    if (category) criteria.categories = category;
    const [ posts, count ] = await Promise.all([
      this.Post._findAll({
        page,
        pageSize,
        criteria,
      }),
      this.Post.count(criteria),
    ]);
    return { data: { count, page, pageSize, list: posts, pages: Math.ceil(count / pageSize) } };
  }
  /**
   * 获取指定文章
   * @param {String} id 文章id，获取_id
   */
  async findOne(id) {
    const key = (id + '').length === 24 ? '_id' : 'id';
    const obj = {};
    obj[key] = id;
    const post = await this.Post.findOne(obj);
    return { post };
  }
}

module.exports = PostService;
