'use strict';

exports.accessKey = process.env.QINIU_ACCESS_KEY || '';
exports.secretKey = process.env.QINIU_SECRET_KEY || '';
exports.bucket = process.env.QINIU_BUCKET || 'yanjd';
exports.zone = process.env.QINIU_ZONE || 'Zone_z2';
exports.prefix = process.env.QINIU_PREFIX || 'blog/img/test/';
exports.domainName = process.env.QINIU_PREFIX || '//cdn.yanjd.top/';
