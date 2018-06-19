const getMenuConfig = require('../config/menu')
const ParamsSchema = require('../models/params_schema')
const paramsInit = require('../lib/params_init')
/** 工具 */
module.exports = {
    /** 展示页面中间件 */
    async page(ctx, next) {
        let urlPath = ctx.path
        let menuConfig = getMenuConfig()
        // 处理菜单 current 状态
        if (urlPath == '/archives' || ~urlPath.indexOf('/categories/') || ~urlPath.indexOf('/tags/')) {
            menuConfig[1].current = true
        } else if (urlPath == '/about') {
            menuConfig[2].current = true
        } else {
            menuConfig[0].current = true
        }
        ctx.state.menus = menuConfig
        let siteParams = await ParamsSchema.findOne({ name: 'site' }) // 获取站点相关信息
        if (!siteParams) {
            siteParams = await paramsInit.siteInit()
        }
        let obj = Object.create(null);
        for (let [k, v] of siteParams.value) {
            obj[k] = v;
        }
        ctx.state.site = obj // 绑定到上下文
        return next()
    },
    /** 权限校验 */
    async admin(ctx, next) {
        let admin = ctx.session.user
        if (admin) {
            return next()
        } else {
            return ctx.body = { login: true }
        }
    },
    /** 获取配置信息 */
    async params(ctx, next) {
        let obj = await ParamsSchema.findOne({ name: 'post' }) // 获取post相关信息
        if (!obj) {
            obj = await paramsInit.postInit()
        }
        ctx.state.postParams = obj // 绑定到上下文
        await next().then(async () => {
            await obj.save()
        })
    }
}