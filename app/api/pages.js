
/**
 * 主页
 */
exports.home = async (ctx, next) => {
    await ctx.render('index', {})
}

/**
 * 详情页
 * @
 * params
 *   id | 文章ID
 */
exports.detail = async (ctx, next) => {
    ctx.body = 'detail'
}