'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/model/User.test.js', () => {
  it('校验虚拟属性 password', () => {
    const { User } = app.model;
    const user = new User();
    user.password = '123';
    assert(user.password === '123');
  });
});
