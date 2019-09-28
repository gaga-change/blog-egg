'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  let temp;
  it('should GET /api/users/total', async () => {
    const response = await app.httpRequest()
      .get('/api/users/total')
      .expect(200);
    assert(response.body.total === 0 || response.body.total === 1);
    const { total } = response.body;
    const { User } = app.model;
    temp = new User();
    await temp.save();
    const response2 = await app.httpRequest()
      .get('/api/users/total')
      .expect(200);
    assert(response2.body.total === total + 1);
  });
  after(async () => {
    const { User } = app.model;
    if (temp) {
      await User.deleteOne(temp);
    }
  });
});
