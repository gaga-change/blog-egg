'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  describe('no login', () => {
    it('should GET /api/users', () => {
      return app.httpRequest()
        .get('/api/users')
        .expect(401)
        .then(response => {
          assert(response.body.login);
        });
    });
  });
  describe('login', () => {
    it('should GET /api/users', () => {
      app.mockSession({
        user: { name: 'test' },
      });
      return app.httpRequest()
        .get('/api/users')
        .expect(200)
        .then(response => {
          assert(response.body.constructor === Array);
        });
    });
  });

});
