'use strict';

const path = require('path');
const sendToWormhole = require('stream-wormhole');
const qiniuUpload = require('../../lib/qiniuUpload');
const Controller = require('egg').Controller;

module.exports = class extends Controller {
  async uploadNotRequiredFile() {
    const { ctx } = this;
    const { Oss } = ctx.model;
    const stream = await ctx.getFileStream({ requireFile: false });
    let result,
      oss;
    if (stream.filename) {
      oss = new Oss();
      oss.name = stream.filename;
      const name = oss.id + path.extname(stream.filename);
      oss.saveName = name;
      result = await qiniuUpload(name, this.config.qiniu, stream);
      oss.url = this.config.qiniu.domainName + result.key;
      oss.hash = result.hash;
      oss.path = result.key;
      await oss.save();
    } else {
      await sendToWormhole(stream);
    }
    ctx.body = oss;
  }
};
