'use strict';

const qiniu = require('qiniu');

/**
 * 上传指定目录中所有文件到七牛云
 * @param {String} fileName 文件名称
 * @param {Object} config 配置信息
 * @param {Object} stream 文件流
 */
function upload(fileName, config, stream) {
  const { accessKey, secretKey, bucket, zone, prefix } = config;
  const mac = new qiniu.auth.digest.Mac(accessKey, secretKey);
  const options = {
    // 要上传的空间
    scope: bucket,
  };
  const putPolicy = new qiniu.rs.PutPolicy(options);
  const uploadToken = putPolicy.uploadToken(mac);

  const qiniuConf = new qiniu.conf.Config();
  // 空间对应的机房
  qiniuConf.zone = qiniu.zone[zone];
  const formUploader = new qiniu.form_up.FormUploader(qiniuConf);
  const putExtra = new qiniu.form_up.PutExtra();

  // 上传到七牛后保存的文件名
  const key = (prefix || '') + fileName;
  return new Promise((resolve, reject) => {
    // 文件上传
    formUploader.putStream(uploadToken, key, stream, putExtra, function(respErr,
      respBody, respInfo) {
      if (respErr) {
        reject(respErr);
      } else if (respInfo.statusCode === 200) {
        resolve(respBody);
      } else {
        reject(respBody);
      }
    });
  });
}

module.exports = upload;
