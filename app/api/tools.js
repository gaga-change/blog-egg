
const path = require('path')
const fs = require('fs')
const post = require('../db/post')
const getMenuConfig = require('../config/menu')
const ParamsSchema = require('../models/params_schema')
const paramsInit = require('../parse/params_init')
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
        let obj = await ParamsSchema.findOne({name: 'post'}) // 获取post相关信息
        if (!obj) {
            obj = await paramsInit.postInit()
        }
        ctx.state.postParams = obj // 绑定到上下文
        await next().then(async () => {
            await obj.save()
        })
    },
    /** 把md文件转移到数据库 */
    async turnPost(ctx, next) {
        const postDir = path.resolve(__dirname, '../../post')
        let mdFile = fs.readdirSync(postDir)
        mdFile = mdFile.filter(item => path.extname(item) == '.md') // 过滤非md文件
        let message = [] // 错误信息
        let length = mdFile.length // 总长度
        await new Promise(r => {
            mdFile.map(async (item) => {
                let content = fs.readFileSync(path.join(postDir, item)).toString()
                let ret = await post.createPost(content)
                message.push(ret)
                if (message.length == length) {
                    r()
                }
            })
        })
        ctx.body = { data: message }
    }
}