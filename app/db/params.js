const ParamsSchema = require('../models/params_schema')
const paramsInit = require('../lib/params_init')

async function getSite() {
    let siteParams = await ParamsSchema.findOne({ name: 'site' }) // 获取站点相关信息
    if (!siteParams) {
        siteParams = await paramsInit.siteInit() // 若无则初始化
    }
    return siteParams
}

module.exports = {
    // 获取站点配置信息
    async getParamsSite() {
        let siteParams = await getSite()
        let site = {}
        for (let [k, v] of siteParams.value) {
            site[k] = v;
        }
        return {
            data: site
        }
    },
    // 存储站点信息
    async setParamsSite(site) {
        let siteParams = await getSite()
        for (let key in site) {
            siteParams.value.set(key, site[key])
        }
        await siteParams.save()
        let newSite = {}
        for (let [k, v] of siteParams.value) {
            newSite[k] = v;
        }
        return { data: newSite }
    }
}
