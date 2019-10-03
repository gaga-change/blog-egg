'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/post.test.js', () => {
  describe('post 增删改，未登录', () => {
    const tempData = [];
    it('should POST /api/posts', async () => {
      const { Post } = app.model;
      const temp = new Post();
      tempData.push(temp);
      await app.httpRequest()
        .post('/api/posts')
        .set('Accept', 'application/json')
        .send(temp)
        .expect(401);
    });
    it('should DELETE /api/posts/:id', async () => {
      const { Post } = app.model;
      const temp = new Post();
      await app.httpRequest()
        .delete(`/api/posts/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(401);
    });
    it('should PUT /api/posts/:id', async () => {
      const { Post } = app.model;
      const temp = new Post();
      tempData.push(temp);
      await app.httpRequest()
        .put(`/api/posts/${temp._id}`)
        .set('Accept', 'application/json')
        .send(temp)
        .expect(401);
    });
    after(async () => {
      const { Post } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Post.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
  describe('post 查', () => {
    const tempData = [];

    it('should GET /api/posts', async () => {
      const { Post } = app.model;
      const temp = new Post({ title: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      const res = await app.httpRequest()
        .get('/api/posts')
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body.list && res.body.list.constructor === Array);
      assert(res.body.total && res.body.total.constructor === Number);
      const post = res.body.list[0];
      const keys = Object.keys(post);
      assert(keys.find(v => v === 'title'));
      assert(keys.find(v => v === '_id'));
    });
    it('should GET /api/posts/archives', async () => {
      const { Post } = app.model;
      const temp = new Post({ title: Date.now() + '_name' });
      await temp.save();
      const fullYear = new Date(temp.createdAt).getFullYear() + ' ';
      tempData.push(temp);
      const res = await app.httpRequest()
        .get('/api/posts/archives')
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body && res.body[fullYear] && res.body[fullYear].constructor === Array);
      const arr = res.body[fullYear];
      assert(arr.find(v => v._id === temp._id.toString()));
    });
    it('should GET /api/posts/:id', async () => {
      const { Post } = app.model;
      const temp = new Post({ title: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      const res = await app.httpRequest()
        .get(`/api/posts/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(200);
      assert(res.body && res.body.title === temp.title);
      const temp2 = new Post();
      await app.httpRequest()
        .get(`/api/posts/${temp2._id}`)
        .set('Accept', 'application/json')
        .expect({ message: '资源不存在' })
        .expect(404);
    });
    after(async () => {
      const { Post } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Post.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
  describe('post 增删改，登录', () => {
    const tempData = [];

    it('should POST /api/posts', async () => {
      const { Post } = app.model;
      const temp = new Post({ title: Date.now() + '_name' });
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      const res = await app.httpRequest()
        .post('/api/posts')
        .set('Accept', 'application/json')
        .send(temp)
        .expect(201);
      assert(res.body && res.body.title === temp.title);
    });
    it('should DELETE /api/posts/:id', async () => {
      const { Post } = app.model;
      const temp = new Post({ title: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      await app.httpRequest()
        .delete(`/api/posts/${temp._id}`)
        .set('Accept', 'application/json')
        .expect(204);
      const temp2 = new Post();
      await app.httpRequest()
        .delete(`/api/posts/${temp2._id}`)
        .set('Accept', 'application/json')
        .expect({ message: '资源不存在' })
        .expect(404);
    });
    it('should PUT /api/posts/:id', async () => {
      const { Post } = app.model;
      const temp = new Post({ title: Date.now() + '_name' });
      await temp.save();
      tempData.push(temp);
      app.mockSession({
        user: { },
      });
      await app.httpRequest()
        .put(`/api/posts/${temp._id}`)
        .set('Accept', 'application/json')
        .send({
          title: 'test',
        })
        .expect(204);
      const temp2 = new Post();
      await app.httpRequest()
        .put(`/api/posts/${temp2._id}`)
        .set('Accept', 'application/json')
        .send({
          title: 'test',
        })
        .expect({ message: '资源不存在' })
        .expect(404);
    });
    after(async () => {
      const { Post } = app.model;
      for (let i = 0; i < tempData.length; i++) {
        await Post.deleteOne({ _id: tempData[i]._id.toString() });
      }
    });
  });
});
