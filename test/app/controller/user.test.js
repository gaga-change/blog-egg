'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {

  it('should GET /api/users', () => {
    return app.httpRequest()
      .get('/api/users')
      .expect(200)
      .then(response => {
        assert(response.body.constructor === Array);
      });
  });
});
