const only = require('only')
const Post = require('../models/post_schema')
const parsePost = require('../lib/parse_post')

module.exports = {
    /**
     * 存储新文章
     * @param {String} content MD文档文本
     */
    async createPost(content) {
        let post = new Post(only(parsePost(content), 'content title tags categories id date intro'))
        await post.save()
        return { post }
    }
}