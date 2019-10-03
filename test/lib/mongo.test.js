'use strict';

const assert = require('assert');
const { getMongodbConnectLink } = require('../../lib/mongo');

describe('test/lib/mongo.test.js', () => {
  it('无用户名密码', () => {
    const link = getMongodbConnectLink('name', '123', 'abv', '456', 'test');
    assert(link === 'mongodb://name:123@abv:456/test');
  });
  it('有用户名密码', () => {
    const link = getMongodbConnectLink('', '123', 'abv', '456', 'test');
    assert(link === 'mongodb://abv:456/test');
    const link2 = getMongodbConnectLink('', '', 'abv', '456', 'test');
    assert(link2 === 'mongodb://abv:456/test');
  });
});
