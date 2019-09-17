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
  only: {
    enable: true,
    package: 'egg-only',
  },
  swig: {
    enable: true,
    package: 'egg-view-swig',
  },
};
