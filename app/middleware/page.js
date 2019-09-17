'use strict';

module.exports = (site, menus) => {
  return async function page(ctx, next) {
    const urlPath = ctx.path;
    const menuConfig = menus.map(v => ({ ...v }));
    // 处理菜单 current 状态
    if (urlPath === '/archives' || urlPath.indexOf('/categories/') > -1 || urlPath.indexOf('/tags/') > -1) {
      menuConfig[1].current = true;
    } else if (urlPath === '/about') {
      menuConfig[2].current = true;
    } else {
      menuConfig[0].current = true;
    }
    ctx.state.menus = menuConfig;
    ctx.state.site = site; // 绑定到上下文
    return next();
  };
};
