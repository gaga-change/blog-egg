
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
    let postParams = new ParamsSchema({ name: 'post', value: {}}) // 初始化配置信息
    let maxPost = await PostSchema.find() // 获取最大id的文章
        .select('id')
        .sort({ id: -1 })
        .limit(1)
        .skip(0)
    maxPost = maxPost[0]
    postParams.value.set('id', maxPost ? maxPost.id : 0)
    return await postParams.save()
}
