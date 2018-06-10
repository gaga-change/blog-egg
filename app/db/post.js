const only = require('only')
const Post = require('../models/post_schema')
const parsePost = require('../lib/parse_post')
const md = require('markdown-it')()

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
    /**
     * 根据ID获取文章
     * @param {String} id 
     */
    async findById(id) {
        return await Post.findOne({id})
    },
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
    async createPost(obj, params) {
        try {
            let postObj = new Post(obj)
            postObj.id = Number(params.value.get('id')) + 1 // 手动附上ID值
            postObj.content = md.render(postObj.markdown) // 解析 markdown
            if (!postObj.intro && postObj.content) { // 自动附加简介
                postObj.intro = postObj.content.replace(/(\s|<[^>]+>)+/ig, ' ').substr(0, 56).trim() // 简介
            }
            postObj = await postObj.save()
            params.value.set('id', postObj.id) // 更新配置信息
            return { data: postObj }
        } catch (err) {
            return { err }
        }
    },
    /**
     * 根据ID删除文章
     * @param {String} id 
     */
    async delete(id) {
        let key = new String(id + '').length == 24 ? '_id' : 'id'
        let obj = {}
        obj[key] = id
        let msg = await Post.deleteOne(obj)
        return { msg }
    },
    /** 归档 */
    async archives(criteria = {}) {
        let posts = await Post.find(criteria).select('title id date').sort({ date: -1 })
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