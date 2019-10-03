'use strict';

const { app, assert } = require('egg-mock/bootstrap');
const BaseController = require('../../../app/core/base-controller.js');
describe('test/app/core/base-controller.test.js', () => {
  it('baseController.error', () => {
    const base = new BaseController('modelName', { app, request: {}, response: {}, model: {} });
    base.error('123');
    assert(base.ctx.status === 400);
    assert(base.ctx.body === '123');
    base.error('123', 401);
    assert(base.ctx.status === 401);
    assert(base.ctx.body === '123');
  });
  it('baseController.success', () => {
    const base = new BaseController('modelName', { app, request: {}, response: {}, model: {} });
    base.success('123');
    assert(base.ctx.status === 200);
    assert(base.ctx.body === '123');
    base.success('123', 201);
    assert(base.ctx.status === 201);
    assert(base.ctx.body === '123');
  });
});
