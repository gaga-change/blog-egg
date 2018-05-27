const only = require('only')
const Post = require('../models/post_schema')
const parsePost = require('../lib/parse_post')

function postFilter(content) {
    let ret = parsePost(content)
    if (ret.err) return ret
    let post = ret.post
    if (!post.title) {
        ret.err = '需要一个标题'
    } else if (!post.id || !Number(post.id)) {
        ret.err = '需要一个ID'
    }
    return ret
}

module.exports = {
    /** 获取标签&分类目录，附加最近文章 */
    async terms() {
        return Promise.all([
            Post.distinct('tags'),
            Post.distinct('categories'),
            Post._findAll({ page: 1, pageSize: 5, select: 'title id' })
        ]).then(rets => ({
            data: {
                tags: rets[0],
                categories: rets[1],
                posts: rets[2]
            }
        }))
    },
    /**
     * 存储新文章
     * @param {String} content MD文档文本
     */
    async createPost(content) {
        let ret = postFilter(content)
        if (ret.err) return { err: ret.err }
        let post = ret.post
        let findPost = await Post.findOne({ id: post.id })
        if (findPost) { // 已存在文章
            return { err: 'ID冲突' }
        }
        post.markdown = content // 源文档存储
        let newPost = new Post(only(post, 'content title tags categories id date intro markdown'))
        await newPost.save()
        return { post: only(newPost, 'title tags categories id date intro') }
    },
    async delete(id) {
        let key = new String(id + '').length == 24 ? '_id' : 'id'
        let obj = {}
        obj[key] = id
        let msg = await Post.deleteOne(obj)
        return { msg }
    },
    /** 归档 */
    async archives() {
        let posts = await Post.find({}).select('title id date').sort({ date: -1 })
        let archives = {}
        posts.forEach(item => {
            let key = item.date.getFullYear()
            archives[key] = archives[key] || []
            archives[key].push(item)
        })
        return { data: archives }
    },
    /**
     * 获取所有文章
     */
    async findAll({ page, pageSize, tag, category } = {}) {
        page = Number(page)
        let criteria = {}
        if (tag) criteria.tags = tag
        if (category) criteria.categories = category
        let [posts, count] = await Promise.all([
            Post._findAll({
                page,
                pageSize,
                criteria
            }),
            Post.count(criteria)
        ])
        return { data: { count, page, pageSize, list: posts, pages: Math.ceil(count / pageSize) } }
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
    },
    /**
     * 修改文章
     * @param {String} content MD格式文本
     */
    async mondify(content) {
        let ret = postFilter(content)
        if (ret.err) return { err: ret.err }
        let post = ret.post
        let findPost = await Post.findOne({ id: post.id })
        if (!findPost) { // 文章不存在
            return { err: '文章不存在' }
        }
        Object.keys(post).forEach(key => {
            if (findPost[key]) {
                findPost[key] = post[key]
            }
        })
        await findPost.save()
        return { post: only(findPost, 'title tags categories id date intro') }
    }
}