
/**
 * 初始化 配置信息
 */

const ParamsSchema = require('../models/params_schema')
const PostSchema = require('../models/post_schema')

/**
 * 文章相关配置初始化
 * 1. 文章ID顺序
 */
exports.postInit = async function () {
    let postParams = new ParamsSchema({ name: 'post', value: {} }) // 初始化配置信息
    let maxPost = await PostSchema.find() // 获取最大id的文章
        .select('id')
        .sort({ id: -1 })
        .limit(1)
        .skip(0)
    maxPost = maxPost[0]
    postParams.value.set('id', maxPost ? maxPost.id : 0)
    return await postParams.save()
}

/** 站点配置信息 */
exports.siteInit = async function () {
    let siteParams = new ParamsSchema({
        name: 'site', value: {
            "header": "喜欢JS的无名小站", // 头部标题
            "subhead": "严俊东个人博客", // 副标题
            "description": "严俊东的个人博客。技术包括但不限于JavaScript、NodeJS、CSS3、HTML以及各类编程开发等相关内容。邮箱gaga_change@qq.com，微信号gaga_change。",
            "keywords": "严俊东,严俊东个人博客,严俊东博客,喜欢JS的无名小站",
            "version": process.env.MY_BLOG_STATIC_VERSION || "3.1.0"
        }
    })
    return await siteParams.save()
}