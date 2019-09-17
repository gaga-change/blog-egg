'use strict';

/** @type Egg.EggPlugin */
module.exports = {
  static: {
    enable: true,
  },
  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },
  only2: {
    enable: true,
    package: 'egg-only2',
  },
  swig: {
    enable: true,
    package: 'egg-view-swig',
  },
};
