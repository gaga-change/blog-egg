const only = require('only')
const Post = require('../models/post_schema')
const parsePost = require('../lib/parse_post')

module.exports = {
    /**
     * 存储新文章
     * @param {String} content MD文档文本
     */
    async createPost(content) {
        let ret = parsePost(content)
        let post = ret.post
        if (!post.title) {
            return { err: '需要一个标题' }
        } else if (!post.id || !Number(post.id)) {
            return { err: '需要一个ID' }
        }
        let findPost = await Post.findOne({ id: post.id })
        if (findPost) { // 已存在存储
            return { err: 'ID冲突' }
        }
        let newPost = new Post(only(post, 'content title tags categories id date intro'))
        await newPost.save()
        return { post: newPost }
    },
    /**
     * 获取所有文章
     */
    async findAll() {
        let posts = await Post._findAll()
        return { posts }
    },
    /**
     * 获取指定文章
     * @param {String} id 文章id，获取_id
     */
    async findOne(id) {
        let key = new String(id + '').length == 24 ? '_id' : 'id'
        let obj = {}
        obj[key] = id
        let post = await Post.findOne(obj)
        return { post }
    }
}