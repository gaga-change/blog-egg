'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: false,
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  only: {
    enable: true,
    package: 'egg-only',
  },
};
