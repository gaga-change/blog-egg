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
  };

  return {
    ...config,
    ...userConfig,
    security: {
      csrf: {
        enable: false,
      },
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
  };
};
