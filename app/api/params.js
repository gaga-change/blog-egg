const dbParams = require('../db/params')
const only = require('only')

module.exports = {
    // 获取站点信息
    async getSite(ctx) {
        ctx.body = await dbParams.getParamsSite()
    },
    // 存储站点信息
    async setSite(ctx) {
        let site = only(ctx.request.body, 'header subhead description keywords')
        for (let key in site) {
            if (site[key].length > 100) return ctx.body = { err: '长度过长' }
        }
        ctx.body = await dbParams.setParamsSite(site)
    }
}