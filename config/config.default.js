/* eslint valid-jsdoc: "off" */

'use strict';
const { mongodbConnectLink } = require('../lib/mongo');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1568701111229_5325';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
    site: {
      staitc: process.env.BLOG_CDN || '',
      header: '严俊东', // 头部标题
      subhead: '严俊东个人博客', // 副标题
      description: '严俊东的个人博客。技术包括但不限于JavaScript、NodeJS、CSS3、HTML以及各类编程开发等相关内容。邮箱gaga_change@qq.com，微信号gaga_change。',
      keywords: '严俊东,严俊东个人博客,严俊东博客',
      version: '3.1.4',
    },
    menus: [
      {
        path: '/.',
        name: '<i class="fa fa-home">首页</i>',
        current: false,
      },
      {
        path: '/archives',
        name: '<i class="fa fa-archive">归档</i>',
        current: false,
      },
      {
        path: '/about',
        name: '<i class="fa fa-user">关于</i>',
        current: false,
      },
    ],
  };

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
    },
    static: {
      prefix: '/',
      dir: './publish',
    },
    session: {
      key: 'EGG_SESS',
      maxAge: 30 * 24 * 3600 * 1000, // 30 天
      httpOnly: true,
      encrypt: true,
    },
    mongoose: {
      url: mongodbConnectLink,
      options: {
        useFindAndModify: false,
      },
      plugins: [],
    },
    view: {
      defaultViewEngine: 'swig',
      mapping: {
        '.html': 'swig',
      },
    },
  };
};
