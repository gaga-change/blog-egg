'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/auth.test.js', () => {
  describe('should post /api/auth/login', () => {
    it('必填字段校验', async () => {
      await app.httpRequest()
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({
          username: '12',
          password: '',
        })
        .expect({ message: '密码不能为空' })
        .expect(400);
      await app.httpRequest()
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({
          username: '',
          password: '123',
        })
        .expect({ message: '用户名不能为空' })
        .set('Accept', 'application/json')
        .expect(400);
      await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: '',
          password: '',
        })
        .expect({ message: '用户名不能为空' })
        .set('Accept', 'application/json')
        .expect(400);
    });
  });
  describe('should post /api/auth/login - no user', () => {
    let localUser;
    before(async () => {
      const { User } = app.model;
      const localUsers = await User.find({});
      localUser = localUsers[0];
      if (localUser) {
        await User.deleteOne(localUser);
      }
    });
    it('首次登录，无用户', async () => {
      const response = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'abc',
          password: '123',
        })
        .expect(200);
      assert(response.body.username === 'abc');
      assert(response.body.password === undefined);
      await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'abc',
          password: '1231',
        })
        .expect({ message: '密码错误' })
        .expect(400);
      const response2 = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'abc',
          password: '123',
        })
        .expect(200);
      assert(response2.body.username === 'abc');
      assert(response2.body.password === undefined);
      const response3 = await app.httpRequest()
        .get('/api/auth/current')
        .set('Cookie', response2.headers['set-cookie'])
        .set('Accept', 'application/json')
        .expect(200);
      assert(response3.body.username === 'abc');
      assert(response3.body.password === undefined);
    });
    after(async () => {
      const { User } = app.model;
      await User.deleteMany({});
      if (localUser) {
        await localUser.save();
      }
    });
  });
  describe('should post /api/auth/login - has user', () => {
    let localUser,
      temp;
    before(async () => {
      const { User } = app.model;
      const localUsers = User.find({});
      localUser = localUsers[0];
      if (localUser) {
        await User.deleteOne(localUser);
      }
      temp = new User({ username: 'foo', password: '123' });
      await temp.save();
    });
    it('已存在用户', async () => {
      await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'foo1',
          password: '123',
        })
        .expect({ message: '用户名不存在' })
        .expect(400);
      await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'foo',
          password: '1231',
        })
        .expect({ message: '密码错误' })
        .expect(400);
      const response = await app.httpRequest()
        .post('/api/auth/login')
        .set('Accept', 'application/json')
        .send({
          username: 'foo',
          password: '123',
        })
        .expect(200);
      assert(response.body.username === 'foo');
      assert(response.body.password === undefined);

    });
    after(async () => {
      const { User } = app.model;
      await User.deleteOne(temp);
      if (localUser) {
        await localUser.save();
      }
    });
  });
  it('should GET /api/auth/current & /api/auth/logout', async () => {
    app.mockSession({
      user: { username: 'gaga' },
    });
    await app.httpRequest()
      .get('/api/auth/current')
      .set('Accept', 'application/json')
      .expect({ username: 'gaga' })
      .expect(200);
    await app.httpRequest()
      .get('/api/auth/current')
      .set('Accept', 'application/json')
      .expect({ username: 'gaga' })
      .expect(200);
    await app.httpRequest()
      .get('/api/auth/logout')
      .set('Accept', 'application/json')
      .expect(204);
    await app.httpRequest()
      .get('/api/auth/current')
      .set('Accept', 'application/json')
      .expect(204);
  });
});
